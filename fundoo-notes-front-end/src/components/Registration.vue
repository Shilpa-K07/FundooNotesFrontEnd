<template>
  <v-app>
    <!--  <v-app-bar app>
      <v-toolbar-title>fundooNotes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Sign Up</v-btn>
      <v-btn text>Login</v-btn>
    </v-app-bar>-->

    <v-content>
      <v-card width="550" class="mx-auto mt-9 pt-7 pl-7 pr-7 pb-7">
        <v-card-title>
          fundooNotes
          <br />Create your fundooNotes Account
        </v-card-title>
        <v-card-text>
          <div class="text-filed-align">
            <v-text-field
              d-flex
              outlined
              dense
              label="First name"
              v-model="post.fName"
              class="sideBySide"
            />
            <v-text-field outlined dense label="Last name" v-model="post.lName" class="sideBySide" />
          </div>
          <v-text-field outlined dense label="Email address" v-model="post.emailId" />
          <div>
            <v-text-field outlined dense label="Password" v-model="post.password" />
            <v-text-field outlined dense label="Password" v-model="post.password" />
          </div>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="info" @click="registration">Register</v-btn>
        </v-card-actions>
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
      URL: "http://localhost:3000/registration"
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