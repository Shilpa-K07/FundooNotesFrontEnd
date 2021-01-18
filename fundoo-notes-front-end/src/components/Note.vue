<template>
  <v-flex d-flex>
    <v-layout wrap>
      <v-flex md3 v-for="item in items" :key="item.id" class="mr-15 mb-10">
        <v-hover
          v-slot:default="{ hover }"
        >
        <v-card :elevation="hover ? 0.5 : 0.5" class="mx-auto card-container">
          <v-list-item >{{ item.title }}</v-list-item>
          <v-list-item two-line>{{ item.description }}</v-list-item>
         <!--  <v-list-item v-show="!hover"></v-list-item> -->
          <Icons v-show="hover"/>
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
    items: [],
  }),
  methods: {
    setNoteData(notes) {
    this.items = notes.data.data
    },
    addNoteData(note){
      this.items.push(note.data)
    }
  }
};
</script>