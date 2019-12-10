<template>
  <section v-if="!$route.query.result">
    <div
      class="row my-5"
      v-if="users.length>0">
      <div class="col-lg-10">
        <div class="row px-5">
          <table class="table scrollable-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Address</th>
                <th>Files</th>
              </tr>
            </thead>
            <tbody>
              <tr
                @click="showFiles(user)"
                class="pointer"
                v-for="user in users">
                <td>{{ user.businessName }}</td>
                <td>{{ user.address }}</td>
                <td>{{ user.files }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
  <section v-else>
    <results :team="getCompany" />
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters, mapMutations } from 'vuex';
import results from '@/components/user/searchResult';

export default {
  layout: 'users-layout',
  asyncData(context) {
  },
  components: {
    results,
  },
  data() {
    return {
      searchItem: '',
      company: null,
    };
  },
  mounted() {
    if (!this.$route.query.search) {
      this.setUsers([]);
    } else {
      this.searchItem = this.$route.query.search;
      // this.searchServer();
    }
  },
  head: {
    title: 'Users Dashboard',
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
    ...mapActions('users', ['findBusiness', 'setUser']),
    ...mapMutations('users', ['setUsers']),

    getAllFiles(page = 1) {
      this.callWithToken({
        parameters: {
          page,
        },
        action: this.getFiles,
      }).then((success) => {

      });
    },

    showFiles(company) {
      this.setUser(company);
      this.company = company;
      this.$router.push({
        name: this.$route.name,
        query: {
          result: true,
          business: company.businessName,
          businessId: company.teamId,
        },
      });
    },
    searchServer() {
      this.callWithToken({
        parameters: {
          query: this.searchItem,
        },
        action: this.findBusiness,
      }).then((success) => {
        if (success.result.users.length === 0) {
          this.$message({
            type: 'info',
            message: 'No businesses found',
          });
        }
        this.$router.push({
          name: this.$route.name,
          query: { search: this.searchItem },
        });
      });
    },
    send_request(file) {
      this.sendRequest = true;
      this.sendFile = file;
    },
  },
  computed: {
    getCompany() {
      return this.company;
    },
    ...mapGetters('user_mgt', ['user', 'isLoggedIn', 'session']),
    ...mapGetters('users', ['users', 'error', 'loading', 'pages', 'page', 'message', 'total']),

  },
};
</script>

<style>
  .tutorial_flow {
    width: 200px;
    margin-top: 50px;
  }
</style>
