<template>
  <d-container fluid>
    <d-row>
      <!-- Main Sidebar -->
      <main-sidebar :items="sidebarItems" />

      <d-col
        class="main-content offset-lg-2 offset-md-3 p-0"
        lg="10"
        md="9"
        sm="12"
        tag="main">
        <!-- Main Navbar -->
        <main-navbar />

        <!-- Content -->
        <nuxt />

        <!-- Main Footer -->
        <main-footer />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import getSidebarItems from '@/data/sidebar-nav-items';
// Main layout components
import MainSidebar
  from '@/components/superLayout/MainSidebar/MainSidebar';
import MainNavbar from '@/components/superLayout/MainNavbar/MainNavbar';
import MainFooter from '@/components/superLayout/MainFooter/MainFooter';

export default {
  name: 'SuperAdminLayout',
  components: {
    MainSidebar,
    MainNavbar,
    MainFooter,
  },
  data() {
    return {
      sidebarItems: getSidebarItems(),
    };
  },
};
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
  @import "~/assets/css/bootstrap.css";
  @import "~/assets/scss/shards/shards-dashboards.scss";
  @import "~/assets/scss/date-range.scss";
</style>
