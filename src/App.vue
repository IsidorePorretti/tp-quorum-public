<template>
  <div>
    <page-header id="header-component"/>

    <!-- Page content -->
    <div class="page-content">

      <sidebar />

      <!-- Main content -->
      <div class="content-wrapper">
        <router-view :key="$route.fullPath" />
        <page-footer />
      </div>
      <!-- /main content -->

    </div>
    <!-- /page content -->
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    'page-header': Header,
    'sidebar': Sidebar,
    'page-footer': Footer
  }
}
</script>

<style scoped>
</style>
