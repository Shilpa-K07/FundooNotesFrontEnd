<template>
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
                    d-flex
                    outlined
                    dense
                    label="First name"
                    v-model="user.fName"
                    :rules="fNameRules"
                    required
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    dense
                    label="Last name"
                    v-model="user.lName"
                    :rules="lNameRules"
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
                v-model="user.emailId"
                :rules="emailRules"
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
                    persistent-hint
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    v-on:click="isClicked = true"
                    v-model="user.password"
                    :rules="passwordRules"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    outlined
                    dense
                    :type="showPassword ? 'text' : 'password'"
                    label="Confirm"
                    v-model="user.confirm"
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
                <v-btn color="info" @click="validate">Register</v-btn>
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
</template>
<script>
export default {
  data() {
    return {
      user: {},
      showPassword: false,
      isClicked: false,
      URL: "http://localhost:3000/registration",
      /* fNameRules: [
        name => !!name || "Enter first name",
        name =>
          /^[A-Za-z]{2,}$/.test(name) ||
          "Name should contain minimum two characters"
      ],
      lNameRules: [name => !!name || "Enter last name"],
      emailRules: [
        email => !!email || "Enter email address",
        email =>
          /^([0-9A-Za-z])+([-+._][0-9A-Za-z]+)*@([0-9A-Za-z])+[.]([a-zA-Z])+([.][A-Za-z]+)*$/.test(
            email
          ) || "E-mail must be valid"
      ],
      passwordRules: [
        password => !!password || "Enter password",
        password =>
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W){1}.*$/.test(password) ||
          "Use 8 or more characters with a mix of letters, numbers & symbols"
      ] */
      fNameRules: [],
      lNameRules: [],
      emailRules: [],
      passwordRules: []

    };
  },
  methods: {
    validate() {alert("reached")
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
    },
    registration() {
      fetch(this.URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.post)
      })
        .then(res => res.json())
        .then(data => console.log("data: " + data))
        .catch(err => console.log(err));
    }
  }
};
</script>
<style>
@import url('../css/registration.css');
</style>