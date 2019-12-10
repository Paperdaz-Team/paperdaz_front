<template>
  <v-app>
    <p-header />
    <v-content>
      <b-row class="main-users-row container mt-3">
        <b-col
          class="hidden-xs"
          lg="2"
          style="padding-left: 0;"
          v-if="isLoggedIn">
          <b-sidebar />
        </b-col>

        <b-col>
          <nuxt />
        </b-col>
      </b-row>
    </v-content>
    <b-footer />
    <modal-drawer />
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import header from '@/components/header';
import footer from '@/components/footer';
import sidebar from '@/components/users_sidebar';
import ModalDrawer from '@/components/modals/ModalDrawer';

export default {
  components: {
    pHeader: header,
    bFooter: footer,
    bSidebar: sidebar,
    ModalDrawer,
  },
  data() {
    return {
      drawer: null,
    };
  },
  mounted() {
  },
  head() {
    return {
      meta: [
        { requiresAuth: true },
      ],
    };
  },
  computed: {
    ...mapGetters('user_mgt', {
      isLoggedIn: 'isLoggedIn',
    }),
    image() {
      const t = require('./../assets/img/left-img.png');
      console.log(t);
      return t;
    },
  },
  methods: {
    ...mapMutations('modals', ['toggleModalDrawer']),
    draw(val) {
      this.drawer = val;
    },
  },
};
</script>

<style>
  body {
    overflow-y: scroll !important;
    background: #fafafa;
  }

  .v-content {
    padding-top: 90px !important;
  }

  .main-users-row {
    margin: 0;
    padding: 0 24px;
  }

  .container {
    flex-grow: 1;
    margin: 0 auto;
    position: relative;
  }

  .search-input-container {
    max-width: 500px !important;
  }

  @media screen and (min-width: 1024px) {
    .container {
      max-width: 1150px;
    }
  }
</style>
