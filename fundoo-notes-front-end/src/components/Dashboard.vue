<template>
  <v-app>
    <v-content>
      <v-card class="mx-auto main-card" outlined>
        <v-row>
          <v-col>
            <v-app-bar fixed elevate-on-scroll class="app-bar">
              <v-app-bar-nav-icon @click="drawer = !drawer" />
              <v-toolbar-title>{{title}}</v-toolbar-title>
              <v-text-field
                v-click-outside="onClickOutside"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                :class="{'search-text-style':changeStyle}"
                solo
                filled
                dense
                @click="changeFiledStyle"
              />
              <v-spacer />
              <Logout />
            </v-app-bar>
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col cols="12" md="3">
            <v-navigation-drawer fixed :class="{'nav-bar':drawer}">
              <v-list>
                <v-list-item v-for="item in items" :key="item.title" link>
                  <v-list-item-icon>
                    <v-icon @click="handleSelectItem(item)">{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      @click="handleSelectItem(item)"
                      class="side-nav"
                    >{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <Labels ref="labels" @onClickLabel="onClickLabel" />
                <v-list-item link>
                  <EditLabels ref="editLabels" @onLabelEdit="onLabelEdit" />
                </v-list-item>
                <v-list-item v-for="item in secondList" :key="item.title" link>
                  <v-list-item-icon>
                    <v-icon @click="handleSelectItem(item)">{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      @click="handleSelectItem(item)"
                      class="side-nav"
                    >{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-col>
          <v-col cols="12" md="9" class="mt-5 mr-20">
            <v-card
              v-show="showCard"
              v-click-outside="createNewNote"
              class="mx-auto note-card"
              :class="{'increase-card-size':cardClicked}"
              @click="onClickCard"
            >
              <v-text-field
                v-model="noteTitle"
                :placeholder="text"
                maxlength="100"
                class="text-weight ml-5 mt-5"
              >
                <template v-slot:append>
                  <v-icon v-show="cardClicked == false" class="mr-5">mdi-checkbox-marked</v-icon>
                  <v-icon v-show="cardClicked == false" class="mr-5">mdi-brush</v-icon>
                  <v-icon v-show="cardClicked == false" class="mr-5">mdi-image</v-icon>

                  <v-tooltip bottom>
                    <template v-slot:activator="{on}">
                      <v-icon v-show="cardClicked == true" class="mr-5" v-on="on">mdi-pin</v-icon>
                    </template>
                    <span>Pin note</span>
                  </v-tooltip>
                  <!--  <v-icon v-show="cardClicked == true" class="mr-5">mdi</v-icon> v-if="item.title != 'Edit labels'"-->
                </template>
              </v-text-field>
              <v-text-field
                v-show="cardClicked == true"
                v-model="noteDescription"
                maxlength="200"
                placeholder="Take a note..."
                class="text-weight ml-5"
              />
              <v-row v-show="cardClicked == true">
                <Icons class="mt-4 ml-4" :mainField="mainCard"></Icons>
                <v-spacer />
                <a class="mr-5 mt-4" @click="createNewNote">Close</a>
              </v-row>
            </v-card>
            <Note
              ref="note"
              class="mt-15"
              v-show="selectedItem == 'Notes' || isNote ==true"
              @softDelete="onChangeNote"
              @onLabelAdd="onChangeNote"
              @onLabelRemove="onChangeNote"
            />
            <Trash
              ref="trash"
              class="mt-15"
              v-show="selectedItem == 'Trash'"
              @hardDelete="onChangeNote"
              @restoreNote="onChangeNote"
            />
            <LabelInNotes 
            ref="labelInNotes" 
            v-show="selectedItem == 'label'"
            class="mt-15" />
          </v-col>
        </v-row>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import user from "../services/user";
import Icons from "./Icons";
import Note from "./Note";
import Logout from "./Logout";
import Trash from "./Trash";
import Labels from "./Labels";
import EditLabels from "./EditLabels";
import LabelInNotes from "./LabelInNotes";
export default {
  name: "Dashboard",
  components: {
    Icons,
    Note,
    Logout,
    Trash,
    Labels,
    EditLabels,
    LabelInNotes
  },
  data: () => ({
    /* emailId: sessionStorage.emailId,
    name: sessionStorage.emailId.substring(0, 6), */
    drawer: false,
    changeStyle: false,
    cardClicked: false,
    isNote: false,
    showCard: true,
    title: "Notes",
    isLabelClicked: false,
    selectedItem: null,
    text: "Take a note...",
    noteTitle: "",
    noteDescription: "",
    mainCard: "mainCard",
    items: [
      { title: "Notes", icon: "mdi-lightbulb" },
      { title: "Reminders", icon: "mdi-bell" }
      /*  { title: "Edit labels", icon: "mdi-pencil" },
      { title: "Archive", icon: "mdi-download" },
      { title: "Trash", icon: "mdi-delete"} */
    ],
    secondList: [
      { title: "Archive", icon: "mdi-download" },
      { title: "Trash", icon: "mdi-delete" }
    ]
  }),
  beforeMount() {
    this.isNote = true;
    this.getNotes();
    this.getLabels();
  },
  methods: {
    getNotes: function() {
      user
        .getNotes()
        .then(data => {
          this.$refs.note.setNoteData(data);
          this.$refs.trash.setNoteData(data);
          this.$refs.labelInNotes.setNoteData(data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    createNote: function(noteInput) {
      return user.createNote(noteInput);
    },
    getLabels: function() {
      user
        .getLabels()
        .then(data => {
          this.$refs.labels.setLabelData(data);
          this.$refs.editLabels.setLabelData(data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    reset() {
      (this.noteTitle = ""), (this.noteDescription = "");
    },
    changeFiledStyle() {
      this.changeStyle = true;
    },
    onClickOutside() {
      this.changeStyle = false;
    },
    onClickCard() {
      this.cardClicked = true;
      this.text = "Title";
    },
    createNewNote() {
      this.cardClicked = false;
      this.text = "Take a note...";
      if (this.noteTitle && this.noteDescription) {
        const noteInput = {
          title: this.noteTitle,
          description: this.noteDescription
        };
        this.createNote(noteInput)
          .then(data => {
            this.$refs.note.addNoteData(data);
            this.getNotes();
            this.reset();
          })
          .catch(error => console.log(JSON.stringify(error.response)));
      }
    },
    onChangeNote() {
      this.getNotes();
    },
    onLabelEdit() {
      this.getLabels();
    },
    handleSelectItem(item) {
      this.isNote = false;
       this.isLabelClicked = false;
      this.selectedItem = item.title;
      if (item.title != "Edit labels") {
        this.$router.push({
          name: item.title /* , query: { redirect: '/notes' } */
        });
        this.title = item.title;
      }
      if (item.title == "Trash") {
        this.showCard = false;
      } else {
        this.showCard = true;
      }
    },
    onClickLabel(data, labelName) { 
      this.isNote = false;
      this.isLabelClicked = true;
      this.selectedItem = 'label';
      this.title = labelName;
      this.$refs.labelInNotes.setNoteData(data);
     /*  this.$router.push({
        name: labelName
      }); */
       this.$router.push({
        name: 'Label',
        params: { name:'label', id: labelName }
        })
    }
  }
};
</script>

<style lang="scss">
@import url("../scss/dashboard.scss");
</style>
