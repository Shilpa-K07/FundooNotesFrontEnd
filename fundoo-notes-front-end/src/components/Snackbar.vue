<template>
<div id="snackbar">
    <v-snackbar v-model="showSnackbar" :timeout="timeout">
       {{text}}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="showSnackbar = false">Close</v-btn>
        </template>
      </v-snackbar> 
</div>
</template>

<script>
export default {
   props:['text', 'showSnackbar','timeout'],
   methods: {
     setSnackbar(text, showSnackbar, timeout){
       this.text = text
       this.showSnackbar = showSnackbar
       this.timeout = timeout
     }
   }
}
</script>
