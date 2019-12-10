<template>
  <d-navbar-nav class="border-left flex-row">
    <li class="nav-item dropdown">
      <a
        class="nav-link px-3 user-spinner"
        v-if="!userData">
        <i class="fas fa-spinner fa-spin" />
      </a>
      <a
        class="nav-link dropdown-toggle text-nowrap px-3"
        v-d-toggle.user-actions
        v-else>
        <img
          :src="require('@/assets/img/avatar5.png')"
          alt="User Avatar"
          class="user-avatar rounded-circle mr-2">
        <span class="d-md-inline-block">{{ userData.firstName }} {{ userData.lastName }}</span>
      </a>
      <d-collapse
        class="dropdown-menu dropdown-menu-small"
        id="user-actions">
        <router-link
          class="dropdown-item pointer"
          tag="a"
          to="/super-user/profile">
          <i class="material-icons">&#xE7FD;</i> Profile
        </router-link>
        <d-dropdown-divider />
        <a
          @click.prevent="logout"
          class="dropdown-item text-danger pointer">
          <i class="material-icons text-danger">&#xE879;</i> Logout
        </a>
      </d-collapse>
    </li>
  </d-navbar-nav>
</template>

<script>
import { mapActions } from 'vuex';
// Components

export default {
  name: 'NavbarNav',

  data() {
    return {
      userData: {},
    };
  },

  beforeMount() {
    this.userData = this.$store.getters['user_mgt/user'];
  },

  methods: {
    ...mapActions('user_mgt', ['logout_user']),
    logout() {
      this.logout_user();
      this.$router.push('/');
    },
  },
};
</script>


<style>
  .nav-link:hover {
    cursor: pointer;
  }

  .user-spinner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }
</style>
