<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <span>{{name}}</span>
    </template>
    <v-card outlined class="mx-auto sign-out-card d-flex flex-column">
      <v-list-item class="sign-out-list">{{emailId}}</v-list-item>
      <v-list-item class="ml-10">
        <v-btn color="info" @click="clearSession">Sign out</v-btn>
      </v-list-item>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    emailId: sessionStorage.emailId,
    name: sessionStorage.name
  }),
  methods: {
    clearSession() {
      sessionStorage.clear();
      this.$router.push({ name: "Login", query: { redirect: "/login" } });
    }
  }
};
</script>