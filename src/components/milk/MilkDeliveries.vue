<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h6 class="card-title">Livraisons de lait</h6>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <table class="table">
                <thead>
                  <th class="text-center">Identifiant</th>
                  <th>Date</th>
                  <th>Eleveur</th>
                  <th>Laiterie</th>
                  <th class="text-center">Quantité (L)</th>
                  <th class="text-center">Prix (₿)</th>
                  <th class="text-center">Disponibilité</th>
                </thead>
                <tbody>
                  <tr v-for="delivery in milkDeliveries" v-bind:key="delivery.id">
                    <td class="delivery-id-col">#{{ delivery.id }}</td>
                    <td>{{ delivery.date }}</td>
                    <td>{{ delivery.from }}</td>
                    <td>{{ delivery.to }}</td>
                    <td class="delivery-quantity-col">{{ delivery.quantity }} L</td>
                    <td class="delivery-price-col">{{ delivery.price }} ₿</td>
                    <td class="delivery-consumed-col">
                      <div v-if="delivery.consumed">
                        <font-awesome-icon :icon="['fas', 'ban']" size="2x" :style="{ color: 'red' }" />
                      </div>
                      <div v-else>
                        <font-awesome-icon :icon="['fas', 'check']" size="2x" :style="{ color: 'green' }" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row" v-if="milkDeliveryAllowed">
            <div class="col-12 offset-md-5">
              <button type="button" class="btn btn-light legitRipple" data-toggle="modal" data-target="#add_milk_delivery">
                Livrer du lait <i class="icon-paperplane ml-2"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="add_milk_delivery" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
      <new-milk-delivery/>
    </div>
  </div>
</template>

<script>
import NewMilkDelivery from '@/components/milk/NewMilkDelivery'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/fr'

export default {
  name: 'MilkDeliveries',
  components: {
    'new-milk-delivery': NewMilkDelivery
  },
  computed: {
    currentUser: {
      get () { return this.$store.getters.currentUser }
    },
    milkDeliveryAllowed () {
      return this.currentUser.name.startsWith('Eleveur')
    }
  },
  asyncComputed: {
    milkDeliveries: {
      async get () {
        if (this.currentUser !== '') {
          let response = await axios.get('http://localhost:3000/milk-deliveries')
          return response.data.map((md) => {
            return {
              id: md.id,
              date: moment(md.timestamp).fromNow(),
              from: md.from,
              to: md.to,
              quantity: md.quantity,
              price: md.price,
              consumed: md.consumed
            }
          })
        }
      }
    }
  },
  beforeCreate () {
    axios.defaults.headers.common['X-Participant'] = this.$store.getters.currentUser.name
  }
}
</script>

<style scoped>
td.delivery-id-col, td.delivery-quantity-col, td.delivery-price-col, td.delivery-consumed-col {
  width: 120px;
  text-align: center;
}
td.delivery-id-col {
  font-weight: bold;
}
</style>
