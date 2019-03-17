<template>
  <div id="navbar">
    <b-navbar variant="dark" type="dark">
      <b-navbar-brand href="#" to="/">
        <img src="../../pictures/logo.png" alt="logo" height="40"/>
        Movies
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="/films">Films</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-button variant="light" size="sm">Login</b-button>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style>
</style>
