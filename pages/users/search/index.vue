<template>
  <section>
    <div class="row">
      <div class="col">
        <div
          class
          v-if="!$route.query.result">
          <div class="control search-bar__control">
            <div class="search-bar">
              <base-search-input
                :placeholder="searchPlaceholder"
                @keyup.enter.native="searchServer"
                v-model="searchItem" />
              <base-button
                @click="searchServer"
                button-class="is-success mdc-button--unelevated">
                Search
              </base-button>
            </div>
          </div>
          <div class="text-center mt-3">
            <el-radio
              label="business"
              v-model="searchIn">
              Businesses
            </el-radio>
            <el-radio
              label="files"
              v-model="searchIn">
              Files
            </el-radio>
          </div>
        </div>
      </div>
    </div>
    <section v-if="!$route.query.result">
      <div class="row mb-2">
        <div class="col items-found__container">
          <span
            class="items-found__counter"
            v-if="displayList">{{ displayList.length }}</span>
          <span>{{ viewing }} found</span>
        </div>

        <div class="col show-recent__container has-text-right">
          <span
            @click="loadRecent('business')"
            class="pointer"
            style="color: #53A63E;"
            v-if="viewing === 'files'">Show Recent Businesses</span>
          <span
            @click="loadRecent('files')"
            class="pointer"
            style="color: #53A63E;"
            v-if="viewing === 'business'">Show Recent Files</span>
        </div>
      </div>

      <div
        class="row mb-4 animated slideInUp"
        v-loading="loading">
        <div class="col-12">
          <div
            class="row"
            v-if="viewing === 'business'">
            <user-search-table @showFiles="showFiles" />
          </div>
          <div
            class="row"
            v-if="viewing === 'files'">
            <user-search-files-table />
          </div>
        </div>
      </div>
    </section>
    <section v-else>
      <search-results
        :team="getCompany"
        class="animated slideInUp" />
    </section>
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters, mapMutations } from 'vuex';
import SearchResults from '@/components/user/searchResult';
import UserSearchTable from '@/components/user/UserSearchTable';
import UserSearchFilesTable from '@/components/user/UserSearchFilesTable';
import BaseSearchInput
  from '@/components/base-components/BaseSearchInput';
import BaseButton from '@/components/base-components/BaseButton';

export default {
  layout: 'users-layout',

  components: {
    SearchResults,
    UserSearchTable,
    UserSearchFilesTable,
    BaseSearchInput,
    BaseButton,
  },

  data() {
    return {
      searchItem: '',
      company: null,
      viewing: '',
      searchIn: '',
      loading: false,
    };
  },
  mounted() {
    console.log(!this.$route.query);
    if (!this.$route.query.search || !this.$route.query) {
      this.loadRecent('business');
    } else {
      this.searchItem = this.$route.query.search;
      this.searchIn = this.$route.query.in;
      this.viewing = this.$route.query.in;
      this.searchServer();
    }
  },
  updated() {
    if (!this.searchIn || !this.viewing && this.$route.query) {
      this.searchItem = this.$route.query.search;
      this.searchIn = this.$route.query.in;
      this.viewing = this.$route.query.in;
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
    ...mapActions('users', ['findBusiness', 'setUser', 'getSearches']),
    ...mapMutations('users', ['setUsers']),

    loadRecent(type) {
      this.viewing = type;
      this.searchIn = type;
      this.getUserSearches();
    },

    getUserSearches() {
      this.loading = true;
      this.callWithToken({
        parameters: {
          query: this.searchIn,
        },
        action: this.getSearches,
      }).then((res) => {
        this.viewing = this.searchIn;
        this.loading = false;
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
      if (!this.searchItem) return;
      this.loading = true;
      this.callWithToken({
        parameters: {
          query: this.searchItem,
          in: this.searchIn,
        },
        action: this.findBusiness,
      }).then((success) => {
        if (success.result.users.length <= 0) {
          this.$message({
            type: 'info',
            message: `No ${this.searchIn} found`,
          });
        }
        this.$router.push({
          name: 'users-search',
          query: { search: this.searchItem, in: this.searchIn },
        });
        this.viewing = this.searchIn;
        this.loading = false;
      });
    },
  },
  computed: {
    ...mapGetters('users', ['users']),
    getCompany() {
      return this.company;
    },
    searchPlaceholder() {
      return `Search for ${this.searchIn}`;
    },
    displayList() {
      const currentList = this.users.filter(e => e.files);
      const currentList2 = this.users.filter(e => e.modifications);
      if (this.viewing === 'files') {
        return currentList2;
      }
      if (this.viewing === 'business') {
        return currentList;
      }
    },
  },
};
</script>

<style lang="scss">
  .tutorial_flow {
    width: 200px;
    margin-top: 50px;
  }

  .has-text-right {
    text-align: right;
  }

  .items-found__container {
    font-size: 16px;
    text-transform: capitalize;

    .items-found__counter {
      font-weight: 600;
    }
  }

  .show-recent__container {
    font-size: 16px;
    text-transform: capitalize;
  }

  .search-bar__control {
    display: flex;
    width: 100%;

    .button {
      height: 46px;
      border-radius: 0 4px 4px 0;
    }

    .search-bar {
      display: inherit;
      width: 100%;
      justify-content: center;

      .search-input-container {
        margin: 0;
        width: 100%;

        .input {
          border-radius: 4px 0 0 4px !important;
        }
      }
    }
  }
</style>
