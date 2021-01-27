<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="{ on }">
      <v-list-item-icon>
        <v-icon v-on="on">mdi-pencil</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title class="side-nav">Edit labels</v-list-item-title>
      </v-list-item-content>
    </template>
    <v-card>
      <v-card-text>
        <v-card-subtitle class="text-weight">Edit labels</v-card-subtitle>
        <v-form ref="editLabelForm">
          <v-text-field
            label="Create new label"
            v-model="newLabel"
            prepend-icon="mdi-window-close"
            append-outer-icon="mdi-check"
            @click:prepend="reset()"
            @click:append-outer="createLabel()"
          ></v-text-field>
          <v-list class="label-list">
            <v-list-item
              v-for="item in labelsList"
              v-if="item.isDeleted == false"
              :key="item.name"
              link
            >
              <!-- <v-hover v-slot="{ hover }"> -->
              <!-- <v-list-item-icon>
                  <v-icon v-show="hover || item.isClicked">mdi-delete</v-icon>
                  <v-icon v-show="!hover && !item.isClicked">mdi-label</v-icon>
              </v-list-item-icon>-->
              <!-- </v-hover> -->
              <!-- :class="{ pressed: pressedElement === el, active: !hidden }" -->
              <DeleteLabel :label="item" @onLabelDelete="onLabelDelete" />
              <v-text-field
              
                v-model="item.name"
                :class="{'onclick-label-list':onClickField}"
                @click="onClickLabel(item)"
                :append-outer-icon="item.isClicked ? 'mdi-check':'mdi-pencil'"
              ></v-text-field>
              <!--  <v-list-item-content> :prepend-icon="onClickField ? 'mdi-delete':'mdi-label'"
                <v-list-item class="side-nav">{{ item.name }}</v-list-item>
              </v-list-item-content>-->
              <!-- <v-list-item-icon>
              <v-icon @click="onClickLabel">mdi-pencil</v-icon>-->
              <!-- <v-icon v-show="!onClickField">mdi-pencil</v-icon>
                <v-icon v-show="onClickField">mdi-check</v-icon>
              </v-list-item-icon>-->
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-flex class="d-flex flex-row-reverse">
            <a v-on:click="createLabel">Done</a>
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import user from "../services/user";
import DeleteLabel from "./DeleteLabel";
export default {
  components: {
    DeleteLabel
  },
  data() {
    return {
      dialog: false,
      newLabel: "",
      labelsList: [],
      isClicked: false,
      onClickField: false
    };
  },
  methods: {
    setLabelData(labels) {
      this.labelsList = labels.data.data;
    },
    createLabel() {
      if (this.newLabel) {
        const labelData = {
          name: this.newLabel
        };
        user
          .createLabel(labelData)
          .then(data => {
            this.$emit("onLabelEdit");
            this.newLabel = "";
            //this.reset()
            this.dialog = false;
          })
          .catch(error => console.error(error));
      } else if (this.renameLabel) {
        const labelData = {
          name: this.renameLabel
        };
        user
          .updateLabel(labelData, this.labelId)
          .then(data => {
            this.$emit("onLabelEdit");
            //this.reset()
            this.dialog = false;
          })
          .catch(error => console.error(error));
      }
    },
    onLabelDelete() {
      this.$emit("onLabelEdit");
    },
    /*  editLabel() {
      this.readonly = false
        if (this.newLabel) {
        const labelData = {
          name: this.newLabel
        }
        user
          .createLabel(labelData)
          .then(data => {
            this.$emit("onLabelEdit")
            this.newLabel = ""
            //this.reset()
            this.dialog = false
          })
          .catch(error => console.error(error))
      }
    }, */
    onClickLabel(item) {
      item.isClicked = true;
      this.renameLabel = item.name;
      this.labelId = item._id;
      this.onClickField = true;
    },
    reset() {
      this.newLabel = "";
    },
  }
};
</script>

<style lang="scss">
@import url("../scss/label.scss");
</style>