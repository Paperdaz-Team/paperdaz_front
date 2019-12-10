<template>
  <div class="pricing-table is-comparative">
    <div class="pricing-plan is-features">
      <div class="plan-header">
        Features
      </div>
      <div class="plan-price">
        <span class="plan-price-amount">&nbsp;</span>
      </div>
      <div
        class="plan-items"
        v-if="solutions.length > 0">
        <div
          :key="index"
          class="plan-item"
          v-for="(item, index) in solutions">
          {{ item.label }}
        </div>
      </div>
      <div
        class="plan-items"
        v-else>
        <div class="plan-item">
          No solutions registered
        </div>
      </div>
      <div class="plan-footer" />
    </div>

    <template v-if="packages">
      <div
        :key="i"
        class="pricing-plan is-success"
        v-for="(item, i) in packages">
        <div class="plan-header">
          {{ item.name }}
        </div>
        <div class="plan-price">
          <span class="plan-price-amount">
            <span class="plan-price-currency">$</span>{{ item.price }}
          </span>/month
        </div>
        <div class="plan-items">
          <div
            :data-feature="solution.label"
            :key="j"
            class="plan-item"
            v-for="(solution, j) in item.solutions">
            <div v-if="solution.active">
              <span
                class="plan-success-icon"
                v-if="!solution.value">
                <i class="fas fa-check" />
              </span>
              <span v-else>{{ solution.value }}</span>
            </div>
            <span
              class="plan-danger-icon"
              v-else>
              <i class="fas fa-times" />
            </span>
          </div>
        </div>
        <div class="plan-footer">
          <base-button
            @click="choosePackage(item)"
            button-class="is-success mdc-button--unelevated is-fullwidth">
            Choose
          </base-button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="pricing-plan is-success">
        <div class="plan-header">
          No packages registered
        </div>
        <div class="plan-price">
          <span class="plan-price-amount">
            <span class="plan-price-currency">$</span>00
          </span>/month
        </div>
        <div class="plan-items">
          <div class="plan-item">
            <span class="plan-danger-icon">
              No packages registered
            </span>
          </div>
        </div>
        <div class="plan-footer">
          <base-button
            :disabled="true"
            button-class="is-success mdc-button--unelevated is-fullwidth">
            Choose
          </base-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import BaseButton from '@/components/base-components/BaseButton';

export default {
  name: 'PricingTable',
  components: {
    BaseButton,
  },
  props: ['solutions', 'packages'],
  data() {
    return {
      tableData: null,
    };
  },
  methods: {
    hasSolution(item) {
      const { solutions } = this;

      if (item) {
        for (let index = 0; index < solutions.length; index++) {
          const element = solutions[index];

          if (element._id === item._id) {
            return true;
            break;
          }
        }
      } else {
        return false;
      }
    },
    choosePackage(item) {
      this.$router.push({
        name: 'register',
        query: { soft_launch: 1, package: item._id, role: 3 },
      });
    },
  },
};
</script>

<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500);

  @-webkit-keyframes spinAround {
    from {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    to {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }

  @keyframes spinAround {
    from {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    to {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }

  .pricing-table {
    display: flex;
    align-items: stretch;
    flex-direction: row;
    flex-flow: row wrap;
    justify-content: space-between;
    font-family: "Roboto", sans-serif;
  }

  .pricing-table.is-comparative .pricing-plan {
    border-radius: initial;
    margin: 0;
  }

  .pricing-table.is-comparative .pricing-plan:not(:last-child) {
    border-right: none;
  }

  .pricing-table.is-comparative .pricing-plan:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .pricing-table.is-comparative .pricing-plan:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .pricing-table.is-comparative .pricing-plan.is-active {
    border: 0.1rem solid #f5f5f5;
    border-radius: 4px;
  }

  .pricing-table .pricing-plan {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    background-color: #fff;
    border: 0.1rem solid #f5f5f5;
    border-radius: 4px;
    list-style-type: none;
    transition: 0.25s;
    margin: 0.5em;
  }

  .pricing-table .pricing-plan .plan-header {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #fff;
    color: #4a4a4a;
    font-size: 1.25rem;
    font-weight: 600;
    font-family: "Roboto", sans-serif !important;
    padding: 0.75em;
    align-content: center;
    text-align: center;
  }

  .pricing-table .pricing-plan .plan-item {
    background: #f5f5f5;
    border-bottom: 0.1rem solid #fff;
    padding: 0.75em;
    align-content: center;
    text-align: center;
    font-size: 0.9em;
    color: #7a7a7a;
  }

  .pricing-table .pricing-plan .plan-price {
    background-color: #fff;
    color: #4a4a4a;
    font-size: 0.75rem;
    font-weight: 400;
    padding: 0.75em;
    align-content: center;
    text-align: center;
  }

  .pricing-table .pricing-plan .plan-price .plan-price-amount {
    font-size: 2.5rem;
    font-weight: 700;
  }

  .pricing-table
  .pricing-plan
  .plan-price
  .plan-price-amount
  .plan-price-currency {
    vertical-align: super;
    font-size: 1rem !important;
    font-weight: 400 !important;
    color: #4a4a4a;
    margin-right: 0.25rem;
  }

  .pricing-table .pricing-plan .plan-footer {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 0.75em;
    align-content: center;
    text-align: center;
    margin-top: auto;
  }

  .pricing-table .pricing-plan.is-active {
    box-shadow: 0 8px 12px 0 rgba(122, 122, 122, 0.2);
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }

  .pricing-table .pricing-plan.is-active .plan-price .plan-price-amount {
    color: #78c360;
  }

  .pricing-table .pricing-plan.is-active .plan-footer .button {
    background-color: #78c360;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-active .plan-footer .button.is-hovered,
  .pricing-table .pricing-plan.is-active .plan-footer .button:hover {
    background-color: #78c360;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-active .plan-footer .button.is-focused,
  .pricing-table .pricing-plan.is-active .plan-footer .button:focus {
    border-color: transparent;
    box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);
    color: #fff;
  }

  .pricing-table .pricing-plan.is-active .plan-footer .button.is-active,
  .pricing-table .pricing-plan.is-active .plan-footer .button:active {
    background-color: #78c360;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-active .plan-footer .button[disabled] {
    background-color: #78c360;
    border-color: transparent;
  }

  .pricing-table .pricing-plan.is-white .plan-price .plan-price-amount {
    color: #fff;
  }

  .pricing-table .pricing-plan.is-white .plan-footer .button {
    background-color: #fff;
    border-color: transparent;
    color: #0a0a0a;
  }

  .pricing-table .pricing-plan.is-white .plan-footer .button.is-hovered,
  .pricing-table .pricing-plan.is-white .plan-footer .button:hover {
    background-color: #f9f9f9;
    border-color: transparent;
    color: #0a0a0a;
  }

  .pricing-table .pricing-plan.is-white .plan-footer .button.is-focused,
  .pricing-table .pricing-plan.is-white .plan-footer .button:focus {
    border-color: transparent;
    box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.25);
    color: #0a0a0a;
  }

  .pricing-table .pricing-plan.is-white .plan-footer .button.is-active,
  .pricing-table .pricing-plan.is-white .plan-footer .button:active {
    background-color: #f2f2f2;
    border-color: transparent;
    color: #0a0a0a;
  }

  .pricing-table .pricing-plan.is-white .plan-footer .button[disabled] {
    background-color: #fff;
    border-color: transparent;
    box-shadow: none;
  }

  .pricing-table .pricing-plan.is-black .plan-price .plan-price-amount {
    color: #0a0a0a;
  }

  .pricing-table .pricing-plan.is-black .plan-footer .button {
    background-color: #0a0a0a;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-black .plan-footer .button.is-hovered,
  .pricing-table .pricing-plan.is-black .plan-footer .button:hover {
    background-color: #040404;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-black .plan-footer .button.is-focused,
  .pricing-table .pricing-plan.is-black .plan-footer .button:focus {
    border-color: transparent;
    box-shadow: 0 0 0.5em rgba(10, 10, 10, 0.25);
    color: #fff;
  }

  .pricing-table .pricing-plan.is-black .plan-footer .button.is-active,
  .pricing-table .pricing-plan.is-black .plan-footer .button:active {
    background-color: #000;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-black .plan-footer .button[disabled] {
    background-color: #0a0a0a;
    border-color: transparent;
    box-shadow: none;
  }

  .pricing-table .pricing-plan.is-light .plan-price .plan-price-amount {
    color: #f5f5f5;
  }

  .pricing-table .pricing-plan.is-light .plan-footer .button {
    background-color: #f5f5f5;
    border-color: transparent;
    color: #363636;
  }

  .pricing-table .pricing-plan.is-light .plan-footer .button.is-hovered,
  .pricing-table .pricing-plan.is-light .plan-footer .button:hover {
    background-color: #eee;
    border-color: transparent;
    color: #363636;
  }

  .pricing-table .pricing-plan.is-light .plan-footer .button.is-focused,
  .pricing-table .pricing-plan.is-light .plan-footer .button:focus {
    border-color: transparent;
    box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.25);
    color: #363636;
  }

  .pricing-table .pricing-plan.is-light .plan-footer .button.is-active,
  .pricing-table .pricing-plan.is-light .plan-footer .button:active {
    background-color: #e8e8e8;
    border-color: transparent;
    color: #363636;
  }

  .pricing-table .pricing-plan.is-light .plan-footer .button[disabled] {
    background-color: #f5f5f5;
    border-color: transparent;
    box-shadow: none;
  }

  .pricing-table .pricing-plan.is-dark .plan-price .plan-price-amount {
    color: #363636;
  }

  .pricing-table .pricing-plan.is-dark .plan-footer .button {
    background-color: #363636;
    border-color: transparent;
    color: #f5f5f5;
  }

  .pricing-table .pricing-plan.is-dark .plan-footer .button.is-hovered,
  .pricing-table .pricing-plan.is-dark .plan-footer .button:hover {
    background-color: #2f2f2f;
    border-color: transparent;
    color: #f5f5f5;
  }

  .pricing-table .pricing-plan.is-dark .plan-footer .button.is-focused,
  .pricing-table .pricing-plan.is-dark .plan-footer .button:focus {
    border-color: transparent;
    box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.25);
    color: #f5f5f5;
  }

  .pricing-table .pricing-plan.is-dark .plan-footer .button.is-active,
  .pricing-table .pricing-plan.is-dark .plan-footer .button:active {
    background-color: #292929;
    border-color: transparent;
    color: #f5f5f5;
  }

  .pricing-table .pricing-plan.is-dark .plan-footer .button[disabled] {
    background-color: #363636;
    border-color: transparent;
    box-shadow: none;
  }

  .pricing-table .pricing-plan.is-primary .plan-price .plan-price-amount {
    color: #00d1b2;
  }

  .pricing-table .pricing-plan.is-primary .plan-footer .button {
    background-color: #00d1b2;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-primary .plan-footer .button.is-hovered,
  .pricing-table .pricing-plan.is-primary .plan-footer .button:hover {
    background-color: #00c4a7;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-primary .plan-footer .button.is-focused,
  .pricing-table .pricing-plan.is-primary .plan-footer .button:focus {
    border-color: transparent;
    box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);
    color: #fff;
  }

  .pricing-table .pricing-plan.is-primary .plan-footer .button.is-active,
  .pricing-table .pricing-plan.is-primary .plan-footer .button:active {
    background-color: #00b89c;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-primary .plan-footer .button[disabled] {
    background-color: #00d1b2;
    border-color: transparent;
    box-shadow: none;
  }

  .pricing-table .pricing-plan.is-link .plan-price .plan-price-amount {
    color: #3273dc;
  }

  .pricing-table .pricing-plan.is-link .plan-footer .button {
    background-color: #3273dc;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-link .plan-footer .button.is-hovered,
  .pricing-table .pricing-plan.is-link .plan-footer .button:hover {
    background-color: #276cda;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-link .plan-footer .button.is-focused,
  .pricing-table .pricing-plan.is-link .plan-footer .button:focus {
    border-color: transparent;
    box-shadow: 0 0 0.5em rgba(50, 115, 220, 0.25);
    color: #fff;
  }

  .pricing-table .pricing-plan.is-link .plan-footer .button.is-active,
  .pricing-table .pricing-plan.is-link .plan-footer .button:active {
    background-color: #2366d1;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-link .plan-footer .button[disabled] {
    background-color: #3273dc;
    border-color: transparent;
    box-shadow: none;
  }

  .pricing-table .pricing-plan.is-info .plan-price .plan-price-amount {
    color: #209cee;
  }

  .pricing-table .pricing-plan.is-info .plan-footer .button {
    background-color: #209cee;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-info .plan-footer .button.is-hovered,
  .pricing-table .pricing-plan.is-info .plan-footer .button:hover {
    background-color: #1496ed;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-info .plan-footer .button.is-focused,
  .pricing-table .pricing-plan.is-info .plan-footer .button:focus {
    border-color: transparent;
    box-shadow: 0 0 0.5em rgba(32, 156, 238, 0.25);
    color: #fff;
  }

  .pricing-table .pricing-plan.is-info .plan-footer .button.is-active,
  .pricing-table .pricing-plan.is-info .plan-footer .button:active {
    background-color: #118fe4;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-info .plan-footer .button[disabled] {
    background-color: #209cee;
    border-color: transparent;
    box-shadow: none;
  }

  .pricing-table .pricing-plan.is-success .plan-price .plan-price-amount {
    color: #78c360;
  }

  .pricing-table .pricing-plan.is-success .plan-footer .button {
    background-color: #78c360;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-success .plan-footer .button.is-hovered,
  .pricing-table .pricing-plan.is-success .plan-footer .button:hover {
    background-color: #22c65b;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-success .plan-footer .button.is-focused,
  .pricing-table .pricing-plan.is-success .plan-footer .button:focus {
    border-color: transparent;
    box-shadow: 0 0 0.5em rgba(35, 209, 96, 0.25);
    color: #fff;
  }

  .pricing-table .pricing-plan.is-success .plan-footer .button.is-active,
  .pricing-table .pricing-plan.is-success .plan-footer .button:active {
    background-color: #78c360;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-success .plan-footer .button[disabled] {
    background-color: #23d160;
    border-color: transparent;
    box-shadow: none;
  }

  .pricing-table .pricing-plan.is-warning .plan-price .plan-price-amount {
    color: #ffdd57;
  }

  .pricing-table .pricing-plan.is-warning .plan-footer .button {
    background-color: #ffdd57;
    border-color: transparent;
    color: rgba(0, 0, 0, 0.7);
  }

  .pricing-table .pricing-plan.is-warning .plan-footer .button.is-hovered,
  .pricing-table .pricing-plan.is-warning .plan-footer .button:hover {
    background-color: #ffdb4a;
    border-color: transparent;
    color: rgba(0, 0, 0, 0.7);
  }

  .pricing-table .pricing-plan.is-warning .plan-footer .button.is-focused,
  .pricing-table .pricing-plan.is-warning .plan-footer .button:focus {
    border-color: transparent;
    box-shadow: 0 0 0.5em rgba(255, 221, 87, 0.25);
    color: rgba(0, 0, 0, 0.7);
  }

  .pricing-table .pricing-plan.is-warning .plan-footer .button.is-active,
  .pricing-table .pricing-plan.is-warning .plan-footer .button:active {
    background-color: #ffd83d;
    border-color: transparent;
    color: rgba(0, 0, 0, 0.7);
  }

  .pricing-table .pricing-plan.is-warning .plan-footer .button[disabled] {
    background-color: #ffdd57;
    border-color: transparent;
    box-shadow: none;
  }

  .pricing-table .pricing-plan.is-danger .plan-price .plan-price-amount {
    color: #ff3860;
  }

  .pricing-table .pricing-plan.is-danger .plan-footer .button {
    background-color: #ff3860;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-danger .plan-footer .button.is-hovered,
  .pricing-table .pricing-plan.is-danger .plan-footer .button:hover {
    background-color: #ff2b56;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-danger .plan-footer .button.is-focused,
  .pricing-table .pricing-plan.is-danger .plan-footer .button:focus {
    border-color: transparent;
    box-shadow: 0 0 0.5em rgba(255, 56, 96, 0.25);
    color: #fff;
  }

  .pricing-table .pricing-plan.is-danger .plan-footer .button.is-active,
  .pricing-table .pricing-plan.is-danger .plan-footer .button:active {
    background-color: #ff1f4b;
    border-color: transparent;
    color: #fff;
  }

  .pricing-table .pricing-plan.is-danger .plan-footer .button[disabled] {
    background-color: #ff3860;
    border-color: transparent;
    box-shadow: none;
  }

  .plan-danger-icon {
    color: #ff3860;
    font-weight: 600;
    font-size: 1em;
  }

  .plan-success-icon {
    color: #78c360;
    font-weight: 600;
    font-size: 1em;
  }

  @media screen and (min-width: 769px), print {
    .pricing-table.is-comparative {
      margin: 0.5rem;
    }
    .pricing-table.is-comparative.is-features {
      display: none;
    }
    .pricing-table.is-comparative .plan-item::before {
      content: attr("data-feature");
    }
    .pricing-table.is-horizontal .pricing-plan {
      display: flex;
      flex-direction: row;
      flex-basis: 100%;
    }
    .pricing-table.is-horizontal .pricing-plan .plan-header {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .pricing-table.is-horizontal .pricing-plan .plan-price {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    .pricing-table.is-horizontal .pricing-plan .plan-items {
      width: 100%;
      background-color: #f5f5f5;
      columns: 2;
      -webkit-columns: 2;
      -moz-columns: 2;
      -webkit-column-gap: 0.1rem;
      column-gap: 0.1rem;
    }
    .pricing-table.is-horizontal .pricing-plan .plan-footer {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: auto;
    }
  }

  @media screen and (max-width: 768px) {
    .pricing-table.is-comparative .pricing-plan {
      margin: 0.5rem;
    }
    .pricing-table.is-comparative .pricing-plan.is-plan-first-mobile {
      order: -1;
    }
    .pricing-table.is-comparative .pricing-plan.is-features {
      display: none;
    }
    .pricing-table.is-comparative .pricing-plan .plan-item::before {
      content: attr(data-feature);
      display: block;
      font-weight: 600;
      font-size: 0.75rem;
      color: #b5b5b5;
    }
  }
</style>
