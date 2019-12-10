<template>
  <section>
    <b-nav vertical>
      <b-nav-item
        :active="active===user.Id"
        :key="index"
        @click="select(user.Id)"
        class="name"
        v-for="(user, index) in users">
        {{ user.firstName+' '+user.lastName }}
      </b-nav-item>
    </b-nav>
  </section>
</template>

<script type="text/javascript">
export default {
  props: ['users'],
  data() {
    return {};
  },
  computed: {
    active() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      }
    },
  },


  methods: {
    current(id) {
      if (this.$route.query.id === id) {
        return true;
      }
      return false;
    },
    select(user) {
      this.$emit('selected', user);
    },
  },

};
</script>

<style scoped type="text/css">
  .active {
    color: brown;
    font-weight: bold;
    border: none;
    border-right: 2px solid brown;
  }
</style>


<style scoped type="text/css">
  /*@import "~@/assets/css/material-dashboard.min.css";*/
  .name {
    text-transform: capitalize;
  }
</style>
