<template>
  <v-navigation-drawer
    absolute
    class="visible-xs visible-sm"
    hide-overlay
    temporary
    v-if="drawer"
    v-model="drawer">
    <v-list class="pa-1 my-5">
      <v-list-tile avatar>
        <img
          :src="formImage()"
          class="elevation-2 mx-auto d-block rounded-circle"
          style="width: 130px; border: 3px solid red">
      </v-list-tile>
    </v-list>
    <div class="text-center mb-5">
      <p style="font-weight: bold;">
        Administrator
      </p>
      <el-button
        @click="logout()"
        type="text">
        Logout
      </el-button>
    </div>

    <div class="px-3">
      <b-nav
        class="ml-4"
        vertical>
        <b-nav-item
          :active="$route.path === '/admin'"
          :to="{path:'/admin'}">
          Dashboard
        </b-nav-item>
        <b-nav-item
          :active="$route.path === '/admin/users'"
          :to="{path:'/admin/users'}">
          Users
        </b-nav-item>
        <b-nav-item
          :active="$route.path === 'admin/coupons'"
          :to="{path:'/admin/coupons'}">
          Coupons
        </b-nav-item>
      </b-nav>
    </div>
  </v-navigation-drawer>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    drawer: {
      type: null,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      this.logout_user();
      this.$router.push({ name: 'loginPage' });
    },
    formImage() {
      if (this.user.image === undefined) {
        return require('@/assets/img/avatar5.png');
      }
      return $API + user.image;
    },
    ...mapActions('user_mgt', ['logout_user']),
  },
  computed: {
    ...mapGetters('user_mgt', ['user', 'isLoggedIn']),
  },
};
</script>

<style scoped type="text/css">
  .active {
    color: brown;
    font-weight: bold;
    border: none;
    border-right: 2px solid brown !important;
  }

  .application a {
    cursor: pointer;
    color: #53a63e;
  }

  .v-navigation-drawer--temporary,
  .v-navigation-drawer--is-mobile {
    background: #fff !important;
  }

  .theme--light.v-navigation-drawer {
    background-color: #fff !important;
  }
</style>
