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
                  <th>Identifiant</th>
                  <th>Date</th>
                  <th>Participants</th>
                  <th class="text-center">Statut</th>
                </thead>
                <tbody>
                  <tr v-for="cheese in cheeses" v-bind:key="cheese.id">
                    <td class="cheese-id-col">#{{ cheese.id }}</td>
                    <td>{{ cheese.date }}</td>
                    <td>
                      <ul>
                        <li v-for="participant in cheese.participants" v-bind:key="participant">
                          {{ participant }}
                        </li>
                      </ul>
                    </td>
                    <td class="cheese-certified-col">
                      <div v-if="cheese.certified">
                        <font-awesome-icon :icon="['fas', 'thumbs-up']" size="2x" :style="{ color: 'green' }" />
                      </div>
                      <div v-else>
                        <font-awesome-icon :icon="['fas', 'thumbs-down']" size="2x" :style="{ color: 'red' }" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row" v-if="creationAllowed">
            <div class="col-12 offset-md-5">
              <button type="button" class="btn btn-light legitRipple" data-toggle="modal" data-target="#make_cheese">
                Fabriquer du fromage &nbsp; <font-awesome-icon :icon="['fas', 'cheese']" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="make_cheese" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
      <new-dairy-production/>
    </div>
  </div>
</template>

<script>
import NewDairyProduction from '@/components/dairy/NewDairyProduction'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/fr'

export default {
  name: 'DairyProductions',
  components: {
    'new-dairy-production': NewDairyProduction
  },
  computed: {
    currentUser: {
      get () { return this.$store.getters.currentUser }
    },
    creationAllowed () {
      return this.currentUser.name.startsWith('Laiterie')
    }
  },
  asyncComputed: {
    cheeses: {
      async get () {
        if (this.currentUser !== '') {
          let response = await axios.get('http://localhost:3000/cheeses')
          return response.data.map((md) => {
            return {
              id: md.id,
              date: moment(md.timestamp).fromNow(),
              participants: md.participants,
              certified: true
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
.table td {
  vertical-align: top;
}
td.cheese-id-col, td.cheese-certified-col {
  width: 120px;
  text-align: center;
}
td.cheese-id-col {
  font-weight: bold;
}
</style>
