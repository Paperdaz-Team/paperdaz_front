<template>
  <el-dialog
    :modal="false"
    :visible.sync="show"
    @close="closeModal"
    title="Register"
    width="50%">
    <div class="card p-5 shadow">
      <div
        class="card-body"
        v-loading="loading">
        <!-- Title -->
        <h4
          class="card-title mb-4 f-400"
          v-if="!reversal">
          Register here....
        </h4>
        <h4
          class="card-title mb-4"
          v-else>
          Review your details before {{ loading }} you
          continue
        </h4>
        <a
          class="btn social-btn shadow google_img"
          disabled
          href="#">Google</a>
        <a
          class="btn social-btn mt-3 shadow fb-btn"
          disabled
          href="#">Facebook</a>
        <div class="or_option">
          or
        </div>
        <div class="row">
          <form @submit.prevent="validateForm()">
            <div class="col-12">
              <div class="form-group">
                <el-input
                  :disabled="reversal"
                  class=" form-controlc"
                  name="email"
                  placeholder="Email Address"
                  type="text"
                  v-model="dis_user.email"
                  v-validate="'required|email'" />
                <p
                  class="text-right text-danger"
                  v-if="errors.has('email')">
                  {{ errors.first('email') }}
                </p>
              </div>
              <div
                class="form-group"
                v-if="role === 2">
                <el-input
                  :disabled="reversal"
                  class=" form-controlc"
                  name="businessName"
                  placeholder="Busniess name"
                  type="text"
                  v-model="dis_user.businessName"
                  v-validate="'required'" />
                <p
                  class="text-right text-danger"
                  v-if="errors.has('businessName')">
                  {{ errors.first('businessName')
                  }}
                </p>
              </div>
              <div
                class="form-group"
                v-if="role === 2">
                <el-input
                  :disabled="reversal"
                  class="form-controlc"
                  name="address"
                  placeholder="Address"
                  type="text"
                  v-model="dis_user.address"
                  v-validate="'required'" />
                <p
                  class="text-right text-danger"
                  v-if="errors.has('address')">
                  {{ errors.first('address')
                  }}
                </p>
              </div>
              <div class="form-group">
                <el-select
                  :disabled="reversal"
                  filterable
                  name="country"
                  placeholder="Select your country.."
                  style="width: 100%"
                  v-model="dis_user.country"
                  v-validate="'required'">
                  <el-option-group
                    :key="group.label"
                    :label="group.label"
                    v-for="group in $countries">
                    <el-option
                      :key="item.country"
                      :label="item.country"
                      :value="item.country"
                      v-for="item in group.options" />
                  </el-option-group>
                </el-select>
                <p
                  class="text-right text-danger"
                  v-if="errors.has('country')">
                  {{ errors.first('country')
                  }}
                </p>
              </div>
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
                      {{
                        errors.first('firstName') }}
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
              <div class="row">
                <div class="col-12">
                  <div class="form-group">
                    <el-input
                      :disabled="reversal"
                      class=" form-controlc"
                      name="userName"
                      placeholder="Username"
                      type="text"
                      v-model="dis_user.userName"
                      v-validate="'required'" />
                    <p
                      class="text-right text-danger"
                      v-if="errors.has('userName')">
                      {{ errors.first('userName')
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
              <div
                class="row"
                v-if="role === 2">
                <div class="col-6">
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
                      {{
                        errors.first('telephone') }}
                    </p>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <el-input
                      :disabled="reversal"
                      class=" form-controlc"
                      name="industry"
                      placeholder="Industry"
                      type="text"
                      v-model="dis_user.industry"
                      v-validate="'required'" />
                    <p
                      class="text-right text-danger"
                      v-if="errors.has('industry')">
                      {{ errors.first('industry')
                      }}
                    </p>
                  </div>
                </div>
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
                    :to="{path:'/register'}"
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

            <div class="col-12 register_p">
              <div
                class="mx-auto"
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
                Please read our
                <router-link
                  :to="{path: '/terms-and-conditions'}"
                  class="text-infoc">
                  Terms and Conditions
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </el-dialog>
</template>


<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'RegisterModal',
  props: ['registerModal'],
  data() {
    return {
      show: false,
      role: 3,
      dis_user: {},
      loading: false,
    };
  },
  watch: {
    registerModal() {
      this.show = this.registerModal;
      this.dis_user = {};
    },
  },
  methods: {
    closeModal() {
      console.log('close fired');
      this.$emit('closeReg', { success: false });
    },
    ...mapActions('auth', ['signup', 'setUser', 'login']),
    validateForm() {
      const d = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          // var rout = {path:'/register', query: {confirm: true}};
          // if(this.$route.query.code){
          //   rout.query.code= this.coupon.code;
          // }

          // if(this.dis_user.tnc){
          //  this.$router.push(rout);
          // }else{
          //   this.$message({
          //     message: "Please Accept the terms and conditions",
          //     type: 'warning',
          //     duration: 0,
          //     showClose: true
          //   })
          // }
          d.submitForm();
        }
      });
    },

    useCoupon() {
      this.role = 2;
      this.$router.push({
        name: 'register',
        query: { soft_launch: 1, code: this.coupon.code },
      });
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
            // proceed to login the user
            d.dis_user.login_with = d.dis_user.email;
            // first time login guest to prevent verification redirection
            d.dis_user.f_g = 1;
            d.quickLogin();
            // d.$emit('closeReg', {success : true})
            // d.$router.push({path:'/signup_complete'});
          } else {
            d.$message({
              message: dtf.message,
              type: 'warning',
              duration: 0,
              showClose: true,
            });
          }
        }).catch((error) => {
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

    quickLogin() {
      const d = this;
      d.login(d.dis_user)
        .then((res) => {
          const dtf = res.data;
          if (dtf.success) {
            // console.log(dtf);
            d.loading = false;
            d.$emit('closeReg', { success: true });
          } else {
            d.loading = false;
            d.$message({
              message: dtf.message,
              type: 'warning',
              showClose: true,
            });
          }
        })
        .catch((error) => {
          d.loading = false;
          d.$message({
            message: error.message,
            type: 'error',
            showClose: true,
          });
        });
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

  .fb-btn {
    background: #4267B2;
    color: #fff;
  }

  .fb-btn:hover {
    color: #fff;
  }

  .social-btn.fb-btn {
    background: #4267b2 url(../../assets/img/fb.png) no-repeat;
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

  .btn-blockc {
    width: 100%;
    background: #53A63E;
    color: #FFFFFF;
  }

  .btn-blockc:hover {
    color: #fff !important;
  }

  .btn-blc {
    background: #53A63E;
    color: #FFFFFF;
  }

  .el-input__inner {
    height: 45px !important;
    line-height: 45px !important;
  }

  .form-controlc {
    background: #ECECEC;
    color: #5C5D5F;
  }

  .colorwhite {
    color: #FFFFFF;
  }

  a, a:hover {
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

  @media (max-width: 767px) {
    .title {
      font-size: 16px !important;
    }
  }

  @media (max-width: 767px) {
    .or_option {
      margin: 20px 0;
    }
  }
</style>
