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
import MilkDeliveryShortLabel from '@/components/milk/MilkDeliveryShortLabel'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/fr'

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
  asyncComputed: {
    availableMilkDeliveries: {
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
              consumed: md.consumed
            }
          }).filter((md) => md.consumed === false)
        }
      }
    }
  },
  methods: {
    async makeCheese () {
      console.log(`Making cheese from ${this.selectedMilkDeliveries}...`)
      let response = await axios.post('http://localhost:3000/cheeses', {
        deliveries: this.selectedMilkDeliveries
      })
      console.log(response)
    }
  }
}
</script>
