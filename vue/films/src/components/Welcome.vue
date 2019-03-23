<template>
  <div class="welcome">
    <div class="text-light pt-5 text-center">
      <i class="fas fa-film fa-6x"></i>
      <h1 class="mt-2">Welcome</h1>
      <div>
        Here you can find absolutely everything about movies.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
