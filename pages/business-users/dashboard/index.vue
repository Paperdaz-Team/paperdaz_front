<template>
  <section>
    <div class="row">
      <div
        class="col-lg-12 p-0"
        style="display: flex; flex-direction: column;">
        <base-search-input
          class="search-bar"
          placeholder="Search for Completed by, File Name or File Number"
          v-model="searchQuery" />

        <div class="control">
          <div class="text-center mt-3">
            <el-radio
              checked
              label="completedby"
              v-model="typeOfSearch">
              Completed by
            </el-radio>
            <el-radio
              label="fileName"
              v-model="typeOfSearch">
              File Name
            </el-radio>
            <el-radio
              label="fileNumber"
              v-model="typeOfSearch">
              File Number
            </el-radio>
          </div>
        </div>
      </div>
    </div>

    <div
      class="row mb-5 mt-3"
      v-if="dashboardObject.length > 0">
      <div class="col-lg-12 business-table-container">
        <dashboard-table
          :filter-table-data="filterTableData"
          :user-id="user.Id"
          v-if="showTable" />
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
import DashboardTable from '@/components/business/DashboardTable';
import BaseSearchInput
  from '@/components/base-components/BaseSearchInput';

export default {
  layout: 'business-layout',
  fetch({ store, redirect }) {
    const userIsLoggedIn = store.getters['user_mgt/isLoggedIn'];
    const user = store.getters['user_mgt/user'];

    if (!userIsLoggedIn) {
      return redirect('/login');
    }
    if (user.role === 1) return redirect('/super/dashboard');
    if (user.role === 3) return redirect('/users/dashboard');
  },
  async asyncData({ app, store }) {
    const userIsLoggedIn = store.getters['user_mgt/isLoggedIn'];

    if (userIsLoggedIn) {
      const token = await store.getters['user_mgt/session'];
      const dashObj = await store.dispatch('users/getAction', { token }).then(res => res.result.dash);

      return {
        dashboardObject: dashObj,
      };
    }
  },
  meta: {
    requiresAuth: true,
  },
  components: {
    sendRequest,
    search,
    DashboardTable,
    BaseSearchInput,
  },
  filters: {
    dateString(value) {
      return new Date(value).toLocaleDateString();
    },
    timeString(value) {
      const dateWithouthSecond = new Date();
      return dateWithouthSecond.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
  data() {
    return {
      sendRequest: false,
      sendFile: {},
      showTable: false,
      searchQuery: '',
      typeOfSearch: 'completedby',
      dashboardObject: [],
      window: {
        width: 0,
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.showTable = true;
    });
  },
  head: {
    title: 'Business Dashboard',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },

  created() {
    if (process.browser || process.client) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }
  },

  destroyed() {
    if (process.browser || process.client) {
      window.removeEventListener('resize', this.handleResize);
    }
  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('files', ['getFiles', 'removeFile', 'searchFiles']),

    handleResize() {
      this.window.width = window.innerWidth;
    },

    getAllFiles(page = 1) {
      this.callWithToken({
        parameters: {
          page,
          completed: true,
        },
        action: this.getFiles,
      }).then((success) => {
      });
    },

    searchServer(sea) {
      this.callWithToken({
        parameters: {
          query: sea,
          completed: true,
        },
        action: this.searchFiles,
      }).then((success) => {
        if (success.files.length === 0) {
          this.$message({
            type: 'info',
            message: 'No files found',
          });
        }
      });
    },

    deleteFile(file) {
      this.$confirm(
        'This will permanently delete the file. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(() => {
          this.callWithToken({
            parameters: {
              Id: file.name,
            },
            action: this.removeFile,
          }).then((response) => {
            this.$message({
              type: 'success',
              message: 'Delete completed',
            });
            this.getAllFiles();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled',
          });
        });
    },

    send_request(file) {
      this.sendRequest = true;
      this.sendFile = file;
    },

    setIcon(file) {
      if (file === 'png' || file === 'jpg' || file === 'jpeg') {
        return 'fa fa-image fa-2x';
      }

      if (file === 'pdf') {
        return 'fa fa-file-pdf fa-2x';
      }

      if (file === 'docx' || file === 'pptx') {
        return 'fa fa-file-text-o fa-2x';
      }

      if (file === 'mp4') {
        return 'fa fa-file-video fa-2x';
      }

      if (file === 'mp3') {
        return 'fa fa-file-audio fa-2x';
      }
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
    filterTableData() {
      if (this.searchQuery && this.typeOfSearch === 'completedby') {
        return this.dashboardObject.filter(item => item.completedby.toLowerCase().includes(this.searchQuery.toLowerCase()));
      } if (this.searchQuery && this.typeOfSearch === 'fileName') {
        return this.dashboardObject.filter(item => item.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      } if (this.searchQuery && this.typeOfSearch === 'fileNumber') {
        return this.dashboardObject.filter(item => item.name.includes(this.searchQuery));
      }
      return this.dashboardObject;
    },
    ...mapGetters('user_mgt', ['user', 'isLoggedIn', 'session']),
    ...mapGetters('files', [
      'files',
      'error',
      'loading',
      'pages',
      'page',
      'message',
      'total',
    ]),
  },
};
</script>


<style lang="scss">
  .is-large-text {
    font-size: 28px;
  }

  .business-table-container {
    overflow-x: scroll;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .business-table-container::-webkit-scrollbar,
  .business-table-container::-moz-scrollbar {
    display: none;
  }

  .is-success-icon {
    color: #78c360;
  }

  .has-text-centered {
    text-align: center !important;
  }

  .search-bar {
    max-width: 700px;
    margin: auto;
  }

  .search-input-container {
    width: 100%;

    .input {
      width: 100%;
    }
  }
</style>
