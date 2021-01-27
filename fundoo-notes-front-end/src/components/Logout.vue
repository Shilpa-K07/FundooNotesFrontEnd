<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <span>{{name}}</span>
    </template>
    <v-card outlined class="mx-auto sign-out-card d-flex flex-column">
      <v-icon class="mt-5">mdi-account-circle</v-icon>
      <v-list-item class="sign-out-list ml-6 mr-6">{{emailId}}</v-list-item>
      <v-divider />
      <v-list-item class="ml-10">
        <a class="sign-out-btn ml-8" @click="clearSession">Sign out</a>
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