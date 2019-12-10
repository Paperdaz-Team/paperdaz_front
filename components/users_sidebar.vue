<template>
  <b-nav
    class="hidden-touch"
    vertical>
    <b-nav-item
      :active="$route.path === '/users/dashboard'"
      to="/users/dashboard">
      My Files
    </b-nav-item>
    <b-nav-item
      :active="$route.path === '/upload_file'"
      to="/upload_file">
      Upload File
    </b-nav-item>
  </b-nav>
</template>


<style scoped type="text/css">
  .hidden-touch {
    display: none;
  }

  .visible-touch-flex {
    display: flex;
  }

  .nav-link.active {
    color: #55a73c;
    background: transparent;
  }

  .nav-link {
    color: rgba(51, 51, 51, 0.8313725490196079);
    font-size: 16px;
    background: transparent;
  }

  @media (max-width: 991px) {
    .links_user .flex-column {
      flex-direction: row !important;
    }

    .links_user li.nav-item {
      display: inline-block !important;
      width: auto !important;
    }
  }
</style>
