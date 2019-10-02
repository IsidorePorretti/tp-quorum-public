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
                  <th>Date</th>
                  <th>Eleveur</th>
                  <th>Laiterie</th>
                  <th>Quantité (L)</th>
                  <th>Prix (₿)</th>
                  <th>Statut</th>
                </thead>
                <tbody>
                  <tr v-for="delivery in milkDeliveries" v-bind:key="delivery.id">
                    <td>{{ delivery.date }}</td>
                    <td>{{ delivery.from }}</td>
                    <td>{{ delivery.to }}</td>
                    <td>{{ delivery.quantity }} L</td>
                    <td>{{ delivery.price }} ₿</td>
                    <td>{{ delivery.completed }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/fr'

export default {
  name: 'MilkDeliveries',
  computed: {
    currentUser: {
      get () { return this.$store.getters.currentUser }
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
              date: moment(md.timestamp * 1000).fromNow(),
              from: md.from,
              to: md.to,
              quantity: md.quantity,
              price: md.price,
              completed: 1
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
</style>
