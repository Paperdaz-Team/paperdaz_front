<template>
  <nav class="nav">
    <a
      @click="handleClick()"
      class="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center"
      href="#">
      <i class="material-icons">&#xE5D2;</i>
    </a>
  </nav>
</template>

<script>
export default {
  name: 'NavbarToggle',
  methods: {
    handleClick() {
      // this.$eventHub.$emit('toggle-sidebar');
    },
  },
};
</script>
