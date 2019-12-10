<template>
  <section>
    <div
      class="row"
      v-if="dashboardObject.length <= 0">
      <div class="col text-center">
        <img
          :src="require('@/assets/img/no-files-icon.png')"
          alt="No files completed image"
          class="img-fluid d-block mx-auto no-files-img">
        <h2 class="no-files-title">
          You have not completed any files yet!
        </h2>
        <h3 class="no-files-subtitle">
          Click Search to locate a file or upload
          your own file to complete it paperless!
        </h3>
      </div>
    </div>
    <div
      class="row"
      v-if="dashboardObject.length > 0">
      <div class="col-lg-12">
        <div class="row overflow-scroll">
          <dashboard-table
            :dashboard-object="dashboardObject"
            :user-id="user.Id"
            v-if="showTable" />
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters, mapMutations } from 'vuex';
import results from '@/components/user/searchResult';
import DashboardTable from '@/components/user/DashboardTable';

export default {
  layout: 'users-layout',
  fetch({ store, redirect }) {
    const userIsLoggedIn = store.getters['user_mgt/isLoggedIn'];
    const user = store.getters['user_mgt/user'];

    if (!userIsLoggedIn) {
      return redirect('/login');
    }
    if (user.role === 1) return redirect('/super/dashboard');
    if (user.role === 2) return redirect('/business-users/dashboard');
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
  components: {
    results,
    DashboardTable,
  },
  data() {
    return {
      showTable: false,
      dashboardObject: null,
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
    title: 'Users Dashboard',
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
    ...mapActions('users', ['findBusiness', 'setUser', 'getAction']),
    ...mapMutations('users', ['setUsers']),
    handleResize() {
      this.window.width = window.innerWidth;
    },
    getAllFiles(page = 1) {
      this.callWithToken({
        parameters: {
          page,
        },
        action: this.getFiles,
      }).then((success) => {
      });
    },
    send_request(file) {
      this.sendRequest = true;
      this.sendFile = file;
    },
  },

  computed: {
    ...mapGetters('user_mgt', ['user', 'isLoggedIn', 'session']),
    ...mapGetters('users', [
      'users',
      'error',
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

  .is-success-icon {
    color: #78c360;
  }

  .dropdown-toggle,
  .dropdown,
  .b-dropdown,
  .btn-link {
    text-decoration: none !important;
    box-shadow: none !important;

    &:active,
    &:hover,
    &:focus {
      box-shadow: none !important;
    }
  }

  .has-text-centered {
    text-align: center;
  }

  .no-files-img {
    width: 100%;
    max-width: 300px;
  }

  .no-files-title {
    color: #78c360;
  }

  .no-files-subtitle {
    color: #7E7E7E;
  }

  .overflow-scroll {
    overflow-x: scroll;
  }

  .search-bar {
    h1 {
      color: #78c360;
      font-family: "Noto Sans JP", sans-serif;
      font-size: 20px;
      font-weight: 700;
      line-height: 28px;
      margin-bottom: 20px;
      text-align: center;
    }

    p {
      margin-bottom: 5px;
      color: #353535;
      text-align: center;
    }

    .search-input-container {
      max-width: 500px;
    }
  }

  .fielf-search__container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .button {
      border-radius: 0 4px 4px 0;
      height: 46px;
    }

    .search-bar__control {
      display: flex;
      width: 100%;

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

    .select-container {
      margin-right: 15px;

      select {
        padding: 0 15px;
      }
    }
  }

  @media screen and (min-width: 320px) {
    .no-files-title {
      font-size: 20px;
      padding-top: 40px;
    }
    .no-files-subtitle {
      font-size: 15px;
      padding-top: 10px;
    }
  }

  @media screen and (min-width: 768px) {
    .no-files-title {
      font-size: 26px;
      padding-top: 70px;
    }
    .no-files-subtitle {
      font-size: 20px;
      padding-top: 16px;
    }
  }
</style>
