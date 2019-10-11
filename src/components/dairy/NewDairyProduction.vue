<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Fabriquer du fromage</h5>
        <button type="button" class="close" data-dismiss="modal">×</button>
      </div>
      <div class="modal-body">
        <form action="#">
          <div class="form-group row">
            <label class="col-form-label col-lg-3">Livraisons de lait</label>
            <div class="col-lg-9">
              <select class="form-control" v-model="selectedMilkDeliveries" multiple>
                <option v-for="milkDelivery in availableMilkDeliveries" v-bind:key="milkDelivery.id" v-bind:value="milkDelivery.id"><milk-delivery v-bind:content="milkDelivery" /></option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-link legitRipple" data-dismiss="modal">Annuler</button>
        <button type="button" class="btn bg-primary legitRipple" v-on:click="makeCheese">
          Fabriquer <i class="icon-paperplane ml-2"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/services/api'
import MilkDeliveryShortLabel from '@/components/milk/MilkDeliveryShortLabel'
import { mapGetters } from 'vuex'

export default {
  name: 'NewDairyProduction',
  components: {
    'milk-delivery': MilkDeliveryShortLabel
  },
  data: function () {
    return {
      selectedMilkDeliveries: []
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  asyncComputed: {
    availableMilkDeliveries: {
      async get () {
        if (this.currentUser !== null && this.currentUser.name !== '') {
          const api = new API(this.currentUser)
          const milkDeliveries = await api.getMilkDeliveries()
          return milkDeliveries.filter((md) => md.consumed === false)
        }
      }
    }
  },
  methods: {
    async makeCheese () {
      const api = new API(this.currentUser)
      return api.makeCheese(this.selectedMilkDeliveries)
    }
  }
}
</script>
