<template>
  <button
    :class="buttonClass"
    class="button mdc-button"
    ref="button"
    v-bind="$attrs"
    v-on="$listeners">
    <slot class="mdc-button__label" />
  </button>
</template>

<script>
import { MDCRipple } from '@material/ripple';

export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.ripple = new MDCRipple(this.$refs.button);
  },
  destroyed() {
    this.ripple.destroy();
  },
};
</script>

<style lang="scss" scoped>
  @import "~@material/button/mdc-button";

  .button {
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  }

  i {
    margin-left: 5px;
  }

  .is-marginless {
    margin: 0 !important;
  }

  .is-success {
    @include mdc-button-container-fill-color(#78c360);
  }

  .is-danger {
    @include mdc-button-container-fill-color(#ff3860);
  }

  .is-white {
    @include mdc-button-container-fill-color(#fff);
    @include mdc-button-ink-color(#78c360);
    @include mdc-states-base-color(#9e9e9e);
  }

  .is-warning {
    @include mdc-button-container-fill-color(#fedd56);
  }

  .is-dark {
    @include mdc-button-container-fill-color(#353535);
  }

  .is-info {
    @include mdc-button-container-fill-color(#209bee);
  }

  .is-text-dark {
    @include mdc-button-ink-color(#353535);
    @include mdc-states-base-color(#353535);
  }

  .is-text-white {
    @include mdc-button-ink-color(#fff);
    @include mdc-states-base-color(#fff);
  }

  .is-outlined-white {
    @include mdc-button-container-fill-color(transparent);
    @include mdc-states-base-color(#fff);
    @include mdc-button-icon-color(#fff);
    @include mdc-button-outline-color(rgba(255, 255, 255, 0.2));
    @include mdc-button-ink-color(#fff);
    @include mdc-button-outline-width(1px);
  }

  .is-outlined-dark {
    @include mdc-button-container-fill-color(transparent);
    @include mdc-states-base-color(#353535);
    @include mdc-button-icon-color(#353535);
    @include mdc-button-outline-color(rgba(53, 53, 53, 0.2));
    @include mdc-button-ink-color(#353535);
    @include mdc-button-outline-width(1px);
  }

  .is-outlined-success {
    @include mdc-button-container-fill-color(transparent);
    @include mdc-states-base-color(#78c360);
    @include mdc-button-icon-color(#78c360);
    @include mdc-button-outline-color(rgba(120, 195, 96, 0.5));
    @include mdc-button-ink-color(#78c360);
    @include mdc-button-outline-width(1px);
  }

  .is-outlined-danger {
    @include mdc-button-container-fill-color(transparent);
    @include mdc-states-base-color(#ff3860);
    @include mdc-button-icon-color(#ff3860);
    @include mdc-button-outline-color(rgba(255, 56, 96, 0.5));
    @include mdc-button-ink-color(#ff3860);
    @include mdc-button-outline-width(2px);
  }

  .has-bg-white {
    @include mdc-button-container-fill-color(#fff);
  }

  .is-fullwidth {
    width: 100%;
  }

  .facebook {
    @include mdc-button-container-fill-color(#3b5998);
  }

  .twitter {
    @include mdc-button-container-fill-color(#00acee);
  }

  .google {
    @include mdc-button-container-fill-color(#db3236);
  }
</style>
