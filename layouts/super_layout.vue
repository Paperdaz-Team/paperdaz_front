<template>
  <div class="wrapper">
    <div
      class="sidebar"
      data-background-color="white"
      data-color="green"
      data-image="../assets/img/sidebar-1.jpg">
      <!--
      Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

      Tip 2: you can also add an image using data-image tag
      -->
      <div class="logo mt-5 text-center mb-3">
        <router-link to="/super/dashboard">
          <img
            :src="require('@/assets/img/logo.png')"
            alt
            width="150px">
        </router-link>
      </div>
      <div class="sidebar-wrapper">
        <sidebar />
      </div>
    </div>
    <div
      class="main-panel"
      style="max-height: 750px; overflow-y: scroll;">
      <!-- Navbar -->
      <nav
        class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <a class="navbar-brand">{{ computeTitle }}</a>
          </div>
          <button
            @click="openShit"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
            class="navbar-toggler"
            data-toggle="collapse"
            type="button"
            v-on-clickaway="closeSidebar"
            v-show="navOpen === 0">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon fa fa-bars" />
          </button>
          <button
            @click="closeSidebar"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
            class="navbar-toggler"
            data-toggle="collapse"
            type="button"
            v-show="navOpen === 1">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon ti-close" />
          </button>
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a
                  @click.prevent="toggle.account = !toggle.account"
                  class="nav-link pointer"
                  v-on-clickaway="closeAccount">
                  <i class="ti ti-user fa-2x" />
                  <p class="d-lg-none d-md-block">Account</p>
                </a>
                <div
                  :class="toggle.account?'show':''"
                  class="dropdown-menu dropdown-menu-right">
                  <a
                    @click.prevent="logout"
                    class="dropdown-item"
                    href="#">Log out</a>
                </div>
              </li>
              <!-- your navbar here -->
            </ul>
          </div>
        </div>
      </nav>
      <!-- End Navbar -->
      <div class="content">
        <div class="container-fluid">
          <!-- your content here -->
          <nuxt />
        </div>
      </div>
      <footer class="footer">
        <div class="container-fluid">
          <!-- <nav class="float-left">
            <ul>
              <li>
                Paperdaz
              </li>
            </ul>
          </nav>-->
          <div class="copyright float-left">
            Paperdaz
          </div>
          <div class="copyright float-right">
            &copy;
            {{ new Date().getFullYear() }}, crafted with
            <i class="ti ti-heart" /> to save the earth.
          </div>
          <!-- your footer here -->
        </div>
      </footer>
    </div>
    <modal-drawer />
  </div>
</template>


<!-- <script src=></script> -->
<script type="text/javascript">
// import "@/assets/js/perfect-scrollbar.jquery.min.js";
import { mixin as clickaway } from 'vue-clickaway';
import { mapActions, mapGetters } from 'vuex';
import sidebar from '@/components/super/sidebar';
import ModalDrawer from '@/components/modals/ModalDrawer';

export default {
  components: { sidebar, ModalDrawer },
  mixins: [clickaway],
  data() {
    return {
      navOpen: 0,
      toggle: {
        account: false,
      },
    };
  },
  computed: {
    ...mapGetters('user_mgt', ['user', 'isLoggedIn']),
    computeTitle() {
      const page = this.$route.path;
      console.log(page);
      if (page === '/super/faqs') {
        return 'Frequesntly Asked Questions';
      }
      if (page === '/super/campaigns') {
        return 'Messaging Campaigns';
      }
      if (page === '/super/promotions') {
        return 'Paperdaz Promotions';
      }
      if (page === '/super/bills') {
        return 'Bill Management';
      }
      if (page === '/super/pages') {
        return 'Web Pages Management';
      }
      if (page === '/super/users/business') {
        return 'Business Users';
      }
      if (page === '/super/users/free') {
        return 'Free Users';
      }
      if (page === '/super/dashboard') {
        return 'Super Administrator Dashboard';
      }
    },
  },

  methods: {
    ...mapActions('user_mgt', ['logout_user']),
    openShit() {
      // debugger;
      console.log(this.navOpen);
      const root = document.getElementsByTagName('html')[0];
      root.classList.add('nav-open');
      this.navOpen = 1;
      console.log(this.navOpen);
    },
    logout() {
      this.logout_user();
      location.href = '/';
    },
    closeAccount() {
      if (this.toggle.account) {
        this.toggle.account = !this.toggle.account;
      }
    },
    closeSidebar() {
      const root = document.getElementsByTagName('html')[0];
      if (this.navOpen === 1) {
        root.classList.remove('nav-open');
        this.navOpen = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~/assets/css/material-dashboard.css";
</style>
