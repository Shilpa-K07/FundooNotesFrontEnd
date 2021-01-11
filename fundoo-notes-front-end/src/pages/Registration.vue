<template>
  <v-form ref="form">
    <v-app>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        Registration successful
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="closeSnackbar">Close</v-btn>
        </template>
      </v-snackbar>
      <v-content>
        <v-card class="card-height-width mx-auto mt-9 pl-9 pt-9" outlined>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-flex xs24 md12>
                <Title />
              </v-flex>
              <v-flex class="second-title">
                <v-card-title>Create your fundooNotes Account</v-card-title>
              </v-flex>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      label="First name"
                      v-model="firstName"
                      :error-messages="firstNameErrors"
                      required
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      label="Last name"
                      v-model="lastName"
                      :error-messages="lastNameErrors"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col></v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      label="Email address"
                      v-model="emailId"
                      :error-messages="emailIdErrors"
                      required
                      :class="emailId.isUserExists? 'red-border' : ''"
                    />
                  </v-col>
                </v-row>
                <v-row v-show="isUserExists == true">
                  <p class="error-hint red-text">User exists with this emailId</p>
                </v-row>
                <v-row>
                  <v-col></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      outlined
                      dense
                      label="Password"
                      :type="showPassword ? 'text' : 'password'"
                      v-model="password"
                      :error-messages="passwordErrors"
                      required
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      outlined
                      dense
                      :type="showPassword ? 'text' : 'password'"
                      label="Confirm"
                      v-model="confirmPassword"
                      :error-messages="confirmPasswordErrors"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row v-show="isClicked == false">
                  <p
                    class="password-hint"
                  >Use 8 or more characters with a mix of letters, numbers & symbols</p>
                </v-row>
                <v-row>
                  <div>
                    <v-btn class="sign-in" text small color="info">Sign in instead</v-btn>
                  </div>
                  <v-col></v-col>
                  <v-btn color="info" @click="register">Register</v-btn>
                </v-row>
              </v-card-text>
            </v-flex>
            <v-flex xs12 md6>
              <v-img :src="logoPath" class="account-img"></v-img>
              <v-icon
                v-show="showPassword == true"
                v-on:click="showPassword = !showPassword"
                class="mdi-eye"
              >mdi-eye</v-icon>
              <v-icon
                v-show="showPassword == false"
                v-on:click="showPassword = !showPassword"
                class="mdi-eye"
              >mdi-eye-off</v-icon>
            </v-flex>
          </v-layout>
        </v-card>
      </v-content>
    </v-app>
  </v-form>
</template>
<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import user from "../services/user";
import Title from "../components/Title";
export default {
  components: {
    Title
  },
  validations: {
    firstName: {
      required,
      minLength: minLength(2)
    },
    lastName: {
      required
    },
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
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs("password")
    }
  },

  data: () => ({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    user: {},
    showPassword: false,
    isClicked: false,
    isPasswordMismatch: false,
    snackbar: false,
    timeout: 2000,
    isUserExists: false,
    logoPath: require("../assets/account.svg")
  }),

  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("Enter first name");
      !this.$v.firstName.minLength &&
        errors.push("Name must contain 2 characters");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("Enter last name");
      return errors;
    },
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
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required && errors.push("confirm password");
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push("Password mismatch");
      return errors;
    }
  },
  methods: {
    register() {
      this.$v.$touch();
      this.isClicked = true;
      this.isUserExists = false;
      if (!this.$v.$invalid) {
        const userInput = {
          firstName: this.firstName,
          lastName: this.lastName,
          emailId: this.emailId,
          password: this.password
        };
        var response = this.myFunction(userInput);
        response
          .then(data => {
            if (data) {
              //this.snackbar = true;
              this.showSnackbar()
            }
          })
          .catch(error => {
            console.log(error.response.status);
            if (error.response.status == 409) {
              this.isUserExists = true
            }
          });
      }
    },
    myFunction: function(userInput) {
      return user.userRegistration(userInput)
    },
    reset() {
      this.$refs.form.reset()
    },
    showSnackbar() {
      this.snackbar = true
      setTimeout(() => {
        this.reset()
      }, this.timeout)
    },
    closeSnackbar() {
      this.snackbar = false
      this.reset()
    }
  }
};
</script>
<style scoped>
@import url("../css/registration.css");
</style>
