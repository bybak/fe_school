import fireBaseStore from '../fireBaseStore';
import Lodash from 'lodash';

export default class databaseService {

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

        console.log(commentRef);

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
                querySnapshot.forEach(function(doc) {
                    let oneComment = doc.data();
                    app.getUserById(oneComment.userId).then((data) => {
                        oneComment.user = data;
                        comments.push(oneComment);
                    });
                });
                callback(comments);
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

    static getFriendsForUser(userId) {

        let friends = [];
        const app = this;

        return fireBaseStore.collection("friends").where("userId", "==", userId)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {

                    let friendId = doc.data().friendId;
                    let friend = app.getUserById(friendId).then((data) => {
                        friends.push(data);
                    });





                });


                console.log("GET FRIENDS");
                console.log(friends);
                console.log('---------')

                return friends;


            })
            .catch(function(error) {
            });
    }

}