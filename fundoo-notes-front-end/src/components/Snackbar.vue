<template>
    <v-snackbar v-model="snackbar" :timeout="timeout">
       Login success
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar> 
</template>

<script>
export default {
    data: () => ({
        timeout: 2000,
        snackbar: true,
    })
}
</script>