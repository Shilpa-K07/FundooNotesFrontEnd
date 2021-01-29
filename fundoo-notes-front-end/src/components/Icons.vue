<!-- comment
Icon components for cards
-->
<template>
  <v-row>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon v-show="!isTrash" class="ml-5 card-icons mb-5" v-on="on">mdi-bell</v-icon>
      </template>
      <span>Remind me</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon v-show="!isTrash" class="ml-5 card-icons mb-5" v-on="on">mdi-account</v-icon>
      </template>
      <span>Collaborator</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon v-show="!isTrash" class="ml-5 card-icons mb-5" v-on="on">mdi-palette</v-icon>
      </template>
      <span>Change color</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template  v-slot:activator="{on}">
        <v-icon v-show="!isTrash" class="ml-5 card-icons mb-5" v-on="on">mdi-image</v-icon>
      </template>
      <span>Add image</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template  v-slot:activator="{on}">
        <v-icon v-show="!isTrash" class="ml-5 card-icons mb-5" v-on="on">mdi-download</v-icon>
      </template>
      <span>Archive</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template  v-slot:activator="{on}">
        <v-icon v-show="isTrash"  @click="onDelete" class="ml-5 card-icons mb-5" v-on="on">mdi-delete</v-icon>
      </template>
      <span>Delete forever</span>
    </v-tooltip>
     <v-tooltip bottom>
      <template  v-slot:activator="{on}">
        <v-icon v-show="isTrash" @click="restoreNote" class="ml-5 card-icons mb-5" v-on="on">mdi-backup-restore</v-icon>
      </template>
      <span>Restore</span>
    </v-tooltip>
   
    <!-- <v-tooltip bottom> -->
    <v-menu bottom left>
      <template v-slot:activator="{on}">
        <v-icon v-show="!isTrash" class="ml-5 card-icons mb-5" v-on="on">mdi-dots-vertical</v-icon>
      </template>
      <!--  <span>More</span> -->
      <v-list>
        <!--  <v-text-field solo label="id" v-show="false"></v-text-field> -->
        <v-list-item link v-show="!isMainCard" @click="onDelete">Delete note</v-list-item>
        <v-menu bootom left>
          <template v-slot:activator="{on}">
            <v-list-item v-on="on" link>Add label</v-list-item>
          </template>
          <v-list>
            <v-list-item v-for="item in items" v-if="item.isDeleted == false" :key="item.name" link>
               <v-container fluid>
              <v-checkbox v-model="selected" :label="item.name" :value="item" @change="$emit('labelAdded', selected, noteDetails._id)"></v-checkbox>
               </v-container>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list>
    </v-menu>
    <!--  </v-tooltip> -->
  </v-row>
</template>

<script>
import Labels from "./Labels";
import user from "../services/user";
export default {
  name: "Icons",
  components: {
    Labels
  },
  props: ["noteDetails", "trashField", "mainField"],
  data() {
    return {
      dialog: false,
      deleteDetails: this.noteDetails,
      currentField: this.trashField,
      items: [],
      selected: [],
      isTrash: this.trashField,
      isMainCard: this.mainField
    };
  },
  beforeMount() {
    this.getLabels()
  },
  methods: {
    getLabels: function() {
      user
        .getLabels()
        .then(data => {
          this.items = data.data.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    softDeleteNote: function(noteId) {
      return user.softDeleteNote(noteId)
    },
    hardDeleteNote: function(noteId) {
      return user.hardDeleteNote(noteId)
    },
    createLabel: function(noteId) {
      return user.createLabel(noteId)
    },
    onDelete() {
      if (this.currentField == "trash") {
        this.hardDeleteNote(this.noteDetails._id)
          .then(data => {
            this.$emit("hardDelete")
          })
          .catch(error => console.log(error))
      } else {
        this.softDeleteNote(this.noteDetails._id)
          .then(data => {
            this.$emit("softDelete")
          })
          .catch(error => console.log(error))
      }
    },
    restoreNote() {
      user.restoreNote(this.noteDetails._id)
      .then(data => {
        this.$emit("restoreNote")
      })
      .catch(error => console.log(error))
    }
  }
};
</script>