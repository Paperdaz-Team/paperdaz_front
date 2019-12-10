<template>
  <!-- Card login -->
  <div class="card change-password__container shadow mt-5">
    <!-- Card content -->
    <div
      class="card-body"
      v-loading="loading">
      <h2>Change Your Password</h2>

      <div class="change-password__field">
        <base-input
          @keyup.enter="validateForm"
          name="password"
          placeholder="Enter Password"
          ref="password"
          type="password"
          v-model="user.password"
          v-validate="'required|min:6'">
          <template v-slot:icon>
            <i class="fas fa-lock" />
          </template>
        </base-input>
        <p
          class="text-danger"
          v-if="errors.has('password')">
          {{ errors.first('password') }}
        </p>
      </div>

      <div class="change-password__field">
        <base-input
          @keyup.enter="validateForm"
          name="password_confirm"
          placeholder="Enter Password Again"
          type="password"
          v-model="user.password_confirm"
          v-validate="'required|confirmed:password'">
          <template v-slot:icon>
            <i class="fas fa-lock" />
          </template>
        </base-input>
        <p
          class="text-danger"
          v-if="errors.has('password_confirm')">
          {{ errors.first('password_confirm') }}
        </p>
      </div>

      <div class="change-password__button">
        <base-button
          @click="validateForm"
          button-class="mdc-button--raised is-success">
          Log In
        </base-button>
      </div>
    </div>
  </div>
  <!-- Card ligin end-->
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import BaseInput from '@/components/base-components/BaseInput';
import BaseButton from '@/components/base-components/BaseButton';

export default {
  name: 'ChangePassword',
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      user: {},
    };
  },
  head: {
    title: 'Password Reset',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  methods: {
    ...mapActions('auth', ['change_password']),
    validateForm() {
      const d = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.submitForm();
        }
      });
    },
    submitForm() {
      const d = this;
      d.change_password({
        password: d.user.password,
        token: d.$route.query.token,
      })
        .then((res) => {
          const dtf = res.data;
          if (dtf.success) {
            d.$router.push({ path: '/' });
          } else {
            d.$message({
              message: dtf.message,
              type: 'warning',
            });
          }
        })
        .catch((error) => {
          d.$message({
            message: error.message,
            type: 'error',
          });
        });
    },
  },
  mounted() {
  },
  computed: {
    ...mapGetters('auth', ['errorMsg', 'error', 'loading']),
  },
};
</script>

<style lang="scss">
  .change-password__container {
    max-width: 500px;
    padding: 40px 30px !important;
    margin: auto;

    h2 {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    }

    .change-password__field {
      margin-bottom: 10px;

      p {
        margin: 0;
        margin-top: 5px;
        text-align: left !important;
        text-transform: capitalize;
      }
    }

    .change-password__button {
      .button {
        width: 100%;
      }
    }
  }
</style>
