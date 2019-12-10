<template>
  <header
    class="mdc-top-app-bar mdc-top-app-bar--fixed"
    style="z-index: 999;">
    <!-- <div class="header-container"> -->
    <div class="mdc-top-app-bar__row container">
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <nuxt-link
          class="mdc-top-app-bar__title"
          tag="span"
          to="/">
          <PaperDazIcon size="45" />
        </nuxt-link>
      </section>

      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
        <base-button
          @click="goTo('/login')"
          button-class="is-outlined-success mdc-button--outlined"
          v-if="!isLoggedIn">
          Log in
        </base-button>

        <base-button
          @click="goTo('/register')"
          button-class="is-success mdc-button--raised"
          v-if="!isLoggedIn">
          Sign up
        </base-button>

        <base-button
          @click="goTo('/users/search')"
          button-class="mdc-button--raised is-success hidden-touch"
          style="margin-right: 0.75rem;"
          v-if="user.role && user.role === 3 && showSearchButton">
          <i class="fa fa-search is-marginless" />
        </base-button>

        <base-button
          @click="goTo('/business-users/upload-files')"
          button-class="mdc-button--raised is-success hidden-touch"
          style="margin-right: 0.75rem;"
          v-if="user.role && user.role === 2">
          Upload Files
        </base-button>

        <base-button
          @click="goTo('/super/dashboard')"
          button-class="mdc-button--raised is-success hidden-touch"
          style="margin-right: 0.75rem;"
          v-if="user.role && user.role === 1">
          Dashboard
        </base-button>

        <b-dropdown
          class="hidden-touch"
          no-caret
          style
          v-if="user.role && user.role !== 1"
          variant="link">
          <template slot="button-content">
            <span class="is-text-dark is-capitalized">{{ user.firstName }} {{ user.lastName }}</span>
            <i class="fa fa-angle-down is-text-dark" />
          </template>
          <b-dropdown-item
            :to="{path:user.role === 2?'/business-users/account':'/users/account'}"
            v-if="user.role!=1">
            Profile
          </b-dropdown-item>

          <b-dropdown-item
            :to="{path:user.role === 2?'/business-users/dashboard':'/users/dashboard'}"
            v-if="user.role!=1">
            My Files
          </b-dropdown-item>

          <b-dropdown-item @click.prevent="logout()">
            Logout
          </b-dropdown-item>
        </b-dropdown>
        <base-icon-button
          @click="toggleModalDrawer(true)"
          button-class="mdc-top-app-bar__navigation-icon--unbounded visible-touch-flex"
          v-if="isLoggedIn && user">
          <i class="fas fa-bars" />
        </base-icon-button>
      </section>
    </div>
    <!-- </div> -->
  </header>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { MDCTopAppBar } from '@material/top-app-bar';

import BaseButton from '@/components/base-components/BaseButton';
import BaseIconButton from '@/components/base-components/BaseIconButton';
import PaperDazIcon from './svg/PaperDazIcon';

export default {
  components: {
    PaperDazIcon,
    BaseButton,
    BaseIconButton,
  },
  data() {
    return {
      requests: 0,
    };
  },
  beforeMount() {
    this.toggleModalDrawer(false);
  },
  mounted() {
    this.$nextTick(() => {
      this.topAppBarElement = document.querySelector('.mdc-top-app-bar');
      this.topAppBar = new MDCTopAppBar(this.topAppBarElement);
    });
  },
  computed: {
    ...mapGetters('user_mgt', ['user', 'isLoggedIn']),
    ...mapGetters('modals', ['getModalState']),
    showSearchButton() {
      return !!(this.$route.fullPath !== '/users/search' && this.$route.path !== '/' && !this.$route.query.search);
    },
    showSearchButton2() {
      return this.$route;
    },
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    logout() {
      this.logout_user();
      this.$router.push('/');
    },
    openDrawer() {
      this.$emit('drawer');
    },
    ...mapActions('user_mgt', ['logout_user']),
    ...mapMutations('modals', ['toggleModalDrawer']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "~@material/top-app-bar/mdc-top-app-bar";

  .is-capitalized {
    text-transform: capitalize;
  }

  .mdc-top-app-bar {
    @include mdc-top-app-bar-fill-color(#fafafa);
    @include mdc-top-app-bar-ink-color(#353535);

    .container {
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .hidden-touch {
      display: none;
    }

    .visible-touch-flex {
      display: flex;
    }

    .mdc-top-app-bar__section--align-start {
      padding-left: 0;

      .mdc-top-app-bar__title {
        cursor: pointer;
        padding-left: 0;
      }
    }

    .mdc-top-app-bar__section--align-end {
      padding-right: 0;

      .button {
        margin-right: 0.75rem;
      }

      .end-button {
        margin-right: 20px;
      }

      .dropdown-toggle {
        text-decoration: none !important;
        box-shadow: none !important;
        padding-left: 0;
      }
    }
  }

  .is-text-dark {
    color: #353535 !important;
  }

  .container {
    flex-grow: 1;
    margin: 0 auto;
    position: relative;
  }

  @media screen and (min-width: 1024px) {
    .container {
      max-width: 960px;
    }
    .container.is-fluid {
      margin-left: 32px;
      margin-right: 32px;
      max-width: none;
    }
    .hidden-touch {
      display: block !important;
    }
    .visible-touch-flex {
      display: none !important;
    }
  }

  @media screen and (min-width: 1216px) {
    .container {
      max-width: 1150px;
    }
  }

  @media screen and (max-width: 767px) {
    .mdc-top-app-bar__title {
      img {
        max-width: 100px;
      }
    }
  }
</style>
