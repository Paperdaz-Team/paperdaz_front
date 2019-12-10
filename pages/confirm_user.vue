<template>
  <!-- Card login -->
  <div
    class="card p-5 shadow"
    v-loading="loading">
    <!-- Card content -->
    <div class="card-body">
      <!-- Title -->
      <div class="row">
        <div class="col-12 text-center">
          <img
            :src="require('@/assets/img/tree_small.png')"
            alt=""
            style="height: 200px">
          <div style="font-size: 18px; margin-top: 20px;">
            Failed to confirm this
            token
          </div>

          <el-button
            @click="resend_msg()"
            class="mx-auto my-3"
            size="mini"
            type="warning">
            Resend Confirmation
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- Card ligin end-->
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {};
  },
  methods: {
    ...mapActions('auth', ['confirm_email', 'resend_confirmation', 'setUser']),
    confirm_token() {
      const d = this;
      d.confirm_email({ token: d.$route.query.token })
        .then((res) => {
          const dtf = res.data;
          if (dtf.success) {
            d.$router.push({ path: '/?confirmed=true' });
          } else {
            d.$message({
              message: dtf.message,
              type: 'warning',
              duration: 0,
              showClose: true,
            });
          }
        }).catch((error) => {
          d.$message({
            message: error.message,
            type: 'error',
            duration: 0,
            showClose: true,
          });
        });
    },

    resend_msg() {
      const d = this;
      this.resend_confirmation({ token: d.$route.params.token })
        .then((res) => {
          const dtf = res.data;
          if (dtf.success) {
            d.$message({
              message: dtf.message,
              type: 'success',
              duration: 0,
              showClose: true,
            });
          } else {
            d.$message({
              message: dtf.message,
              type: 'warning',
              duration: 0,
              showClose: true,
            });
          }
        }).catch((error) => {
          d.$message({
            message: error.message,
            type: 'error',
            duration: 0,
            showClose: true,
          });
        });
    },


  },
  mounted() {
    this.confirm_token();
  },
  computed: {
    ...mapGetters('auth', ['user', 'errorMsg', 'error', 'loading']),
  },
};
</script>


<style>

</style>
