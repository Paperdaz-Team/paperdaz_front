<template>
  <div class="plans-container">
    <div class="plans-container__header">
      <h2 class="plans-title">
        Select a plan that best fits your business or enter
      </h2>
      <div class="promo-code__input-container">
        <base-input
          :disabled="validatingCoupon"
          @keyup.enter="verifyCoupon()"
          name="promo_code"
          placeholder="Promotional code"
          type="text"
          v-model="coupon">
          <template v-slot:icon>
            <i class="fas fa-tags" />
          </template>
        </base-input>
        <base-button
          :disabled="validatingCoupon"
          @click="verifyCoupon()"
          button-class="is-success mdc-button--unelevated">
          <span v-if="!validatingCoupon">go</span>
          <span
            class="m-0"
            v-else><i class="fas fa-spinner fa-spin m-0" /></span>
        </base-button>
      </div>
    </div>
    <p
      class="error--text text-center text-uppercase"
      v-if="invalidCoupon">
      Invalid Coupon
    </p>
    <pricing-table
      :packages="packagesList"
      :solutions="solutionsList"
      v-if="solutionsList.length > 0 && packagesList.length > 0" />
    <span
      class="plans-loader"
      v-else>Loading packages<i
        class="fas fa-spinner fa-spin" /></span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PricingTable from '@/components/PricingTable';
import BaseInput from '@/components/base-components/BaseInput';
import BaseButton from '@/components/base-components/BaseButton';

export default {
  name: 'PricingTablePage',
  components: {
    PricingTable,
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      coupon: '',
      invalidCoupon: false,
      validatingCoupon: false,
    };
  },
  beforeMount() {
    this.fetchSolutions();
    this.fetchPackages();
  },
  methods: {
    ...mapActions('solutions', ['FETCH_SOLUTIONS']),
    ...mapActions('packages', ['FETCH_PACKAGES']),
    fetchSolutions() {
      const parameters = {
        page: 1,
      };
      this.FETCH_SOLUTIONS(parameters);
    },
    fetchPackages() {
      const parameters = {
        page: 1,
      };
      this.FETCH_PACKAGES(parameters);
    },
    useCoupon() {
      this.$router.push({
        name: 'register',
        query: { soft_launch: 1, code: this.coupon, role: 3 },
      });
    },
    verifyCoupon() {
      if (this.validatingCoupon) return;
      this.validatingCoupon = true;
      const parameters = {
        code: this.coupon,
        token: this.$store.getters['user_mgt/session'] || '',
      };
      this.$store.dispatch('coupons/getCoupon', parameters)
        .then((response) => {
          this.validatingCoupon = false;
          if (!response.success) return this.invalidCoupon = true;
          this.invalidCoupon = false;
          this.useCoupon();
        });
    },
  },
  computed: {
    selectedCoupon: () => this.$store.getters['coupons/coupon'],
    ...mapGetters('packages', {
      packagesList: 'getPackages',
    }),
    ...mapGetters('solutions', {
      solutionsList: 'getSolutions',
    }),
  },
};
</script>

<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500);

  .plans-container {
    .plans-title {
      font-size: 25px;
      font-weight: 700;
      color: #78c360;
      text-align: center;
      margin: 0;
      padding-right: 20px;
      display: flex;
      align-items: center;
    }

    &__header {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 20px;
      justify-content: center;

      .promo-code__input-container {
        display: flex;
        align-items: center;
        max-width: 500px;

        .input-container {
          margin-right: 10px;
        }

        .button {
          height: 44px;
          font-weight: 700;
        }
      }
    }
  }

  .plans-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #78c360;

    i {
      margin-left: 10px;
    }
  }

  @media screen and (max-width: 679px) {
    .plans-container__header {
      h2 {
        font-size: 20px !important;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .plans-container__header {
      h2 {
        padding-right: 0;
        padding-bottom: 20px;
      }
    }
  }
</style>
