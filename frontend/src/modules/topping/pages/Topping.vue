<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="toppings"
      sort-by="name"
      class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title><h1 class="display-1">TOPPINGS</h1></v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                class="mr-2"
                color="secondary"
                v-on="on"
                @click="getToppings">
                refresh
              </v-icon>
            </template>
            <span>Update Toppings Data</span>
          </v-tooltip>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="orange darken-3" dark class="mb-2" v-on="on">New Topping</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field v-model="editedItem.name" label="Topping name"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" small dark @click="close"><v-icon>cancel</v-icon> Cancel</v-btn>
                <v-btn color="orange darken-3" small dark @click="save"><v-icon>save</v-icon> Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- <template v-slot:item.toppings="{ item }">
        <v-chip
          small
          class="mr-1"
          color="orange darken-4"
          dark
          v-for="val in item.toppings"
          close
          @click:close="removeTopping(item, val.id)"
          :key="val.id">
          <strong>{{ val.name }}</strong>
        </v-chip>
      </template> -->
      <template v-slot:item.actions="{ item }">
        <v-row justify="center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                class="mr-2"
                color="warning"
                v-on="on"
                @click="editItem(item)">
                edit
              </v-icon>
            </template>
            <span>Edit Topping</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                class="mr-2"
                color="red"
                v-on="on"
                @click="deleteItem(item)">
                delete
              </v-icon>
            </template>
            <span>Delete Topping</span>
          </v-tooltip>
        </v-row>
      </template>
      <template v-slot:no-data>
        <v-btn color="orange darken-3" @click="getToppings">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ToppingServices from '@/modules/topping/services'

export default {
  name: 'Topping',
  data () {
    return {
      toppings: [],
      dialog: false,
      headers: [
        { text: 'ACTIONS', value: 'actions', sortable: false, align: 'center' },
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        { text: 'NAME', value: 'name' }
      ],
      editedIndex: -1,
      editedItem: {
        name: ''
      },
      defaultItem: {
        name: ''
      }
    }
  },
  methods: {
    getToppings () {
      ToppingServices.getToppings()
        .then(response => {
          this.toppings = response.data.rows
        })
    },
    editItem (item) {
      this.editedIndex = this.toppings.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      confirm('Are you sure you want to delete this item?') && ToppingServices.deleteTopping(item.id)
        .then(response => this.getToppings())
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        ToppingServices.updateTopping(this.editedItem.id, this.editedItem)
          .then(response => this.getToppings())
      } else {
        ToppingServices.createTopping(this.editedItem)
          .then(response => this.getToppings())
      }
      this.close()
    }
  },
  created () {
    this.getToppings()
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Topping' : 'Edit Topping'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  }
}
</script>
