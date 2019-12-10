<template>
  <div class="community-layout">
    <p-header />
    <nuxt />
  </div>
</template>

<script>
import header from '@/components/header';

export default {
  name: 'CommunityLayout',
  components: {
    pHeader: header,
  },
};
</script>
