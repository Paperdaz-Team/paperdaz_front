<template>
  <b-nav vertical>
    <b-nav-item
      :active="$route.path === '/admin'"
      to="/admin">
      Dashboard
    </b-nav-item>
    <b-nav-item
      :active="$route.path === '/admin/users'"
      to="/admin/users">
      Users
    </b-nav-item>
    <b-nav-item
      :active="$route.path === '/admin/coupons'"
      to="/admin/coupons">
      Coupons
    </b-nav-item>
  </b-nav>
</template>


<style scoped type="text/css">
  .active {
    color: brown;
    font-weight: bold;
    border: none;
    border-right: 2px solid brown;
  }
</style>
