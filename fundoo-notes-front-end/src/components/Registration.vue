<template>
  <v-app>
    <!--  <v-app-bar app>
      <v-toolbar-title>fundooNotes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Sign Up</v-btn>
      <v-btn text>Login</v-btn>
    </v-app-bar>-->

    <v-content>
      <v-card  class="mx-auto mt-9 pl-9 pt-9"
      max-width="55%"
      height="80%"
      outlined>
      <v-layout row wrap>
        <v-flex xs12 md6>
        <v-card-title>
          fundooNotes
          <br />Create your fundooNotes Account
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                d-flex
                outlined
                dense
                label="First name"
                v-model="post.fName"
                :rules="fNameRules"
              />
            </v-col>
            <v-col>
              <v-text-field
                outlined
                dense
                label="Last name"
                v-model="post.lName"
                :rules="lNameRules"
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
            v-model="post.emailId"
            :rules="emailRules"
          />
          <v-row>
            <v-col></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                outlined
                dense
               
                persistent-hint
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                v-model="post.password"
                :rules="passwordRules"
              />
            </v-col>
            <v-col>
              <v-text-field
                outlined
                dense
                :type="showPassword ? 'text' : 'password'"
                label="Confirm"
                v-model="post.confirm"
              />
            </v-col>
            <v-icon v-show="showPassword == true" v-on:click="showPassword = !showPassword" class="mdi-eye">mdi-eye</v-icon>
            <v-icon v-show="showPassword == false" v-on:click="showPassword = !showPassword" class="mdi-eye">mdi-eye-off</v-icon>
          </v-row>
          <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
         <!--  <v-img src="../assets/account.svg" max-width="80" class="ml-3"></v-img> -->
          <!-- <v-checkbox v-on:click="showPassword = !showPassword" label="Show Password"></v-checkbox> -->
          <v-row>
            <v-btn text small color="info">Sign in instead</v-btn>
            <v-col></v-col>
            <v-btn color="info" @click="registration">Register</v-btn>
          </v-row>
        </v-card-text>
        </v-flex>
        <v-flex xs12 md6>
          <v-img src="../assets/account.svg" max-width="220" class="account-img"></v-img>
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
      post: {},
      showPassword: false,
      URL: "http://localhost:3000/registration",
      fNameRules: [
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
      ]
    };
  },
  methods: {
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
<style scoped>
.account-img{
  margin-left:50px;
  margin-top:70px
}
.password-hint{
 margin-top: -35px;
}
.mdi-eye{
  margin-bottom: 20px;
}
</style>