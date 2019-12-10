<template>
  <!-- Card register -->
  <div class="card p-5 shadow">
    <div
      class="card-body"
      v-if="$route.query.coupon">
      <h1>Title</h1>
      <p>{{ coupon.title }}</p>

      <h2 class="mt-2">
        Package Description
      </h2>
      <p>{{ coupon.description }}</p>

      <h2 class="mt-2">
        Subscription
      </h2>
      <p>$ {{ coupon.subscription_fee+' '+coupon.subscription_type }}</p>

      <el-button
        @click="useCoupon()"
        class="btn btn-blockc mt-5">
        Register Now!
      </el-button>
    </div>

    <!-- Card content -->
    <div
      class="card-body"
      v-else
      v-loading="loading">
      <!-- Title -->
      <h4
        class="card-title mb-4"
        v-if="!reversal">
        Register here....
      </h4>
      <h4
        class="card-title mb-4"
        v-else>
        Review your details before {{ loading }} you
        continue
      </h4>
      <div class="row">
        <form @submit.prevent="validateForm()">
          <div class="col-12">
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <el-input
                    :disabled="reversal"
                    class=" form-controlc"
                    name="firstName"
                    placeholder="First name"
                    type="text"
                    v-model="dis_user.firstName"
                    v-validate="'required'" />
                  <p
                    class="text-right text-danger"
                    v-if="errors.has('firstName')">
                    {{ errors.first('firstName')
                    }}
                  </p>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <el-input
                    :disabled="reversal"
                    class=" form-controlc"
                    name="lastName"
                    placeholder="Last name"
                    type="text"
                    v-model="dis_user.lastName"
                    v-validate="'required'" />
                  <p
                    class="text-right text-danger"
                    v-if="errors.has('lastName')">
                    {{ errors.first('lastName')
                    }}
                  </p>
                </div>
              </div>
            </div>
            <div
              class="form-group"
              v-if="role === 2">
              <el-input
                :disabled="reversal"
                class=" form-controlc"
                name="position"
                placeholder="Position"
                type="text"
                v-model="dis_user.position"
                v-validate="'required'" />
              <p
                class="text-right text-danger"
                v-if="errors.has('position')">
                {{ errors.first('position')
                }}
              </p>
            </div>
            <div class="form-group">
              <el-input
                :disabled="reversal"
                class=" form-controlc"
                name="telephone"
                placeholder="Phone number"
                type="text"
                v-model="dis_user.telephone"
                v-validate="'required'" />
              <p
                class="text-right text-danger"
                v-if="errors.has('telephone')">
                {{ errors.first('telephone')
                }}
              </p>
            </div>
            <div class="form-group">
              <el-input
                :disabled="reversal"
                class=" form-controlc"
                name="password"
                placeholder="Password"
                type="password"
                v-model="dis_user.password"
                v-validate="'required'" />
              <p
                class="text-right text-danger"
                v-if="errors.has('password')">
                {{ errors.first('password')
                }}
              </p>
            </div>
            <div class="form-group">
              <el-input
                :disabled="reversal"
                class=" form-controlc"
                name="confirm_pwd"
                placeholder="Confirm password"
                type="password"
                v-model="dis_user.confirm_pwd"
                v-validate="'required'" />
              <p
                class="text-right text-danger"
                v-if="errors.has('confirm_pwd')">
                {{ errors.first('confirm_pwd')
                }}
              </p>
            </div>
          </div>

          <div class="col-12">
            <div class="form-group">
              <b-form-checkbox
                :unchecked-value="false"
                :value="true"
                v-model="dis_user.tnc">
                Terms and Conditions
              </b-form-checkbox>
            </div>
          </div>
          <div
            class="col-12"
            v-if="!reversal">
            <div class="form-group">
              <input
                class="btn btn-blockc"
                type="submit"
                value="Register">
            </div>
          </div>

          <div class="row">
            <div
              class="col-6"
              v-if="reversal">
              <div class="form-group">
                <router-link
                  :to="{path:'/invite', query: {invite_code: this.$route.query.invite_code}}"
                  class="btn btn-blockc"
                  style="color: #fff">
                  Go Back
                </router-link>
              </div>
            </div>

            <div
              class="col-6"
              v-if="reversal">
              <div class="form-group">
                <button
                  @click="submitForm()"
                  class="btn btn-blockc">
                  Signup Now
                </button>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div
              class="form-group mx-auto"
              v-if="!$route.query.code">
              <p
                class="text-center"
                v-if="role === 3">
                Register as a business <span
                  @click="role=2"
                  style="color: #53A63E; cursor: pointer;">here</span>
              </p>
              <p
                class="text-center"
                v-if="role === 2">
                Register as a free <span
                  @click="role=3"
                  style="color: #53A63E; cursor: pointer;">here</span>
              </p>
            </div>
            <p class="text-center">
              Already have an account?
              <router-link
                :to="{path:'/'}"
                class="text-infoc">
                Log in
              </router-link>
            </p>
            <p class="text-center">
              Please read our <a
                class="text-infoc"
                href="">Privacy policy</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Card register end-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      role: 3,
      dis_user: {},
    };
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
    ...mapActions('auth', ['signup']),
    validateForm() {
      const d = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          const rout = {
            path: '/invite',
            query: {
              invite_code: this.$route.query.invite_code,
              confirm: true,
            },
          };
          if (this.$route.query.code) {
            rout.query = { code: this.coupon.code };
          }

          if (this.dis_user.tnc) {
            this.$router.push(rout);
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

    submitForm() {
      const d = this;
      if (this.$route.query.invite_code) {
        d.dis_user.invite_code = this.$route.query.invite_code;
      }

      d.dis_user.role = d.role;
      d.signup(d.dis_user)
        .then((res) => {
          const dtf = res.data;
          if (dtf.success) {
            d.$router.push({ path: '/signup_complete' });
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

    back_btn() {
      this.$router.push({ name: 'signupPage' });
    },


  },
  mounted() {
    if (this.$route.query.invite_code) {
      this.role = 2;
    }
  },
  computed: {
    ...mapGetters('auth', ['errorMsg', 'error', 'loading', 'user']),
    ...mapGetters('coupons', ['coupon', 'error', 'message']),
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
  .fb-btn {
    background: #4267B2;
    color: #fff;
  }

  .fb-btn:hover {
    color: #fff;
  }

  .social-btn {
    width: 100%;
    border: 1px solid #53A63E !important;
    text-align: left !important;
    padding: 0px 15px !important;
    font-weight: 700 !important;
    height: 40px;
  }

  .btn-blockc {
    width: 100%;
    background: #53A63E;
    color: #FFFFFF;
    font-weight: 700 !important;
  }

  .btn-blockc:hover {
    color: #fff !important;
  }

  .btn-blc {
    background: #53A63E;
    color: #FFFFFF;
    font-weight: 700 !important;
  }

  .form-controlc {
    background: #ECECEC !important;
    color: #5C5D5F !important;
    font-weight: 700;
  }

  .colorwhite {
    color: #FFFFFF;
  }

  a, a:hover {
    text-decoration: none;
  }
</style>
