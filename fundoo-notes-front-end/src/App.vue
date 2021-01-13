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
      <router-link to="/register"></router-link> |
      <router-link to="/login"></router-link>
    <router-view/>

    <v-snackbar v-model="snackbar" :timeout="timeout">
       {{text}}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "snackbar/SHOW_MESSAGE") {
        this.text = state.snackbar.text;
        this.color = state.snackbar.color;
        this.timeout = state.snackbar.timeout;
        this.show = true;
      }
    });
  },
  data: () => ({
    text: "",
    timeout: "",
    color:"",
    show:"",
  })
}
</script>
