<template>
  <div
    :class="controlClass"
    class="input-container has-icons-right">
    <input
      :class="className"
      :value="value"
      @input="updateValue"
      class="input"
      v-bind="$attrs"
      v-on="listeners">
    <span class="input-icon is-left">
      <slot name="icon" />
    </span>
    <slot name="right-button" />
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
  .input-container {
    cursor: default;
    display: flex;
    height: 46px;
    margin: 0 auto;
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;

    .input {
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
      font-size: 14px;
      height: 46px;
      justify-content: flex-start;
      line-height: 1.5;
      padding: 0 10px 0 46px;
      position: relative;
      vertical-align: top;
      transition: all .3s;

      &:active,
      &:focus {
        outline: none !important;
        // border-color: rgb(120, 195, 96);
        box-shadow: 0 1px 4px 0 rgba(120, 195, 96, .8), 0 0 0 1px rgba(120, 195, 96, .75);
      }

      &.is-danger {
        outline: none !important;
        // box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15);
        box-shadow: 0 1px 4px 0 rgba(254, 56, 95, .8), 0 0 0 1px rgba(254, 56, 95, .75);
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

    .input-button,
    .input-icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .input-icon {
      background-color: transparent;
      border: 0;
      border-radius: 4px 0 0 4px;
      height: 100%;
      font-size: 14px;
      position: absolute;
      width: 46px;

      i {
        color: #bdbdbd;
      }
    }

    .input-button {
      background-color: transparent;
      border: 0;
      border-radius: 0 4px 4px 0;
      height: 100%;
      font-size: 14px;
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
    .input-container {
      .input {
        font-size: 12px !important;
      }
    }
  }
</style>
