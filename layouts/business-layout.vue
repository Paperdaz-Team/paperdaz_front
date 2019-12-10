<template>
  <v-app>
    <p-header />
    <v-content>
      <b-row class="container">
        <b-col
          class="hidden-touch"
          lg="2">
          <b-sidebar />
        </b-col>
        <b-col
          lg="10"
          md="12"
          sm="12">
          <nuxt />
        </b-col>
      </b-row>
    </v-content>
    <b-footer />
    <b-modal-drawer />
  </v-app>
</template>

<script>

import header from '@/components/header';
import footer from '@/components/footer';
import sidebar from '@/components/business/business_sidebar';
import ModalDrawer from '@/components/modals/ModalDrawer';

export default {
  components: {
    pHeader: header,
    bFooter: footer,
    bSidebar: sidebar,
    bModalDrawer: ModalDrawer,
  },
  data() {
    return {
      drawer: null,
    };
  },
  computed: {
    image() {
      const t = require('./../assets/img/left-img.png');
      console.log(t);
      return t;
    },
    drawerVal() {
      return this.drawer;
    },
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
  methods: {
    draw(val) {
      this.drawer = val;
    },
  },
};
</script>

<style>
  body {
    overflow-y: scroll !important;
    background-color: #fafafa !important;
  }

  .container {
    flex-grow: 1;
    margin: 0 auto;
    position: relative;
  }

  .hidden-touch {
    display: none;
  }

  .v-content {
    padding-top: 90px !important;
  }

  @media screen and (min-width: 1024px) {
    .container {
      max-width: 1150px;
    }

    .container.is-fluid {
      margin-left: 32px;
      margin-right: 32px;
      max-width: none;
    }

    .hidden-touch {
      display: block !important;
    }
  }
</style>
