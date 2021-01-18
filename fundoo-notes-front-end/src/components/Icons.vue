<template>
  <v-row>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon v-on="on" class="ml-5 card-icons mb-5">mdi-bell</v-icon>
      </template>
      <span>Remind me</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon v-on="on" class="ml-5 card-icons mb-5">mdi-account</v-icon>
      </template>
      <span>Collaborator</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon v-on="on" class="ml-5 card-icons mb-5">mdi-palette</v-icon>
      </template>
      <span>Change color</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon v-on="on" class="ml-5 card-icons mb-5">mdi-image</v-icon>
      </template>
      <span>Add image</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon v-on="on" class="ml-5 card-icons mb-5">mdi-download</v-icon>
      </template>
      <span>Archive</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon v-on="on" class="ml-5 card-icons mb-5">mdi-dots-vertical</v-icon>
      </template>
      <span>More</span>
    </v-tooltip>
  </v-row>
</template>