<template>
  <v-app>
    <v-content>
      <v-card class="mx-auto main-card" outlined>
        <v-row>
          <v-col>
            <v-app-bar class="app-bar">
              <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
              <v-toolbar-title>FundooNotes</v-toolbar-title>
              <v-text-field
                label="Search"
                prepend-inner-icon="mdi-magnify"
                :class="{'search-text-style':changeStyle}"
                solo
                filled
                dense
                v-on:click="changeFiledStyle"
                v-click-outside="onClickOutside"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
              <span>Shilpa</span>
              <!--   <v-btn icon>
                <v-icon>mdi-view-stream</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-cog</v-icon>
              </v-btn>-->
            </v-app-bar>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-navigation-drawer :class="{'nav-bar':drawer}">
              <v-list dense>
                <v-list-item v-for="item in items" :key="item.title" link>
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="side-nav">{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-col>
          <v-col cols="12" md="8" class="mt-10">
            <v-card
              class="mx-auto note-card"
              :class="{'increase-card-size':cardClicked}"
              v-on:click="increaseCardHeight"
              v-click-outside="reduceCardHeight"
            >
              <v-text-field v-model ="noteTitle" :placeholder="text" class="text-weight ml-5 mt-5">
                <template v-slot:append>
                  <v-icon v-show="cardClicked == false" class="mr-5">mdi-checkbox-marked-outline</v-icon>
                  <v-icon v-show="cardClicked == false" class="mr-5">mdi-brush</v-icon>
                  <v-icon v-show="cardClicked == false" class="mr-5">mdi-image</v-icon>
                   
                  <v-tooltip bottom>
                  <template v-slot:activator="{on}">
                    <v-icon v-on="on" v-show="cardClicked == true" class="mr-5">mdi-pin</v-icon>
                  </template>
                  <span>Pin note</span>
                </v-tooltip>
                 <!--  <v-icon v-show="cardClicked == true" class="mr-5">mdi-pin</v-icon> -->
                </template>
              </v-text-field>
              <v-text-field
                v-model ="noteDescription"
                v-show="cardClicked == true"
                placeholder="Take a note..."
                class="text-weight ml-5"
              ></v-text-field>
              <v-row v-show="cardClicked == true">
                <v-tooltip bottom>
                  <template v-slot:activator="{on}">
                    <v-icon v-on="on" class="ml-5 card-icons mb-5">mdi-bell</v-icon>
                  </template>
                  <span>Remind me</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{on}">
                    <v-icon v-on="on" class="ml-5 card-icons mb-5">mdi-account-outline</v-icon>
                  </template>
                  <span>Collaborator</span>
                </v-tooltip>
                 <v-tooltip bottom>
                  <template v-slot:activator="{on}">
                    <v-icon v-on="on" class="ml-5 card-icons mb-5">mdi-palette</v-icon>
                  </template>
                  <span>Change color</span>
                </v-tooltip>
                  <v-tooltip bottom>
                  <template v-slot:activator="{on}">
                    <v-icon v-on="on" class="ml-5 card-icons mb-5">mdi-image</v-icon>
                  </template>
                  <span>Add image</span>
                </v-tooltip>
                  <v-tooltip bottom>
                  <template v-slot:activator="{on}">
                    <v-icon v-on="on" class="ml-5 card-icons mb-5">mdi-download</v-icon>
                  </template>
                  <span>Archive</span>
                </v-tooltip>
                  <v-tooltip bottom>
                  <template v-slot:activator="{on}">
                    <v-icon v-on="on" class="ml-5 card-icons mb-5">mdi-dots-vertical</v-icon>
                  </template>
                  <span>More</span>
                </v-tooltip>

                <!-- <v-tooltip slot="append" bottom>
                  <v-icon slot="activator" class="ml-5 card-icons mb-5">mdi-bell</v-icon>
                  <span>tt</span>
                </v-tooltip>
                <v-icon class="ml-5 card-icons mb-5">mdi-account-outline</v-icon>
                <v-icon class="ml-5 card-icons mb-5">mdi-palette</v-icon>
                <v-icon class="ml-5 card-icons mb-5">mdi-image</v-icon>
                <v-icon class="ml-5 card-icons mb-5">mdi-download</v-icon>
                <v-icon class="ml-5 card-icons mb-5">mdi-dots-vertical</v-icon> -->
                <v-spacer></v-spacer>
                <a class="mr-5">Close</a>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import user from "../services/user";
export default {
  data: () => ({
    drawer: false,
    changeStyle: false,
    cardClicked: false,
    text: "Take a note...",
    noteTitle: "",
    noteDescription: "",
    items: [
      { title: "Notes", icon: "mdi-lightbulb-outline" },
      { title: "Reminders", icon: "mdi-bell-outline" },
      { title: "Edit labels", icon: "mdi-pencil" },
      { title: "Archive", icon: "mdi-download" },
      { title: "Trash", icon: "mdi-delete" }
    ]
  }),
  methods: {
    createNote: function(noteInput) {
      return user.createNote(noteInput)
    },
    reset() {
      this.noteTitle="",
      this.noteDescription=""
    },
    changeFiledStyle() {
      this.changeStyle = true;
    },
    onClickOutside() {
      this.changeStyle = false;
    },
    increaseCardHeight() {
      this.cardClicked = true;
      this.text = "Title";
    },
    reduceCardHeight() {
      this.cardClicked = false;
      this.text = "Take a note...";
      if(this.noteTitle && this.noteDescription){
        const noteInput = {
          title: this.noteTitle,
          description: this.noteDescription
        }
        this.createNote(noteInput)
        .then(data => {
          console.log(JSON.stringify(data))
          this.reset()
        })
        .catch(error => console.log(JSON.stringify(error.response)))
      }
    }
  }
};
</script>

<style lang="scss">
@import url("../css/dashboard.scss");
</style>
