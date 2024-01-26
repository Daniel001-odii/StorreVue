<template>
<!-- <Navbar/> -->

<router-view/>

</template>
<script>
// import { RouterLink } from "vue";
import { RouterLink } from 'vue-router';
import Navbar from './components/Navbar.vue';

export default{
  components:{
    RouterLink,
    Navbar
  }
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background: radial-gradient(179.04% 116.22% at 12.15% 93.6%, #E7E3FF 9.5%, #F5F6F9 50.24%, #FFE7E3 100%); */
  background: #fff;
}


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.RouterLink-exact-active {
  color: #42b983;
}
</style>
