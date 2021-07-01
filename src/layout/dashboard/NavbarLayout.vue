<template>
  <div class="wrapper bg-light">
      <main-navbar></main-navbar>
      <div class="mt-3" style="width:95%;heigh:100%;margin-left:auto;margin-right:auto;">
      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>
      </div>
      <content-footer></content-footer>
  </div>
</template>
<style lang="scss">
</style>
<script>
import MainNavbar from "./MainNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    MainNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  },
  data(){
    return{
      permission: "",
      chart: []
    }
  },
  created(){
    // this.permission = sessionStorage.getItem("permission");
    console.log("created")
  },
  beforeCreate(){
    this.permission = sessionStorage.getItem("permission");
    console.log(this.permission)
    console.log("before")
  }
};
</script>
