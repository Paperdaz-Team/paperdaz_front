<template>
  <!-- Card register -->
  <div class="row mx-0">
    <form
      @submit.prevent="nextStep()"
      v-if="formStep === 1">
      <div class="col-12 px-0">
        <div class="form-group">
          <base-input
            :class-name="{'is-danger': errors.has('email')}"
            :disabled="savingData"
            name="email"
            placeholder="Email Address"
            type="email"
            v-model="dis_user.email"
            v-validate="'required|email'">
            <template v-slot:icon>
              <i class="fas fa-envelope" />
            </template>
          </base-input>
          <p
            class="text-right text-danger"
            v-if="errors.has('email')">
            <span
              v-if="errors.first('email') === 'The email field is required.'">This field is required</span>
          </p>
        </div>

        <div class="form-group">
          <base-input
            :class-name="{'is-danger': errors.has('businessName')}"
            :disabled="savingData"
            name="businessName"
            placeholder="Business Name"
            type="text"
            v-model="dis_user.businessName"
            v-validate="'required'">
            <template v-slot:icon>
              <i class="fas fa-building" />
            </template>
          </base-input>
          <p
            class="text-right text-danger"
            v-if="errors.has('businessName')">
            <span
              v-if="errors.first('businessName') === 'The businessName field is required.'">This field is required</span>
          </p>
        </div>

        <div class="form-group">
          <base-input
            :class-name="{'is-danger': errors.has('address')}"
            :disabled="savingData"
            name="address"
            placeholder="Address"
            type="text"
            v-model="dis_user.address"
            v-validate="'required'">
            <template v-slot:icon>
              <i class="fas fa-map-marker-alt" />
            </template>
          </base-input>
          <p
            class="text-right text-danger"
            v-if="errors.has('address')">
            <span
              v-if="errors.first('address') === 'The address field is required.'">This field is required</span>
          </p>
        </div>

        <div class="form-group">
          <el-select
            :disabled="savingData"
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
            <span v-if="errors.first('country') || errorsCountry">Country file required</span>
          </p>
        </div>

        <div class="row mx-0 has-input-grouped">
          <div class="col-6 px-0">
            <div class="form-group">
              <base-input
                :class-name="{'is-danger': errors.has('firstName')}"
                :disabled="savingData"
                name="firstName"
                placeholder="First Name"
                type="text"
                v-model="dis_user.firstName"
                v-validate="'required|alpha'">
                <template v-slot:icon>
                  <i class="fas fa-user" />
                </template>
              </base-input>
              <p
                class="text-right text-danger"
                v-if="errors.has('firstName')">
                <span
                  v-if="errors.first('firstName') === 'The firstName field is required.'">This field is required</span>
              </p>
            </div>
          </div>
          <div class="col-6 px-0">
            <div class="form-group">
              <base-input
                :class-name="{'is-danger': errors.has('lastName')}"
                :disabled="savingData"
                name="lastName"
                placeholder="Last Name"
                type="text"
                v-model="dis_user.lastName"
                v-validate="'required|alpha'">
                <template v-slot:icon>
                  <i class="fas fa-user" />
                </template>
              </base-input>
              <p
                class="text-right text-danger"
                v-if="errors.has('lastName')">
                <span
                  v-if="errors.first('lastName') === 'The lastName field is required.'">This field is required</span>
              </p>
            </div>
          </div>
        </div>

        <div class="form-group">
          <base-input
            :class-name="{'is-danger': errors.has('username')}"
            :disabled="savingData"
            name="username"
            placeholder="Username"
            type="text"
            v-model="dis_user.userName"
            v-validate="'required|alpha_num'">
            <template v-slot:icon>
              <i class="fas fa-user-tag" />
            </template>
          </base-input>
          <p
            class="text-right text-danger"
            v-if="errors.has('username')">
            <span
              v-if="errors.first('username') === 'The username field is required.'">This field is required</span>
          </p>
        </div>

        <div class="form-group">
          <base-input
            :class-name="{'is-danger': errors.has('position')}"
            :disabled="savingData"
            name="position"
            placeholder="Position"
            type="text"
            v-model="dis_user.position"
            v-validate="'required'">
            <template v-slot:icon>
              <i class="fas fa-id-card-alt" />
            </template>
          </base-input>
          <p
            class="text-right text-danger"
            v-if="errors.has('position')">
            <span
              v-if="errors.first('position') === 'The position field is required.'">This field is required</span>
          </p>
        </div>

        <div class="row has-input-grouped">
          <div class="col-6">
            <div class="form-group">
              <base-input
                :class-name="{'is-danger': errors.has('telephone')}"
                :disabled="savingData"
                name="telephone"
                placeholder="Phone number"
                type="text"
                v-model="dis_user.telephone"
                v-validate="'required'">
                <template v-slot:icon>
                  <i class="fas fa-phone" />
                </template>
              </base-input>
              <p
                class="text-right text-danger"
                v-if="errors.has('telephone')">
                <span
                  v-if="errors.first('telephone') === 'The telephone field is required.'">This field is required</span>
              </p>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <base-input
                :class-name="{'is-danger': errors.has('industry')}"
                :disabled="savingData"
                name="industry"
                placeholder="Industry"
                type="text"
                v-model="dis_user.industry"
                v-validate="'required'">
                <template v-slot:icon>
                  <i class="fas fa-industry" />
                </template>
              </base-input>
              <p
                class="text-right text-danger"
                v-if="errors.has('industry')">
                <span
                  v-if="errors.first('industry') === 'The industry field is required.'">This field is required</span>
              </p>
            </div>
          </div>
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
      <div class="col-12 px-0">
        <div class="form-group">
          <input
            class="btn btn-blockc"
            type="submit"
            value="Continue">
        </div>
      </div>

      <div class="col-12 register_p">
        <div
          class="mx-auto"
          v-if="!$route.query.code">
          <p class="text-center">
            Register as a free
            <span
              @click="changeRole(3)"
              style="color: #53A63E; cursor: pointer;">here</span>
          </p>
        </div>
        <p class="text-center">
          Already have an account?
          <router-link
            :to="{path:'/login'}"
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

    <div
      style="width: 100%;"
      v-if="formStep === 2">
      <div class="form-group">
        <div class="preview-form-data">
          <ul>
            <li>
              <strong>Location:</strong>
              {{ dis_user.country }}
            </li>
            <li>
              <strong>Email:</strong>
              {{ dis_user.email }}
            </li>
            <li>
              <strong>Name:</strong>
              {{ dis_user.firstName }} {{ dis_user.lastName }}
            </li>
            <li>
              <strong>Username:</strong>
              {{ dis_user.userName }}
            </li>
            <li>
              <strong>Business Name:</strong>
              {{ dis_user.businessName }}
            </li>
            <li>
              <strong>Address:</strong>
              {{ dis_user.address }}
            </li>
            <li>
              <strong>Position:</strong>
              {{ dis_user.position }}
            </li>
            <li>
              <strong>Phone Number:</strong>
              {{ dis_user.telephone }}
            </li>
            <li>
              <strong>Industry:</strong>
              {{ dis_user.industry }}
            </li>
          </ul>
        </div>
        <base-input
          :class-name="{'is-danger': errors.has('password')}"
          :disabled="savingData"
          @keyup.enter="validateForm()"
          name="password"
          placeholder="Password"
          type="password"
          v-model="dis_user.password"
          v-validate="'required'">
          <template v-slot:icon>
            <i class="fas fa-unlock-alt" />
          </template>
        </base-input>
        <p
          class="text-right text-danger"
          v-if="errors.has('password')">
          {{ errors.first('password') }}
        </p>
      </div>
      <div class="form-group">
        <base-input
          :class-name="{'is-danger': errors.has('confirm_pwd')}"
          :disabled="savingData"
          @keyup.enter="validateForm()"
          name="confirm_pwd"
          placeholder="Confirm Password"
          type="password"
          v-model="dis_user.confirm_pwd"
          v-validate="'required'">
          <template v-slot:icon>
            <i class="fas fa-unlock-alt" />
          </template>
        </base-input>
        <p
          class="text-right text-danger"
          v-if="errors.has('confirm_pwd')">
          {{ errors.first('confirm_pwd') }}
        </p>
      </div>
      <div class="form-group complete-and-back-buttons">
        <input
          @click="changeStep(1)"
          class="btn btn-blockc back-button"
          type="submit"
          value="Back">
        <input
          @click="validateForm()"
          class="btn btn-blockc"
          type="submit"
          value="Register">
      </div>
    </div>
  </div>
  <!-- Card register end-->
</template>

<script>
import BaseInput from '@/components/base-components/BaseInput';

export default {
  name: 'FormRegisterBusiness',

  components: {
    BaseInput,
  },

  props: ['savingData'],

  data() {
    return {
      dis_user: {},
      loading: false,
      formStep: 1,
      errorsCountry: '',
    };
  },
  computed: {
    reversal() {
      if (this.$route.query.confirm) {
        return true;
      }
      return false;
    },
  },
  beforeDestroy() {
    this.dis_user = {};
    this.formStep = 1;
  },
  methods: {
    validateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.dis_user.country) {
            if (this.dis_user.tnc) {
              this.errorsCountry = '';
              this.$emit('newBusiness', this.dis_user);
            } else {
              this.$message({
                message: 'Please Accept the terms and conditions',
                type: 'warning',
                duration: 0,
                showClose: true,
              });
            }
          } else {
            this.errorsCountry = 'Country file required';
          }
        }
      });
    },

    changeRole(role) {
      this.$emit('changeRole', role);
    },

    changeStep(step) {
      this.formStep = step;
      this.$emit('changeStep', step);
    },

    nextStep() {
      this.$validator.validateAll().then((result) => {
        if (this.dis_user.country) {
          if (this.dis_user.tnc) {
            this.errorsCountry = '';
            this.formStep = 2;
          } else {
            this.$message({
              message: 'Please Accept the terms and conditions',
              type: 'warning',
              duration: 0,
              showClose: true,
            });
          }
        } else {
          this.errorsCountry = 'Country file required';
        }
      });
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

  .btn-blockc {
    width: 100%;
    background: #53a63e;
    color: #ffffff;
  }

  .btn-blockc:hover {
    color: #fff !important;
  }

  .btn-blc {
    background: #53a63e;
    color: #ffffff;
  }

  .el-input__inner {
    height: 45px !important;
    line-height: 45px !important;
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

  .preview-form-data ul {
    list-style: none;
    padding-left: 0;
    padding-bottom: 15px;
  }

  .complete-and-back-buttons {
    display: flex;
  }

  .back-button {
    margin-right: 10px;
    flex-basis: 0;
    padding-left: 20px;
    padding-right: 20px;
  }

  .has-input-grouped .col-6:not(:last-child) {
    padding-right: 5px !important;
  }

  .has-input-grouped .col-6:not(:first-child) {
    padding-left: 5px !important;
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
