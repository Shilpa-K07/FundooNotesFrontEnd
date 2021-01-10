<template>
  <v-app>
    <v-content>
      <v-card class="login-card mx-auto ml-19 mt-9 d-flex flex-column" outlined>
        <Title class="d-flex justify-center" />
        <v-card-title class="d-flex justify-center title-margin">Sign in</v-card-title>
        <v-card-title
          class="d-flex justify-center third-title title-margin"
        >Use your FundooNotes Account</v-card-title>
        <v-col>
          <v-text-field class="ml-8 mr-8" outlined dense label="Email" v-model="email" />
          <v-text-field class="ml-8 mr-8" outlined dense label="Password" v-model="password" />
        </v-col>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import Title from "../components/Title";
export default {
  components: {
    Title
  }
};
</script>

<style scoped>
@import url("../css/login.css");
</style>