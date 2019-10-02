<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h6 class="card-title">Fromages</h6>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <table class="table">
                <thead>
                  <th>Date</th>
                  <th>Participants</th>
                  <th>Statut</th>
                </thead>
                <tbody>
                  <tr v-for="cheese in cheeses" v-bind:key="cheese.id">
                    <td>{{ cheese.date }}</td>
                    <td>
                      <div v-for="participant in cheese.participants" v-bind:key="participant">
                        {{ participant }}
                      </div>
                    </td>
                    <td>{{ cheese.certified }}</td>
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
  name: 'DairyProductions',
  computed: {
    cheeses: {
      get () {
        axios.get('http://localhost:3000/cheeses')
        // .then(response => (this.info = response))
        return [
          { id: 'XYZ', date: new Date(), participants: ['Eleveur', 'Laiterie'], certified: true }
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
