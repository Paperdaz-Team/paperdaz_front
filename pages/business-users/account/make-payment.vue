<template>
  <section>
    <div
      class="row"
      v-loading="loading">
      <div class="col-lg-3 col-md-2 col-1" />
      <div class="col-10 col-lg-6 col-md-8">
        <section v-if="status === 'starting'">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <th
                  class="text-center"
                  colspan="2">
                  Bill Payment
                </th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Unit Cost
                  </td>
                  <td>
                    ${{ bill.coupon.subscription_fee }}
                  </td>
                </tr>
                <tr>
                  <td>
                    Unit Type
                  </td>
                  <td>
                    {{ bill.coupon.subscription_type }}
                  </td>
                </tr>
                <tr>
                  <td>
                    How Many Units
                  </td>
                  <td>
                    <input
                      class="form-controlc"
                      max="100"
                      min="1"
                      type="number"
                      v-model="units">
                  </td>
                </tr>

                <tr class="text-bold">
                  <td class="text-right">
                    Total
                  </td>
                  <td>
                    ${{ total }}
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button
                      @click="sendPayment"
                      class="btn btn-primary btn-block">
                      Pay
                    </button>
                  </td>
                </tr>
                <tr>
                  <td
                    class="text-center"
                    colspan="2">
                    This Payment will extend your account validity till <b>{{
                      newValidity }}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section v-if="status === 'complete'">
          <div class="container text-center mt-5">
            <div
              class="btn-blc mx-auto rounded-circle"
              style="height: 180px; width: 180px;font-size: 120px;">
              <i class="ti ti-check" />
            </div>

            <h4 class="mt-5">
              Payment Successfull
            </h4>
          </div>
        </section>
        <section v-if="status === 'failure'">
          <div class="container text-center mt-5">
            <div
              class="btn-blc mx-auto rounded-circle"
              style="height: 180px; width: 180px;font-size: 120px;">
              <i class="ti ti-close" />
            </div>

            <h4 class="mt-5">
              Payment Failed
            </h4>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';

export default {
  layout: 'business-layout',
  asyncData(context) {
  },
  meta: {
    requiresAuth: true,
  },
  components: {},
  data() {
    return {
      units: 1,
      totalia: 0,
      nV: '',
      loading: false,
    };
  },
  mounted() {
    if (this.$route.query.status) {
      if (this.$route.query.status === 'success') {
        this.executBill();
      }
    } else {
      this.loading = true;
      this.grabBill();
    }
  },
  head: {
    title: 'Making Payments',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('users', ['getBill', 'executeBill', 'payBill']),
    grabBill() {
      this.callWithToken({
        parameters: {},
        action: this.getBill,
      }).then((result) => {
        this.loading = false;
      });
    },
    sendPayment() {
      this.loading = true;
      const localObj = JSON.parse(JSON.stringify(this.bill));
      localObj.coupon.units = this.units;
      localObj.coupon.total = this.total;
      localObj.coupon.newValidity = new Date(this.newValidity).getTime();
      this.callWithToken({
        parameters: localObj,
        action: this.payBill,
      }).then((result) => {
        this.loading = false;
        this.$message({
          type: 'info',
          message: result.message,
        });
        location.href = result.result.redirect;
      });
    },
    executBill() {
      this.loading = true;
      const { query } = this.$route;
      const localObj = {
        payerId: query.PayerID,
        paymentId: query.paymentId,
      };
      this.callWithToken({
        parameters: localObj,
        action: this.executeBill,
      }).then((result) => {
        this.$message({
          type: 'info',
          message: result.message,
        });
        if (result.status) {
          this.$router.push({ query: { status: 'complete' } });
        } else {
          this.$router.push({ query: { status: 'failure' } });
        }
        this.loading = false;
      });
    },
    readableTime(val) {
      const df = new Date(val);
      const fdd = `${this.months[df.getMonth()]} ${df.getDate()}, ${df.getFullYear()}`;

      return fdd;
    },

  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }));
    },
    ...mapGetters('users', ['bill']),
    total() {
      return Number(this.bill.coupon.subscription_fee) * Number(this.units);
    },
    status() {
      if (this.$route.query.status === 'success') {
        return 'success';
      } if (this.$route.query.status === 'complete') {
        return 'complete';
      } if (this.$route.query.status === 'failed') {
        return 'failure';
      }
      return 'starting';
    },
    newValidity() {
      const nt = new Date(Number(this.bill.validity.valid_till));

      if (this.bill.coupon.subscription_type === 'monthly') {
        nt.setMonth(nt.getMonth() + Number(this.units));
      }
      if (this.bill.coupon.subscription_type === 'yearly') {
        nt.setFullYear(nt.getFullYear() + Number(this.units));
      }
      return this.readableTime(nt);
    },
    months() {
      const mt = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];
      return mt;
    },

  },
};
</script>


<style type="text/css">
  .no-files:hover {
    background: transparent !important;
  }

  td {
    width: auto !important;
  }

</style>
