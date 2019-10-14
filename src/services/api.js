import axios from 'axios'
import moment from 'moment-timezone'
import 'moment/locale/fr'

const API_SERVER = 'http://localhost:3000'

class API {
  constructor (fromParticipant) {
    if (fromParticipant === '') {
      throw new Error('Invalid participant!')
    }
    this.api = axios.create({
      baseURL: API_SERVER,
      // timeout: 1000,
      headers: {
        'X-Participant': fromParticipant.name
      }
    })
  }
  async getMilkDeliveries () {
    try {
      const response = await this.api.get(`/milk-deliveries`)
      return response.data.map((md) => {
        return {
          id: md.id,
          date: moment.unix(md.timestamp).fromNow(),
          from: md.from,
          to: md.to,
          quantity: md.quantity,
          price: md.price,
          delivered: md.deliveryApproval,
          consumed: md.consumed
        }
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  async sendMilk (dairy, quantity, price) {
    console.log(`Sending ${quantity} liters to '${dairy}' at a ${price} price / liter...`)
    try {
      await this.api.post('/milk-deliveries', {
        quantity: quantity,
        price: price,
        dairy: dairy
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  async approveMilkDelivery (milkDelivery) {
    console.log(`Should approve milk delivery ${milkDelivery}`)
    return this.api.post(`/milk-deliveries/${milkDelivery}/approval`)
  }
  async getCheeses () {
    try {
      const response = await this.api.get(`/cheeses`)
      return response.data.map((md) => {
        return {
          id: md.id,
          date: moment.unix(md.timestamp).fromNow(),
          milkDeliveries: md.deliveries,
          certified: md.certified
        }
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  async makeCheese (quantity, milkDeliveries) {
    console.log(`Making ${quantity} cheese(s) from ${milkDeliveries}...`)
    return this.api.post('/cheeses', {
      quantity: quantity,
      deliveries: milkDeliveries
    })
  }
}

export default API
