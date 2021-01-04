<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Fundoo Notes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>Sign Up</v-btn>
      <v-btn text>Login</v-btn>
    </v-app-bar>

    <v-content>
      <v-card width = "300" class='mx-auto mt-9'>
        <v-card-title>Sign Up</v-card-title>
        <v-card-text>
          <v-text-field label='first name'/>
          <v-text-field label='last name'/>
          <v-text-field label='emailId' prepend-icon="mdi-account-circle"/>
          <v-text-field label='password' 
          :type= "showPassword ? 'text': 'password'" prepend-icon="mdi-lock" 
          :append-icon="showPassword ?'mdi-eye':'mdi-eye-off'"
          @click:append="showPassword =!showPassword"/>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color='info'>Register</v-btn>
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
      showPassword: false
    }
  }
}
</script>