<!-- comment
This is the component where all the routers are defined. This is the main component
-->

<template>
  <div id="app">
      <router-link to="/register"></router-link> |
      <router-link to="/login"></router-link>
      <router-link to="/forgotPassword"></router-link>
      <router-link to="/resetPassword/:token"></router-link>
    <router-view/>
<!-- 
    <v-snackbar v-model="snackbar" :timeout="timeout">
       {{text}}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar> -->
  </div>
</template>
<script>
/* export default {
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
} */
</script>
