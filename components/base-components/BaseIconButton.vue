<template>
  <button
    :class="buttonClass"
    class="mdc-icon-button"
    ref="iconButton"
    v-bind="$attrs"
    v-on="$listeners">
    <slot />
  </button>
</template>

<script>
import { MDCRipple } from '@material/ripple';

export default {
  name: 'BaseIconButton',
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.iconButtonRipple = new MDCRipple(this.$refs.iconButton);
    this.iconButtonRipple.unbounded = true;
  },
  destroyed() {
    this.iconButtonRipple.destroy();
    this.iconButtonRipple.unbounded = false;
  },
};
</script>

<style lang="scss" scoped>
  @import "~@material/icon-button/mdc-icon-button";

  .mdc-icon-button {
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      color: #78c360;
    }
  }
</style>
