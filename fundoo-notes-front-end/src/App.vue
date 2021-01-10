<!--<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
-->
<!--<template>
  <registration></registration>
</template>

<script>
import Registration from './pages/Registration'
export default {
  components: {
    registration: Registration
  }
}
</script>
-->
<template>
  <div id="app">
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    <router-view/>
  </div>
</template>