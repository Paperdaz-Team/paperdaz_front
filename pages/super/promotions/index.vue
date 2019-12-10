<template>
  <section>
    <div class="row">
      <div class="col-lg-10" />
      <div class="col-lg-2 pull-right">
        <button
          @click="newCoupon = true"
          class="btn btn-success pull-right">
          Add Coupon
        </button>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card card-plain">
        <div class="card-header card-header-success">
          <h4 class="card-title mt-0">
            Promotions/Coupons
          </h4>
          <p class="card-category">
            Here is a list of available Coupons
          </p>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="">
                <th />
                <th>
                  Code
                </th>
                <th>
                  Title
                </th>
                <th>
                  Fee
                </th>
                <th>
                  Type
                </th>
                <th>
                  Description
                </th>
                <th>
                  Status
                </th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in coupons">
                  <td>
                    <b-form-checkbox
                      :unchecked-value="-2"
                      :value="index"
                      v-model="selected" />
                  </td>
                  <td>
                    {{ item.code }}
                  </td>
                  <td>
                    {{ item.title }}
                  </td>
                  <td>
                    {{ item.subscription_fee }}
                  </td>
                  <td>
                    {{ item.subscription_type }}
                  </td>
                  <td>
                    {{ item.description }}
                  </td>
                  <td>
                    <i
                      :class="item.couponState === 0?'text-primary':'text-success'"
                      :title="readStatus(item.couponState)"
                      class="fa fa-circle"
                      v-b-tooltip.hover />
                    <span
                      class="hidden-xs">{{ readStatus(item.couponState) }}</span>
                  </td>
                </tr>
                <tr v-if="coupons.length === 0">
                  <td
                    class="text-center"
                    colspan="4">
                    No Coupons Yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row">
            <div class="col-lg-7" />
            <div class="col-lg-5 pull-right">
              <button
                :disabled="selected === -2"
                @click="deleteItem"
                class="btn btn-success pull-right">
                Delete
              </button>
              <button
                :disabled="selected === -2"
                @click="openEdit = true"
                class="btn btn-success pull-right">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <n-coupon
      :open="newCoupon"
      @close="newCoupon = false"
      @save="saveIt"
      v-if="newCoupon" />
    <e-coupon
      :item="selectedItem"
      :open="openEdit"
      @close="openEdit = false"
      @save="saveIt"
      v-if="openEdit" />
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';
import nCoupon from '@/components/modals/newCoupon';
import eCoupon from '@/components/modals/editCoupon';

export default {
  meta: { requiresAuth: true },
  layout: 'super_layout',
  head: {
    title: 'Promotions',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  components: { nCoupon, eCoupon },
  data() {
    return {
      selected: -2,
      openEdit: false,
      newCoupon: false,
    };
  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('coupons', ['createCoupon', 'getCoupons', 'deleteCoupon']),

    openNewCoupon() {
      this.newCoupon = true;
    },
    readStatus(sta) {
      if (sta === 0) {
        return 'Suspended';
      }
      if (sta === 1) {
        return 'Active';
      }
    },
    update(index, row, which) {
      if (which === 'edit') {
        this.couponNew = row;
        this.newCoupon = true;
      }
      if (which === 'suspend') {
        row.couponState = 0;
        this.couponNew = row;
        this.saveCoupon();
      }
      if (which === 'activate') {
        row.couponState = 1;
        this.couponNew = row;
        this.saveCoupon();
      }
    },

    getAllCoupons(page = 1) {
      this.callWithToken({
        parameters: {
          page,
        },
        action: this.getCoupons,
      }).then((success) => {

      });
    },
    deleteItem() {
      this.callWithToken({
        parameters: { code: this.coupons[this.selected].code },
        action: this.deleteCoupon,
      }).then((success) => {
        this.$message({
          message: success.message,
          type: success.success ? 'success' : 'error',
        });
        this.getAllCoupons();
      });
    },
    saveIt(coup) {
      this.couponNew = coup;
      this.saveCoupon();
    },
    saveCoupon() {
      this.callWithToken({
        parameters: this.couponNew,
        action: this.createCoupon,
      }).then((success) => {
        this.$message({
          message: success.message,
          type: success.success ? 'success' : 'error',
        });
        this.getAllCoupons();
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
  },
  mounted() {
    this.getAllCoupons();
  },
  computed: {
    ...mapGetters('user_mgt', ['session', 'user']),
    ...mapGetters('coupons', ['coupons', 'coupon', 'error', 'message', 'loading', 'pages', 'page']),
    selectedItem() {
      if (this.selected   !==   -2) {
        return this.coupons[this.selected];
      }
      return {};
    },

  },
};
</script>
