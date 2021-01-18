<template>
  <v-flex d-flex>
    <v-layout wrap>
      <v-flex md3 v-for="item in items" :key="item.id">
        <v-card class="mx-auto card-container" max-width="344">
          <v-list-item three-line>{{ item.title }}</v-list-item>
          <v-list-item three-line>{{ item.description }}</v-list-item>
          <Icons />
          <!-- <v-btn @click="deleteItem(item.id)">Delete</v-btn> -->
        </v-card>
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
    items: []
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