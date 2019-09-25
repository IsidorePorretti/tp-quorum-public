<template>
  <!-- Main navbar -->
  <div class="navbar navbar-expand-md navbar-dark">
    <div class="navbar-brand">
      <a href="index.html" class="d-inline-block">
        <img src="/static/global_assets/images/logo_light.png" alt="">
      </a>
    </div>

    <div class="d-md-none">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
        <i class="icon-tree5"></i>
      </button>
      <button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
        <i class="icon-paragraph-justify3"></i>
      </button>
    </div>

    <div class="collapse navbar-collapse" id="navbar-mobile">
      <ul class="navbar-nav mr-md-auto">
        <li class="nav-item">
          <a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
            <i class="icon-paragraph-justify3"></i>
          </a>
        </li>
      </ul>

      <account-selector/>

    </div>
  </div>
  <!-- /main navbar -->
</template>

<script>
import AccountSelector from '@/components/AccountSelector'

export default {
  name: 'Navbar',
  components: {
    'account-selector': AccountSelector
  }
}
</script>

<style scoped>
</style>
