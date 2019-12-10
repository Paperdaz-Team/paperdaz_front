<template>
  <div id="teams-page">
    <teams-component />
  </div>
</template>

<script>
import TeamsComponent from '@/components/business/teams';

export default {
  name: 'TeamsPage',
  layout: 'business-layout',
  components: {
    TeamsComponent,
  },
};
</script>
