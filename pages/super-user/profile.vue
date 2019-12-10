<template>
  <d-container
    class="main-content-container px-4"
    fluid>
    <!-- Page Header -->
    <d-row class="page-header py-4 m-0">
      <d-col
        class="text-center text-sm-left"
        col
        sm="4">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">
          User Profile
        </h3>
      </d-col>
    </d-row>

    <!-- Content -->
    <d-row class="pt-4">
      <d-col lg="4">
        <upl-user-details
          :user-details="userData"
          v-if="userData" />
      </d-col>
      <d-col lg="8">
        <upl-user-account-details
          :account-data="userData"
          v-if="userData" />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import UserDetails
  from '@/components/superLayout/UserProfile/UserDetails';
import UserAccountDetails
  from '@/components/superLayout/UserProfile/UserAccountDetails';

export default {
  name: 'UserProfile',
  layout: 'super-user-layout',
  components: {
    uplUserDetails: UserDetails,
    uplUserAccountDetails: UserAccountDetails,
  },
  data() {
    return {
      userData: null,
    };
  },
  beforeMount() {
    this.userData = this.$store.getters['user_mgt/user'];
  },
};
</script>
