import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);

import films from './components/Films.vue';
import helloWorld from './components/HelloWorld.vue';

const routes = [
    { path: '/', component: helloWorld },
    { path: '/films', component: films },
];

const router = new VueRouter({
    routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');