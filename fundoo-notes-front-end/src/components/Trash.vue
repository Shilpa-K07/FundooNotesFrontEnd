<!-- comment
Note component to display notes on dashboardrow
-->
<template>
  <v-flex>
    <v-layout row wrap>
      <v-flex v-for="item in items" v-if="item.isDeleted == true" :key="item._id" md3 class="mr-5 mb-10">
        <v-hover v-slot="{ hover }">
          <v-card
            class="mx-auto v-list"
            outlined
            :class="{'on-hover':hover}"
            v-on:click="click== true"
          >
            <v-list-item class="v-list">{{ item.title }}</v-list-item>
            <v-list-item class="v-list">{{ item.description }}</v-list-item>
            <v-list-item></v-list-item>
            <v-row >
             <v-col cols="12" md="6" v-for="label in item.labelId" :key="label._id">
            <v-chip class="ma-3" close>{{label.name}}</v-chip>
            </v-col>
            </v-row>
            <Icons v-show="hover==true || click==true" :noteDetails="item" :trashField="trash" @hardDelete="afterHardDelete" @restoreNote="restoreNote"/>
            <!-- <v-flex>
              <Dialogue :transaction="item"></Dialogue>
            </v-flex> -->
            </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import Icons from './Icons';
import Dialogue from './Dialogue';
export default {
  name: 'Note',
  components: {
    Icons,
    Dialogue
  },
  data: () => ({
    click: false,
    items: [],
    trash: 'trash'
  }),
  methods: {
    setNoteData (notes) {
      this.items = notes.data.data;
    },
    addNoteData (note) {
      this.items.push(note.data);
    },
    afterHardDelete () {
      this.$emit('hardDelete');
    },
    restoreNote () {
       this.$emit('restoreNote');
    }
  }
};
</script>
