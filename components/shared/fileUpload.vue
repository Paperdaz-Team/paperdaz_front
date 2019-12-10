<template id="">
  <form
    enctype="multipart/form-data"
    novalidate
    v-if="isInitial || isSaving || isSuccess || isFailed">
    <div class="dropbox">
      <div class="inner">
        <input
          :disabled="isSaving"
          :name="uploadFieldName"
          @change="onFileChange"
          class="input-file"
          multiple
          type="file">
        <p
          style="font-size: 12px;"
          v-if="isInitial">
          <img
            height="80"
            src="../../assets/img/file_types.png"><br><br>
          Drag your file(s) here or click to upload<br><br>
        </p>
        <p v-if="isSaving">
          <!-- <img src="../../assets/img/file_types.png" height="80"><br> -->
          <LoadingButton buttonclass="btn btn-primary">
            Uploading {{ fileCount }}
            files...
          </LoadingButton>
        </p>

        <p v-if="isFailed">
          <!-- <img src="../../assets/img/file_types.png" height="80"><br> -->
          {{ fileCount }} File(s) Upload Failed. Try Again...
        </p>
        <p v-if="isSuccess">
          <!-- <img src="../../assets/img/file_types.png" height="80"><br> -->
          successfully Uploaded {{ fileCount }} Files
        </p>
      </div>
    </div>
  </form>
</template>


<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';

const STATUS_INITIAL = 0; const STATUS_SAVING = 1; const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;
export default {
  name: 'App',
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      fileCount: 0,

    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
    ...mapGetters('userCredentials', {
      userData: 'user',
      permissions: 'permissions',
    }),

  },
  methods: {

    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },

    ...mapActions('projects/FileUpload', [
      'uploadFile',
      'resetState',
    ]),
    ...mapActions('userCredentials', [
      'callWithToken',
    ]),
    onFileChange(e) {
      this.currentStatus = STATUS_SAVING;
      const files = e.target.files || e.dataTransfer.files;
      this.fileCount = e.target.files.length;
      console.log('file inputed');
      if (!files.length) {
      } else {
        const formData = new FormData();

        Array
          .from(Array(files.length).keys())
          .map((x) => {
            formData.append('image', files[x], files[x].name);
          });
        this.sendPicture(formData);
      }
    },
    sendPicture(formData) {
      const args = {
        image: formData,
        user: this.userData,
        project: this.$route.params.id,
      };
      this.loading = true;
      const self = this;
      this.callWithToken({
        parameters: args,
        action: this.uploadFile,
      }).then((suc) => {
        this.currentStatus = STATUS_SUCCESS;

        this.$emit('refresh');
      }).catch(err => [
        this.currentStatus = STATUS_FAILED,
      ]);
    },
  },
  mounted() {
    this.reset();
  },
};

</script>


<style scoped>
  .bt-up {
    box-shadow: 0 13px 35px -3px rgba(50, 106, 218, 0.29);
    /**/
    padding: 12px 20px;
    background: #326ada;
    border: 1px solid #326ada;
  }

  .bt-up:hover {
    box-shadow: 0 13px 35px -3px rgba(50, 106, 218, 0.29);
    /**/
    padding: 12px 20px;
    background: #326ada;
    border: 1px solid #326ada;
  }

  .dropbox {
    /*outline: 1px dashed grey; !* the dash box *!*/
    /*outline-offset: -1px;*/
    -moz-outline-radius: 5px;
    -webkit-outline-radius: 5px;
    background: #ffffff;
    color: dimgray;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    padding: 2px;
  }

  .inner {
    border: 1px dashed grey;
    border-radius: 5px;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

</style>
