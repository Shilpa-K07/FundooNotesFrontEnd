<!-- comment
Note component to display notes on dashboardrow 
-->
<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex v-for="item in items" :key="item.id" md3 class="mr-5 mb-10">
        <v-hover v-slot="{ hover }">
          <v-card class="mx-auto card-container v-list" outlined :class="{'on-hover':hover}" v-on:click="click== true">
            <v-list-item  class="v-list">{{ item.title }}</v-list-item>
            <v-list-item  class="v-list">{{ item.description }}</v-list-item>
            <v-list-item />
            <Icons v-show="hover==true || click==true" />
            <!--  <Icons v-show="hover"/> -->
            <!-- <v-btn @click="deleteItem(item.id)">Delete</v-btn> -->
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import Icons from "./Icons";
export default {
  components: {
    Icons
  },
  data: () => ({
    click: false,
    items: []
  }),
  methods: {
    setNoteData(notes) {
      this.items = notes.data.data;
    },
    addNoteData(note) {
      this.items.push(note.data);
    }
  }
};
</script>