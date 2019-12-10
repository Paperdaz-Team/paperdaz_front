<template>
  <d-card class="card-small mb-4 pt-3">
    <!-- Card Header -->
    <d-card-header class="border-bottom text-center">
      <!-- User Avatar -->
      <div class="mb-3 mx-auto">
        <img
          :alt="userDetails.firstName"
          :src="userDetails.avatar || defaultAvatar"
          class="rounded-circle"
          width="110">
      </div>

      <!-- User Name -->
      <h4 class="mb-0">
        {{ userDetails.firstName }} {{ userDetails.lastName
        }}
      </h4>

      <!-- User Rol Title -->
      <span class="text-muted d-block mb-2">Super User</span>
    </d-card-header>
  </d-card>
</template>

<script>
export default {
  name: 'UserDetails',
  props: {
    /**
       * The user details.
       */
    userDetails: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultAvatar: require('@/assets/img/avatar5.png'),
    };
  },
};
</script>
