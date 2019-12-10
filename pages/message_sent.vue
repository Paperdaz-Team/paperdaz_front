<template>
  <!-- Card register -->
  <div class="card message-sent__container p-5 shadow my-5">
    <!-- Card content -->
    <div class="card-body">
      <!-- Title -->
      <div class="row">
        <div class="col-12 text-center">
          <img
            :src="require('@/assets/img/tree_small.png')"
            alt
            style="height: 200px">
          <div style="font-size: 18px; margin-top: 20px;">
            Well done !
          </div>

          <div
            style="margin-top: 30px; font-size: 14px;">
            Now, check your email to complete the process
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Card register end-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MessageSent',
  methods: {
    ...mapActions('auth', ['recover_password']),
  },
  computed: {
    ...mapGetters('auth', ['errorMsg', 'error', 'loading', 'user']),
  },
};
</script>

<style lang="scss">
  .message-sent__container {
    max-width: 500px;
    margin: auto;
  }
</style>
