<template>
  <base-table>
    <template v-slot:head-table>
      <tr>
        <th class="large-table-head has-text-centered">
          Business Name
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
          Status
        </th>
        <th class="large-table-head has-text-centered">
          Date & Time
        </th>
      </tr>
    </template>
    <template v-slot:body-table>
      <tr
        :key="index"
        v-for="(item, index) in dashboardObject">
        <td class="large-row has-text-centered">
          {{ item.businessName }}
        </td>
        <td class="large-row has-text-centered">
          {{ item.title }}
        </td>
        <td class="large-row has-text-centered">
          {{ item.name }}
        </td>
        <td class="has-text-centered">
          <i
            :class="setIcon(item.type)"
            class="is-success-icon is-large-text" />
        </td>
        <td class="large-row has-text-centered">
          {{ item.status }}
        </td>
        <td class="large-row has-text-centered">
          {{ item.date_created | dateString }}
          {{ item.date_created | timeString }}
        </td>
      </tr>
    </template>
  </base-table>
</template>

<script>
import BaseTable from '@/components/base-components/BaseTable';

export default {
  name: 'UserDashboardTable',

  filters: {
    dateString(value) {
      return new Date(value).toLocaleDateString();
    },
    timeString(value) {
      const dateWithouthSecond = new Date(value);
      return dateWithouthSecond.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },

  components: {
    BaseTable,
  },

  props: ['dashboardObject', 'userId'],

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

<style lang="scss">
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
