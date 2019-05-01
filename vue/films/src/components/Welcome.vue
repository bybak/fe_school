<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="text-light background d-flex justify-content-center align-items-center">
        <div class="text-center welcome">
          <i class="fas fa-film fa-6x"></i>
          <h1 class="mt-2">Welcome</h1>
          <div>
            Here you can find absolutely everything about movies.
          </div>
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
.welcome {
    margin-top: -70px;
}
.background {
    height: 80vh;
    width: 100%;
    background: url('../../pictures/welcome.png') no-repeat center center;
    -webkit-background-size: contain;
    -moz-background-size: contain;
    -o-background-size: contain;
    background-size: contain;
}
</style>
