<template>
  <div
    class="card coupon-code-card shadow col-lg-8 col-md-6 col-sm-12"
    v-if="$route.query.code && selectedCoupon.title">
    <div class="card-body">
      <div class="coupon-title__container">
        <h1>Coupon</h1>
        <p class>
          {{ coupon.title }}
        </p>
      </div>

      <div class="coupon-description__container">
        <h2>Package Description</h2>
        <p class>
          {{ coupon.description }}
        </p>
      </div>

      <div class="coupon-description__container">
        <h2>Subscription</h2>
        <p>{{ coupon.subscription_fee+' '+coupon.subscription_type }}</p>
      </div>
    </div>
  </div>
  <section
    id="cuponcodea"
    v-else>
    <div
      class="shadow col-lg-7 col-12 col-md-10"
      id="cuponcode">
      <h2 class="text-center">
        Hello and welcome!
      </h2>

      <p
        class="pt-4">
        we are here to save the planet together! One company at time, one user at
        a time toward a paperless environment. Enter the promotional code to get
        amazing discounts.
      </p>
      <div class="row mt-5">
        <div class="col-8">
          <div class="form-group">
            <el-input
              class="form-controlc"
              type="text"
              v-model="code" />
          </div>
        </div>
        <div class="col-4">
          <el-button
            @click="getMyCoupon"
            class="btn btn-blockc">
            <span class="hidden-xs">Find My Code</span>
            <span class="visible-xs fa fa-search" />
          </el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      code: '',
    };
  },
  computed: {
    ...mapGetters('user_mgt', ['session', 'user']),
    ...mapGetters('coupons', ['coupon', 'error', 'message', 'loading']),
    selectedCoupon() {
      return this.$store.getters['coupons/coupon'];
    },
  },
  beforeMount() {
    const parameters = {
      code: this.$route.query.code,
      token: this.$store.getters['user_mgt/session'] || '',
    };
    this.$store.dispatch('coupons/getCoupon', parameters);
  },
  mounted() {
    this.code = this.$route.query.coupon || '';
  },
  beforeDestroy() {
    this.$store.commit('coupons/clearSelectedCoupon');
  },
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('coupons', ['getCoupon']),
    getMyCoupon() {
      this.callWithToken({
        parameters: {
          code: this.code,
        },
        action: this.getCoupon,
      }).then((rep) => {
        if (rep.success) {
          this.$router.push({
            name: 'register',
            query: { soft_launch: 1, coupon: this.code },
          });
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
  },
};
</script>


<style scoped>
  @import "./../cssm/var.css";
  @import "./../cssm/btn.css";
  @import url(https://fonts.googleapis.com/css?family=Roboto:300,

  400,
  500
  )
  ;

  #cuponcodea {
    min-height: 400px;
    position: relative;
    width: 100%;
  }

  #cuponcode h2 {
    font-size: 42px;
    font-weight: 400;
  }

  #cuponcode {
    margin: auto;
    background: rgba(245, 245, 245, 0.92) !important;
    padding: 40px;
    position: relative;
    z-index: 4;
    max-width: 550px;
    border-radius: 10px;
    margin-top: 100px;
  }

  p {
    color: #53a63e;
    font-size: 18px;
    line-height: 28px;
    font-weight: normal;
  }

  .fb-btn {
    background: #4267b2;
    color: #fff;
  }

  .fb-btn:hover {
    color: #fff;
  }

  .social-btn {
    width: 100%;
    border: 1px solid #53a63e !important;
    text-align: left !important;
    padding: 0px 15px !important;
    font-weight: 700 !important;
    height: 40px;
  }

  .btn-blockc {
    width: 100%;
    background: #53a63e;
    color: #ffffff;
    font-weight: 700 !important;
  }

  .btn-blockc:hover {
    color: #fff !important;
    background: #53a63e !important;
  }

  .btn-blockc {
    width: 100%;
    background: #53a63e;
    color: #ffffff;
    font-weight: normal !important;
    height: 45px;
  }

  .col-4 {
    padding-left: 0;
  }

  .form-controlc,
  .form-controlc > *,
  .form-group input {
    background: #eee !important;
    color: #5c5d5f !important;
  }

  .colorwhite {
    color: #ffffff;
  }

  a,
  a:hover {
    text-decoration: none;
  }

  .title {
    font-size: 22px;
    color: rgba(0, 0, 0, 0.87);
    font-weight: 400;
    margin-bottom: 30px;
  }

  .coupon-code-card {
    width: 100%;
    max-width: 450px !important;
  }

  .coupon-title__container h1,
  .coupon-description__container h2,
  .coupon-subscription__container h2 {
    font-size: 20px;
    font-family: sans-serif;
    letter-spacing: 0.25px;
    line-height: 32px;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    margin-bottom: 0;
  }

  .coupon-title__container p,
  .coupon-description__container p,
  .coupon-subscription__container p {
    font-size: 14px;
    letter-spacing: 0.1px;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    line-height: 22px;
    color: #53a63ea8;
  }

  @media (max-width: 1900px) {
    #cuponcode {
      margin-left: 0;
    }
  }

  @media (max-width: 1199px) {
    #cuponcode {
      margin-left: 0;
    }

    p {
      font-size: 16px;
    }

    #cuponcode h2 {
      font-size: 36px;
    }

    .btn-blockc {
      font-size: 12px;
    }
  }

  @media (max-width: 991px) {
    #cuponcode {
      margin: 0 auto;
      max-width: 80%;
    }

    .circular {
      height: auto;
      background-size: contain;
      background-position: center;
    }
  }

  @media (max-width: 767px) {
    #cuponcode {
      margin: 0 auto 15px;
      max-width: 90%;
      padding: 20px;
    }

    #cuponcode h2 {
      font-size: 24px;
    }

    p {
      font-size: 14px;
      line-height: 20px;
      padding-top: 10px !important;
    }

    #cuponcodea {
      min-height: auto;
    }

    .title {
      font-size: 16px !important;
    }
  }
</style>
