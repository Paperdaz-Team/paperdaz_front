<template>
  <div
    class="container"
    v-loading="loading">
    <div class="envelope-image__container">
      <img
        :src="require('@/assets/img/envelope-send.png')"
        alt="Envelope sent icon">
    </div>
    <div class="text-message__container">
      <h2 class="has-text-centered has-font-weight-normal">
        Thank you!
      </h2>
      <h3 class="has-text-centered has-font-weight-normal mt-5">
        Check your email to complete the registration!
      </h3>

      <p class="confirmation-text has-font-weight-normal has-text-centered">
        Did not get the email?
        <br>
        <base-button
          @click="resend_msg()"
          class="mdc-button--raised is-success">
          Resend confirmation
        </base-button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '@/components/base-components/BaseButton';

export default {
  components: {
    BaseButton,
  },
  methods: {
    ...mapActions('auth', ['resend_confirmation']),
    resend_msg() {
      const d = this;
      console.log(d.user.email);
      this.resend_confirmation({ email: d.user.email })
        .then((res) => {
          const dtf = res.data;
          if (dtf.success) {
            d.$message({
              message: dtf.message,
              type: 'success',
              duration: 0,
              showClose: true,
            });
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

  },
  computed: {
    ...mapGetters('auth', ['errorMsg', 'error', 'loading', 'user']),
  },
};
</script>

<style lang="scss">
  .envelope-image__container {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 350px;
      width: 100%;
    }
  }

  .text-message__container {
    h2,
    h3 {
      font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    }
  }

  .confirmation-text {
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
    font-size: 18px;
    margin-top: 25px;

    .button {
      margin-top: 10px;
    }
  }

  .has-text-centered {
    text-align: center;
  }

  .has-text-success {
    color: #73C361;
  }

  .has-font-weight-bold {
    font-weight: bold;
  }

  .has-font-weight-normal {
    font-weight: 200;
  }
</style>
