<template>
  <div class="my-1">
    <el-input
      @keyup.enter.native="searchIt"
      placeholder="Search"
      suffix-icon="el-icon-search"
      v-model="searchItem" />
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      searchItem: '',
    };
  },
  methods: {
    searchIt() {
      // if(this.searchItem.length>0){
      // console.log(this.searchItem)
      this.$emit('search', this.searchItem);
      // }
    },
  },
};
</script>
