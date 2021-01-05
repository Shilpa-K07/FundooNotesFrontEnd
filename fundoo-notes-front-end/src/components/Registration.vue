<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>fundooNotes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Sign Up</v-btn>
      <v-btn text>Login</v-btn>
    </v-app-bar>

    <v-content>
      <v-card width = "300" class='mx-auto mt-9'>
        <v-card-title>Sign Up</v-card-title>
        <v-card-text>
          <v-text-field label='First Name' v-model='fName'/>
          <v-text-field label='Last Name' v-model='lName'/>
          <v-text-field label='Email Address' v-model='emailId' prepend-icon="mdi-account-circle"/>
          <v-text-field label='Password' 
          :type= "showPassword ? 'text': 'password'" v-model='password' prepend-icon="mdi-lock" 
          :append-icon="showPassword ?'mdi-eye':'mdi-eye-off'"
          @click:append="showPassword =!showPassword"/>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color='info'
         @click='registration'>Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data()
  {
    return{
      fName: null,
      lName: null,
      emailId: null,
      password: null,
      post:{},
      showPassword: false,
      URL:'http://localhost:3000/registration'
    }
  },
  methods: {
        registration() {
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
            method: 'POST',
            mode: 'no-cors',
            /* headers:{
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Headers':'*'
            }, */
            body: JSON.stringify({
                firstName : this.fName,
                lastName : this.lName,
                emailId: this.emailId,
                password: this.password
            })
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
      }
  }
}
</script>