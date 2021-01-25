<template>
  <v-dialog v-model="dialog" max-width="390">
    <template v-slot:activator="{ on}">
      <v-hover v-slot="{ hover }">
        <v-list-item-icon>
          <v-icon v-on="on" v-show="hover">mdi-delete</v-icon>
          <v-icon v-on="on" v-show="!hover">mdi-label</v-icon>
        </v-list-item-icon>
      </v-hover>
    </template>
    <v-card>
      <v-card-text>We’ll delete this label and remove it from all of your FundooNotes. Your notes won’t be deleted.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-btn text @click="deleteLabel">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import user from "../services/user";
export default {
  props: ["label"],
  data() {
    return {
      dialog: false,
      label: this.label
    };
  },
  methods: {
    deleteLabel() {
      alert(this.label._id);
      user
        .deleteLabel(this.label._id)
        .then(data => {
          console.log("data: " + JSON.stringify(data));
          this.$emit("onLabelDelete");
          this.dialog = false;
        })
        .catch(error => console.error(error));
    }
  }
};
</script>