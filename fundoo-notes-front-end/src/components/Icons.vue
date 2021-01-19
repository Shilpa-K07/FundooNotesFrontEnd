<!-- comment
Icon components for cards
-->
<template>
  <v-row>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon
          class="ml-5 card-icons mb-5"
          v-on="on"
        >
          mdi-bell
        </v-icon>
      </template>
      <span>Remind me</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon
          class="ml-5 card-icons mb-5"
          v-on="on"
        >
          mdi-account
        </v-icon>
      </template>
      <span>Collaborator</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon
          class="ml-5 card-icons mb-5"
          v-on="on"
        >
          mdi-palette
        </v-icon>
      </template>
      <span>Change color</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon
          class="ml-5 card-icons mb-5"
          v-on="on"
        >
          mdi-image
        </v-icon>
      </template>
      <span>Add image</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{on}">
        <v-icon
          class="ml-5 card-icons mb-5"
          v-on="on"
        >
          mdi-download
        </v-icon>
      </template>
      <span>Archive</span>
    </v-tooltip>
    



    <!-- <v-tooltip bottom> -->
       <!-- <v-menu
            bottom
            left
          >
      <template v-slot:activator="{on}">
        <v-icon
          class="ml-5 card-icons mb-5"
          v-on="on"
        >
          mdi-dots-vertical
        </v-icon>
      </template> -->
     <!--  <span>More</span> -->
     <!--  <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> -->
   <!--  </v-tooltip> -->
     
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Delete note' },
        { title: 'Add label' },
      ],
    }),
  }
</script>