<template>
  <div :class="['main-navbar', 'bg-white', stickyTop ? 'sticky-top' : '']">
    <d-navbar
      class="align-items-center flex-md-nowrap p-0 m-0"
      type="light">
      <navbar-search />
      <navbar-nav />
      <navbar-toggle />
    </d-navbar>
  </div>
</template>

<script>
import NavbarSearch from './NavbarSearch';
import NavbarNav from './NavbarNav';
import NavbarToggle from './NavbarToggle';

export default {
  components: {
    NavbarSearch,
    NavbarNav,
    NavbarToggle,
  },
  props: {
    /**
       * Whether the main navbar should be sticky, or not.
       */
    stickyTop: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
  .main-navbar {
    .dropdown-menu {
      display: block;
    }
  }
</style>
