<template>
  <section>
    <div class="mx-auto text-center my-5 col-12">
      <h2><b>{{ title }}</b></h2>
      <img
        :src="files[0].url"
        class="col-lg-12">
    </div>
  </section>
</template>

<script type="text/javascript">
export default {
  props: ['files', 'title'],
};
</script>
