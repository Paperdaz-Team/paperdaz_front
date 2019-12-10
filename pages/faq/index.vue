<template>
  <div class="" />
</template>


<script>
export default {
  layout: 'faq_layout',
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.$router.push({ path: '/faq/general' });
  },
  methods: {},
  head: {
    title: 'Billing FAQs',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
};
</script>


<style scoped>

</style>
