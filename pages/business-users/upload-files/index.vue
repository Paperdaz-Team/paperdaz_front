<template>
  <div class="">
    <div class="row">
      <div class="col-lg-2" />

      <div class="col-lg-6 col-12 text-center">
        <el-upload
          :action="$API+'api/files/add-file'"
          :auto-upload="false"
          :data="computedData"
          :multiple="false"
          :on-error="handleError"
          :on-success="handleSuccess"
          accept="image/*,video/mp4,audio/mp3"
          class="upload-demo"
          drag
          name="document"
          ref="upload">
          <div class="row mt-5">
            <div
              class="col-6 pt-4"
              style="height: 140px; border-right: 1px solid rgba(0,0,0,0.1);">
              <i class="ion ion-ios-cloud-upload-outline fa-5x" />
              <div class="el-upload__text">
                Drop file to upload
              </div>
            </div>
            <div class="col-6 pt-5">
              <p
                class="el-upload__tip ml-3 mt-2"
                slot="tip">
                PDF | PPT | PPTX
              </p>
              <p
                class="el-upload__tip ml-3"
                slot="tip">
                DOCX | MP4 | MP3
              </p>
            </div>
          </div>
        </el-upload>
        <hr class="mt-5">
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-2" />
      <div class="col-12 col-lg-6">
        <div class="row">
          <div class="col-lg-3 col-12 text-right">
            File Type:
          </div>
          <div class="col-lg-1 hidden-sm  hidden-xs" />
          <div class="col-lg-4 col-4">
            <el-radio
              label="private"
              v-model="file.file_type">
              Private
            </el-radio>
          </div>
          <div class="col-lg-4 col-4">
            <el-radio
              label="public"
              v-model="file.file_type">
              Public
            </el-radio>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-lg-3 col-12 text-right">
            Action Request:
          </div>
          <div class="col-lg-1 hidden-sm  hidden-xs" />
          <div class="col-lg-4 col-4">
            <el-radio
              label="1"
              v-model="file.action_request">
              View & Complete
            </el-radio>
          </div>
          <div class="col-lg-4 col-4">
            <el-radio
              label="2"
              v-model="file.action_request">
              View & Confirm
            </el-radio>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-lg-3 col-12 text-right">
            Add CC Email:
          </div>
          <div class="col-1 hidden-sm  hidden-xs" />
          <div class="col-lg-8 col-12">
            <el-input
              size="medium"
              v-model="cc">
              <el-button
                @click="addCC(cc)"
                class="add_email"
                slot="append">
                Add another email
              </el-button>
            </el-input>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-3" />
          <div class="col-1" />
          <div class="col-6">
            <div
              style="font-size: 12px;"
              v-for="cc2 in cc_to">
              <button
                @click="addCC(cc2)"
                class="btn btn-default btn-xs ion ion-ios-minus-empty pull-right" />
              <label style="max-width: 200px; overflow-x: hidden;">{{ cc2
              }}</label>
            </div>
          </div>
        </div>

        <div class="row mt-3 text-center">
          <div class="col-3" />
          <div class="col-1" />
          <div class="col-4">
            <button
              @click="submitDocument()"
              class="btn btn-blc btn_send">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex';

export default {
  meta: { requiresAuth: true },
  layout: 'business-layout',
  head: {
    title: 'Upload Files',
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
      file: {},
      cc: '',
      file_data: {},
      cc_to: [],
      fileList: [],
      error: '',
      object: null,
    };
  },
  mounted() {
    // if(!this.user.profile_complete){
    // 	this.$message({
    // 		message: "Please setup billing information to continue"
    // 	})
    // 	this.$router.push({name: 'profile',query: {page: 2}});
    // }
  },
  methods: {
    addCC(cc) {
      if (this.validateEmail(cc)) {
        if (this.cc_to.includes(cc)) {
          console.log('here');
          const ind = this.cc_to.indexOf(cc);
          this.cc_to.splice(ind, 1);
        } else {
          this.cc_to.push(cc);
        }
      } else {
        this.$message({
          message: 'Enter a valid Email address',
        });
      }
    },
    submitDocument() {
      if (this.validateFields()) {
        this.$refs.upload.submit();
      } else {
        this.$message({
          message: this.error,
        });
      }
    },
    handleError(err, file, fileList) {
      console.log(err);
      this.$message({
        message: 'Upload Failed',
      });
    },
    handleSuccess(response, file, fileList) {
      this.file.file_type = null;
      this.file.action_request = null;
      this.cc_to = [];
      this.$message({
        message: 'Upload Completed',
      });
      this.$router.push({ path: '/business-users/company-files' });
    },
    validateEmail(cc) {
      if (cc.length > 0) {
        const t = cc.split('@');
        if (t.length === 2) {
          const df = t[1].split('.');
          if (df.length === 2) {
            return true;
          }
          return false;
        }
        return false;
      }
      return false;
    },
    validateFields() {
      if (this.file.file_type) {
        if (this.file.action_request) {
          return true;
        }
        this.error = 'Set Action Request';
        return false;
      }
      this.error = 'Set File Type';
      return false;
    },
  },
  computed: {
    ...mapGetters('user_mgt', ['user', 'isLoggedIn', 'session']),
    computedData() {
      this.file.copied_to = this.cc_to;
      this.file.token = this.session;
      return this.file;
    },

  },
};
</script>


<style type="text/css">
  .el-upload-dragger {
    border: none !important;
    background: transparent;
  }

  .btn-blc {
    font-weight: 400 !important;
  }

  .add_email {
    color: #53A63E !important;
  }

  .el-input-group > .el-input__inner {
    display: inline-block;
    width: 70% !important;
    border-radius: 4px;
  }

  .el-input-group__append {
    background-color: transparent !important;
    border: 0 !important;
    margin-left: 8px;
    display: inline-block;
  }

  .add_email {
    color: #53A63E !important;
    background: #fff !important;
    border: 1px solid #53A63E !important;
    width: 120px;
    padding: 8px 10px;
    font-size: 12px !important;
  }

  p {
    margin-bottom: 5px;
    color: rgba(0, 0, 0, 0.1) !important;
  }

  .el-upload__text {
    color: rgba(0, 0, 0, 0.1) !important;
  }

  i.ion.ion-ios-cloud-upload-outline {
    color: rgba(0, 0, 0, 0.1);
  }

  .btn_send {
    width: 120px;
  }

  @media (max-width: 1440px) {
    .col-lg-3 {
      padding: 0;
    }
  }

  @media (max-width: 1199px) {
    .col-lg-6.col-12 {
      flex: 0 0 60%;
      max-width: 60%;
    }
  }

  @media (max-width: 991px) {
    .col-lg-6.col-12 {
      flex: 0 0 90%;
      max-width: 90%;
      margin: 0 auto;
    }
  }

  @media (max-width: 767px) {
    .col-lg-6.col-12 {
      flex: 0 0 94%;
      max-width: 94%;
      margin: 0 auto;
    }

    .col-lg-3 {
      padding: 0 15px;
    }

    .text-right {
      text-align: left !important;
      margin-bottom: 5px;
    }

    .el-input-group > .el-input__inner {
      display: inline-block;
      width: 66% !important;
      border-radius: 4px;
    }
  }
</style>
