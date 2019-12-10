<template>
  <v-app>
    <p-header />
    <v-content class="px-3">
      <b-row>
        <b-col
          class="hidden-xs"
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
import sidebar from '@/components/admin_sidebar';
import ModalDrawer from '@/components/modals/ModalDrawer';

export default {
  head() {
    return {

      meta: [
        { requiresAuth: true },
      ],
    };
  },
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
  },
};
</script>

<style>
  body {
    overflow-y: scroll !important;
    background-color: #fafafa !important;
  }

  .v-content {
    padding-top: 90px !important;
  }
</style>
