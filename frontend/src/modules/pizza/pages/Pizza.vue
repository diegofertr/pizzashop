<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="pizzas"
      sort-by="name"
      class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title><h1 class="display-1">PIZZAS</h1></v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <!-- <v-btn class="mb-2" v-on="on" @click="getPizzasData">
                <v-icon>refresh</v-icon>
              </v-btn> -->
              <v-icon
                class="mr-2"
                color="secondary"
                v-on="on"
                @click="getPizzasData">
                refresh
              </v-icon>
            </template>
            <span>Update Pizza's Data</span>
          </v-tooltip>

          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="orange darken-3" dark class="mb-2" v-on="on">New Pizza</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field v-model="editedItem.name" label="Pizza name"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <h1 class="caption mb-1">Toppings</h1>
                      <v-chip
                        small
                        class="mr-1"
                        color="orange darken-4"
                        dark
                        v-for="val in editedItem.toppings"
                        :key="val.id">
                        <strong>{{ val.name }}</strong>
                      </v-chip>

                      <!-- <v-text-field v-model="editedItem.name" label="Pizza name"></v-text-field> -->
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
      <template v-slot:item.toppings="{ item }">
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
      </template>
      <template v-slot:item.actions="{ item }">
        <v-row justify="center">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                class="mr-2"
                color="success"
                v-on="on"
                @click="modalToppings(item)">
                local_pizza
              </v-icon>
            </template>
            <span>Add Topping</span>
          </v-tooltip>
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
            <span>Edit Pizza</span>
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
            <span>Delete Pizza</span>
          </v-tooltip>
        </v-row>
      </template>
      <template v-slot:no-data>
        <v-btn color="orange darken-3" @click="getPizzasData">Reset</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="$store.state.modal" v-if="pizza" max-width="500px">
      <topping-dialog :pizza="pizza"></topping-dialog>
    </v-dialog>
  </div>
</template>

<script>
import PizzaServices from '@/modules/pizza/services'
import ToppingDialog from '@/modules/pizza/components/ToppingDialog'

export default {
  name: 'Pizza',
  components: {
    ToppingDialog
  },
  data () {
    return {
      pizzas: [],
      dialog: false,
      dialogToppings: false,
      headers: [
        { text: 'ACTIONS', value: 'actions', sortable: false, align: 'center' },
        {
          text: 'ID',
          align: 'start',
          value: 'id'
        },
        { text: 'NAME', value: 'name' },
        { text: 'TOPPINGS', value: 'toppings', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        toppings: []
      },
      defaultItem: {
        name: '',
        toppings: []
      },
      pizza: null
    }
  },
  methods: {
    getPizzasData () {
      PizzaServices.getPizzas({ toppings: true })
        .then(response => {
          this.pizzas = response.data.rows
        })
    },
    editItem (item) {
      this.editedIndex = this.pizzas.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      confirm('Are you sure you want to delete this item?') && PizzaServices.deletePizza(item.id)
        .then(response => {
          this.getPizzasData()
        })
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
        PizzaServices.updatePizza(this.editedItem.id, this.editedItem)
          .then(response => {
            this.getPizzasData()
          })
      } else {
        PizzaServices.createPizza(this.editedItem)
          .then(response => {
            this.getPizzasData()
          })
      }
      this.close()
    },
    modalToppings (data) {
      this.$nextTick(() => {
        this.pizza = data
      })
      this.$store.commit('openModal')
    },
    closeModalTopping () {
      this.dialogToppings = false
      this.pizza = null
    },
    removeTopping (item, toppingId) {
      PizzaServices.deletePizzaTopping(item.id, toppingId)
        .then(response => {
          this.getPizzasData()
        })
    }
  },
  created () {
    this.getPizzasData()
    this.$store.commit('closeModal')
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Pizza' : 'Edit Pizza'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    '$store.state.modal': function (val) {
      if (!val) {
        this.getPizzasData()
      }
    }
  }
}
</script>
