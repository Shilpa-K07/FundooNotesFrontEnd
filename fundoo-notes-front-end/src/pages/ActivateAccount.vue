<!-- comment
This component is for activating user account 
-->
<!-- cooment
This vue component is for resetting user password
-->

<template>
  <v-app>
    <Snackbar ref="snack" />
    <v-content>
      <v-card class="activate-account mx-auto ml-19 mt-9" outlined>
        <v-flex class="d-flex flex-column flex-gap mt-auto">
          <Title class="justify-center" />
          <v-card-title
            class="justify-center flex-gap"
          >Click on below link to activate account</v-card-title>
        </v-flex>
        <v-row class="d-flex justify-space-around mt-12">
          <v-btn class="login" @click="activateAccount">Activate now</v-btn>
        </v-row>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import user from "../services/user";
import Title from "../components/Title";
import Snackbar from "../components/Snackbar";

export default {
  components: {
    Title,
    Snackbar
  },
  data: () => ({
    timeout: 2000,
    text: ""
  }),

  methods: {
    activateAccount() {
      {
        const userInput = {
          token: this.$route.params.token
        }
        this.userAccountActivate(userInput)
          .then(data => {
            if (data) {
              const snackbarData = {
                text: "Account activated !",
                timeout: this.timeout
              };
              this.$refs.snack.setSnackbar(snackbarData);
              setTimeout(() => {
                this.reset()
              }, this.timeout)
              setTimeout(() => {
                this.$router.push({ name: 'Login', query: { redirect: '/login' } });
              }, this.timeout)
            }
          })
          .catch(error => {
            if (error.response.status == 401) {
              const snackbarData = {
                text: "Authorization falied",
                timeout: this.timeout
              };
              this.$refs.snack.setSnackbar(snackbarData)
            } else if (error.response.status == 500) {
              {
                const snackbarData = {
                  text: "Some error occurred",
                  timeout: this.timeout
                };
                this.$refs.snack.setSnackbar(snackbarData);
              }
            }
          });
      }
    },
    userAccountActivate: function(userInput) {
      return user.userAccountActivate(userInput);
    },
  }
};
</script>
<style>
@import url("../css/login.css");
</style>
