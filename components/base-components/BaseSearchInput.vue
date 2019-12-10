<template>
  <div
    :class="controlClass"
    class="search-input-container has-icons-right">
    <input
      :class="className"
      :value="value"
      @input="updateValue"
      class="input"
      type="text"
      v-bind="$attrs"
      v-on="listeners">
    <span class="search-icon is-left">
      <i class="fas fa-search" />
    </span>
    <slot />
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin.js';

export default {
  mixins: [formFieldMixin],
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
  .search-input-container {
    cursor: default;
    display: flex;
    height: 46px;
    margin: 0 auto;
    position: relative;

    .input {
      background-color: #fff;
      border: 1px solid #dadada;
      border-radius: 4px;
      color: #363636;
      width: 100%;

      -moz-appearance: none;
      -webkit-appearance: none;
      align-items: center;
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
    }

    .search-button,
    .search-icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .search-icon {
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

    .search-button {
      background-color: transparent;
      border: 0;
      border-radius: 0 4px 4px 0;
      height: 100%;
      font-size: 16px;
      position: absolute;
      width: 46px;
    }

    .is-right {
      right: 0;
    }

    .is-left {
      left: 0;
    }
  }
</style>
