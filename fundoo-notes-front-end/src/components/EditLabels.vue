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
    <v-card>
      <v-card-text>
        <v-card-subtitle class="text-weight">Edit labels</v-card-subtitle>
        <v-form ref="editLabelForm">
          <v-text-field
            label="Create new label"
            v-model="newLabel"
            prepend-icon="mdi-window-close"
            append-outer-icon="mdi-check"
          ></v-text-field>
          <v-list>
            <v-list-item v-for="item in labelsList" :key="item.name" link>
              <v-hover v-slot="{ hover }">
                <v-list-item-icon>
                  <v-icon v-show="hover">mdi-delete</v-icon>
                  <v-icon v-show="!hover">mdi-label</v-icon>
                </v-list-item-icon>
              </v-hover>
              <v-list-item-content>
                <v-list-item-title class="side-nav">{{ item.name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-flex class="d-flex flex-row-reverse">
            <a v-on:click="createLabel">Done</a>
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
/* import Icons from "./Icons";
import Dashboard from "./Dashboard"; */
import user from "../services/user";
/* import Labels from "./Labels" */
export default {
  /* components: {
    Icons,
    Dashboard
  }, */
  data() {
    return {
      dialog: false,
      newLabel: "",
      labelsList: []
    };
  },
  methods: {
    setLabelData(labels) {
      this.labelsList = labels.data.data;
    },
    createLabel() {
      if (this.newLabel) {
        const labelData = {
          name: this.newLabel
        };
        user
          .createLabel(labelData)
          .then(data => {
            this.$emit("onLabelEdit")
            this.newLabel = ""
            //this.reset()
            this.dialog = false
          })
          .catch(error => console.error(error))
      }
    }
  },
  reset() {
    this.newLabel = ""
  }
};
</script>