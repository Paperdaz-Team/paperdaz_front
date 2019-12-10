<template>
  <section>
    <div class="row mt-5">
      <div class="col-lg-2" />
      <div class="col-3 col-lg-3">
        <p>Subscription</p>
      </div>
      <div class="col-9 col-lg-4">
        <p>Subscription Type: {{ coupon.title }}</p>
        <p>
          Subscription Charge: {{ coupon.subscription_fee }}$ {{
            coupon.subscription_type }}
        </p>
      </div>
      <div class="col-lg-2" />
    </div>


    <div class="row mt-5">
      <div class="col-lg-2" />
      <div class="col-3 col-lg-3">
        <p>Billing Information</p>
      </div>
      <div class="col-9 col-lg-4">
        <p>comming soon</p>
        <!-- <p>subscription Type: {{coupon.title}}</p>
				<p>subscription Charge: {{coupon.subscription_fee}}$ {{coupon.subscription_type}}</p> -->
      </div>
      <div class="col-lg-2" />
    </div>

    <div class="row mt-5">
      <div class="col-lg-2" />
      <div class="col-3 col-lg-3">
        <p>Receipts and Invoices</p>
      </div>
      <div class="col-9 col-lg-4">
        <el-button class="btn_view">
          View
        </el-button>
      </div>
      <div class="col-lg-2" />
    </div>
  </section>
</template>


<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('coupons', ['getCoupon', 'createCoupon']),
  },
  computed: {
    ...mapGetters('user_mgt', ['user']),
    ...mapGetters('coupons', ['coupon']),
  },
  mounted() {
    this.callWithToken({
      parameters: {
        code: this.user.coupon,
      },
      action: this.getCoupon,
    }).then((finished) => {

    });
  },
};
</script>

<style>
  .btn_view, .btn_view:hover, .btn_view:focus {
    background: #53A63E;
    border-color: #53A63E;
    height: 35px;
    padding: 0;
    line-height: 35px;
    width: 110px;
    box-shadow: 0 0.5px 1rem rgba(0, 0, 0, 0.15) !important;
    border-radius: 4px;
    color: #fff;
  }

  p {
    margin-bottom: 5px;
  }

  @media (max-width: 767px) {
    p {
      font-size: 12px;
    }
  }

</style>
