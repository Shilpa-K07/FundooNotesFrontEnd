<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
       <!--  <v-icon>mdi-pencil</v-icon> -->
      </v-btn>
    </template>
    <v-card v-click-outside="onClickOutside">
      <v-card-text>
        <v-form ref="editNoteForm">
          <v-text-field solo label="id" v-model="editTransaction._id" v-show=false></v-text-field>
          <v-text-field solo label="title" v-model="editTransaction.title" required></v-text-field>
          <v-text-field solo label="description" v-model="editTransaction.description" required></v-text-field>
          <Icons />
        </v-form>
      </v-card-text>
      <Dashboard v-show=false ref="dashboard" />
    </v-card>
  </v-dialog>
</template>

<script>
import Icons from "./Icons";
import Dashboard from "./Dashboard";
import user from "../services/user";
export default {
  components: {
    Icons,
    Dashboard
  },
  props: ["transaction"],
  data() {
    return {
      dialog: false,
      editTransaction: this.transaction
    };
  },
  methods: {
    reset() {
      this.$refs.editNoteForm.reset()
    },
    updateNote: function(noteInput, noteId) {
      return user.updateNote(noteInput, noteId)
    },
    onClickOutside() {
      if (this.editTransaction.title && this.editTransaction.description) {
        const noteInput = {
          title: this.editTransaction.title,
          description: this.editTransaction.description
        }
        this.updateNote(noteInput,this.editTransaction._id)
          .then(data => {
            this.$refs.dashboard.getNotes()
            //this.dialog = false
            this.reset()
          })
          .catch(error => console.log(JSON.stringify(error.response)));
      }
    }
  }
};
</script>