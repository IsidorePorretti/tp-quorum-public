<template>
  <fragment>

  <!-- Page header -->
  <div class="page-header page-header-light">
    <div class="page-header-content header-elements-md-inline">
      <div class="page-title d-flex">
        <h4>Tableau de bord</h4>
        <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
      </div>
    </div>
  </div>
  <!-- /page header -->

  <!-- Content area -->
  <div class="content">

    <milk-deliveries />

    <dairy-productions />

  </div>

  </fragment>
</template>

<script>
import MilkDeliveries from '@/components/milk/MilkDeliveries'
import DairyProductions from '@/components/dairy/DairyProductions'

export default {
  name: 'Home',
  components: {
    'milk-deliveries': MilkDeliveries,
    'dairy-productions': DairyProductions
  }
}
</script>

<style scoped>
</style>
