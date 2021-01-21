<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card v-click-outside="onClickOutside">
      <v-card-text>
        <v-form ref="edit-form">
          <v-text-field solo label="id" v-model="editTransaction._id" v-show=false></v-text-field>
          <v-text-field solo label="title" v-model="editTransaction.title" required></v-text-field>
          <v-text-field solo label="description" v-model="editTransaction.description" required></v-text-field>
          <Icons />
        </v-form>
      </v-card-text>
      <Note v-show=false ref="note" />
      <Dashboard v-show=false ref="dashboard" />
    </v-card>
  </v-dialog>
</template>

<script>
import Icons from "./Icons";
import Note from "./Note";
import Dashboard from "./Dashboard";
import user from "../services/user";
export default {
  components: {
    Icons,
    Note,
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
      this.$refs.edit - form.reset();
    },
    updateNote: function(noteInput) {
      return user.updateNote(noteInput);
    },
    onClickOutside() {
      if (this.editTransaction.title && this.editTransaction.title) {
        const noteInput = {
          id: this.editTransaction._id,
          title: this.editTransaction.title,
          description: this.editTransaction.description
        }
        alert(JSON.stringify(noteInput))
        this.updateNote(noteInput)
          .then(data => {
            this.$refs.dashboard.getNotes();
            // this.reset();
          })
          .catch(error => console.log(JSON.stringify(error.response)));
      }
    }
  }
};
</script>