<template>
  <v-list>
    <v-list-item v-for="item in items" :key="item.name" link>
      <v-list-item-icon>
        <v-icon> mdi-label</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    items: []
  }),
  methods: {
    setLabelData(labels) {
        this.items = labels.data.data
    }
  }
};
</script>
