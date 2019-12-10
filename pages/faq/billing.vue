<template>
  <div class="pt-5 ml-6">
    <div class="row">
      <div
        class="col-lg-12 py-3"
        v-for="ech in generalFaqs">
        <p>Q: {{ ech.question }}</p>
        <p>A: {{ ech.answer }}</p>
      </div>
      <div
        class="col-lg-12"
        v-if="generalFaqs.length === 0">
        No FAQs found for this category
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'faq_layout',
  data() {
    return {};
  },
  mounted() {
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
  computed: {
    ...mapGetters('faq', ['faqs']),
    generalFaqs() {
      return this.faqs.filter(e => e.category === 3);
    },
  },
};
</script>
