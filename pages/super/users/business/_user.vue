<template>
  <div class="card card-plain">
    <div class="card-header card-header-success">
      <h4 class="card-title mt-0">
        Business User Details
      </h4>
    </div>
    <div class="card-body">
      <profile />
    </div>
  </div>
</template>

<script type="text/javascript">
import profile from '@/components/super/user_profile';

export default {
  layout: 'super_layout',
  meta: {
    requiresAuth: true,
  },
  head: {
    title: 'Business User',
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
