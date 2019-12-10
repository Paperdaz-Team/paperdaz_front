<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-warning card-header-icon">
              <div class="card-icon">
                <i class="ti ti-bag" />
              </div>
              <p class="card-category">
                Business User Accounts
              </p>
              <h3 class="card-title">
                {{ statistics.businessUsers }}
              </h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <router-link to="/super/users/business">
                  More ...
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="ti ti-user" />
              </div>
              <p class="card-category">
                Free User Accounts
              </p>
              <h3 class="card-title">
                {{ statistics.freeUsers }}
              </h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <router-link to="/super/users/free">
                  More ...
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6">
          <div class="card card-stats">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="ti ti-files" />
              </div>
              <p class="card-category">
                Uploaded Files
              </p>
              <h3 class="card-title">
                {{ statistics.files }}
              </h3>
            </div>
            <div class="card-footer">
              <div class="stats">
                <router-link to="">
                  More ...
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-lg-6">
          <GChart
            :data="filesData"
            :options="chartOptions"
            type="PieChart" />
        </div>
        <div class="col-xs-12 col-lg-6">
          <GChart
            :data="usersData"
            :options="chartOptions"
            type="PieChart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';
import { GChart } from 'vue-google-charts';

export default {
  meta: {
    requiresAuth: true,
  },
  components: { GChart },
  layout: 'super_layout',
  head: {
    title: 'Admin Dashboard',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  data() {
    return {

      chartOptions: {
        pieHole: 0.2,
      },
    };
  },
  computed: {
    filesData() {
      return [
        ['Files', 'Value'],
        ['Completed', this.statistics.completed],
        ['Incomplete', this.statistics.incomplete],
      ];
    },

    usersData() {
      return [
        ['Users', 'Value'],
        ['Business Users', this.statistics.businessUsers],
        ['Free Users', this.statistics.freeUsers],
      ];
    },
    ...mapGetters('users', ['statistics', 'error', 'message', 'loading', 'pages', 'page']),
    ...mapGetters('coupons', ['coupon']),
  },
  mounted() {
    this.getStatistics();
  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('users', ['getStats']),
    ...mapActions('coupons', ['getCoupon', 'createCoupon']),
    getStatistics() {
      this.callWithToken({
        parameters: {},
        action: this.getStats,
      }).then((success) => {
        if (success.success) {

        } else {
          this.$message({
            message: rep.message,
            type: 'error',
            duration: 0,
            showClose: true,
          });
        }
      });
    },
    saveCoupon() {
      this.callWithToken({
        parameters: this.coupon,
        action: this.createCoupon,
      }).then((success) => {
        this.getStatistics();
        this.$message({
          message: success.message,
          type: success.success ? 'success' : 'error',
          duration: 0,
          showClose: true,
        });
      });
    },
    submitCoupon() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.saveCoupon();
        }
      }).catch((error) => {
        this.$message({
          message: error.message,
          type: 'error',
          duration: 0,
          showClose: true,
        });
      });
    },
    handleView(index, row) {
      this.$router.push({ name: 'admin_single_user', params: { id: row.Id } });
    },
  },
};
</script>
