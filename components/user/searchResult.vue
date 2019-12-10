<template>
  <section>
    <div class="row mb-4">
      <div class="button-back pr-3">
        <base-button
          @click="goBack"
          button-class="mdc-button--outlined is-outlined-success">
          <i class="fas fa-chevron-left is-marginless" />
        </base-button>
      </div>
      <div class="business-col">
        {{ team.businessName }}
        <span class="business-address">
          {{ team.address }}
        </span>
      </div>
    </div>
    <div class="row search-result-table-container">
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
            v-for="(item, index) in files">
            <td>{{ item.title }}</td>
            <td>{{ item._id }}</td>
            <td>
              <i
                :class="setIcon(item.type)"
                class="is-success-icon is-large-text" />
            </td>
            <td>{{ item.file_type }}</td>
            <td>
              <b-dropdown
                no-caret
                size="lg"
                variant="link">
                <template slot="button-content">
                  <i class="fa fa-ellipsis-h is-success-icon" />
                </template>
                <b-dropdown-item
                  @click.prevent="openFile(item)"
                  href="#"
                  v-if="check_access(item)">
                  {{ item.action_type === '1'?'View & Complete':'View & Confirm' }}
                </b-dropdown-item>
                <b-dropdown-item
                  @click.prevent="send_request(item)"
                  href="#"
                  v-if="check_access(item)">
                  Share
                </b-dropdown-item>
                <b-dropdown-item
                  @click.prevent="sendRequestNow(item)"
                  v-if="!check_access(item)">
                  Request Access
                </b-dropdown-item>
              </b-dropdown>
            </td>
          </tr>
          <tr v-if="files.length <= 0">
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
        </template>
      </base-table>
    </div>
  </section>
</template>


<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';
import BaseTable from '@/components/base-components/BaseTable';
import BaseButton from '@/components/base-components/BaseButton';

export default {
  layout: 'business-layout',
  components: {
    BaseTable,
    BaseButton,
  },
  data() {
    return {
      sendRequest: false,
      sendFile: {},
    };
  },
  mounted() {
    this.getAllFiles();
  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('files', [
      'getCompanyFiles',
      'searchFiles',
      'removeFile',
      'requestAccess',
    ]),
    getAllFiles(page = 1) {
      this.callWithToken({
        parameters: {
          page,
          teamId: this.$route.query.businessId,
        },
        action: this.getCompanyFiles,
      }).then((success) => {
      });
    },
    setIcon(file) {
      if (file === 'png' || file === 'jpg' || file === 'jpeg') {
        return 'fa fa-image fa-2x';
      }

      if (file === 'pdf') {
        return 'fa fa-file-pdf fa-2x';
      }

      if (file === 'docx' || file === 'pptx') {
        return 'fa fa-file-pdf fa-2x';
      }

      if (file === 'mp4') {
        return 'fa fa-file-video fa-2x';
      }

      if (file === 'mp3') {
        return 'fa fa-file-audio fa-2x';
      }
    },
    fileStatus(file) {
      if (file.action_request === '1') {
        if (file.fileStatus === 0) {
          return 'Not Viewed or Completed';
        }
        return 'Viewed and Completed';
      } if (file.action_request === '2') {
        if (file.fileStatus === 0) {
          return 'Not Viewed or Confirmed';
        }
        return 'Viewed and Confirmed';
      }
    },
    check_access(file) {
      // console.log(file, file.title);
      if (
        (file.file_type === 'private'
            && file.access_granted.includes(this.user.Id))
          || file.file_type === 'public'
      ) {
        return true;
      }
      return false;
    },
    openFile(file) {
      if (file.type === 'png' || file.type === 'jpg' || file.type === 'jpeg') {
        return this.$router.push({
          name: 'users-view-image',
          query: { id: file.name },
        });
      }

      if (file.type === 'pdf') {
        return this.$router.push({
          name: 'users-view-pdf',
          query: { id: file._id },
        });
      }

      if (file.type === 'docx' || file.type === 'pptx') {
        return this.$router.push({
          name: 'users-view-doc',
          query: { id: file.name },
        });
      }

      if (file.type === 'mp4') {
        return this.$router.push({
          name: 'users-view-video',
          query: { id: file.name },
        });
      }

      if (file.type === 'mp3') {
        return this.$router.push({
          name: 'users-view-audio',
          query: { id: file.name },
        });
      }
    },
    sendRequestNow(file) {
      this.callWithToken({
        parameters: {
          file: file.name,
        },
        action: this.requestAccess,
      }).then((success) => {
        if (success.status) {
          this.$message({
            message: success.message,
          });
        }
      });
    },
    goBack() {
      this.$router.back();
    },
  },
  computed: {
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
    ...mapGetters('users', { team: 'user' }),
  },
};
</script>


<style type="text/css">
  .is-success-icon {
    color: #78c360;
  }

  .business-col {
    display: flex;
    align-items: center;
    font-weight: 600;
  }

  .search-result-table-container {
    overflow-x: scroll;
  }

  .search-result-table-container::-webkit-scrollbar,
  .search-result-table-container::-moz-scrollbar {
    display: none;
  }

  .business-address {
    display: none;
  }

  @media screen and (min-width: 768px) {
    .business-address {
      display: initial;
    }
  }

  @media screen and (max-width: 767px) {
    .business-col {
      font-size: 15px;
      font-weight: 400;
    }
  }
</style>
