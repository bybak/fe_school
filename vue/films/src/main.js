import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Raters from 'vue-rate-it';

import VueRouter from 'vue-router'

Vue.config.productionTip = false;

Vue.component('fa-rating', Raters.FaRating);
Vue.use(BootstrapVue);
Vue.use(VueRouter);

import films from './components/Films.vue';
import welcome from './components/Welcome.vue';
import oneFilm from './components/OneFilm.vue';
import profile from './components/Profile.vue';

const routes = [
    { path: '/', component: welcome },
    { path: '/films', component: films },
    { path: '/film', component: oneFilm },
    { path: '/profile', component: profile }
];

const router = new VueRouter({
    routes
});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');