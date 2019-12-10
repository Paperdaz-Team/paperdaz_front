<template>
  <label class="checkbox-item m-0">
    <input
      :checked="value"
      @change="$emit('input', $event.target.checked)"
      class="checkbox-input"
      type="checkbox">
    <span class="checkbox-label">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: null,
      default: false,
    },
  },
};
</script>
