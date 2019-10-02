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

export default {
  name: 'MilkDeliveries',
  computed: {
    milkDeliveries: {
      get () {
        axios.get('http://localhost:3000/milk-deliveries')
        // .then(response => (this.info = response))
        return [
          { id: 'XYZ', date: new Date(), from: 'Eleveur', to: 'Laiterie', quantity: 500, price: 12, completed: 1 }
        ]
      }
    }
  },
  created () {
    axios.defaults.headers.common['X-Participant'] = this.$store.getters.currentUser
  }
}
</script>

<style scoped>
</style>
