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
          <b-nav-item to="/films">Films</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">

            <b-dropdown variant="light" no-caret size="sm" v-if="logged">
              <template slot="button-content"><i class="fas fa-user"></i> User</template>
              <b-dropdown-item to="/profile">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout();">Logout</b-dropdown-item>
            </b-dropdown>

          <b-button variant="light" size="sm" @click="openModal" class="ml-2" v-if="!logged">Login</b-button>
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
//            logged:
        }
    },
    computed: {
        logged: (app = this) => {
            return app.$store.getters.logged;
        }
    },
    methods: {
        openModal() {
            this.$refs.login.show();
        },
        logout() {
            let app = this;
            this.$firebase.auth().signOut().then(() => {
              app.$store.commit('setUser', null);
            });
        }
    }
}
</script>

<style>
</style>
