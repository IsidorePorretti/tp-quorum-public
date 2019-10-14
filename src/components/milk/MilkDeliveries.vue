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
              <table class="table table-striped">
                <thead>
                  <th class="text-center">Identifiant</th>
                  <th>Date</th>
                  <th>Eleveur</th>
                  <th>Laiterie</th>
                  <th class="text-center">Quantité (L)</th>
                  <th class="text-center">Prix (₿)</th>
                  <th class="text-center">Etat</th>
                </thead>
                <tbody>
                  <tr v-for="delivery in milkDeliveries" v-bind:key="delivery.id" v-if="!dataLoading">
                    <td class="delivery-id-col">#{{ delivery.id.substring(0, 6) }}</td>
                    <td>{{ delivery.date }}</td>
                    <td>{{ delivery.from }}</td>
                    <td>{{ delivery.to }}</td>
                    <td class="delivery-quantity-col">{{ delivery.quantity }} L</td>
                    <td class="delivery-price-col">{{ delivery.price }} ₿</td>
                    <td class="delivery-status-col">
                      <span v-if="delivery.delivered">
                        <font-awesome-icon :icon="['fas', 'truck']" size="2x" :style="{ color: 'green' }" />
                      </span>
                      <span v-else>
                        <a v-if="milkDeliveryApprovalAllowed" @click="approveDelivery(delivery.id)">
                          <font-awesome-icon :icon="['fas', 'truck']" size="2x" :style="{ color: 'gray' }" />
                        </a>
                        <font-awesome-icon v-else :icon="['fas', 'truck']" size="2x" :style="{ color: 'gray' }" />
                      </span>
                      <span v-if="delivery.consumed">
                        <font-awesome-icon :icon="['fas', 'ban']" size="2x" :style="{ color: 'green' }" />
                      </span>
                      <span v-else>
                        <font-awesome-icon :icon="['fas', 'check']" size="2x" :style="{ color: 'gray' }" />
                      </span>
                    </td>
                  </tr>
                  <tr v-if="dataLoading">
                    <td colspan="7" class="delivery-loading">
                      <GridLoader :color="'#42a5f5'" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row" v-if="milkDeliveryAllowed">
            <div class="col-12 offset-md-5">
              <button type="button" class="btn btn-light legitRipple" @click="showNewMilkDeliveryModal=true">
                Livrer du lait <i class="icon-paperplane ml-2"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <stack-modal title="Ajouter une livraison de lait" v-on:save="sendMilk"
      :show="showNewMilkDeliveryModal" @close="showNewMilkDeliveryModal=false"
      :saveButton="modalConfirmButtonConfiguration" :cancelButton="modalCancelButtonConfiguration">
      <form action="#" v-if="!dataLoading">
        <div class="form-group row">
          <label class="col-form-label col-lg-3">Laiterie</label>
          <div class="col-lg-9">
            <select class="form-control" v-model="dairy">
              <option v-for="dairy in dairies" v-bind:key="dairy" v-bind:value="dairy">{{ dairy }}</option>
            </select>
          </div>
        </div>
        <div class="form-group form-group-feedback form-group-feedback-right row">
          <label class="col-form-label col-lg-3">Quantité</label>
          <div class="col-lg-9">
            <input type="number" class="form-control form-control-lg" v-model="quantity">
            <div class="form-control-feedback form-control-feedback-lg">Litres</div>
          </div>
        </div>
        <div class="form-group form-group-feedback form-group-feedback-right row">
          <label class="col-form-label col-lg-3">Prix</label>
          <div class="col-lg-9">
            <input type="number" class="form-control form-control-lg" v-model="price">
            <div class="form-control-feedback form-control-feedback-lg">₿</div>
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
import StackModal from '@innologica/vue-stackable-modal'
import { mapGetters } from 'vuex'

export default {
  name: 'MilkDeliveries',
  components: {
    'stack-modal': StackModal
  },
  data () {
    return {
      dataLoading: false,
      dairy: null,
      quantity: null,
      price: null,
      dairies: [
        'Laiterie Beaufort'
      ],
      showNewMilkDeliveryModal: false,
      modalConfirmButtonConfiguration: {
        title: 'Livrer du lait'
      },
      modalCancelButtonConfiguration: {
        title: 'Annuler'
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    milkDeliveryAllowed () {
      return this.currentUser.name.startsWith('Eleveur')
    },
    milkDeliveryApprovalAllowed () {
      return this.currentUser.name.startsWith('Laiterie')
    }
  },
  asyncComputed: {
    milkDeliveries: {
      async get () {
        if (this.currentUser !== null && this.currentUser.name !== '') {
          this.dataLoading = true
          const api = new API(this.currentUser)
          try {
            const milkDeliveries = await api.getMilkDeliveries()
            this.dataLoading = false
            // keep track of milk deliveries in the store for performance reasons
            this.$store.dispatch('memorizeMilkDeliveries', milkDeliveries)
            return milkDeliveries
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
  },
  methods: {
    async sendMilk () {
      this.dataLoading = true
      const api = new API(this.currentUser)
      await api.sendMilk(this.dairy, this.quantity, this.price)
      this.showNewMilkDeliveryModal = false
      // reload milk deliveries
      this.$asyncComputed.milkDeliveries.update()
    },
    async approveDelivery (milkDelivery) {
      const result = await this.$swal({
        title: 'Approuver la livraison',
        html: `Souhaitez-vous approuver la réception de <b>${milkDelivery}</b> ?`,
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
        focusConfirm: false
      })
      if (result.value) {
        this.dataLoading = true
        const api = new API(this.currentUser)
        await api.approveMilkDelivery(milkDelivery)
        this.$swal('Confirmation', 'Vous avez accepté la livraison !', 'success')
        // reload milk deliveries
        this.$asyncComputed.milkDeliveries.update()
      }
    }
  }
}
</script>

<style scoped>
td.delivery-id-col, td.delivery-quantity-col, td.delivery-price-col, td.delivery-status-col {
  width: 120px;
  text-align: center;
}
td.delivery-id-col {
  font-weight: bold;
}
td.delivery-loading {
  text-align: center;
}
</style>
