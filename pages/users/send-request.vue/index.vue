<template>
  <section>
    <div class="row mt-5 pt-5">
      <div class="col-lg-2 hide1199" />
      <div class="col-lg-9 my-3 width100">
        <form
          @submit.prevent="sendRequest"
          class="form-inline">
          <div
            class="form-group col-lg-2 col-md-2"
            style="padding: 0px;">
            <label for="staticEmail2">Send request to</label>
          </div>
          <div class="col-lg-5 col-md-5 form-group">
            <el-input
              :key="item"
              class="col-lg-12 mb-1"
              name="email"
              placeholder="example@mail.com"
              type="email"
              v-for="item in emails"
              v-model="sendTo[item-1]"
              v-validate="'required|email'">
              <template
                slot="append"
                v-if="errors.has('email')">
                <i class="text-danger fa fa-times" />
              </template>
            </el-input>
          </div>
          <div class="col-lg-5 col-md-5">
            <button class="btn btn-blc header-btn shadow px-4 mb-1">
              Send
            </button>
            <div
              @click="addAnother"
              class="ml-3 fa fa-plus pointer">
              <span>  Add another email</span>
            </div>
          </div>

          <!-- <b-badge variant="danger" v-b-tooltip.hover :title="sendTo.length>0?'Click to view':'Zero Recipients'" @click="()=>{sendTo.length?showEmails = true:showEmails = false;}" class="ml-2 pointer">{{sendTo.length}} Recipient (s)</b-badge> -->
        </form>

        <div class="col-lg-9 text-center mt-3">
          Enter a company email and we will send them an introduction to
          Paperdaz <i class="ion ion-android-alert text-danger" />
        </div>
      </div>
    </div>
    <div class="row mt-5 pt-3">
      <div class="col-10 text-center offset-1">
        <h5>Reduce Carbon Footprint while saving Time and Money</h5>
        <img
          :src="require('@/assets/img/stamf_list_small.png')"
          class="mt-4"
          style="height: 80px;">
      </div>
    </div>
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';

export default {
  layout: 'users-layout',
  data() {
    return {
      selectedFiles: [],
      sendTo: [],
      email: '',
      showEmails: false,
      emails: 1,
    };
  },
  mounted() {

  },
  meta: {
    requiresAuth: true,
  },
  head: {
    title: 'Send Request',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('files', ['getCompanyFiles', 'sendReq']),

    getAllFiles(page = 1) {
      this.callWithToken({
        parameters: {
          page,
          teamId: this.user.teamId,
        },
        action: this.getCompanyFiles,
      }).then((success) => {

      });
    },
    select(file) {
      if (this.selectedFiles.includes(file.name)) {
        console.log(file.name, 'selected');
        const i = this.selectedFiles.indexOf(file.name);
        this.selectedFiles.splice(i, 1);
      } else {
        this.selectedFiles.push(file.name);
        console.log(file.name, 'not selected');
      }
    },
    addAnother() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // this.sendTo.push(this.email);
          // this.email = '';
          this.emails = this.emails + 1;
        }
      });
    },
    removeEmail(index) {
      this.sendTo.splice(index, 1);
    },
    sendRequest() {
      this.$validator.validateAll().then((result) => {
        if (result || this.sendTo.length > 0) {
          if (!result) {
            this.sendTo.splice(this.emails, 1);
          }
          this.callWithToken({
            parameters: {
              files: this.selectedFiles,
              recipients: this.sendTo,
              business: this.user.businessName,
            },
            action: this.sendReq,
          }).then((success) => {
            if (success.success) {
              this.selectedFiles = [];
              this.sendTo = [];
            }
            this.$message({
              message: success.message,
            });
            this.emails = 1;
          });
        }
      });
    },

    setIcon(file) {
      if (file === 'png' || file === 'jpg' || file === 'jpeg') {
        return 'fa fa-image text-danger fa-2x';
      }

      if (file === 'pdf') {
        return 'fa fa-file-pdf text-danger fa-2x';
      }

      if (file === 'docx' || file === 'pptx') {
        return 'fa fa-file-pdf text-danger fa-2x';
      }

      if (file === 'mp4') {
        return 'fa fa-file-video text-danger fa-2x';
      }

      if (file === 'mp3') {
        return 'fa fa-file-audio text-danger fa-2x';
      }
    },

    fileStatus(file) {
      if (file.action_request === '1') {
        if (file.fileStatus === 0) {
          return 'Not View or Completed';
        }
        return 'Viewed and Completed';
      } if (file.action_request === '2') {
        if (file.fileStatus === 0) {
          return 'Not View or Confirmed';
        }
        return 'Viewed and Confirmed';
      }
    },
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }));
    },
    ...mapGetters('user_mgt', ['user', 'isLoggedIn', 'session']),
    ...mapGetters('files', ['files', 'error', 'loading', 'pages', 'page', 'message', 'total']),

  },
};
</script>


<style scoped type="text/css">
  .is-danger {
    border-color: red !important;
  }

  th:last-child {
    text-align: center;
  }

  .col-lg-2 label {
    text-align: right;
    display: block;
    width: 100%;
  }

  .btn-blc {
    font-weight: 400 !important;
    width: 130px;
    margin-left: -30px;
  }

  .col-lg-5 .pointer span {
    color: #55a73c;
    font-family: 'Roboto', sans-serif;
    margin-left: 5px;
  }

  .col-lg-5 .pointer {
    color: #55a73c;
  }

  .application a, .ion-android-menu {
    cursor: pointer;
    color: #55a73c;
  }

  .ion-android-menu:before {
    content: "\F394";
    color: #55a73c;
  }

  @media (max-width: 1199px) {
    .hide1199 {
      display: none;
    }

    .width100.col-lg-9 {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }

  @media (max-width: 991px) {
    .table > tbody > tr > td {
      border-top: 1px solid #f4f4f4;
      vertical-align: middle;
      text-overflow: ellipsis;
      overflow: hidden;
      min-width: 90px;
      max-width: 115px;
      font-size: 12px;
    }

    section {
      padding: 0 15px;
    }

    .table > thead > tr > th {
      border-top: 0;
      font-size: 12px;
    }
  }

  @media (max-width: 767px) {
    .application a {
      cursor: pointer;
      color: #55a73c;
    }

    .el-input--suffix {
      position: absolute;
      top: -77px !important;
      width: 78%;
      right: 18px;
    }

    label {
      text-align: center;
    }

    .el-input {
      top: -70px !important;
      width: 85%;
      right: 2px;
      padding: 0;
      position: absolute;
    }

    .col-lg-2 label {
      position: absolute;
      text-align: left;
      width: 85%;
      right: 0;
      top: -82px;
    }

    .btn-blc {
      width: 60px;
      padding: 5px 0 !important;
      position: absolute;
      top: -80.5px;
      right: 5px;
    }

    .col-lg-5 .pointer {
      color: #55a73c;
      position: absolute;
      top: -35px;
      left: 10%;
    }

    .mt-3 {
      margin-top: 0 !important;
      font-size: 12px;
    }
  }
</style>
