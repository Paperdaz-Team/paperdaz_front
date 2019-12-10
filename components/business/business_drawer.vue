<template>
  <v-navigation-drawer
    absolute
    class="hidden-lg hidden-md"
    hide-overlay
    temporary
    v-if="drawer"
    v-model="openDrawer">
    <v-list class="pa-1 my-5">
      <v-list-tile avatar>
        <v-flex
          align-center
          justify-center
          layout
          md8
          sm6
          text-xs-center
          xs12>
          <v-avatar
            :size="avatarSize"
            :tile="tile"
            color="grey lighten-4">
            <img
              :src="formImage()"
              alt="avatar">
          </v-avatar>
        </v-flex>
      </v-list-tile>
    </v-list>
    <div class="text-center mb-5">
      <p style="font-weight: bold;">
        {{ user.email }}
      </p>
      <el-button
        @click="logout()"
        type="text">
        Logout
      </el-button>
    </div>

    <div class="px-3">
      <b-nav
        class="mt-5"
        vertical>
        <b-nav-item
          :active="$route.name==='business-users-dashboard'"
          :to="{path:'/business-users/dashboard'}">
          Dashboard
        </b-nav-item>
        <b-nav-item
          :active="$route.name==='business-users-company-files'"
          :to="{path:'/business-users/company-files'}">
          Company Files
        </b-nav-item>
        <b-nav-item
          :active="$route.name==='business-users-send-request'"
          :to="{path:'/business-users/send-request'}">
          Send Request
        </b-nav-item>
      </b-nav>
    </div>
  </v-navigation-drawer>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['drawer'],
  data() {
    return {
      slider: 130,
      tile: false,
    };
  },
  watch: {},
  methods: {
    logout() {
      this.logout_user();
      this.$router.push('/');
    },
    formImage() {
      if (this.user.image === undefined) {
        return require('@/assets/img/avatar5.png');
      }
      return this.$API + this.user.image;
    },
    ...mapActions('user_mgt', ['logout_user']),
  },
  computed: {
    avatarSize() {
      return `${this.slider}px`;
    },
    openDrawer: {
      // getter
      get() {
        return this.drawer;
      },
      // setter
      set(newValue) {
        this.$emit('draw', newValue);
      },
    },
    ...mapGetters('user_mgt', ['user', 'isLoggedIn']),
  },
};
</script>

<style scoped type="text/css">
  .nav-link.active, .nav-link:hover {
    color: #55a73c;
    background: transparent;
  }

  .nav-link {
    color: rgba(51, 51, 51, 0.8313725490196079);
    font-size: 16px;
    background: transparent;
  }

  .el-button--text {
    color: #55a73c;
    padding: 0;
  }

  .application a {
    cursor: pointer;
    color: #53A63E;
  }

  aside {
    background: #fff !important;
  }
</style>
