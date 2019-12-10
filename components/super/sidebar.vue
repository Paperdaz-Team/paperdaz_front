<template>
  <ul class="nav">
    <li
      :class="thisRoute('super-bills')?'active':''"
      class="nav-item active visible-xs">
      <a
        @click.prevent="logout"
        class="nav-link"
        href="#">
        <i class="ti ti-arrow-up" />
        <p>Log out</p>
      </a>
    </li>
    <li
      :class="thisRoute('super-dashboard')?'active':''"
      class="nav-item">
      <router-link
        :to="{name: 'super-dashboard'}"
        class="nav-link">
        <i class="ti ti-layout-media-right-alt" />
        <p>Dashboard</p>
      </router-link>
    </li>
    <li
      :class="thisRoute('super-users-free')?'active':''"
      class="nav-item">
      <router-link
        :to="{name: 'super-users-free'}"
        class="nav-link">
        <i class="ti ti-user" />
        <p>Free Users</p>
      </router-link>
    </li>
    <li
      :class="thisRoute('super-users-business')?'active':''"
      class="nav-item">
      <router-link
        :to="{name: 'super-users-business'}"
        class="nav-link">
        <i class="ti ti-money" />
        <p>business users</p>
      </router-link>
    </li>
    <li
      :class="thisRoute('super-promotions')?'active':''"
      class="nav-item">
      <router-link
        :to="{name: 'super-promotions'}"
        class="nav-link">
        <i class="ti ti-package" />
        <p>promotions</p>
      </router-link>
    </li>
    <li
      :class="thisRoute('super-campaigns')?'active':''"
      class="nav-item">
      <router-link
        :to="{name: 'super-campaigns'}"
        class="nav-link">
        <i class="ti ti-shine" />
        <p>campaigns</p>
      </router-link>
    </li>
    <li
      :class="thisRoute('super-packages-solutions')?'active':''"
      class="nav-item">
      <router-link
        :to="{name: 'super-packages-solutions'}"
        class="nav-link">
        <i class="ti ti-shine" />
        <p>Packages Features</p>
      </router-link>
    </li>
    <li
      :class="thisRoute('super-packages-list')?'active':''"
      class="nav-item">
      <router-link
        :to="{name: 'super-packages-list'}"
        class="nav-link">
        <i class="ti ti-shine" />
        <p>Packages List</p>
      </router-link>
    </li>
    <li
      :class="thisRoute('super-faqs')?'active':''"
      class="nav-item">
      <router-link
        :to="{name: 'super-faqs'}"
        class="nav-link">
        <i class="ti ti-support" />
        <p>FAQs</p>
      </router-link>
    </li>
    <li
      :class="thisRoute('super-pages')?'active':''"
      class="nav-item">
      <router-link
        :to="{name: 'super-pages'}"
        class="nav-link">
        <i class="ti ti-view-list" />
        <p>Pages</p>
      </router-link>
    </li>
    <li
      :class="thisRoute('super-bills')?'active':''"
      class="nav-item">
      <router-link
        :to="{name: 'super-bills'}"
        class="nav-link">
        <i class="ti ti-wallet" />
        <p>Bill Management</p>
      </router-link>
    </li>
  </ul>
</template>


<script type="text/javascript">
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('user_mgt', ['logout_user']),
    thisRoute(pag) {
      if (this.$route.name === pag) {
        return true;
      }
    },
    logout() {
      this.logout_user();
      location.href = '/';
    },
  },
};
</script>

<style scoped type="text/css">
  /*@import "~@/assets/css/material-dashboard.css";*/
</style>


<style lang="scss" scoped type="text/css">
  @import "~/assets/css/material-dashboard.min.css";
</style>
