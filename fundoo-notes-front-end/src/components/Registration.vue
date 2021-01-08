<template>
<form>
  <v-app>
    <v-content>
      <v-card class="mx-auto mt-9 pl-9 pt-9" max-width="55%" height="80%" outlined>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-flex xs24 md12>
              <v-card-title>
                <span class="blue-text text-family-size">f</span>
                <span class="red-text text-family-size">u</span>
                <span class="orange-text text-family-size">n</span>
                <span class="blue-text text-family-size">d</span>
                <span class="green-text text-family-size">o</span>
                <span class="red-text text-family-size">o</span>
                <span class="blue-text text-family-size">N</span>
                <span class="red-text text-family-size">o</span>
                <span class="orange-text text-family-size">t</span>
                <span class="blue-text text-family-size">e</span>
                <span class="green-text text-family-size">s</span>
              </v-card-title>
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
                 <!--  <p class="error" v-if="!$v.user.fName.required">this field is required</p> -->
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
              <v-text-field
                outlined
                dense
                label="Email address"
                v-model="emailId"
                :error-messages="emailIdErrors"
                required
              />
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
                    v-on:click="isClicked = true"
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
                    required
                  />
                </v-col>
                <!-- <v-col cols="12" md="2">
            <v-icon v-show="showPassword == true" v-on:click="showPassword = !showPassword" class="mdi-eye">mdi-eye</v-icon>
            <v-icon v-show="showPassword == false" v-on:click="showPassword = !showPassword" class="mdi-eye">mdi-eye-off</v-icon>
                </v-col>-->
              </v-row>
              <v-row v-show="isClicked == false">
                <p class="password-hint">Use 8 or more characters with a mix of letters, numbers & symbols</p>
              </v-row>

              <!--  <v-img src="../assets/account.svg" max-width="80" class="ml-3"></v-img> -->
              <!-- <v-checkbox v-on:click="showPassword = !showPassword" label="Show Password"></v-checkbox> -->
              <v-row>
                <div >
                <v-btn class="sign-in" text small color="info">Sign in instead</v-btn>
                </div>
                <v-col></v-col>
                <v-btn color="info" @click="Register">Register</v-btn>
              </v-row>
            </v-card-text>
          </v-flex>
          <v-flex xs12 md6>
            <v-img src="../assets/account.svg" max-width="220" class="account-img"></v-img>
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
</form>
</template>
<script>
import {required, minLength} from 'vuelidate/lib/validators'
export default {
  validations: {
      firstName: {
        required,
        minLength: minLength(2)
    },
    lastName: {required},
    emailId: {required},
    password: {required},
    confirmPassword: {required}
  },

  data: () => ({
      firstName: '',
      lastName: '',
      emailId: '',
      password: '',
      confirmPassword: '',
      user: {
      },
      showPassword: false,
      isClicked: false,
      URL: "http://localhost:3000/registration",
     /*  fNameRules: [],
      lNameRules: [],
      emailRules: [],
      passwordRules: [] */
  }),

  computed:{
      firstNameErrors () {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push('first name is required.');
      return errors;
    },
      lastNameErrors () {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.required && errors.push('last name is required.')
      return errors
    },
    emailIdErrors () {
      const errors = []
      if (!this.$v.emailId.$dirty) return errors
      !this.$v.emailId.required && errors.push('email address is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('password is required.')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.required && errors.push('confirm password is required.')
      return errors
    },
  },
  methods: {
    Register(){
      this.$v.$touch()
      this.isClicked = true
    }
    /* validate() {
      this.fNameRules= [
        name => !!name || "Enter first name",
        name =>
          /^[A-Za-z]{2,}$/.test(name) ||
          "Name should contain minimum two characters"
      ],
      this.lNameRules= [name => !!name || "Enter last name"],
      this.emailRules= [
        email => !!email || "Enter email address",
        email =>
          /^([0-9A-Za-z])+([-+._][0-9A-Za-z]+)*@([0-9A-Za-z])+[.]([a-zA-Z])+([.][A-Za-z]+)*$/.test(
            email
          ) || "E-mail must be valid"
      ],
      this.passwordRules= [
        password => !!password || "Enter password",
        password =>
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W){1}.*$/.test(password) ||
          "Use 8 or more characters with a mix of letters, numbers & symbols"
      ]
      if(this.user.password != this.user.confirm){
        
        alert("Password mismatch")
      }
    }, */
   
  }
};
</script>
<style>
@import url('../css/registration.css');
</style>