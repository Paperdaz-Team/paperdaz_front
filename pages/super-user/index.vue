<template>
  <d-container
    class="main-content-container px-4"
    fluid>
    <!-- Page Header -->
    <d-row
      class="page-header pt-4 pb-2 m-0"
      no-gutters>
      <d-col
        class="text-center text-sm-left mb-4 mb-sm-0"
        col
        sm="4">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">
          Main Page
        </h3>
      </d-col>
    </d-row>

    <!-- Small Stats Blocks -->
    <d-row>
      <d-col
        class="mb-4 text-center"
        v-if="stats.length <= 0">
        <v-loader />
      </d-col>
      <d-col
        :key="idx"
        class="mb-4"
        lg
        v-else
        v-for="(data, idx) in stats">
        <small-stats
          :chart-data="data.datasets"
          :id="`small-stats-${idx}`"
          :label="data.label"
          :value="data.value"
          variation="1" />
      </d-col>
    </d-row>
  </d-container>
</template>

<script>
import { mapActions } from 'vuex';
// Components
import SmallStats from '@/components/superLayout/common/SmallStats';
import VLoader from '@/components/Loader';

export default {
  layout: 'super-user-layout',

  name: 'MainDashboard',

  components: {
    SmallStats,
    VLoader,
  },

  data() {
    return {
      dateRange: {
        from: null,
        to: null,
      },
      stats: [],
    };
  },

  beforeMount() {
    this.loadStatistics();
  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('users', ['getStats']),
    loadStatistics() {
      this.callWithToken({
        parameters: {},
        action: this.getStats,
      })
        .then((response) => {
          const data = response.result;
          this.stats = [
            {
              label: 'Business Users',
              value: data.businessUsers,
            },
            {
              label: 'Free Users',
              value: data.freeUsers,
            },
            {
              label: 'Uploaded Files',
              value: data.files,
            },
            {
              label: 'Completed Files',
              value: data.completed,
            },
            {
              label: 'Incompleted Files',
              value: data.incomplete,
            },
          ];
        })
        .catch((error) => {
          this.stats = [];
          this.$message({
            message: error,
            type: 'error',
            duration: 0,
            showClose: true,
          });
        });
    },
    handleApprove(id) {
      alert(`Approving discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleReject(id) {
      alert(`Rejecting discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleEdit(id) {
      alert(`Editing discussion id: ${id}`); // eslint-disable-line no-alert
    },
    handleViewAllComments() {
      alert('Viewing all comments!'); // eslint-disable-line no-alert
    },
  },
};
</script>
