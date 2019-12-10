<template>
  <b-nav
    class="hidden-sm"
    vertical>
    <b-nav-item
      :active="$route.name==='business-users-dashboard'"
      :to="{path:'/business-users/dashboard'}">
      My Files
    </b-nav-item>
    <b-nav-item
      :active="$route.name==='business-users-company-files'"
      :to="{path:'/business-users/company-files'}">
      Company Files
    </b-nav-item>
    <b-nav-item
      :active="$route.name==='business-users-teams'"
      :to="{path:'/business-users/teams'}">
      Teams
    </b-nav-item>
  </b-nav>
</template>

<script type="text/javascript">
export default {
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped type="text/css">
  .nav-link.active, .nav-link:hover {
    color: #55a73c;
    background: transparent;
  }

  .nav-link {
    color: rgba(51, 51, 51, 0.8313725490196079);
    font-size: 16px;
    background: transparent;
  }

  .mt-10 {
    margin-top: 110px;
  }

  @media (max-width: 1199px) {
    .nav-link {
      font-size: 14px;
    }
  }

  @media (max-width: 991px) {
    .mt-10 {
      margin-top: 20px;
      flex-direction: row !important;
      padding: 0 5px;
    }

    .mt-5 {
      margin-top: 15px !important;
    }
  }

</style>
