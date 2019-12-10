<template>
  <section>
    <div class="row">
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
            <div
              :key="item"
              v-for="item in emails">
              <el-input
                class="col-lg-12 mb-1"
                name="email"
                placeholder="example@mail.com"
                type="email"
                v-model="sendTo[item-1]"
                v-validate="'required|email'">
                <template
                  slot="append"
                  v-if="errors.has('email')">
                  <i class="text-danger fa fa-times" />
                </template>
                <template
                  slot="append"
                  v-if="!errors.has('email')&&emails>1">
                  <button
                    @click="deleteE(item-1)"
                    type="button">
                    <i
                      class="fa fa-trash"
                      style="color:red" />
                  </button>
                </template>
              </el-input>
            </div>
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

        <div class="col-lg-9 text-center mt-3 mb-3">
          Introduce Paperdaz or select one or multiple files below <i
            class="ion ion-android-alert text-danger" />
        </div>
      </div>
    </div>

    <div
      class="row overflow-scroll"
      v-if="window.width > 800">
      <base-table>
        <template v-slot:head-table>
          <tr>
            <th>File Name</th>
            <th>File Number</th>
            <th>Type</th>
            <th>View</th>
            <th>Action</th>
          </tr>
        </template>
        <template v-slot:body-table>
          <tr
            :key="index"
            v-for="(file, index) in files">
            <td>{{ file.title }}</td>
            <td>{{ file.name }}</td>
            <td>
              <i
                :class="setIcon(file.type)"
                class="is-success-icon is-large-text" />
            </td>
            <td>{{ file.file_type }}</td>
            <td class="text-center">
              <el-checkbox
                :checked="selectedFiles.includes(file._id)"
                @change="select(file)" />
            </td>
          </tr>
        </template>
      </base-table>
    </div>

    <div
      class="row overflow-scroll"
      v-if="window.width <= 800">
      <base-table-mobile>
        <template v-slot:head-table>
          <tr>
            <th class="large-table-head text-center">
              File Name
            </th>
            <th class="large-table-head text-center">
              File Number
            </th>
            <th class="large-table-head text-center">
              Type
            </th>
            <th class="large-table-head text-center">
              View
            </th>
            <th class="large-table-head text-center">
              Action
            </th>
          </tr>
        </template>
        <template v-slot:body-table>
          <tr
            :key="index"
            v-for="(file, index) in files">
            <td class="large-row text-center">
              {{ file.title }}
            </td>
            <td class="large-row text-center">
              {{ file.name }}
            </td>
            <td class="text-center">
              <i
                :class="setIcon(file.type)"
                class="is-success-icon is-large-text" />
            </td>
            <td class="large-row text-center">
              {{ file.file_type }}
            </td>
            <td class="text-center">
              <el-checkbox
                :checked="selectedFiles.includes(file._id)"
                @change="select(file)" />
            </td>
          </tr>
        </template>
      </base-table-mobile>
    </div>

    <el-dialog
      :visible.sync="showEmails"
      @close="showEmails = false"
      title="Added Emails">
      <table class="table scrollable-table">
        <tbody>
          <tr
            :key="index"
            v-for="(item, index) in sendTo">
            <td>
              {{ item }} <span
                @click="removeEmail(index)"
                class="btn btn-default fa fa-times btn-sm pull-right" />
            </td>
          </tr>

          <tr v-if="sendTo.length<1">
            <td
              class="text-center pt-5"
              colspan="1"
              style="font-size: 14px; color: #e7e7e7;">
              No Emails Added
            </td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';
import BaseTable from '@/components/base-components/BaseTable';
import BaseTableMobile
  from '@/components/base-components/BaseTableMobile';

export default {
  layout: 'business-layout',

  components: {
    BaseTable,
    BaseTableMobile,
  },

  data() {
    return {
      selectedFiles: [],
      sendTo: [],
      email: '',
      showEmails: false,
      emails: 1,
      window: {
        width: 0,
      },
    };
  },

  created() {
    if (process.browser || process.client) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }
  },

  mounted() {
    this.getAllFiles();
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
    deleteE(item) {
      this.sendTo.splice(item, 1);
      this.emails--;
    },
    select(file) {
      if (this.selectedFiles.includes(file._id)) {
        console.log(file._id, 'selected');
        const i = this.selectedFiles.indexOf(file._id);
        this.selectedFiles.splice(i, 1);
      } else {
        this.selectedFiles.push(file._id);
        console.log(file._id, 'not selected');
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

    handleResize() {
      this.window.width = window.innerWidth;
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

  .large-table-head {
    height: 70px;
  }

  .large-row {
    min-width: 100px;
    font-size: 12px;
  }

  .is-large-text {
    font-size: 28px;
  }

  .is-success-icon {
    color: #78c360;
  }

  .overflow-scroll {
    overflow-x: scroll;
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
