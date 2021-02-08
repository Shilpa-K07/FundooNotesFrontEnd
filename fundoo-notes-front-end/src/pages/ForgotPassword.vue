<!-- cooment
This vue component is for sending email to user
incase of forgot password
-->
<template>
  <v-form ref="forgotPasswordForm">
    <v-app>
      <Snackbar ref="snack" />
      <v-content>
        <v-card
          class="forgot-password-card mx-auto ml-19 mt-9"
          outlined
        >
          <v-flex class="d-flex flex-column flex-gap mt-auto">
            <Title class="justify-center" />
            <v-card-title class="justify-center flex-gap">
              Account recovery
            </v-card-title>
          </v-flex>
          <v-col class="d-flex flex-column justify-space-around">
            <v-text-field
              v-model="emailId"
              class="ml-8 mr-8"
              outlined
              dense
              label="Email"
              :error-messages="emailIdErrors"
              required
            />
            <v-row class="d-flex justify-space-around mt-8">
              <v-btn
                class="login"
                @click="sendResetPasswordLink"
              >
                Send reset password link
              </v-btn>
            </v-row>
          </v-col>
        </v-card>
      </v-content>
    </v-app>
  </v-form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import user from '../services/user'
import Title from '../components/Title'
import Snackbar from '../components/Snackbar'

export default {
  components: {
    Title,
    Snackbar
  },
  validations: {
    emailId: {
      required,
      email
    }
  },
  data: () => ({
    emailId: '',
    timeout: 2000,
    text: ''
  }),

  computed: {
    emailIdErrors () {
      const errors = []
      if (!this.$v.emailId.$dirty) return errors
      !this.$v.emailId.required && errors.push('Enter email address')
      !this.$v.emailId.email && errors.push('Must be valid email')
      return errors
    }
  },
  methods: {
    sendResetPasswordLink () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const userInput = {
          emailId: this.emailId
        }
        this.userForgotPasword(userInput)
          .then(data => {
            if (data) {
              const snackbarData = {
                text: 'Successfully sent password reset link',
                timeout: this.timeout
              }
              this.$refs.snack.setSnackbar(snackbarData)
              setTimeout(() => {
                this.reset()
              }, this.timeout)
            }
          })
          .catch(error => {
            if (error.response.status == 401) {
                const snackbarData = {
                  text: 'Authorization falied',
                  timeout: this.timeout
                }
                this.$refs.snack.setSnackbar(snackbarData)
                setTimeout(() => {
                this.reset()
              }, this.timeout)
              } else if (error.response.status == 500) {
                {
                const snackbarData = {
                  text: 'Some error occurred',
                  timeout: this.timeout
                }
                this.$refs.snack.setSnackbar(snackbarData)
                setTimeout(() => {
                this.reset()
              }, this.timeout)
              }
            }
          })
      }
    },
    userForgotPasword: function (userInput) {
      return user.userForgotPasword(userInput)
    },
    reset () {
      this.$refs.forgotPasswordForm.reset()
      this.$v.$reset()
    }
  }
}
</script>

<style>
@import url("../scss/login.scss");
</style>
