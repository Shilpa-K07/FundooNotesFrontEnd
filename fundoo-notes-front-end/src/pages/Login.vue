<template>
 <v-form ref="loginForm">
  <v-app>
    <v-snackbar v-model="snackbar" :timeout="timeout">
       Login success
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="closeSnackbar">Close</v-btn>
        </template>
      </v-snackbar>
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
          <a>Forgot password?</a>
          <a>Verify email?</a>
          </v-row>
        </v-col>
        <v-alert
          v-model="isNotAuthorized"
          dense
          type="error"
          border="left"
          class="ml-12 mr-12"
        >Incorrect username or password</v-alert>
        <v-alert
          v-model="isNotVerified"
          dense
          type="warning"
          border="left"
          class="ml-12 mr-12"
        >Please verify your email before login</v-alert>
        <v-row class="d-flex justify-space-around mt-12">
          <router-link class="create-account" to='/register'>Create account</router-link>
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
export default {
  components: {
    Title
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
    isNotAuthorized: false,
    isNotVerified: false,
    snackbar: false,
    timeout: 2000,
    showPassword: false
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
        );
      return errors;
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
          .then(data => {console.log("data: "+JSON.stringify(data))
           if (data) {
              this.showSnackbar()
            }
          })
          .catch(error => {
            console.log("error: " + JSON.stringify(error.response));
            if (error.response.data.message.includes("ERR:401-Authorization failed")) {
              this.isNotAuthorized = true
              this.isNotVerified = false
            } else if (error.response.status == 401) {
              this.isNotVerified = true
              this.isNotAuthorized = false
            }
          });
      }
    },
    userLogin: function(userInput) {
      return user.userLogin(userInput)
    },
     reset() {
      this.$refs.loginForm.reset()
      this.$v.$reset()
    },
    showSnackbar() {
      this.snackbar = true
      this.isNotVerified = false
      this.isNotAuthorized = false
      setTimeout(() => {
        this.reset()
      }, this.timeout)
    },
    closeSnackbar() {
      this.snackbar = false
      this.reset()
      this.$v.$reset()
    }
  }
};
</script>

<style>
@import url("../css/login.css");
</style>
<style lang="scss">
@import url("../css/login.scss");
</style>