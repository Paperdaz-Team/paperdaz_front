<template>
  <base-table>
    <template v-slot:head-table>
      <tr>
        <th class="large-table-head has-text-centered">
          Completed By
        </th>
        <th class="large-table-head has-text-centered">
          File Name
        </th>
        <th class="large-table-head has-text-centered">
          File Number
        </th>
        <th class="large-table-head has-text-centered">
          Type
        </th>
        <th class="large-table-head has-text-centered">
          Access
        </th>
        <th class="large-table-head has-text-centered">
          Status
        </th>
        <th class="large-table-head has-text-centered">
          Action
        </th>
      </tr>
    </template>
    <template v-slot:body-table>
      <tr
        :key="index"
        class="table-body"
        v-for="(item, index) in filterTableData">
        <td class="large-row has-text-centered">
          {{ item.completedby }}
        </td>
        <td class="large-row has-text-centered">
          {{ item.title }}
        </td>
        <td class="large-row has-text-centered">
          {{ item.name }}
        </td>
        <td class="large-row has-text-centered">
          <i
            :class="setIcon(item.type)"
            class="is-success-icon is-large-text" />
        </td>
        <td class="large-row has-text-centered">
          {{ item.file_type }}
        </td>
        <td class="large-row has-text-centered">
          {{ item.status }}
        </td>
        <td class="large-row has-text-centered">
          <b-dropdown
            no-caret
            size="lg"
            variant="link">
            <template slot="button-content">
              <i class="fa fa-ellipsis-h is-success-icon" />
            </template>
            <b-dropdown-item @click.prevent="openFile(item)">
              Open
            </b-dropdown-item>
            <b-dropdown-item
              @click.prevent="viewRequests(item)"
              href="#"
              v-if="item.access_requests.length>0">
              <b-badge variant="danger">
                {{ item.access_requests.length }}
              </b-badge>
              Requests
            </b-dropdown-item>
            <b-dropdown-item
              :href="$API+'api/files/file/'+item._id"
              target="__blank">
              Download
            </b-dropdown-item>
          </b-dropdown>
        </td>
      </tr>
    </template>
  </base-table>
</template>

<script>
import BaseTable from '@/components/base-components/BaseTable';

export default {
  name: 'BusinessDashboardTable',

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

  components: {
    BaseTable,
  },

  props: ['filterTableData', 'userId'],

  methods: {
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
    check_access(file) {
      if (
        (file.file_type === 'private'
            && file.access_granted.includes(this.userId))
          || file.file_type === 'public'
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="css">
  .large-table-head {
    height: 70px;
  }

  .large-row {
    min-width: 100px;
    font-size: 12px;
  }

  .has-text-centered {
    text-align: center !important;
  }

  .overflow-scroll {
    overflow-x: scroll;
  }
</style>
