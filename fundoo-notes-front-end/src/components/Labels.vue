<template>
  <v-list>
    <v-list-item v-for="item in items" v-if="item.isDeleted == false" :key="item.name" link>
      <v-list-item-icon>
        <v-icon @click="getNotesByLabel(item)"> mdi-label</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>

</template>

<script>
import user from '../services/user'
export default {
  data: () => ({
    items: []
  }),
  methods: {
    setLabelData (labels) {
        this.items = labels.data.data
    },
    getNotesByLabel (item) {
      user.getNotesByLabel(item._id)
      .then(data => {
        this.$emit('onClickLabel', data, item.name)
      })
      .catch(error => console.error(error))
    }
  }
}
</script>
