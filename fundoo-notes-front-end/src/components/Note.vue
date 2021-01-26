<!-- comment
Note component to display notes on dashboardrow 
-->
<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex v-for="item in items" v-if="item.isDeleted == false" :key="item._id" md3 class="mr-5 mb-10">
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
            <Icons v-show="hover==true || click==true" :noteDetails="item" @softDelete="afterSoftDelete" @labelAdded="addLabel"/>
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
import Labels from "./Labels"
export default {
  name: 'Note',
  props:["field"],
  components: {
    Icons,
    Dialogue,
    Labels
  },
  data: () => ({
    click: false,
    items: []
  }),
  methods: {
    setNoteData(notes) {
      this.items = notes.data.data
    },
    addNoteData(note) {
      this.items.push(note.data)
    },
    afterSoftDelete(value) {
     this.$emit('softDelete')
    },
    addLabel(value) {
      alert("note: "+JSON.stringify(value))
    }
  }
}
</script>