<template>
  <svg
    :aria-labelledby="iconName"
    :height="height"
    :width="width"
    role="presentation"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg">
    <title
      :id="iconName"
      lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box',
    },
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: 18,
    },
    iconColor: {
      type: String,
      default: 'currentColor',
    },
  },
};
</script>
