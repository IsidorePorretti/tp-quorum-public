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

      <ul class="navbar-nav">

        <li class="nav-item dropdown dropdown-user">
          <a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
            <div class="btn bg-primary-400 rounded-circle btn-icon btn-sm mr-2">
              <span class="letter-icon">C</span>
            </div>
            <span>Coopérative</span>
          </a>

          <div class="dropdown-menu dropdown-menu-right">
            <a href="#" class="dropdown-item"><i class="icon-user-plus"></i> My profile</a>
            <a href="#" class="dropdown-item"><i class="icon-coins"></i> My balance</a>
            <a href="#" class="dropdown-item"><i class="icon-comment-discussion"></i> Messages <span class="badge badge-pill bg-blue ml-auto">58</span></a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item"><i class="icon-cog5"></i> Account settings</a>
            <a href="#" class="dropdown-item"><i class="icon-switch2"></i> Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- /main navbar -->
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
</style>
