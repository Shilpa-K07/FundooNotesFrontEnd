<template>
  <v-app>
    <!--  <v-app-bar app>
      <v-toolbar-title>fundooNotes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Sign Up</v-btn>
      <v-btn text>Login</v-btn>
    </v-app-bar>-->

    <v-content>
      <v-card width="500" class="mx-auto mt-9 pt-7 pl-7 pr-7 pb-7">
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
          <v-row><v-col></v-col></v-row>
          <v-text-field outlined dense label="Email address" v-model="post.emailId" :rules="emailRules"/>
          <v-row><v-col></v-col></v-row>
          <v-row>
            <v-col>
              <v-text-field
                outlined
                dense
                hint="Use 8 or more characters with a mix of letters, numbers & symbols"
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
          </v-row>
          <v-checkbox v-on:click="showPassword = !showPassword" label="Show Password"></v-checkbox>
          <v-row>
          <v-btn text small color="info">Sign in instead</v-btn>
          <v-col></v-col>
           <v-btn color="info" @click="registration">Register</v-btn>
          </v-row>
        </v-card-text>
       <!--  <v-card-actions>
          <v-btn color="info" @click="registration">Register</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      /* fName: null,
      lName: null,
      emailId: null,
      password: null, */
      post: {},
      showPassword: false,
      URL: "http://localhost:3000/registration",
      fNameRules: [
        name => !!name || 'Enter first names',
        name => /^[A-Za-z]{2,}$/.test(name) || 'Name should contain minimum two characters'
      ],
      lNameRules:[
        name => !!name || 'Enter last names',
      ],
      emailRules:[
        email => !!email || 'Enter email address',
        email => /^([0-9A-Za-z])+([-+._][0-9A-Za-z]+)*@([0-9A-Za-z])+[.]([a-zA-Z])+([.][A-Za-z]+)*$/.test(email) || 'E-mail must be valid'
      ],
      passwordRules:[
        password => !!password || 'Enter password',
        password => /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W){1}.*$/.test(password) || 'Use 8 or more characters with a mix of letters, numbers & symbols',
        
      ],
    };
  },
  methods: {
    registration() {
      console.log("data:" + JSON.stringify(this.post));
      /* const request = new Request(
        URL,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(this.post)
        }
      );
      const res = await fetch(request);
      const data = await res.json();
      alert("data: "+data._id)
      
    } */
      fetch(this.URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        /* headers:{
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Headers':'*'
            }, */
        body: JSON.stringify(
          /* {
                firstName : this.fName,
                lastName : this.lName,
                emailId: this.emailId,
                password: this.password
            } */ this
            .post
        )
      })
        .then(res => res.json())
        .then(data => console.log("data: " + data))
        .catch(err => console.log(err));
    }
  }
};
</script>
<style scoped>
.text-filed-align {
  display: flex;
  justify-content: space-between;
}
</style>