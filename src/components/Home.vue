<template>
  <fragment>

  <!-- Page header -->
  <div class="page-header page-header-light">
    <div class="page-header-content header-elements-md-inline">
      <div class="page-title d-flex">
        <h4>
          <a href="index.html"><i class="icon-arrow-left52 mr-2" style="color: black;"></i></a>
          <span class="font-weight-semibold">Accueil</span> -
          Traçabilité de la demande de label XYZ
        </h4>
        <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
      </div>
    </div>
  </div>
  <!-- /page header -->

  <!-- Content area -->
  <div class="content">

    <!-- Time and date -->
    <div class="mb-3 pt-2">
      <h6 class="mb-0 font-weight-semibold">
        Historique des transactions
      </h6>
      <!--span class="text-muted d-block">Variante ajoutant les dates ou des icônes</span-->
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="card card-body border-top-teal">
          <div class="list-feed">

            <div class="list-feed-item border-danger-400">
              <div class="text-muted">11 Janvier, 10:26</div>
              La délivrance du label a été refusée car <a href="#">Eleveur Bastia</a>
              n'est pas dans la zone géographique de délivrance du label AOP
            </div>

            <div class="list-feed-item border-success-400">
              <div class="text-muted">11 Janvier, 10:25</div>
              <a href="#">Coopérative</a> a demandé la génération du label AOP
            </div>

            <div class="list-feed-item border-success-400">
              <div class="text-muted">10 Janvier, 09:37</div>
              <a href="#">Laiterie Beaufort</a> a fabriqué le fromage
            </div>

            <div class="list-feed-item border-warning-400">
              <div class="text-muted">Jan 9, 08:28</div>
              <a href="#">Eleveur Bastia</a> a envoyé <strong>129 L</strong> de lait à <a href="#">Laiterie Beaufort</a>
            </div>

            <div class="list-feed-item border-success-400">
              <div class="text-muted">8 Janver, 07:58</div>
              <a href="#">Eleveur Parly</a> a envoyé <strong>867 L</strong> de lait à <a href="#">Laiterie Beaufort</a>
            </div>

            <div class="list-feed-item border-success-400">
              <div class="text-muted">7 Janvier, 06:32</div>
              <a href="#">Eleveur Hauteluce</a> a envoyé <strong>453 L</strong> de lait à <a href="#">Laiterie Beaufort</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /time and date -->

  </div>

  </fragment>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
</style>
