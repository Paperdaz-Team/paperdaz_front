<template>
  <d-container
    class="main-content-container px-4"
    fluid>
    <!-- Page Header -->
    <d-row
      class="page-header pt-4 pb-2 m-0"
      no-gutters>
      <d-col
        class="text-center text-sm-left mb-4 mb-sm-0"
        col
        sm="4">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">
          Promotions List
        </h3>
      </d-col>
    </d-row>

    <!-- Promotions Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0">
              List of available promotions
            </h6>
          </div>
          <div class="card-body p-0 pb-3 text-center table-responsive">
            <table
              class="table mb-0 table-hover"
              v-if="coupons">
              <thead class="bg-light">
                <tr>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    #
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Code
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Title
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Fee
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Type
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Description
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  :key="index"
                  class="pointer"
                  v-for="(coupon, index) in coupons">
                  <td>
                    {{ index + 1 }}
                  </td>
                  <td>
                    {{ coupon.code }}
                  </td>
                  <td>
                    {{ coupon.title }}
                  </td>
                  <td>
                    {{ coupon.subscription_fee }}
                  </td>
                  <td>
                    {{ coupon.subscription_type }}
                  </td>
                  <td>
                    {{ coupon.description }}
                  </td>
                  <td>
                    <i
                      :class="coupon.couponState === 0 ? 'text-danger' : 'text-success'"
                      class="fa fa-circle" />
                    <span
                      class="hidden-xs">{{ readStatus(coupon.couponState) }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="loader"
              style="margin-top: 16px;"
              v-else>
              <v-loader />
            </div>
          </div>
        </div>
      </div>
    </div>
  </d-container>
</template>

<script>
import { mapActions } from 'vuex';
// Components
import VLoader from '@/components/Loader';

export default {
  layout: 'super-user-layout',

  name: 'PromotionsPage',

  components: {
    VLoader,
  },

  filters: {
    dateString(value) {
      return new Date(value).toLocaleDateString();
    },
  },

  data() {
    return {
      coupons: null,
      loadingCoupons: false,
    };
  },

  beforeMount() {
    this.getAllCoupons();
  },

  beforeDestroy() {
    this.coupons = null;
  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('coupons', ['getCoupons']),
    getAllCoupons(page = 1) {
      this.loadingCoupons = true;
      this.callWithToken({
        parameters: {},
        action: this.getCoupons,
      }).then((success) => {
        this.coupons = this.$store.getters['coupons/coupons'];
        this.loadingCoupons = false;
      })
        .catch(error => console.error(error));
    },
    readStatus(status) {
      if (status === 0) {
        return 'Suspended';
      }
      if (status === 1) {
        return 'Active';
      }
    },
  },
};
</script>
