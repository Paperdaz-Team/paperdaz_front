<template>
  <!-- Card login -->
  <div class="card p-5 shadow card-login">
    <!-- Card content -->
    <div
      class="card-body"
      v-if="!isLoggedIn"
      v-loading="loading">
      <!-- Title -->
      {{ bgIss }}
      <h4 class="card-title mb-4 f-400">
        Welcome to digital paper!
      </h4>
      <a
        @click.prevent="googleAuth"
        class="btn social-btn shadow google_img"
        href="#">Google</a>
      <a
        @click.prevent="FbAuth"
        class="btn social-btn mt-3 shadow fb-btn"
        href="#">Facebook</a>
      <div class="or_option">
        or
      </div>

      <form @submit.prevent="validateForm()">
        <div class="col-xs-12">
          <div
            class="form-group"
            v-if="email">
            <input
              class="form-control form-controlc"
              name="email"
              placeholder="Email Address"
              type="email"
              v-model="new_user.email"
              v-validate="'required|email'">
            <p
              class="text-right text-danger"
              v-if="errors.has('email')">
              {{ errors.first('email') }}
            </p>
          </div>
          <div
            class="form-group"
            v-else>
            <input
              class="form-control form-controlc"
              name="telephone"
              placeholder="Phone number"
              type="tel"
              v-model="new_user.telephone"
              v-validate="'required'">
            <p
              class="text-right text-danger"
              v-if="errors.has('telephone')">
              {{ errors.first('telephone') }}
            </p>
          </div>
          <div class="form-group">
            <!-- <input type="password" v-validate="'required|min:6'" name="password" v-model="new_user.password" class="form-control form-controlc" placeholder="Password">
            <p class="text-right text-danger" v-if="errors.has('password')">{{errors.first('password')}}</p>-->

            <el-input
              :type="visiblePassword?'text':'password'"
              name="password"
              placeholder
              v-model="new_user.password"
              v-validate="'required|min:6'">
              <i
                :class="visiblePassword?'fa-eye':'fa-eye-slash'"
                @click="visiblePassword=!visiblePassword"
                class="fa"
                slot="suffix" />
            </el-input>
            <p
              class="text-right text-danger"
              v-if="errors.has('password')">
              {{ errors.first('password') }}
            </p>
          </div>
        </div>
        <p class="text-right forgot-password">
          <a
            @click.prevent="forgotPassword"
            class="f_pwd"
            href="#">Forgot password?</a>
        </p>

        <div class="form-group mt-2">
          <input
            class="btn btn-blockc"
            type="submit"
            value="Log in">
        </div>
      </form>
      <p class="text-center mb-1 do_sign_up">
        Do not have account?
        <router-link
          :to="{name: 'register'}"
          class="text-infoc">
          Sign up
        </router-link>
      </p>
      <p class="text-center privacy_policy">
        Please read our
        <router-link
          :to="{path: '/privacy-policy'}"
          class="text-infoc">
          Privacy Policy
        </router-link>
      </p>

      <!-- <p class="text-center">Please read our <a href="" class="text-infoc">Privacy policy</a></p> -->
    </div>
  </div>
  <!-- Card ligin end-->
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  layout: 'default',
  name: 'LoginPage',
  fetch({ store, redirect }) {
    const userIsLoggedIn = store.getters['user_mgt/isLoggedIn'];
    const user = store.getters['user_mgt/user'];
    if (userIsLoggedIn) {
      if (user.role === 1) return redirect('/super/dashboard');
      if (user.role === 2) return redirect('/business-users/dashboard');
      if (user.role === 3) return redirect('/users/dashboard');
    }
  },
  data() {
    return {
      new_user: {
        email: '',
        telephone: '',
        password: '',
      },
      email: true,
      confirmed: false,
      loading: false,
      FB: undefined,
      visiblePassword: false,
      fbUser: {
        email: undefined,
        isAuthenticated: true,
      },
    };
  },
  head: {
    title: 'Login',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      {
        hid: 'description',
        name: 'description',
        content: 'Paperdaz, Let us go green!!! ',
      },
    ],
  },
  mounted() {
    this.checkGoogleCode();
    if (this.$route.query.confirm) {
      this.$router.push({
        path: `/confirm_user?token=${this.$route.query.code}`,
      });
    }
    if (this.$route.query.invite) {
      this.$router.push({
        path: `/invite?invite_code=${this.$route.query.code}`,
      });
    }

    if (this.$route.query.redirectTo) {
      if (this.isLoggedIn) {
        this.$router.push({ path: this.$route.query.redirectTo });
      } else {
        // this.$router.push({path: '/'});
      }
    } else if (this.isLoggedIn) {
      if (this.user.role === 1) {
        this.$router.push({ path: '/super/dashboard' });
      }
      if (this.user.role === 2) {
        this.$router.push({ path: '/business-users/dashboard' });
      }
      if (this.user.role === 3) {
        this.$router.push({ path: '/users/dashboard' });
      }
    }
  },
  methods: {
    ...mapActions('auth', [
      'login',
      'setUser',
      'recover_password',
      'googleLogin',
      'loginWithFacebook',
    ]),
    handleIconClick() {
      this.icon = !this.icon;
    },
    forgotPassword() {
      const d = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          d.recover_password({ email: d.new_user.email })
            .then((res) => {
              const dtf = res.data;
              if (dtf.success) {
                d.$router.push({ path: '/message_sent' });
              } else {
                d.$message({
                  message: dtf.message,
                  type: 'warning',
                  showClose: true,
                });
              }
            })
            .catch((error) => {
              d.$message({
                message: error.message,
                type: 'error',
                showClose: true,
              });
            });
        } else {
          d.$router.push({ path: '/forgotten_password' });
        }
      });
    },

    validateForm() {
      let d = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.loading = true;
          d.new_user.login_with = d.email;
          d.login(d.new_user)
            .then((res) => {
              const dtf = res.data;
              if (dtf.success) {
                // console.log(dtf);
                d.loading = false;
                if (d.redirectedFromPdfToolPage) {
                  d.$router.push(`/users/view/pdf?id=${d.lastFileID}`);
                } else if (d.$route.query.redirectTo) {
                  d.$router.push(d.$route.query.redirectTo);
                } else {
                  d.$router.push(dtf.result.dashboard);
                }
              } else {
                d.loading = false;
                if (dtf.message === 'This account has not been verified') {
                  d.setUser(d.new_user);
                  d.user.email = d.new_user.email;
                  d.$router.push({ path: '/signup_complete' });
                }
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
        }
      });
    },

    googleAuth() {
      this.googleLogin({ type: 'getUrl' }).then((red) => {
        open(red.data.url, '_parent');
      });
    },
    checkGoogleCode() {
      if (this.$route.query.code) {
        const d = this;
        d.loading = true;
        this.googleLogin({ code: d.$route.query.code, type: 'getUser' })
          .then((res) => {
            d.loading = false;
            const dtf = res.data;
            if (dtf.success) {
              // console.log(dtf);
              d.$router.push(dtf.result.dashboard);
            } else {
              if (dtf.message === 'This account has not been verified') {
                d.setUser(d.new_user);
                d.user.email = d.new_user.email;
                d.$router.push({ path: '/signup_complete' });
              }
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
      }
    },

    FbAuth() {
      const self = this;
      FB.init({
        appId: '1963448743761831',
        status: true,
        xfbml: true,
        version: 'v2.7', // or v2.6, v2.5, v2.4, v2.3
      });
      const d = this;
      d.loading = true;
      FB.login(
        (response) => {
          if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            self
              .loginWithFacebook({
                access_token: response.authResponse.accessToken,
              })
              .then((res) => {
                d.loading = false;
                const dtf = res.data;
                if (dtf.success) {
                  // console.log(dtf);
                  d.$router.push(dtf.result.dashboard);
                } else {
                  if (dtf.message === 'This account has not been verified') {
                    d.setUser(d.new_user);
                    d.user.email = d.new_user.email;
                    d.$router.push({ path: '/signup_complete' });
                  }
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
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        },
        { scope: 'email,user_location' },
      );
    },
  },
  computed: {
    ...mapGetters('auth', ['errorMsg', 'error', 'email_token']),
    ...mapGetters('user_mgt', ['isLoggedIn', 'user']),
    ...mapGetters('pdfFile', ['lastFileID', 'redirectedFromPdfToolPage']),
    bgIss() {
      if (this.$route.query.confirmed) {
        console.log(this.email_token);
        this.new_user.email = this.email_token;
      }
    },
  },
};
</script>


<style scoped>
  .card-login {
    max-width: 500px;
    margin: auto;
    margin-bottom: 35px;
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

  .forgot-password {
    display: flex;
    justify-content: flex-end;
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

  .do_sign_up {
    font-size: 12px;
  }

  .privacy_policy {
    font-size: 12px;
  }

  .checkbox label {
    display: inline-block;
    margin-bottom: 0.5rem;
    color: rgb(83, 166, 62);
    cursor: pointer;
    font-size: 12px;
    vertical-align: top;
    margin-left: 5px;
  }

  input[type="password"] {
    background: #f0f0f0 url(../assets/img/eye.png) no-repeat;
    background-size: 24px;
    background-position: 98%;
  }

  .google_img {
    background: url(/google.png) no-repeat;
    background-size: 24px;
    background-position: 10px;
  }

  .btn-blockc {
    width: 100%;
    background: #53a63e;
    color: #ffffff;
    height: 45px;
  }

  a.text-infoc {
    color: #55a73c;
  }

  .btn-blockc:hover {
    color: #fff !important;
  }

  .form-controlc {
    background: #f0f0f09f;
    color: #363636;
    border: 1px solid #DCDFE6;
    border-radius: 3px;
    height: 45px;
    font-size: 14px;
    font-weight: 400;
  }

  .colorwhite {
    color: #ffffff;
  }

  a,
  a:hover {
    text-decoration: none;
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

  .phone_num {
    font-size: 12px;
    text-align: right;
    margin-bottom: 5px;
  }

  .text-danger {
    font-size: 12px;
  }

  i.fa {
    line-height: 40px;
    padding-right: 10px;
    font-size: 22px;
  }

  @media (max-width: 767px) {
    .or_option {
      margin: 20px 0;
    }
  }
</style>

<style type="text/css">
  .abcRioButtonLightBlue {
    width: 100% !important;
  }
</style>
