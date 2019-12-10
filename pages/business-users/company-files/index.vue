<template>
  <section>
    <div class="row mt-5 mb-2">
      <div class="col-lg-8">
        <p style="font-size: 14px; color: grey;">
          Your Company have planted <span
            class="text-warning"
            style="">{{ total }}</span> seeds
        </p>
      </div>
      <div class="col-lg-4">
        <search @search="searchServer" />
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table scrollable-table">
            <thead>
              <tr>
                <th>
                  <span
                    @click="()=>{!order?order = true:saveNew()}"
                    class="btn btn-default btn-sm">{{ order?'Save':'Order' }} <i
                      class="ti ti-loop" /></span>
                </th>
                <th>Date & Time</th>
                <th>Title</th>
                <th>File Code</th>
                <th>Type</th>
                <th>Uploaded By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(file, index) in filesNew">
                <td v-if="order">
                  <span
                    @click="swap(filesNew, index, index-1)"
                    class="btn btn-default ti ti-arrow-up btn-sm"
                    v-if="index  !==  0" />
                  <span
                    @click="swap(filesNew, index, index+1)"
                    class="btn btn-default ti ti-arrow-down btn-sm"
                    v-if="index  !==  filesNew.length-1" />
                </td>
                <td v-else>
                  {{ index+1 }}
                </td>
                <td>{{ $readableTime(file.date_created) }}</td>
                <td>{{ file.title }}</td>
                <td>{{ file.Id }}</td>
                <td>{{ file.file_type }}</td>
                <td>{{ file.uploaded_by }}</td>
                <td>
                  <b-dropdown
                    no-caret
                    size="lg"
                    variant="link">
                    <template slot="button-content">
                      <i
                        class="fa fa-ellipsis-h"
                        style="" />
                    </template>
                    <b-dropdown-item
                      @click.prevent="openFile(file)"
                      href="#">
                      Open
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click.prevent="send_request(file)"
                      href="#">
                      Send Request
                    </b-dropdown-item>

                    <b-dropdown-item
                      @click.prevent="viewRequests(file)"
                      href="#"
                      v-if="file.access_requests.length>0">
                      <b-badge variant="danger">
                        {{ file.access_requests.length
                        }}
                      </b-badge>
                      Requests
                    </b-dropdown-item>

                    <b-dropdown-item
                      :href="$API+'api/files/file/'+file.name"
                      target="__blank">
                      Download
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click.prevent="deleteFile(file)"
                      href="#">
                      Delete
                    </b-dropdown-item>
                  </b-dropdown>
                </td>
              </tr>

              <tr v-if="filesNew.length<1">
                <td
                  class="text-center pt-5"
                  colspan="6"
                  style="font-size: 14px; color: #e7e7e7;">
                  <img
                    :src="require('@/assets/img/seeds_gray.png')"
                    class="mt-4"
                    style="width: 420px;">
                  <div>
                    The seed is down, let's start growing a tree by uploading
                    documents
                  </div>
                </td>
              </tr>

              <tr v-if="pages>1">
                <td
                  class="text-center"
                  colspan="6"
                  style="font-size: 14px; color: #e7e7e7;">
                  <div class="float-right">
                    <b-pagination
                      :per-page="10"
                      :total-rows="total"
                      @change="changePage"
                      class="my-0 justify-content-end text-right"
                      v-model="currentPage" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <sendRequest
      :file="sendFile"
      :send="sendRequest"
      @close="sendRequest=!sendRequest" />
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';
import sendRequest from '@/components/modals/sendRequest';
import search from '@/components/shared/searchComponent';

export default {
  layout: 'business-layout',
  components: {
    sendRequest,
    search,
  },
  data() {
    return {
      order: false,
      sendRequest: false,
      sendFile: {},
      filesNew: [],
    };
  },
  mounted() {
    this.getAllFiles();
  },
  meta: {
    requiresAuth: true,
  },
  head: {
    title: 'Company Files',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },

  mounted() {
    const page = Number(this.$route.query.page) || 1;
    this.getAllFiles(page);
  },
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('files', ['getCompanyFiles', 'searchFiles', 'removeFile', 'swapFiles']),
    changePage(page) {
      console.log(page);
      this.$router.push({ query: { page } });
      this.getAllFiles(page);
    },
    getAllFiles(page = 1) {
      this.callWithToken({
        parameters: {
          page,
          teamId: this.user.teamId,
        },
        action: this.getCompanyFiles,
      }).then((success) => {
        const localObj = JSON.parse(JSON.stringify(this.files));
        this.filesNew = localObj;
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
    arraymove(fromIndex, toIndex) {
      // var element = this.filesNew[fromIndex];
      // this.filesNew.splice(fromIndex, 1);
      // this.filesNew.splice(toIndex, 0, element);
      this.filesNew.splice(toIndex, 0, this.filesNew.splice(fromIndex, 1)[0]);
    },
    saveNew() {
      this.$confirm('Swapping File Positions?', 'warning', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Dont',
      }).then(() => {
        this.callWithToken({
          parameters: {
            files: this.filesNew,
          },
          action: this.swapFiles,
        }).then((response) => {
          this.$message({
            type: 'success',
            message: 'Swap completed',
          });
          this.getAllFiles();
          this.order = false;
        });
      }).catch(() => {
        this.getAllFiles();
        this.$message({
          type: 'info',
          message: 'Swap cancelled',
        });
        this.order = false;
      });
    },
    deleteFile(file) {
      this.$confirm('deleteing file', 'warning', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Stop',
      }).then(() => {
        this.callWithToken({
          parameters: {
            Id: file._id,
          },
          action: this.removeFile,
        }).then((response) => {
          this.$message({
            type: 'success',
            message: 'Delete completed',
          });
          this.getAllFiles();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled',
        });
      });
    },
    searchServer(sea) {
      this.callWithToken({
        parameters: {
          query: sea,
        },
        action: this.searchFiles,
      }).then((success) => {
        if (success.result.files.length === 0) {
          this.$message({
            type: 'info',
            message: 'No files found',
          });
        } else {
          const localObj = JSON.parse(JSON.stringify(this.files));
          this.filesNew = localObj;
        }
      });
    },
    send_request(file) {
      this.sendRequest = true;
      this.sendFile = file;
    },
    openFile(file) {
      console.log(file.type);
      if (file.type === 'png' || file.type === 'jpg' || file.type === 'jpeg') {
        return this.$router.push({
          name: 'business-users-preview-image',
          query: { id: file._id },
        });
      }

      if (file.type === 'pdf') {
        return this.$router.push({
          name: 'business-users-preview-pdf',
          query: { id: file._id },
        });
      }

      if (file.type === 'docx' || file.type === 'pptx') {
        return this.$router.push({
          name: 'business-users-preview-doc',
          query: { id: file._id },
        });
      }

      if (file.type === 'mp4') {
        return this.$router.push({
          name: 'business-users-preview-video',
          query: { id: file._id },
        });
      }

      if (file.type === 'mp3') {
        return this.$router.push({
          name: 'business-users-preview-audio',
          query: { id: file._id },
        });
      }
    },
    viewRequests(file) {
      this.$router.push({
        name: 'business-users-requests-id',
        params: { id: file._id },
      });
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
    currentPage: {
      get() {
        return Number(this.$route.query.page || 1);
      },
      set() {

      },
    },
    ...mapGetters('user_mgt', ['user', 'isLoggedIn', 'session']),
    ...mapGetters('files', ['files', 'error', 'loading', 'pages', 'page', 'message', 'total']),

  },
};
</script>


<style type="text/css">
  .video-js .vjs-big-play-button {
    top: 45% !important;
    left: 45% !important;
  }

  .fa-ellipsis-h {
    color: #55a73c;
  }

  .el-button:focus, .el-button:hover {
    color: #57a83a;
    border-color: #57a83a;
    background-color: rgba(87, 168, 58, 0.12941176470588237);
  }

  .el-button--primary,
  .el-button--primary:hover,
  .el-button--primary:focus {
    color: #fff;
    background-color: #55a73c;
    border-color: #55a73c;
  }

  @media (max-width: 991px) {
    section {
      padding: 0 15px;
    }

    .table > tbody > tr > td:first-child {
      text-align: center
    }
  }

  @media (max-width: 767px) {
    p {
      margin-bottom: 0;
    }

    .mt-5 {
      margin-top: 15px !important;
    }

    .el-input--suffix {
      position: absolute;
      top: -77px !important;
      width: 78%;
      right: 18px;
    }

    .application a {
      cursor: pointer;
      color: #55a73c;
    }

    .table > tbody > tr > td:not(:last-child) {
      border-top: 1px solid #f4f4f4;
      vertical-align: middle;
      text-overflow: ellipsis;
      overflow: hidden;
      min-width: 90px;
      max-width: 115px;
      font-size: 12px;
    }

    .table > thead > tr > th {
      border-top: 0;
      font-size: 12px;
    }

    .my-1 {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    .dropdown-item.active, .dropdown-item:active {
      color: #fff;
      text-decoration: none;
      background-color: #f8f9fa !important;
    }
  }
</style>
