<template>
  <section>
    {{ page }}
  </section>
</template>


<script type="text/javascript">
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  meta: { requiresAuth: true },
  layout: 'super_layout',
  head: {
    title: 'Modify Page',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  data() {
    return {};
  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('pages', ['getPages']),
    ...mapMutations('pages', ['setPage']),

  },
  mounted() {

  },
  computed: {
    ...mapGetters('user_mgt', ['session', 'user']),
    ...mapGetters('pages', ['page', 'error', 'message', 'loading']),


  },
};
</script>
