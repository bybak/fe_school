<template>
  <div id="app">
    <navbar></navbar>
    <b-container class="mt-5">
      <router-view>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </router-view>
    </b-container>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
