<template>
  <v-app>
    <v-content>
      <v-card class="mx-auto main-card" outlined>
        <v-row>
          <v-col>
            <v-app-bar class="app-bar">
              <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
              <v-toolbar-title>FundooNotes</v-toolbar-title>
              <v-text-field label="Search" prepend-inner-icon="mdi-magnify" :class="{'search-text-style':changeStyle}" solo filled dense v-on:click="changeFiledStyle" v-click-outside="onClickOutside"></v-text-field>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
              <span>Shilpa</span>
            <!--   <v-btn icon>
                <v-icon>mdi-view-stream</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-cog</v-icon>
              </v-btn> -->
            </v-app-bar>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-navigation-drawer :class="{'nav-bar':drawer}">
              <v-list dense>
                <v-list-item v-for="item in items" :key="item.title" link>
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="side-nav">{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-col>
          <v-col cols="12" md="8" class="mt-10 note-card">
            <v-text-field
              label="Take a note..."
              solo
              filled
              dense
              append-icon="mdi-checkbox-marked-outline"
            >
              <template v-slot:append>
                <v-row> 
                <v-icon class="mr-5">mdi-checkbox-marked-outline</v-icon>
                <v-icon class="mr-5">mdi-brush</v-icon>
                <v-icon class="mr-5">mdi-image</v-icon>
                </v-row>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    changeStyle: false,
    items: [
      { title: "Notes", icon: "mdi-lightbulb-outline" },
      { title: "Reminders", icon: "mdi-bell-outline" },
      { title: "Edit labels", icon: "mdi-pencil" },
      { title: "Archive", icon: "mdi-download" },
      { title: "Trash", icon: "mdi-delete" }
    ]
  }),
  methods: {
    changeFiledStyle() {
      this.changeStyle = true
    },
    onClickOutside() {
      this.changeStyle = false
    }
  }
}
</script>

<style lang="scss">
@import url("../css/dashboard.scss");
</style>
