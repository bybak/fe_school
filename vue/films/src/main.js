import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);

import page1 from './components/Page1';
import page2 from './components/Page2';

const Foo = page1;
const Bar = page2;

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
];

const router = new VueRouter({
    routes
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');