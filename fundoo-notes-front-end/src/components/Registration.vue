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
                  <!-- <v-col cols="12" md="2">
            <v-icon v-show="showPassword == true" v-on:click="showPassword = !showPassword" class="mdi-eye">mdi-eye</v-icon>
            <v-icon v-show="showPassword == false" v-on:click="showPassword = !showPassword" class="mdi-eye">mdi-eye-off</v-icon>
                  </v-col>-->
                </v-row>
                <v-row v-show="isClicked == false">
                  <p
                    class="password-hint"
                  >Use 8 or more characters with a mix of letters, numbers & symbols</p>
                </v-row>
                 <v-row v-show="isPasswordMismatch == true">
                  <p
                    class="password-hint"
                  >Passwords didn't match. Try again</p>
                </v-row>

                <!--  <v-img src="../assets/account.svg" max-width="80" class="ml-3"></v-img> -->
                <!-- <v-checkbox v-on:click="showPassword = !showPassword" label="Show Password"></v-checkbox> -->
                <v-row>
                  <div>
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
import { required, minLength, email, sameAs} from "vuelidate/lib/validators";
import register from "../services/registration.svc"
export default {
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
    URL: "http://localhost:3000/registration"
    /*  fNameRules: [],
      lNameRules: [],
      emailRules: [],
      passwordRules: [] */
  }),

  computed: {
    firstNameErrors() {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.required && errors.push("Enter first name");
      !this.$v.firstName.minLength &&
        errors.push("Name must contain 2 characters");
      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("Enter last name");
      return errors
    },
    emailIdErrors() {
      const errors = []
      if (!this.$v.emailId.$dirty) return errors;
      !this.$v.emailId.required && errors.push("Enter email address");
      !this.$v.emailId.email && errors.push("Must be valid email");
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push("Enter password")
      !this.$v.password.isPasswordStrong && errors.push("Use 8 or more characters with a mix of letters, numbers & symbols")
      return errors
    },
    confirmPasswordErrors() {
     const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.required && errors.push("confirm password")
      !this.$v.confirmPassword.sameAsPassword && errors.push("Password mismatch")
      return errors
    }
  },
  methods: {
    Register() {
      this.$v.$touch()
      this.isClicked = true
     if(!this.$v.$invalid){
       const userInput = {
         firstName:this.firstName,
         lastName:this.lastName,
         emailId:this.emailId,
         password:this.password
       }
       this.myFunction(JSON.stringify(userInput))
     }
  },
  myFunction: function(userInput){
     return register.register(userInput)
   } 
  }
}
</script>
<style>
@import url("../css/registration.css");
</style>