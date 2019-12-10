<template>
  <div class="container items-container">
    <div class="row">
      <div
        :class="{ 'is-area-success': fileLoaded }"
        @dragover.prevent
        @drop.prevent="dropHandler"
        class="file-drop-area">
        <span
          class="file-msg"
          v-if="!fileLoaded">
          <img
            :src="require('@/assets/img/load_file.png')"
            alt="Load file image"
            width="100px">
          <span v-if="!message">drag and drop your pdf file here</span>
          <span v-else>{{ message }}</span>
        </span>
        <div
          class="name-file"
          v-else>
          <i class="far fa-file-pdf pdf-file" />
          <span>
            {{ fileLoaded.name }}
            <i
              @click="removeFileLoaded"
              class="fas fa-times-circle"
              v-if="!uploadingFile" />
          </span>
        </div>

        <span
          class="separator"
          v-if="!fileLoaded">or</span>

        <base-button
          @click="searchFile"
          class="mdc-button--raised is-success"
          v-if="!fileLoaded">
          click to upload file
        </base-button>

        <input
          :disabled="uploadingFile"
          @change="loadFile"
          accept=".pdf"
          class="file-input"
          ref="myFile"
          type="file">
      </div>

      <base-button
        :disabled="uploadingFile"
        @click="submitFile()"
        class="mdc-button--raised is-success"
        v-if="fileLoaded">
        <span v-if="!uploadingFile">Open to view & Complete</span>
        <span v-else>Uploading <i class="fas fa-spinner fa-spin" /></span>
      </base-button>

      <b-row class="action-row">
        <div class="action-box__container">
          <base-icon
            height="85"
            icon-name="icon-upload"
            width="95.56">
            <icon-upload />
          </base-icon>
          <span>Upload your file</span>
        </div>
        <div class="action-box__container">
          <base-icon
            height="85"
            icon-name="icon-upload"
            width="95.56">
            <icon-complete />
          </base-icon>
          <span>
            Complete files
            electronically
          </span>
        </div>
        <div class="action-box__container">
          <base-icon
            height="85"
            icon-name="icon-upload"
            width="95.56">
            <icon-send />
          </base-icon>
          <span>
            Completed file will be
            sent to your email
          </span>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/api/files';
import BaseButton from '@/components/base-components/BaseButton';
import BaseIcon from '@/components/base-components/BaseIcon';
import IconUpload from '@/components/icons/IconUpload';
import IconComplete from '@/components/icons/IconComplete';
import IconSend from '@/components/icons/IconSend';

export default {
  name: 'UploadPdfPage',

  components: {
    BaseButton,
    BaseIcon,
    IconUpload,
    IconComplete,
    IconSend,
  },

  data() {
    return {
      fileLoaded: null,
      filePath: null,
      message: '',
      uploadingFile: false,
    };
  },

  methods: {
    loadFile() {
      if (this.uploadingFile) return;
      this.fileLoaded = this.$refs.myFile.files[0];
      this.filePath = this.$refs.myFile.value;
    },
    searchFile() {
      this.$refs.myFile.click();
    },
    dropHandler(ev) {
      if (this.uploadingFile) return;
      if (ev.dataTransfer.items[0].type   !==   'application/pdf') {
        this.message = 'Only drop PDF files';
      } else {
        const file = ev.dataTransfer.items[0].getAsFile();
        this.message = '';
        this.fileLoaded = file;
      }
      // Pass event to removeDragData for cleanup
      this.removeDragData(ev);
    },
    removeDragData(ev) {
      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to remove the drag data
        ev.dataTransfer.items.clear();
      } else {
        // Use DataTransfer interface to remove the drag data
        ev.dataTransfer.clearData();
      }
    },
    removeFileLoaded() {
      this.fileLoaded = null;
    },
    submitFile() {
      if (!this.uploadingFile) {
        const self = this;
        this.uploadingFile = true;

        const data = new FormData();
        // because the button says view and complete
        data.append('action_request', 1);
        data.append('file_type', 'public');
        data.append('token', self.session);
        data.append('document', self.fileLoaded);
        if (self.isLoggedIn) {
          api
            .freeUpload(data)
            .then((res) => {
              if (res.data.success === true) {
                self.$router.push({
                  name: 'users-view-pdf',
                  query: { id: res.data.result._id },
                });
                self.uploadingFile = false;
              }
            })
            .catch(function (error) {
              this.$message({
                message: 'Upload Failed',
              });
            });
        } else {
          api
            .guestUpload(data)
            .then((res) => {
              if (res.data.success === true) {
                self.$router.push({
                  name: 'guest-view-pdf',
                  query: { id: res.data.result._id },
                });
              }
            })
            .catch(function (error) {
              this.$message({
                message: 'Upload Failed',
              });
            });
        }
      } else {

      }
    },
  },
  computed: {
    ...mapGetters('user_mgt', ['user', 'isLoggedIn', 'session']),
  },
};
</script>

<style lang="scss">
  .is-area-success {
    border-color: rgba(120, 195, 96, 1) !important;
    background-color: rgba(120, 195, 96, 0.05) !important;
  }

  .items-container {
    .row {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .file-drop-area {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 795px;
        height: 300px;
        padding: 25px;
        border: 2px dashed rgba(120, 195, 96, 0.4);
        border-radius: 3px;
        transition: 0.2s;
        margin-bottom: 20px;

        &.is-active {
          border-color: #78c360;
          background-color: red;
        }
      }

      .file-msg,
      .name-file {
        font-size: 16px;
        font-weight: 500;
        line-height: 1.4;
        white-space: nowrap;
        color: rgba(102, 102, 102, 0.8);
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .file-msg {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .name-file {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #666;
        justify-content: center;
        position: relative;
        z-index: 99;

        i.pdf-file {
          font-size: 60px;
          margin-bottom: 8px;
          color: #78c360;
          font-weight: bold;
        }

        span {
          display: flex;
          align-items: center;
          justify-content: center;

          i {
            color: hsl(348, 100%, 61%);
            margin-left: 5px;
            cursor: pointer;
          }
        }
      }

      .separator {
        align-items: center;
        font-size: 15px;
        font-weight: 500;
        line-height: 1.4;
        white-space: nowrap;
        color: rgba(102, 102, 102, 0.8);
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 15px 0;
      }

      .button {
        position: relative;
        z-index: 99;
      }

      .file-input {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        cursor: pointer;
        opacity: 0;

        &:focus {
          outline: none;
        }
      }
    }
  }

  .action-row {
    max-width: 100%;
    margin: 0 !important;
    margin-top: 25px;
    display: flex;
    flex-direction: row !important;

    .action-box__container {
      width: 245px;
      height: 215px;
      border: 2px dashed #c4c4c4;
      color: #c4c4c4;
      display: flex;
      padding: 20px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      margin: 15px;

      &:first-child {
        border-color: #76c360;
        color: #76c360;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        cursor: pointer;
      }

      span {
        font-size: 20px;
        padding-top: 15px;
      }
    }
  }
</style>
