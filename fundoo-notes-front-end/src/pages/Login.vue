<!--
This is vue component for login page
-->
<template>
  <v-form ref="loginForm">
    <v-app>
      <Snackbar ref="snack"/>
      <v-content>
        <v-card class="login-card mx-auto ml-19 mt-9" outlined>
          <v-flex class="d-flex flex-column flex-gap mt-auto">
            <Title class="justify-center"/>
            <v-card-title class="justify-center flex-gap">Sign in</v-card-title>
            <v-card-title class="justify-center third-title flex-gap">Use your FundooNotes Account</v-card-title>
          </v-flex>
          <v-col>
            <v-text-field
              class="ml-8 mr-8"
              outlined
              dense
              label="Email"
              v-model="emailId"
              :error-messages="emailIdErrors"
              required
            />
            <v-text-field
              class="ml-8 mr-8"
              outlined
              dense
              label="Password"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :error-messages="passwordErrors"
              required
            />
            <v-row class="d-flex justify-space-around">
              <router-link class="forgot-password" to="/forgotPassword">Forgot password</router-link>
              <router-link class="verify-email" to="/verifyEmail">Verify email?</router-link>
            </v-row>
          </v-col>
          <v-row class="d-flex justify-space-around mt-12">
            <router-link class="create-account" to="/register">Create account</router-link>
            <v-btn class="login" @click="login">Login</v-btn>
          </v-row>
        </v-card>
      </v-content>
    </v-app>
  </v-form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import user from "../services/user";
import Title from "../components/Title";
import Snackbar from "../components/Snackbar";

export default {
  components: {
    Title,
    Snackbar
  },
  validations: {
    emailId: {
      required,
      email
    },
    password: {
      required,
      isPasswordStrong(password) {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W){1}.*$/;
        return regex.test(password);
      }
    }
  },
  data: () => ({
    emailId: "",
    password: "",
    isAuthorized: true,
    isVerified: true,
    snackbar: false,
    timeout: 2000,
    showPassword: false,
    text: ""
  }),

  computed: {
    emailIdErrors() {
      const errors = [];
      if (!this.$v.emailId.$dirty) return errors;
      !this.$v.emailId.required && errors.push("Enter email address");
      !this.$v.emailId.email && errors.push("Must be valid email");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Enter password");
      !this.$v.password.isPasswordStrong &&
        errors.push(
          "Use 8 or more characters with a mix of letters, numbers & symbols"
        )
      return errors
    }
  },
  methods: {
    login() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const userInput = {
          emailId: this.emailId,
          password: this.password
        };
        var response = this.userLogin(userInput)
        response
          .then(data => {
            if (data) {
              const snackbarData = {
                text: "Successfully logged in",
                timeout: this.timeout
              }
            /*   sessionStorage.setItem("token", data.data.token) */
              this.$refs.snack.setSnackbar(snackbarData)
              setTimeout(() => {
                this.reset()
              }, this.timeout)
            }
          })
          .catch(error => {
            if (
              error.response.data.message.includes(
                "ERR:401-Authorization failed"
              )
            ) {
              const snackbarData = {
                text: "Authorization falied",
                timeout: this.timeout
              }
              this.$refs.snack.setSnackbar(snackbarData)
            } else if (error.response.status == 401) {
              const snackbarData = {
                text: "Please verify your email address before login",
                timeout: this.timeout
              }
              this.$refs.snack.setSnackbar(snackbarData)
              /* setTimeout(() => {
                this.reset()
              }, this.timeout) */
            }
          })
      }
    },
    userLogin: function(userInput) {
      return user.userLogin(userInput)
    },
    reset() {
      this.$refs.loginForm.reset()
      this.$v.$reset()
    },
  }
}
</script>

<style>
@import url("../css/login.css");
</style>
<style lang="scss">
@import url("../css/login.scss");
</style>