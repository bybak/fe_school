import fireBaseStore from '../fireBaseStore';
import Lodash from 'lodash';
import dayjs from 'dayjs';
import {firebaseService} from '../fireBaseStore';

export default class databaseService {

    static getFilms(userId, callback) {
        fireBaseStore.collection("films").where("user", "==", userId)
            .onSnapshot(function(querySnapshot) {
                let films = [];
                let changeType = '';

                querySnapshot.docChanges().forEach(function(change) {
                    changeType = change.type;

                    let film = change.doc.data();
                    film.id = change.doc.id;
                    film.show = true;

                    film.rating = 0;
                    if (film.ratingArray.length !== 0) {
                        film.rating = Lodash.sum(film.ratingArray) / film.ratingArray.length;
                    }

                    films.push(film);
                });

                callback(films, changeType);
            });
    }

    static setFilmFavourite(filmId, state) {
        fireBaseStore.collection("films").doc(filmId).update({
            favourite: state,
        })
            .then(function() {
            })
            .catch(function(error) {
            });
    }

    static setFilmRating(filmId, ratingArray, votedUsers) {
        fireBaseStore.collection("films").doc(filmId).update({
            ratingArray: ratingArray,
            votedUsers: votedUsers
        })
            .then(function() {
            })
            .catch(function(error) {
            });
    }

    static getOneFilm(filmId) {

        return fireBaseStore.collection("films").doc(filmId).get().then(function(doc) {
            if (doc.exists) {
                let film = doc.data();

                film.rating = 0;
                if (doc.data().ratingArray.length !== 0) {
                    film.rating = Lodash.sum(doc.data().ratingArray) / doc.data().ratingArray.length;
                }

                return film;
            } else {
            }
        });

    }

    static getComments(filmId) {
        const app = this;
        return fireBaseStore.collection("comments").where("filmId", "==", filmId)
            .get()
            .then(function(querySnapshot) {

                let comments = [];

                querySnapshot.forEach(function(doc) {

                    let comment = doc.data();
                    comment.id = doc.id;
                    app.getUserById(comment.userId).then((data) => {
                        comment.user = data;

                        comments.push(comment);
                    });

                });

                return comments;
            })
            .catch(function(error) {
            });
    }

    static getUserById(userId) {
        return fireBaseStore.collection("users").doc(userId).get().then(function(doc) {
            if (doc.exists) {
                return doc.data();
            } else {
            }
        })
    }

    static registerUser(userObject) {
        const userRef = fireBaseStore.collection("users").doc(userObject.id);

        userRef.set({
            id: userObject.id,
            name: userObject.name,
            email: userObject.email,
            avatar: 'https://firebasestorage.googleapis.com/v0/b/films-2c182.appspot.com/o/avatars%2Fnoavatar.png?alt=media&token=361d0a82-8d1c-4545-bb68-aeec0c51ba38'
        })
            .then(function() {
                console.log("New user added with ID: ", userObject.id);
            })
            .catch(function(error) {
                console.error("Error adding user: ", error);
            });
    }

    static addComment(comment) {
        const commentRef = fireBaseStore.collection("comments");

        return commentRef.add(comment)
            .then(function(data) {
                console.log("New comment added");
                return data.id;
            })
            .catch(function(error) {
                console.error("Error adding user: ", error);
            });
    }

    static getDynamicComments(filmId, callback) {
        const app = this;
        fireBaseStore.collection("comments").where("filmId", "==", filmId)
            .onSnapshot(function(querySnapshot) {
                let comments = [];
                let changeType = '';
                querySnapshot.docChanges().forEach(function(change) {
                    changeType = change.type;
                    let oneComment = change.doc.data();
                    oneComment.id = change.doc.id;
                    comments.push(oneComment);
                });

                new Promise(function(resolve, reject) {
                    comments.forEach(function (oneComment, index) {
                        oneComment.user = app.getUserById(oneComment.userId).then((data) => {
                            comments[index].user = data;
                        });
                    });

                    resolve(comments);
                }).then((data) => {
                    callback(data, changeType);
                });
                // callback(comments, changeType);
            });
    }

    // Delete comment
    static deleteComment(commentId) {
        fireBaseStore.collection("comments").doc(commentId).delete().then(function() {
            console.log("Comment successfully deleted!");
        }).catch(function(error) {
            console.error("Error deleted comment: ", error);
        });
    }

    // Like or Dislike comment
    static likeDislikeComment(commentId, userId, type) {

        let updateArrayObject = {};
        if (type === 'like') {
            updateArrayObject = {like: firebaseService.firestore.FieldValue.arrayUnion(userId)};
        }
        else {
            updateArrayObject = {dislike: firebaseService.firestore.FieldValue.arrayUnion(userId)};
        }

        fireBaseStore.collection("comments").doc(commentId).update(
            updateArrayObject
        )
            .then(function() {
                console.log("Comment successfully liked/disliked!");
            })
            .catch(function(error) {
                console.error("Error liked/disliked comment: ", error);
            });
    }

    static updateUserAvatar(userId, newAvatarUrl) {
        fireBaseStore.collection("users").doc(userId).update({
            avatar: newAvatarUrl,
        })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    }

    // Get user's friends
    static getFriendsForUser(userId, callback) {
        const app = this;

        return fireBaseStore.collection("friends").where("userId", "==", userId)
            .onSnapshot(function(querySnapshot) {
                let friends = [];

                querySnapshot.forEach(function(doc) {
                    let friend = doc.data();
                    app.getUserById(doc.data().friendId).then((data) => {
                        friend.user = data;
                        friends.push(friend);
                    });
                });

                callback(friends);
            });
    }

    // Get user's requests
    static getRequests(userId, callback) {
        const app = this;

        return fireBaseStore.collection("requests").where("userId", "==", userId)
            .onSnapshot(function(querySnapshot) {
                let requests = [];

                querySnapshot.forEach(function(doc) {
                    let request = doc.data();
                    app.getUserById(request.friendId).then((data) => {
                        request.user = data;
                        requests.push(request);
                    });
                });

                callback(requests);
            });
    }

    // Send request for user
    static sendRequest(userId, friendId) {
        const requestsRef = fireBaseStore.collection("requests");

        const outRequest = {
            userId: userId,
            friendId: friendId,
            type: 'out',
            date: dayjs().format('DD/MM/YYYY')
        };

        requestsRef.add(outRequest)
            .then(function(data) {
                console.log("Out request setted");
            })
            .catch(function(error) {
                console.error("Error out request: ", error);
            });

        const inRequest = {
            userId: friendId,
            friendId: userId,
            type: 'in',
            date: dayjs().format('DD/MM/YYYY')
        };

        requestsRef.add(inRequest)
            .then(function(data) {
                console.log("In request setted");
            })
            .catch(function(error) {
                console.error("Error in request: ", error);
            });

    }

    // Accept friend request
    static acceptFriend(userId, friendId) {
        const friendsRef = fireBaseStore.collection("friends");

        const setRecordForUser = {
            userId: userId,
            friendId: friendId,
            since: dayjs().format('DD/MM/YYYY')
        };

        friendsRef.add(setRecordForUser)
            .then(function(data) {
                console.log("Friend added");
            })
            .catch(function(error) {
                console.error("Error out request: ", error);
            });

        const setRecordForFriend = {
            userId: friendId,
            friendId: userId,
            since: dayjs().format('DD/MM/YYYY')
        };

        friendsRef.add(setRecordForFriend)
            .then(function(data) {
                console.log("User for Friend added");
            })
            .catch(function(error) {
                console.error("Error out request: ", error);
            });


        this.deleteFriendRequest(userId, friendId);

    }

    // Delete friend request
    static deleteFriendRequest(userId, friendId) {

        const requestsRef = fireBaseStore.collection("requests");

        requestsRef.where("userId", "==", userId).where("friendId", "==", friendId).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete().then(function () {
                    console.log('Request from user deleted');
                });
            });
        });

        requestsRef.where("userId", "==", friendId).where("friendId", "==", userId).get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete().then(function () {
                    console.log('Request from friend deleted');
                });
            });
        });
    }

    // Delete from friends
    static deleteFromFriends(userId, friendId) {
        const friendsRef = fireBaseStore.collection("friends");

        friendsRef.where("userId", "==", userId).where("friendId", "==", friendId).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete().then(function () {
                    console.log('Friend deleted');
                });
            });
        });

        friendsRef.where("userId", "==", friendId).where("friendId", "==", userId).get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete().then(function () {
                    console.log('User from friend deleted');
                });
            });
        });
    }

}