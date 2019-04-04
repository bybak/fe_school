import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Raters from 'vue-rate-it';
import firebase from 'firebase';
import Vuex from 'vuex';

var config = {

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
    { path: '/films', name: 'films', component: films },
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
