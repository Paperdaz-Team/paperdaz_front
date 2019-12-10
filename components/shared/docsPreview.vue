<template>
  <section class="col-lg-12 mx-auto">
    <h3><b>{{ title }}</b></h3>
    <iframe
      :src="'https://docs.google.com/gview?url='+docValue+'&embedded=true'"
      class="col-lg-12 mx-auto"
      style="height: 500px" />
  </section>
</template>

<script>
export default {
  components: {},
  props: ['docValue', 'title'],
};
</script>
