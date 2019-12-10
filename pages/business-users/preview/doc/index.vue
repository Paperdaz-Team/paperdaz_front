<template>
  <div>
    <div
      v-if="!loading"
      v-loading="loading">
      <div class="row">
        <div class="col-lg-2 pt-5">
          <div
            class="btn btn-block btn-secondary"
            v-if="file.fileStatus === 1">
            Confirmed
          </div>
          <!-- <div class="btn btn-block btn-primary" @click="confirmFile()" v-if="file.fileStatus  !==  1">Confirm</div> -->
        </div>
        <div class="col-lg-8 mt-3">
          <d-preview
            :doc-value="$API+file.location"
            :title="file.title" />
        </div>
      </div>
      <section />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import audioPreview from '@/components/shared/audioPreview';
import imagePreview from '@/components/shared/previewImage';
import videoPreview from '@/components/shared/previewVideo';
import docPreview from '@/components/shared/docsPreview';
import pdfTool from '@/components/shared/pdfTool';


export default {
  layout: 'business-layout',
  components: {
    aPreview: audioPreview,
    pTool: pdfTool,
    preview: imagePreview,
    vPreview: videoPreview,
    dPreview: docPreview,
  },
  meta: {
    requiresAuth: true,
  },
  head: {
    title: 'File Preview',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  data() {
    return {
      playerOptions: {
        height: '360',
        autoplay: false,
        sources: [],
      },
      loading: false,
    };
  },
  mounted() {
    this.getSingleFile();
  },
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('files', ['getFile']),
    getSingleFile() {
      this.loading = true;
      this.callWithToken({
        parameters: {
          name: this.$route.query.id,
        },
        action: this.getFile,
      }).then((success) => {
        this.loading = false;
      });
    },
    closePdf() {
      this.$router.back();
    },
  },
  computed: {
    ...mapGetters('files', ['file']),
    files() {
      let wids = [];
      if (this.file.type === 'png' || this.file.type === 'jpg' || this.file.type === 'jpeg') {
        wids.push({
          url: this.$API + this.file.location,
        });
        return wids;
      }

      if (this.file.type === 'pdf') {
        wids.push({
          url: this.$API + this.file.location,
        });
        return wids;
      }

      if (this.file.type === 'docx' || this.file.type === 'pptx') {
        wids.push({
          url: this.$API + this.file.location,
        });
        return wids;
      }

      if (this.file.type === 'mp4') {
        this.playerOptions.src = this.$API + this.file.location;
        this.playerOptions.type = `video/${this.file.type}`;

        wids = this.playerOptions;
        return wids;
      }

      if (this.file.type === 'mp3') {
        wids.push({
          url: this.$API + this.file.location,
          songname: this.file.title,
        });
        return wids;
      }
    },
    fileType() {
      if (this.file.type === 'png' || this.file.type === 'jpg' || this.file.type === 'jpeg') {
        this.files.push({
          url: this.$API + this.file.location,
        });
        return 'image';
      }

      if (this.file.type === 'pdf') {
        this.files.push({
          url: this.$API + this.file.location,
        });
        return 'pdf';
      }

      if (this.file.type === 'docx' || this.file.type === 'pptx') {
        this.files.push({
          url: this.$API + this.file.location,
        });
        return 'doc';
      }

      if (this.file.type === 'mp4') {
        this.playerOptions.src = this.$API + this.file.location;
        this.playerOptions.type = `video/${this.file.type}`;
        return 'video';
      }

      if (this.file.type === 'mp3') {
        this.files.push({
          url: this.$API + this.file.location,
          songname: this.file.title,
        });
        return 'audio';
      }
    },
  },
};
</script>
