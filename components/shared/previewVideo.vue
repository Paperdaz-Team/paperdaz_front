<template>
  <section class="mx-auto my-2 text-center col-lg-12">
    <h2><b>{{ title }}</b></h2>
    <video
      controls
      height="340"
      width="520">
      <source
        :src="files.src"
        :type="files.type">
      Your browser does not support the video tag.
    </video>
  </section>
</template>


<script type="text/javascript">
import 'video.js/dist/video-js.css';

export default {
  props: ['files', 'title'],
  data() {
    return {};
  },
  methods: {},
};
</script>
