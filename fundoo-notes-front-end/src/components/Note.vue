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
            class="mx-auto card-container v-list"
            outlined
            :class="{'on-hover':hover}"
            v-on:click="click== true"
          >
            <v-list-item class="v-list">{{ item.title }}</v-list-item>
            <v-list-item class="v-list">{{ item.description }}</v-list-item>
            <v-list-item></v-list-item>
            <Icons
              v-show="hover==true || click==true"
              :noteDetails="item"
              @softDelete="afterSoftDelete"
              @labelAdded="addLabel"
            />
            <v-row  v-for="label in item.label" :key="label">

            <v-chip class="ma-2" close>{{label}}</v-chip>
            </v-row>
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
    click: false,
    items: [],
    labelList: [],
    label:[]
  }),
  methods: {
    setNoteData(notes) {
      this.items = notes.data.data
    },
    addNoteData(note) {
      this.items.push(note.data)
    },
    afterSoftDelete(value) {
      this.$emit("softDelete")
    },
    addLabel(value1, value2) {
      this.labelList = value1
      this.label = []
      alert("labellist: "+JSON.stringify(this.labelList))
      this.labelList.forEach(label => {
        const labelData = {
          labelId: label._id
        }
        this.label.push(label.name)
        alert("label : "+this.label)
        user
          .addLabelToNote(labelData, value2)
          .then(data => {
            this.items.forEach(item => {
              if(item._id == value2){
                item.label= this.label
                alert("label: "+this.label)
              }
            })
            console.log("data: " + JSON.stringify(data))
          })
          .catch(eror => console.error(error))
      });
    }
  }
};
</script>