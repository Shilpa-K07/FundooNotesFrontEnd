<template>
  <v-app>
    <v-content>
      <v-card class="login-card mx-auto ml-19 mt-9" outlined>
        <v-flex class="d-flex flex-column flex-gap mt-auto">
          <Title class="justify-center" />
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
            require
          />
          <v-text-field
            class="ml-8 mr-8"
            outlined
            dense
            label="Password"
            v-model="password"
            :error-messages="passwordErrors"
            require
          />
          <a class="forgot-password ml-10">Forgot password</a>
        </v-col>
        <v-row v-show="isNotAuthorized == true">
          <p class="error-hint red-text">Incorrect username or password</p>
        </v-row>
        <v-row class="d-flex justify-space-around mt-12">
          <a class="create-account">Create account</a>
          <v-btn class="login" @click="login">Login</v-btn>
        </v-row>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import user from "../services/user";
import Title from "../components/Title";
export default {
  data: () => ({
    emailId: "",
    password: "",
    isNotAuthorized: false
  }),
  components: {
    Title
  },
  validations: {
    emailId: {
      required,
      email
    },
    password: {
      required
    }
  },
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
        }
        var response = this.userLogin(userInput)
        response
        .then(data => {
          console.log("data: "+data)
        })
        .catch(error => {console.log("error: "+error)
          if (error.response.status == 401) {
              this.isNotAuthorized = true
            }
        })
      }
    },
    userLogin: function(userInput) {
      return user.userLogin(userInput)
    }
  }
}
</script>

<style>
@import url("../css/login.css");
</style>
<style lang="scss">
@import url("../css/login.scss");
</style>