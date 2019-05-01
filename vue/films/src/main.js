import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Raters from 'vue-rate-it';
import firebase from 'firebase';
import Vuex from 'vuex';
import Lodash from 'lodash';
import store from './vuexStore';
import databaseService from './lib/databaseService';
import VuePaginate from 'vue-paginate'

import VueRouter from 'vue-router'

Vue.config.productionTip = false;

Vue.component('fa-rating', Raters.FaRating);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(firebase);
Vue.use(Vuex);
Vue.use(VuePaginate);

import films from './components/Films.vue';
import welcome from './components/Welcome.vue';
import oneFilm from './components/OneFilm.vue';
import profile from './components/Profile.vue';

const routes = [
    { path: '/', name: 'welcome', component: welcome },
    { path: '/films/:id', name: 'films', component: films, props: true},
    { path: '/films/:userId/film/:id', name: 'film', component: oneFilm, props: true },
    { path: '/profile', component: profile }
];

const router = new VueRouter({
    routes
});

// router.beforeEach((to, from, next) => {
//     next();
// });

Vue.prototype.$firebase = firebase;
Vue.prototype.$db = firebase.database();
Vue.prototype.$fireStore = firebase.firestore();
Vue.prototype.$lodash = Lodash;

let app = '';

const dangerToast = (text) => {
    (new Vue()).$bvToast.toast(text, {
        title: 'Error',
        autoHideDelay: 5000,
        appendToast: true,
        variant: 'danger',
        toaster: 'b-toaster-bottom-right',
        solid: false
    });
};
Vue.prototype.$dangerToast = dangerToast;

firebase.auth().onAuthStateChanged(() => {
    if (!app) {

        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            databaseService.getUserById(currentUser.uid).then((data) => {
                store.commit('setUser', data);

                app = new Vue({
                    store,
                    router,
                    render: h => h(App),
                }).$mount('#app');
            });
        } else {
            app = new Vue({
                store,
                router,
                render: h => h(App),
            }).$mount('#app');
        }

    }
});
