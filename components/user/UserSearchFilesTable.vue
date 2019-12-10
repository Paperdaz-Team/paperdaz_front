<template>
  <base-table>
    <template v-slot:head-table>
      <tr>
        <th class="has-text-centered">
          Title
        </th>
        <th class="has-text-centered">
          File Code
        </th>
        <th class="has-text-centered">
          Type
        </th>
        <th class="has-text-centered">
          View
        </th>
        <th class="has-text-centered">
          Action
        </th>
      </tr>
    </template>
    <template
      v-if="displayList.length > 0"
      v-slot:body-table>
      <tr
        :key="index"
        v-for="(item, index) in displayList">
        <td class="has-text-centered">
          {{ item.title }}
        </td>
        <td class="has-text-centered">
          {{ item.Id }}
        </td>
        <td class="has-text-centered">
          <i
            :class="setIcon(item.type)"
            class="is-success-icon is-large-text" />
        </td>
        <td class="has-text-centered">
          {{ item.file_type }}
        </td>
        <td class="has-text-centered">
          <b-dropdown
            no-caret
            size="lg"
            variant="link">
            <template slot="button-content">
              <i class="text-danger fa fa-ellipsis-h" />
            </template>
            <b-dropdown-item
              @click.prevent="openFile(item)"
              href="#"
              v-if="check_access(item)">
              {{ item.action_type==='1'?
                'View & Complete':'View & Confirm' }}
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
    </template>
    <template
      v-else
      v-slot:body-table>
      <tr>
        <td
          class="text-center pt-5"
          colspan="6"
          style="font-size: 14px; color: #e7e7e7;">
          <img
            :src="require('@/assets/img/seeds_gray.png')"
            class="mt-4"
            style="width: 420px;">
          <div>
            The seed is down, let's start growing a tree by uploading documents
          </div>
        </td>
      </tr>
    </template>
  </base-table>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseTable from '@/components/base-components/BaseTable';

export default {
  name: 'DashboardTable',

  components: {
    BaseTable,
  },

  props: {
    dashboardObject: Object,
    userId: Number,
  },

  data() {
    return {
      viewing: 'files',
      company: null,
    };
  },

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

      return '';
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

      return '';
    },
    check_access(file) {
      return (file.file_type === 'private' && file.access_granted.includes(this.userId))
        || file.file_type === 'public';
    },
  },

  computed: {
    ...mapGetters('users', {
      users: 'users',
    }),
    displayList() {
      return this.users.filter(e => e.modifications);
    },
  },
};
</script>
