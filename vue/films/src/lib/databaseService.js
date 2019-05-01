import fireBaseStore from '../fireBaseStore';
import Lodash from 'lodash';
import dayjs from 'dayjs';
import {firebaseService} from '../fireBaseStore';

export default class databaseService {
    // Add film
    static addFilm(film) {
        const filmsRef = fireBaseStore.collection("films");
        return filmsRef.add(film)
            .then(function(data) {
                console.log("Film added");
                return data.id;
            })
            .catch(function(error) {
                console.error("Error add film: ", error);
            });
    }

    static updateFilm(film) {
        fireBaseStore.collection("films").doc(film.id).update({
            title: film.title,
            year: film.year,
            genre: film.genre,
            text: film.text,
            poster: film.poster
        })
            .then(function() {
                console.log('Film updated!')
            })
            .catch(function(error) {
                console.error("Error update film: ", error);
            });
    }

    // Delete film
    static deleteFilm(filmId) {
        return fireBaseStore.collection("films").doc(filmId).delete().then(function() {
            console.log("Film successfully deleted!");
        }).catch(function(error) {
            console.error("Error deleted film: ", error);
        });
    }

    // Upload poster
    static uploadPoster(imageName, imageFile) {
        const StorageRef = firebaseService.storage().ref().child('posters/' + imageName);

        return StorageRef.put(imageFile).then(function(snapshot) {
            return firebaseService.storage().ref().child('posters/' + imageName).getDownloadURL().then(function(url) {
                return url;
            });
        });
    }

    // Generate token name
    static generateToken() {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var token = '';
        for(var i = 0; i < 15; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
    }

    // Get genres
    static getGenres() {
        return fireBaseStore.collection("genres")
            .get()
            .then(function(querySnapshot) {
                let genres = [];
                genres.push({value: '', text: 'Please select genre'});
                querySnapshot.forEach(function(doc) {
                    let genre = doc.data();
                    genres.push({value: genre.genreName, text: genre.genreName});
                });

                return genres;
            })
            .catch(function(error) {
            });
    }

    // Copy film to user
    static copyFilm(film, user) {
        const filmsRef = fireBaseStore.collection("films");

        film.favourite = {};
        film.ratingArray = [];
        film.user = user.id;
        film.votedUsers = [];

        return filmsRef.add(film)
            .then(function(data) {
                console.log("Film copied");
                return data.id;
            })
            .catch(function(error) {
                console.error("Error copy film: ", error);
            });
    }

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

    static setFilmFavourite(film, userId, state) {
        film.favourite[userId] = state;
        let newFavourite = film.favourite;

        fireBaseStore.collection("films").doc(film.id).update({
            favourite: newFavourite,
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

    static getOneFilm(filmId, callback) {

        fireBaseStore.collection("films").doc(filmId)
            .onSnapshot(function(doc) {
                let film = doc.data();

                if (film) {
                    film.rating = 0;
                    if (doc.data().ratingArray.length !== 0) {
                        film.rating = Lodash.sum(doc.data().ratingArray) / doc.data().ratingArray.length;
                    }

                    callback(film);
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

    // Get user's requests
    static getRequests(userId, callback) {
        const app = this;

        return fireBaseStore.collection("requests").where("userId", "==", userId)
            .onSnapshot(function(querySnapshot) {
                let requests = [];
                let changeType = '';

                querySnapshot.docChanges().forEach(function(change) {
                    changeType = change.type;
                    let request = change.doc.data();
                    request.id = change.doc.id;
                    requests.push(request);
                });

                new Promise(function(resolve, reject) {
                    requests.forEach(function (oneRequest, index) {
                        oneRequest.user = app.getUserById(oneRequest.friendId).then((data) => {
                            requests[index].user = data;
                        });
                    });

                    resolve(requests);
                }).then((data) => {
                    callback(data, changeType);
                });
            });
    }

    // Get user's friends
    static getFriendsForUser(userId, callback) {
        const app = this;

        return fireBaseStore.collection("friends").where("userId", "==", userId)
            .onSnapshot(function(querySnapshot) {
                let friends = [];
                let changeType = '';

                querySnapshot.docChanges().forEach(function(change) {
                    changeType = change.type;
                    let friend = change.doc.data();
                    friend.id = change.doc.id;
                    friends.push(friend);
                });

                new Promise(function(resolve, reject) {
                    friends.forEach(function (oneFriend, index) {
                        oneFriend.user = app.getUserById(oneFriend.friendId).then((data) => {
                            friends[index].user = data;
                        });
                    });

                    resolve(friends);
                }).then((data) => {
                    callback(data, changeType);
                });
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

    // Send request for user
    static sendRequest(userId, friendId) {
        const requestsRef = fireBaseStore.collection("requests");

        if (friendId === '') {
            console.log("FILL THE FRIEND ID");
            return;
        }

        // check for existing request
        fireBaseStore.collection("requests").where("userId", "==", userId).get().then(function(querySnapshot) {
            let requestExists = false;
            querySnapshot.forEach(function(doc) {
                let docData = doc.data();

                if (docData.friendId === friendId) {
                    requestExists = true;
                }
            });

            return requestExists;
        }).then(requestExists => {

            if (requestExists) {
                console.log("REQUEST EXISTS");
                return;
            }

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

    static updateUser(user) {
        fireBaseStore.collection("users").doc(user.id).update({
            name: user.name,
        })
            .then(function() {
                console.log('User updated!')
            })
            .catch(function(error) {
                console.error("Error update user: ", error);
            });
    }

    static getUserFilmsCount(userId, callback) {
        fireBaseStore.collection("films").where("user", "==", userId)
            .onSnapshot(function(querySnapshot) {
                callback(querySnapshot.docs.length);
            });
    }

    static getUserCommentsCount(userId, callback) {
        fireBaseStore.collection("comments").where("userId", "==", userId)
            .onSnapshot(function(querySnapshot) {
                callback(querySnapshot.docs.length);
            });
    }

}