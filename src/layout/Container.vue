<template>
  <div  style="min-height: 100vh; min-width:100vw">
    <router-view></router-view>

  </div>
</template>
<script>
import DashboardLayout from './dashboard/DashboardLayout.vue';

export default {
  components: {
    DashboardLayout
  },
};
</script>
