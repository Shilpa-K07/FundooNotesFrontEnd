<!-- comment
Note component to display notes on dashboardrow 
-->
<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex v-for="item in items" :key="item._id" md3 class="mr-5 mb-10">
        <v-hover v-slot="{ hover }">
   <!--  <v-dialog
      v-model="dialog"
      width="500"
    > 
      <template v-slot:activator="{ on }"> -->
          <v-card class="mx-auto card-container v-list"  v-on="on" outlined :class="{'on-hover':hover}" v-on:click="click== true">
            <v-list-item  class="v-list">{{ item.title }}</v-list-item>
            <v-list-item  class="v-list">{{ item.description }}</v-list-item>
            <v-list-item></v-list-item>
            <Icons v-show="hover==true || click==true" />
            <v-flex>
              <Dialogue :transaction="item"></Dialogue> 
            </v-flex>
            <!--  <Icons v-show="hover"/> -->
            <!-- <v-btn @click="deleteItem(item.id)">Delete</v-btn> -->
          </v-card>
    <!--   </template>
      <v-card>
        <v-text-field></v-text-field>
        </v-card>
      </v-dialog> -->
        </v-hover>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import Icons from "./Icons";
import Dialogue from "./Dialogue"
export default {
  components: {
    Icons,
    Dialogue
  },
  data: () => ({
    click: false,
    items: []
  }),
  methods: {
    setNoteData(notes) {
      this.items = notes.data.data;
      console.log("item: "+JSON.stringify(this.items))
    },
    addNoteData(note) {
      this.items.push(note.data);
    }
  }
};
</script>