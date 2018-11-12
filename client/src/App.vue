<template>
  <div id="app">
    <Navbar/>
    <b-container class="bv-row">
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Login from './pages/Login'

export default {
  name: 'App',
  components: {
    Navbar,
    Login
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
