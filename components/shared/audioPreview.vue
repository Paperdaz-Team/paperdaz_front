<template>
  <section class="mx-auto my-2 text-center col-lg-12">
    <h2><b>{{ files.songname }}</b></h2>
    <audio controls>
      <source
        :src="files.url"
        type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </section>
</template>


<script type="text/javascript">


export default {
  props: ['files', 'title'],
  data() {
    return {};
  },
  methods: {},
};
</script>
