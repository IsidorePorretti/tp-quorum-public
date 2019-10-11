<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Ajouter une livraison de lait</h5>
        <button type="button" class="close" data-dismiss="modal">×</button>
      </div>
      <div class="modal-body">
        <form action="#">
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
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-link legitRipple" data-dismiss="modal">Annuler</button>
        <button type="button" class="btn bg-primary legitRipple" v-on:click="sendMilk">
          Livrer du lait <i class="icon-paperplane ml-2"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/services/api'
import { mapGetters } from 'vuex'

export default {
  name: 'NewMilkDelivery',
  data: function () {
    return {
      dairy: null,
      quantity: null,
      price: null,
      dairies: [
        'Laiterie Beaufort',
        'Laiterie Bastia'
      ]
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    async sendMilk () {
      const api = new API(this.currentUser)
      return api.sendMilk(this.dairy, this.quantity, this.price)
    }
  }
}
</script>
