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
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">
          Free Users List
        </h3>
      </d-col>
    </d-row>

    <!-- Free users Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0">
              Free users
            </h6>
          </div>
          <div class="card-body p-0 pb-3 text-center table-responsive">
            <table
              class="table mb-0 table-hover"
              v-if="users">
              <thead class="bg-light">
                <tr>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    #
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    First Name
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Last Name
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Country
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Registered At
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  :key="index"
                  class="pointer"
                  v-for="(user, index) in users">
                  <td>{{ index + 1 }}</td>
                  <td>{{ user.firstName }}</td>
                  <td>{{ user.lastName }}</td>
                  <td>{{ user.country }}</td>
                  <td>{{ user.date_created | dateString }}</td>
                </tr>
              </tbody>
            </table>
            <div
              class="loader"
              style="margin-top: 16px;"
              v-else>
              <v-loader />
            </div>
          </div>
        </div>
      </div>
    </div>
  </d-container>
</template>

<script>
import { mapActions } from 'vuex';
// Components
import VLoader from '@/components/Loader';

export default {
  layout: 'super-user-layout',

  name: 'FreeUsersPage',

  components: {
    VLoader,
  },

  filters: {
    dateString(value) {
      return new Date(value).toLocaleDateString();
    },
  },

  data() {
    return {
      users: null,
      loadingUsers: false,
    };
  },

  beforeMount() {
    this.getFreeUsers();
  },

  beforeDestroy() {
    this.users = null;
  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('users', ['findFree']),
    getFreeUsers() {
      this.loadingUsers = true;
      this.callWithToken({
        parameters: {},
        action: this.findFree,
      })
        .then((success) => {
          this.users = this.$store.getters['users/users'];
          this.loadingUsers = false;
        })
        .catch(error => console.error(error));
    },
  },
};
</script>
