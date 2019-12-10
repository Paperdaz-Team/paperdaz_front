<template>
  <profile v-else />
</template>

<script type="text/javascript">
import profile from '@/components/super/user_profile';

export default {
  layout: 'super_layout',
  meta: {
    requiresAuth: true,
  },
  head: {
    title: 'Free User',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  components: {
    profile,
  },
};
</script>
