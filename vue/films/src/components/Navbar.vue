<template>
  <div id="navbar">
    <b-navbar toggleable="lg" variant="dark" type="dark" class="shadow">
      <b-navbar-brand href="#" to="/">
        <img src="../../pictures/logo.png" alt="logo" height="40"/>
        Movies
      </b-navbar-brand>

      <b-navbar-toggle target="nav_collapse" />
      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item v-if="logged" @click="goToFilms">Films</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
            <b-dropdown variant="link" right no-caret size="sm" v-if="logged">
                <template slot="button-content"><b-button size="sm" class="border-0 p-0 m-0"><img :src="user.avatar" class="rounded" height="29"> <span class="p-2" style="line-height: 29px;">{{user.name}}</span></b-button></template>
              <b-dropdown-item to="/profile">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout();">Logout</b-dropdown-item>
            </b-dropdown>

          <b-button size="sm" @click="openModal" class="ml-2" v-if="!logged">Login</b-button>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <login ref="login"></login>

  </div>
</template>

<script>
    import Login from "./Login";
export default {
    components: {Login},
    name: 'navbar',
    data() {
        return {
        }
    },
    computed: {
        user: (app = this) => {
            return app.$store.getters.getUser;
        },
        logged: (app = this) => {
            return app.$store.getters.logged;
        }
    },
    methods: {
        goToFilms() {
            const user = this.$store.getters.getUser;

            console.log(123123123);
            console.log(user);
            console.log(user.id);

            this.$router.push({name: 'films', params: {id: user.id}});
        },
        openModal() {
            this.$refs.login.show();
        },
        logout() {
            let app = this;
            this.$firebase.auth().signOut().then(() => {
              app.$store.commit('setUser', null);
            });

            this.$router.push({name: 'welcome'});
        }
    }
}
</script>

<style>
</style>
