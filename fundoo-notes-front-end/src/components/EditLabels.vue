<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="{ on }">
        <v-list-item-icon>
         <v-icon v-on="on">mdi-pencil</v-icon>
         </v-list-item-icon>
         <v-list-item-content>
         <v-list-item-title class="side-nav">Edit labels</v-list-item-title>
         </v-list-item-content>
    </template>
    <v-card v-click-outside="onClickOutside">
      <v-card-text>
          <v-card-subtitle class="text-weight">Edit labels</v-card-subtitle>
        <v-form ref="editLabelForm">
          <v-text-field label="Create new label" v-model="newLabel" prepend-icon="mdi-window-close" append-outer-icon="mdi-check"></v-text-field>
           <v-divider></v-divider>
          <v-flex class="d-flex flex-row-reverse">
          <a >Done</a>
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Icons from "./Icons";
import Dashboard from "./Dashboard";
import user from "../services/user";
import Labels from "./Labels"
export default {
  components: {
    Icons,
    Dashboard
  },
  props: ["transaction"],
  data() {
    return {
      dialog: false,
      newLabel:"",
      editTransaction: this.transaction
    };
  },
  methods: {
    reset() {
      this.$refs.editNoteForm.reset();
    },
    updateNote: function(noteInput, noteId) {
      return user.updateNote(noteInput, noteId);
    },
    onClickOutside() {
      if (this.editTransaction.title && this.editTransaction.description) {
        const noteInput = {
          title: this.editTransaction.title,
          description: this.editTransaction.description
        };
        this.updateNote(noteInput, this.editTransaction._id)
          .then(data => {
            this.$refs.dashboard.getNotes();
            this.reset();
          })
          .catch(error => console.log(JSON.stringify(error.response)));
      }
    }
  }
};
</script>