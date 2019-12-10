export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    className: {
      type: [String, Object],
      default: '',
    },
    controlClass: {
      type: [String, Object],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    value: [String, Number],
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
};
