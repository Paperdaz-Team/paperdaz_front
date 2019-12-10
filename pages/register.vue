<template>
  <div class="register-page__container">
    <!-- <div class="card p-5 shadow card-coupon">
      <div class="card-body" v-if="$route.query.coupon">
        <h1 class="title">{{coupon.title}}</h1>

        <h2 class="mt-2">Package Description</h2>
        <p class="title">{{coupon.description}}</p>

        <h2 class="mt-2 title">Subscription</h2>
        <p>$ {{coupon.subscription_fee+' '+coupon.subscription_type}}</p>

        <el-button class="btn btn-blockc mt-5" @click="useCoupon()">Register Now!</el-button>
      </div>
    </div>-->

    <!-- Card register -->
    <div class="card p-5 shadow card-register">
      <!-- Card content -->
      <div
        class="card-body"
        v-if="!isLoggedIn"
        v-loading="loading">
        <!-- Title -->
        <h4 class="card-title mb-4 f-400">
          <span v-if="formStep === 1">Register here....</span>
          <span
            v-if="formStep === 2">Enter password to complete registration</span>
        </h4>

        <a
          class="btn social-btn shadow google_img"
          disabled
          href="#"
          v-if="formStep === 1">Google</a>
        <a
          class="btn social-btn mt-3 shadow fb-btn"
          disabled
          href="#"
          v-if="formStep === 1">Facebook</a>
        <div
          class="or_option"
          v-if="formStep === 1">
          or
        </div>

        <form-register-user
          :saving-data="loading"
          @changeRole="changeRole"
          @changeStep="changeStep"
          @newUser="newUser"
          v-if="role === 3" />
        <form-register-business
          :saving-data="loading"
          @changeRole="changeRole"
          @changeStep="changeStep"
          @newBusiness="newBusiness"
          v-if="role === 2" />
      </div>
    </div>
    <!-- Card register end-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormRegisterUser from '@/components/FormRegisterUser';
import FormRegisterBusiness from '@/components/FormRegisterBusiness';

export default {
  name: 'RegisterPage',
  fetch({ store, redirect }) {
    const userIsLoggedIn = store.getters['user_mgt/isLoggedIn'];
    const user = store.getters['user_mgt/user'];
    if (userIsLoggedIn) {
      if (user.role === 1) return redirect('/super/dashboard');
      if (user.role === 2) return redirect('/business-users/dashboard');
      if (user.role === 3) return redirect('/users/dashboard');
    }
  },
  components: {
    FormRegisterUser,
    FormRegisterBusiness,
  },
  data() {
    return {
      role: this.$route.query.role || 3,
      dis_user: {},
      loading: false,
      formStep: 1,
    };
  },
  beforeDestroy() {
    this.dis_user = {};
    this.formStep = 1;
  },
  head: {
    title: 'Register',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  methods: {
    ...mapActions('auth', ['signup', 'setUser']),
    validateForm(data) {
      const d = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.$route.query.code) {
            rout.query.code = this.coupon.code;
          }

          if (this.dis_user.tnc) {
            this.submitForm();
          } else {
            this.$message({
              message: 'Please Accept the terms and conditions',
              type: 'warning',
              duration: 0,
              showClose: true,
            });
          }
        }
      });
    },

    newBusiness(data) {
      this.dis_user = data;
      this.validateForm();
    },

    newUser(data) {
      this.dis_user = data;
      this.validateForm();
    },

    changeStep(data) {
      this.formStep = data;
    },

    useCoupon() {
      this.role = 2;
      this.$router.push({
        name: 'register',
        query: { soft_launch: 1, code: this.coupon.code },
      });
    },

    changeRole(role) {
      this.dis_user = {};
      this.role = role;
    },

    submitForm() {
      const d = this;
      if (this.$route.query.code) {
        d.dis_user.coupon = this.$route.query.code;
      }
      d.loading = true;
      d.dis_user.role = d.role;
      d.signup(d.dis_user)
        .then((res) => {
          d.loading = false;
          const dtf = res.data;
          if (dtf.success) {
            d.setUser(d.dis_user);
            d.$router.push({ path: '/signup_complete' });
            this.dis_user = {};
          } else {
            d.$message({
              message: dtf.message,
              type: 'warning',
              duration: 0,
              showClose: true,
            });
          }
        })
        .catch((error) => {
          d.loading = false;
          d.$message({
            message: error.message,
            type: 'error',
            duration: 0,
            showClose: true,
          });
        });
    },

    back_btn() {
      this.$router.push({ path: '/register' });
    },
  },
  mounted() {
    if (this.$route.query.soft_launch) {
      this.role = 2;
    } else {
      this.role = 3;
    }
  },
  computed: {
    ...mapGetters('auth', ['errorMsg', 'error', 'user']),
    ...mapGetters('coupons', ['coupon', 'error', 'message']),
    ...mapGetters('user_mgt', ['isLoggedIn']),
    reversal() {
      if (this.$route.query.confirm) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
  .card-register {
    max-width: 500px;
    margin: auto;
    margin-bottom: 35px;
  }

  .fb-btn {
    background: #4267b2;
    color: #fff;
  }

  .fb-btn:hover {
    color: #fff;
  }

  .social-btn.fb-btn {
    background: #4267b2 url(../assets/img/fb.png) no-repeat;
    background-size: 24px;
    background-position: 10px;
    color: #fff;
  }

  .fb-btn:hover {
    color: #fff;
  }

  .f_pwd {
    color: rgba(0, 0, 0, 0.87);
    font-size: 12px;
    margin-top: -10px;
    display: block;
  }

  .social-btn {
    width: 100%;
    border: 1px solid #d6cfcf;
    padding: 0 15px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    font-size: 16px;
    color: #212529;
    border-radius: 3px;
  }

  .google_img {
    background: url(/google.png) no-repeat;
    background-size: 24px;
    background-position: 10px;
  }

  .or_option {
    margin: 30px 0;
    text-align: center;
    font-size: 16px;
    color: #ccc;
    position: relative;
  }

  .or_option:before {
    content: "";
    position: absolute;
    background: #ccc;
    width: 34%;
    height: 1px;
    left: 0;
    top: 13px;
  }

  .or_option:after {
    content: "";
    position: absolute;
    background: #ccc;
    width: 34%;
    height: 1px;
    right: 0;
    top: 13px;
  }

  .colorwhite {
    color: #ffffff;
  }

  a,
  a:hover {
    text-decoration: none;
  }

  .register_p p {
    font-size: 12px;
    margin-bottom: 5px;
  }

  .register_p p a {
    color: #55a73c;
  }

  .card form {
    width: 100%;
  }

  .title {
    font-size: 22px;
    color: rgba(0, 0, 0, 0.87);
    font-weight: 400;
    margin-bottom: 30px;
  }

  .register-page__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .card-coupon {
    width: 100%;
    max-width: 475px !important;
  }

  @media (max-width: 767px) {
    .title {
      font-size: 16px !important;
    }

    .or_option {
      margin: 20px 0;
    }
  }

  @media (max-width: 991px) {
    .register-page__container .card {
      max-width: 100%;
    }
  }

  @media screen and (min-width: 992px) and (max-width: 1031px) {
    .register-page__container {
      justify-content: center;
    }

    .card-coupon {
      margin-bottom: 30px;
    }
  }

  @media screen and (min-width: 1032px) {
    .card-coupon {
      max-width: 350px !important;
    }
  }

  @media screen and (min-width: 1250px) {
    .card-coupon {
      max-width: 400px !important;
    }
  }
</style>
