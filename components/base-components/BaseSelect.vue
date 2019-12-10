<template>
  <div class="select-container">
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners">
      <!-- now inheriting event listeners here -->
      <option
        :key="option"
        :selected="option === value"
        :value="option"
        v-for="option in options">
        {{ option }}
      </option>
    </select>
    <span class="select-icon is-left">
      <slot name="icon" />
    </span>
    <slot name="right-button" />
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin.js';

export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      required: true,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .select-container {
    cursor: default;
    display: flex;
    height: 46px;
    margin: 0 auto;
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;

    select {
      background-color: #fff;
      // box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      color: #363636;
      width: 100%;

      -moz-appearance: none;
      -webkit-appearance: none;
      align-items: center;
      border: 1px solid #dadada;
      border-radius: 4px;
      display: inline-flex;
      font-size: 16px;
      height: 46px;
      justify-content: flex-start;
      line-height: 1.5;
      padding: 0 46px;
      position: relative;
      vertical-align: top;
      transition: all .3s;

      &:active,
      &:focus {
        outline: none !important;
        border-color: #78c360 !important;
        box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15);
      }

      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #bebebe;
      }

      &::-moz-placeholder { /* Firefox 19+ */
        color: #bebebe;
      }

      &:-ms-input-placeholder { /* IE 10+ */
        color: #bebebe;
      }

      &:-moz-placeholder { /* Firefox 18- */
        color: #bebebe;
      }

      &:disabled {
        background: #ececec;
        color: #bebebe;
        cursor: not-allowed;
        user-select: none;
        box-shadow: none;
      }
    }

    .select-button,
    .select-icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .select-icon {
      background-color: transparent;
      border: 0;
      border-radius: 4px 0 0 4px;
      height: 100%;
      font-size: 16px;
      position: absolute;
      width: 46px;

      i {
        color: #bdbdbd;
      }
    }

    .select-button {
      background-color: transparent;
      border: 0;
      border-radius: 0 4px 4px 0;
      height: 100%;
      font-size: 16px;
      position: absolute;
      width: 46px;
    }

    .is-left {
      left: 0;
    }

    .is-right {
      right: 0;
    }
  }

  @media screen and (max-width: 550px) {
    .select-container {
      select,
      select > option {
        font-size: 12px !important;
      }
    }
  }
</style>
