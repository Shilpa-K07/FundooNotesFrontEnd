<!-- cooment
This vue component is for resetting user password
-->

<template>
  <v-form ref="resetPasswordForm">
    <v-app>
      <Snackbar ref="snack" />
      <v-content>
        <v-card class="login-card mx-auto ml-19 mt-9" outlined>
          <v-flex class="d-flex flex-column flex-gap mt-auto">
            <Title class="justify-center" />
            <v-card-title class="justify-center flex-gap">Reset passord</v-card-title>
          </v-flex>
          <v-col>
            <v-text-field
              class="ml-8 mr-8"
              outlined
              dense
              label="New password"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :error-messages="passwordErrors"
              required
            />
            <v-text-field
              class="ml-8 mr-8"
              outlined
              dense
              label="Confirm password"
              v-model="confirmPassword"
              :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPasswordConfirm ? 'text' : 'password'"
              @click:append="showPasswordConfirm = !showPasswordConfirm"
              :error-messages="confirmPasswordErrors"
              required
            />
          </v-col>
          <v-row class="d-flex justify-space-around mt-12">
            <v-btn class="login" @click="resetPassword">Reset password</v-btn>
          </v-row>
        </v-card>
      </v-content>
    </v-app>
  </v-form>
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";
import user from "../services/user";
import Title from "../components/Title";
import Snackbar from "../components/Snackbar";

export default {
  components: {
    Title,
    Snackbar
  },
  validations: {
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
    password: "",
    confirmPassword: "",
    timeout: 2000,
    text: "",
    showPasswordConfirm: false,
    showPassword: false
  }),

  computed: {
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
    resetPassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const userInput = {
          newPassword: this.password,
          token: this.$route.params.token
        }
        this.userPasswordReset(userInput)
          .then(data => {
            if (data) {
              const snackbarData = {
                text: "Successfully changed password",
                timeout: this.timeout
              };
              this.$refs.snack.setSnackbar(snackbarData)
              setTimeout(() => {
                this.reset();
              }, this.timeout)
            }
          })
          .catch(error => { 
            if (error.response.status == 401) {
              const snackbarData = {
                text: "Authorization falied",
                timeout: this.timeout
              }
              this.$refs.snack.setSnackbar(snackbarData)
              setTimeout(() => {
                this.reset()
              }, this.timeout)
             
            } else if (error.response.status == 500) {
              {  
                const snackbarData = {
                  text: "Some error occurred",
                  timeout: this.timeout
                };
                this.$refs.snack.setSnackbar(snackbarData)
                setTimeout(() => {
                  this.reset()
                }, this.timeout)
              }
            }
          })
      }
    },
    userPasswordReset: function(userInput) {
      return user.userPasswordReset(userInput)
    },
    reset() {
      this.$refs.resetPasswordForm.reset()
      this.$v.$reset()
    }
  }
};
</script>

<style>
@import url("../css/login.css");
</style>