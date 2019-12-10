<template>
  <!-- Card register -->
  <div class="card forgot-password__container shadow my-5">
    <!-- Card content -->
    <div
      class="card-body"
      v-loading="loading">
      <h2>Enter Your Email Address</h2>

      <div class="forgot-password__field">
        <base-input
          @keyup.enter="validateForm"
          name="email"
          placeholder="Email Address"
          type="email"
          v-model="user.email"
          v-validate="'required|email'">
          <template v-slot:icon>
            <i class="fas fa-envelope" />
          </template>
        </base-input>
        <p
          class="text-danger"
          v-if="errors.has('email')">
          {{ errors.first('email') }}
        </p>
      </div>

      <div class="forgot-password__button">
        <base-button
          @click="validateForm"
          button-class="mdc-button--raised is-success">
          Reset Password
        </base-button>
      </div>
    </div>
  </div>
  <!-- Card register end-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseInput from '@/components/base-components/BaseInput';
import BaseButton from '@/components/base-components/BaseButton';

export default {
  name: 'Login',
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    ...mapActions('auth', ['recover_password']),
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
      d.recover_password({ email: d.user.email })
        .then((res) => {
          const dtf = res.data;
          if (dtf.success) {
            d.$router.push({ path: '/message_sent' });
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
          d.$message({
            message: error.message,
            type: 'error',
            duration: 0,
            showClose: true,
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
  .forgot-password__container {
    max-width: 500px;
    padding: 40px 30px !important;
    margin: auto;

    h2 {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    }

    .forgot-password__field {
      margin-bottom: 10px;

      p {
        margin: 0;
        margin-top: 5px;
        text-align: left !important;
        text-transform: capitalize;
      }
    }

    .forgot-password__button {
      .button {
        width: 100%;
      }
    }
  }
</style>
