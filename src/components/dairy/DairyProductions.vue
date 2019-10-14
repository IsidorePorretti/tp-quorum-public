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
              <table class="table table-striped">
                <thead>
                  <th>Identifiant</th>
                  <th>Date</th>
                  <th>Livraisons de lait</th>
                  <th class="text-center">Statut</th>
                </thead>
                <tbody>
                  <tr v-for="cheese in cheeses" v-bind:key="cheese.id">
                    <td class="cheese-id-col">#{{ cheese.id }}</td>
                    <td>{{ cheese.date }}</td>
                    <td>
                      <ul>
                        <li v-for="milkDelivery in cheese.milkDeliveries" v-bind:key="milkDelivery">
                          {{ milkDelivery.substring(0,6) }}
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
              <button type="button" class="btn btn-light legitRipple" @click="showNewCheeseModal=true">
                Fabriquer du fromage &nbsp; <font-awesome-icon :icon="['fas', 'cheese']" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <stack-modal title="Ajouter une livraison de lait" v-on:save="makeCheese"
      :show="showNewCheeseModal" @close="showNewCheeseModal=false"
      :saveButton="modalConfirmButtonConfiguration" :cancelButton="modalCancelButtonConfiguration">
      <form action="#" v-if="!dataLoading">
        <div class="form-group form-group-feedback form-group-feedback-right row">
          <label class="col-form-label col-lg-3">Quantité</label>
          <div class="col-lg-9">
            <input type="number" class="form-control form-control-lg" v-model="quantity">
            <div class="form-control-feedback form-control-feedback-lg">fromages</div>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-form-label col-lg-3">Livraisons de lait</label>
          <div class="col-lg-9">
            <select class="form-control" v-model="selectedMilkDeliveries" multiple>
              <option v-for="milkDelivery in availableMilkDeliveries" v-bind:key="milkDelivery.id" v-bind:value="milkDelivery.id"><milk-delivery v-bind:content="milkDelivery" /></option>
            </select>
          </div>
        </div>
      </form>
      <div v-if="dataLoading" style="text-align: center;">
        <GridLoader :color="'#42a5f5'" :size="256" />
      </div>
    </stack-modal>
  </div>
</template>

<script>
import API from '@/services/api'
import MilkDeliveryShortLabel from '@/components/milk/MilkDeliveryShortLabel'
import StackModal from '@innologica/vue-stackable-modal'
import { mapGetters } from 'vuex'

export default {
  name: 'DairyProductions',
  components: {
    'milk-delivery': MilkDeliveryShortLabel,
    'stack-modal': StackModal
  },
  data () {
    return {
      dataLoading: false,
      quantity: null,
      selectedMilkDeliveries: [],
      showNewCheeseModal: false,
      modalConfirmButtonConfiguration: {
        title: 'Fabriquer du fromage'
      },
      modalCancelButtonConfiguration: {
        title: 'Annuler'
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    creationAllowed () {
      return this.currentUser.name.startsWith('Laiterie')
    },
    availableMilkDeliveries () {
      // get back all milk deliveries from the store
      let milkDeliveries = this.$store.getters.milkDeliveries
      // filter only relevant ones
      return milkDeliveries.filter((md) => md.delivered === true && md.consumed === false)
    }
  },
  asyncComputed: {
    cheeses: {
      async get () {
        if (this.currentUser !== null && this.currentUser.name !== '') {
          this.dataLoading = true
          const api = new API(this.currentUser)
          try {
            const cheeses = await api.getCheeses()
            this.dataLoading = false
            return cheeses
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
  },
  methods: {
    async makeCheese () {
      this.dataLoading = true
      const api = new API(this.currentUser)
      await api.makeCheese(this.quantity, this.selectedMilkDeliveries)
      this.showNewCheeseModal = false
      // reload milk deliveries
      this.$asyncComputed.cheeses.update()
    }
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
