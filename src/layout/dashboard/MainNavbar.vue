<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid">
      <p class="navbar-brand">BENİM SANAL FABRİKAM</p>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item pr-3">
            <a href="home" class="nav-link text-danger">
              <p style="color:#fff !important;"><i class="ti-shopping-cart-full"></i>ÜRÜNLER</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="myorders" class="nav-link">
              <p style="color:#fff !important;"><i class="ti-dropbox-alt"></i>SİPARİŞLERİM</p>
            </a>
          </li>
             <li class="nav-item">
           <a href="login" class="nav-link">
               <p style="color:#fff !important;"> <i class="ti-angle-double-right"></i>ÇIKIŞ</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return name;
    }
  },
};
</script>
<style>



</style>
