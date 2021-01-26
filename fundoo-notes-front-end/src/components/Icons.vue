<!-- comment
Icon components for cards
-->
<template>
  <v-row>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon class="ml-5 card-icons mb-5" v-on="on">mdi-bell</v-icon>
      </template>
      <span>Remind me</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon class="ml-5 card-icons mb-5" v-on="on">mdi-account</v-icon>
      </template>
      <span>Collaborator</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon class="ml-5 card-icons mb-5" v-on="on">mdi-palette</v-icon>
      </template>
      <span>Change color</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon class="ml-5 card-icons mb-5" v-on="on">mdi-image</v-icon>
      </template>
      <span>Add image</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon class="ml-5 card-icons mb-5" v-on="on">mdi-download</v-icon>
      </template>
      <span>Archive</span>
    </v-tooltip>
    <!-- <v-tooltip bottom> -->
    <v-menu bottom left>
      <template v-slot:activator="{on}">
        <v-icon class="ml-5 card-icons mb-5" v-on="on">mdi-dots-vertical</v-icon>
      </template>
      <!--  <span>More</span> -->
      <v-list>
        <!--  <v-text-field solo label="id" v-show="false"></v-text-field> -->
        <v-list-item link @click="onDelete">Delete note</v-list-item>
        <v-menu bootom left>
          <template v-slot:activator="{on}">
            <v-list-item v-on="on" link>Add label</v-list-item>
          </template>
          <v-list>
            <v-list-item v-for="item in items" v-if="item.isDeleted == false" :key="item.name" link>
              <!-- <v-list-item-icon>
                <v-icon>mdi-label</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>-->
               <v-container fluid>
              <p>{{selected}}</P>
              <v-checkbox v-model="selected" :label="item.name" :value="item" @change="$emit('labelAdded', selected)"></v-checkbox>
               </v-container>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list>
    </v-menu>
    <!--  </v-tooltip> -->
    <!--  <Dashboard ref="dashboard" /> -->
  </v-row>
</template>

<script>
/* import Note from "./Note"; */
/* import Dashboard from "./Dashboard"; */
import Labels from "./Labels";
import user from "../services/user";
export default {
  name: "Icons",
  components: {
    Labels
  },
  props: ["noteDetails", "field", "labelList"],
  data() {
    return {
      dialog: false,
      deleteDetails: this.noteDetails,
      currentField: this.field,
      items: [],
      selected: []
    };
  },
  beforeMount() {
    this.getLabels();
  },
  methods: {
    getLabels: function() {
      user
        .getLabels()
        .then(data => {
          this.items = data.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    softDeleteNote: function(noteId) {
      return user.softDeleteNote(noteId);
    },
    hardDeleteNote: function(noteId) {
      return user.hardDeleteNote(noteId);
    },
    createLabel: function(noteId) {
      return user.createLabel(noteId);
    },
    onDelete() {
      if (this.currentField == "trash") {
        this.hardDeleteNote(this.noteDetails._id)
          .then(data => {
            //this.$refs.dashboard.getNotes();
            this.$emit("hardDelete");
          })
          .catch(error => console.log(error));
      } else {
        this.softDeleteNote(this.noteDetails._id)
          .then(data => {
            // this.$refs.dashboard.getNotes();
            this.$emit("softDelete");
          })
          .catch(error => console.log(error));
      }
    },
    addLabel() {
      this.createLabel()
        .then(data => console.log("label-data: " + JSON.stringify(data)))
        .catch(error => console.error(error));
    },
    changed(item) {
      alert(item.name)
    }
  }
};
</script>