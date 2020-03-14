<template>
  <v-card>
    <v-card-title class="headline">
      <v-icon>local_pizza</v-icon>Add Topping to Pizza {{ pizza.name }}
      <v-spacer></v-spacer>
      <v-btn icon @click="$store.commit('closeModal')">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <v-autocomplete
              v-model="toppingsSelected"
              :items="toppings"
              outlined
              dense
              chips
              filled
              small-chips
              label="Select the toppings"
              item-text="name"
              item-value="id"
              multiple>
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="removeTopping(data.item)">
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="grey darken-1" small dark @click="$store.commit('closeModal')"><v-icon>cancel</v-icon> Cancel</v-btn>
      <v-btn color="orange darken-3" small dark @click="addPizzaTopping"><v-icon>save</v-icon> Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ToppingServices from '@/modules/topping/services'
import PizzaServices from '@/modules/pizza/services'

export default {
  props: {
    pizza: {
      type: Object
    }
  },
  data () {
    return {
      toppings: [],
      toppingsSelected: []
    }
  },
  created () {
    this.getToppings()
  },
  methods: {
    getToppings () {
      ToppingServices.getToppings()
        .then(response => {
          this.toppings = response.data.rows
        })
    },
    removeTopping (item) {
      const index = this.toppingsSelected.indexOf(item.id)
      if (index >= 0) this.toppingsSelected.splice(index, 1)
    },
    addPizzaTopping () {
      console.log('Add Toppings to pizza ', this.pizza.id, this.toppingsSelected)
      PizzaServices.addPizzaToppings(this.pizza.id, this.toppingsSelected)
        .then(response => {
          this.toppingsSelected = []
          this.$store.commit('closeModal')
        })
    }
  }
}
</script>
