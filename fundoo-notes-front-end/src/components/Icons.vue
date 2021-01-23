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
        <v-text-field solo label="id" v-show="false"></v-text-field>
        <v-list-item link @click="onDelete">Delete note</v-list-item>
      </v-list>
    </v-menu>
    <!--  </v-tooltip> -->
   <!--  <Dashboard ref="dashboard" /> -->
  </v-row>
</template>

<script>
/* import Note from "./Note"; */
/* import Dashboard from "./Dashboard"; */
import user from "../services/user";
export default {
  name: "Icons",
  components: {
    // Note,
   /*  Dashboard */
  },
  props: ['noteDetails', 'field'],
  data() {
    return {
      dialog: false,
      deleteDetails: this.noteDetails,
      currentField: this.field
    };
  },
  methods: {
    softDeleteNote: function(noteId) {
      return user.softDeleteNote(noteId);
    },
    hardDeleteNote: function(noteId) {
      return user.hardDeleteNote(noteId);
    },
    onDelete() {
      if (this.currentField == "trash") {
        this.hardDeleteNote(this.noteDetails._id)
          .then(data => {
            //this.$refs.dashboard.getNotes();
            this.$emit('hardDelete')
          })
          .catch(error => console.log(error));
      }
      else{
      this.softDeleteNote(this.noteDetails._id)
        .then(data => {
         // this.$refs.dashboard.getNotes();
          this.$emit('softDelete')
        })
        .catch(error => console.log(error));
    }
    }
  }
}
</script>