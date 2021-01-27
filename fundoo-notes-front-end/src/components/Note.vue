<!-- comment
Note component to display notes on dashboardrow 
-->
<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex
        v-for="item in items"
        v-if="item.isDeleted == false"
        :key="item._id"
        md3
        class="mr-5 mb-10"
      >
        <v-hover v-slot="{ hover }">
          <v-card
          @click.stop="item.dialog = true"
            class="mx-auto card-container v-list"
            outlined
            :class="{'on-hover':hover}"
          >
            <v-list-item class="v-list">{{ item.title }}</v-list-item>
            <v-list-item class="v-list">{{ item.description }}</v-list-item>
           <!--  <p>{{item.dialog}}</P> -->
            <v-list-item></v-list-item>
            <v-row > 
             <v-col cols="12" md="6" v-for="label in item.labelId" :key="label._id">
            <v-chip class="ma-3" close @click:close="removeLabelFromNote(item)">{{label.name}}</v-chip>
            </v-col>
            </v-row>
            <Icons
              v-show="hover==true || click==true"
              :noteDetails="item"
              @softDelete="afterSoftDelete"
              @labelAdded="addLabel"
            />
            <v-flex>
              <Dialogue :transaction="item"></Dialogue>
            </v-flex>
          </v-card>
        </v-hover>
      </v-flex>
      <Labels />
    </v-layout>
  </v-flex>
</template>

<script>
import Icons from "./Icons";
import Dialogue from "./Dialogue";
import Labels from "./Labels";
import user from "../services/user";
export default {
  name: "Note",
  props: ["field"],
  components: {
    Icons,
    Dialogue,
    Labels
  },
  data: () => ({
    //dialog: false,
    click: false,
    items: [],
    labelList: [],
   // label:[]
  }),
  methods: {
    setNoteData(notes) {
      this.items = notes.data.data
     /*  this.items.forEach(item => {
        item.dialog = true
      }) */
     // this.label = notes.data.data.labelId
    },
    addNoteData(note) {
      this.items.push(note.data)
    },
    afterSoftDelete(value) {
      this.$emit("softDelete")
    },
    addLabel(data, noteId) {
      this.labelList = data
      this.labelList.forEach(label => {
        const labelData = {
          labelId: label._id
        }
        user
          .addLabelToNote(labelData, noteId)
          .then(data => {
            this.$emit('onLabelAdd')
          })
          .catch(eror => console.error(error))
      })
    },
    removeLabelFromNote(item) {
       const labelData = {
          labelId: item.labelId[0]._id
        }
      user.removeLabelFromNote(labelData, item._id)
      .then(data => {
          this.$emit('onLabelRemove')
      })
      .catch(error => console.error(error))
    }
  }
};
</script>