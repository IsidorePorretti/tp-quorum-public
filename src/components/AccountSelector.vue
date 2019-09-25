<template>
  <ul class="navbar-nav">

    <li class="nav-item dropdown dropdown-user">

      <a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
        <div class="btn bg-primary-400 rounded-circle btn-icon btn-sm mr-2">
          <span class="letter-icon">{{ currentUser.symbol }}</span>
        </div>
        <span>{{ currentUser.name }}</span>
      </a>

      <div class="dropdown-menu dropdown-menu-right">
        <a href="#" class="dropdown-item"
          v-for="user in users" v-bind:key="user.name"
          v-if="user.name != currentUser.name"
          v-on:click="changeCurrentUser(user)">
          <div class="btn bg-primary-400 rounded-circle btn-icon btn-sm mr-2">
            <span class="letter-icon">{{ user.symbol }}</span>
          </div>
          <span>{{ user.name }}</span>
        </a>
      </div>

    </li>

  </ul>
</template>

<script>
export default {
  name: 'AccountSelector',
  data: function () {
    return {
      users: [
        { symbol: 'C', name: 'Coopérative' },
        { symbol: 'H', name: 'Eleveur Hauteluce' },
        { symbol: 'P', name: 'Eleveur Parly' },
        { symbol: 'B', name: 'Eleveur Bastia' },
        { symbol: 'L', name: 'Laiterie Beaufort' }
      ]
    }
  },
  computed: {
    currentUser: {
      get () { return this.$store.getters.currentUser }
    }
  },
  mounted () {
    this.changeCurrentUser(this.users[0])
  },
  methods: {
    changeCurrentUser (user) {
      console.log(`Switching to user ${user.name}`)
      this.$store.dispatch('changeCurrentUser', user)
    }
  }
}
</script>

<style scoped>
</style>
