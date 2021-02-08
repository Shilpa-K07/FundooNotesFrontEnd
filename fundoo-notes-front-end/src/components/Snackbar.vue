<!-- comment
Here we creating snackbar component which
would be used in parent component
for displaying snackbar
-->
<template>
  <v-snackbar
    v-model="showSnackbar"
    :timeout="timeout"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="showSnackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
   props: ['text', 'showSnackbar', 'timeout'],
   methods: {
     setSnackbar (snackbarData) {
       this.text = snackbarData.text
       this.showSnackbar = true
       this.timeout = snackbarData.timeout
     }
   }
}
</script>
