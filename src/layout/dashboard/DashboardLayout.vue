<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <!--
        <sidebar-link to="/stats" name="User Profile" icon="ti-user" />
        <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2"/>
        <sidebar-link to="/notifications" name="Notifications" icon="ti-bell" /> -->
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel" />
        <sidebar-link to="/products" name="Products" icon="ti-shopping-cart-full" />
        <sidebar-link to="/workcenters" name="Work Centers" icon="ti-settings" />
        <sidebar-link to="/operations" name="Operations" icon="ti-target" />
        <sidebar-link to="/orders" name="Orders" icon="ti-credit-card" />
        <sidebar-link to="/schedules" name="Schedules" icon="ti-calendar" />
        <sidebar-link to="/login" name="ÇIKIŞ" icon="ti-angle-double-right" />

      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>Stats</p>
          </a>
        </li>
        <drop-down class="nav-item"
                   title="5 Notifications"
                   title-classes="nav-link"
                   icon="ti-bell">
          <a class="dropdown-item">Notification 1</a>
          <a class="dropdown-item">Notification 2</a>
          <a class="dropdown-item">Notification 3</a>
          <a class="dropdown-item">Notification 4</a>
          <a class="dropdown-item">Another notification</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>Settings</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
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
      chart: []
    }
  },
};
</script>
