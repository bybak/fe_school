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

            <b-dropdown variant="light" no-caret size="sm">
              <template slot="button-content"><i class="fas fa-user"></i> User</template>
              <b-dropdown-item to="/profile">Profile</b-dropdown-item>
              <b-dropdown-item >Logout</b-dropdown-item>
            </b-dropdown>

          <b-button variant="light" size="sm" @click="openModal" class="ml-2">Login</b-button>
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
    methods: {
        openModal() {
            this.$refs.login.show();
        }
    }
}
</script>

<style>
</style>
