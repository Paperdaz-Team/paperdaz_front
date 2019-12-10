<template>
  <base-table>
    <template v-slot:head-table>
      <tr>
        <th class="has-text-centered">
          Business Name
        </th>
        <th class="has-text-centered">
          Address
        </th>
        <th class="has-text-centered">
          Files
        </th>
      </tr>
    </template>
    <template v-slot:body-table>
      <tr
        :key="index"
        @click="showFiles(item)"
        class="pointer"
        v-for="(item, index) in displayList">
        <td class="has-text-centered">
          {{ item.businessName }}
        </td>
        <td class="has-text-centered">
          {{ item.address }}
        </td>
        <td class="has-text-centered">
          {{ item.files }}
        </td>
      </tr>
    </template>
  </base-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
      viewing: 'business',
    };
  },

  methods: {
    ...mapActions('users', {
      setUser: 'setUser',
    }),
    showFiles(company) {
      this.$emit('showFiles', company);
    },
  },

  computed: {
    ...mapGetters('users', {
      users: 'users',
    }),
    displayList() {
      const currentList = this.users.filter(e => e.files);
      return currentList;
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
    text-align: center;
  }

  .overflow-scroll {
    overflow-x: scroll;
  }
</style>
