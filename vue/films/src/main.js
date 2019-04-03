import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Raters from 'vue-rate-it';
import firebase from 'firebase';
import Vuex from 'vuex';

var config = {
    apiKey: "AIzaSyDqVrMNZs8s3RrG7Ge5Gr-2svFOnJL8wpQ",
    authDomain: "films-2c182.firebaseapp.com",
    databaseURL: "https://films-2c182.firebaseio.com",
    projectId: "films-2c182",
    storageBucket: "films-2c182.appspot.com",
    messagingSenderId: "474394274292"
};
firebase.initializeApp(config);

import VueRouter from 'vue-router'

Vue.config.productionTip = false;

Vue.component('fa-rating', Raters.FaRating);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(firebase);
Vue.use(Vuex);

import films from './components/Films.vue';
import welcome from './components/Welcome.vue';
import oneFilm from './components/OneFilm.vue';
import profile from './components/Profile.vue';

const routes = [
    { path: '/', component: welcome },
    { path: '/films', component: films },
    { path: '/films/film/:id', name: 'film', component: oneFilm, props: true },
    { path: '/profile', component: profile }
];

const router = new VueRouter({
    routes
});

// router.beforeEach((to, from, next) => {
//
//
//     next();
// });

Vue.prototype.$firebase = firebase;
Vue.prototype.$db = firebase.database();
Vue.prototype.$fireStore = firebase.firestore();

// var db = firebase.firestore();
// db.collection("films").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
//     .then(function(docRef) {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
//     });

let app = '';

firebase.auth().onAuthStateChanged(() => {
    if (!app) {

        const currentUser = firebase.auth().currentUser;

        let logged = false;
        if (currentUser) {
            logged = true;
        }

        const store = new Vuex.Store({
            state: {
                user: currentUser,
                logged: logged
            },
            getters: {
                getUser: state => {
                    return state.user;
                },
                logged: state => {
                    return state.logged;
                }
            },
            mutations: {
                setUser (state, currentUser) {
                    state.user = currentUser;
                    if (currentUser) {
                        state.logged = true;
                    } else {
                        state.logged = false;
                    }
                }
            }
        });

        app = new Vue({
            store,
            router,
            render: h => h(App),
        }).$mount('#app');
    }
});