<template>
  <div class="drawer-container">
    <div
      @click="toggleModalDrawer(false)"
      class="overlay"
      v-show="getModalState.drawer" />
    <div
      :class="{ 'opened': getModalState.drawer }"
      class="sidenav"
      id="mySidenav">
      <div class="header">
        <div
          class="profile-img"
          v-if="user && user.image">
          <img
            :src="formImage()"
            alt="Avatar Image">
        </div>
        <div class="profile-name">
          <span>
            {{ user.email }}
          </span>
        </div>
      </div>
      <div class="sidenav-items">
        <nuxt-link
          :to="{path:user.role === 2?'/business-users/account':'/users/account'}"
          @click.native="toggleModalDrawer(false)"
          class="side-item"
          exact
          tag="a"
          v-if="user.role && user.role   !==   1">
          <span class="icon">
            <i class="far fa-id-badge" />
          </span>
          <span class="text">
            Profile
          </span>
        </nuxt-link>
        <nuxt-link
          @click.native="toggleModalDrawer(false)"
          class="side-item"
          tag="a"
          to="/super/dashboard"
          v-if="user.role && user.role === 1">
          <span class="icon">
            <i class="fas fa-tachometer-alt" />
          </span>
          <span class="text">
            My Files
          </span>
        </nuxt-link>
        <nuxt-link
          :to="{path:user.role === 2?'/business-users/dashboard':'/users/dashboard'}"
          @click.native="toggleModalDrawer(false)"
          class="side-item"
          tag="a"
          v-if="user.role && user.role   !==   1">
          <span class="icon">
            <i class="fas fa-tachometer-alt" />
          </span>
          <span
            class="text"
            v-if="user.role === 3">
            My Files
          </span>
          <span
            class="text"
            v-else>
            My Files
          </span>
        </nuxt-link>
        <nuxt-link
          @click.native="toggleModalDrawer(false)"
          class="side-item"
          tag="a"
          to="/business-users/teams"
          v-if="user.role && user.role === 2">
          <span class="icon">
            <i class="fas fa-users" />
          </span>
          <span class="text">
            Teams
          </span>
        </nuxt-link>
        <nuxt-link
          @click.native="toggleModalDrawer(false)"
          class="side-item"
          tag="a"
          to="/business-users/company-files"
          v-if="user.role && user.role === 2">
          <span class="icon">
            <i class="fas fa-file-alt" />
          </span>
          <span class="text">
            Company Files
          </span>
        </nuxt-link>
        <nuxt-link
          @click.native="toggleModalDrawer(false)"
          class="side-item"
          tag="a"
          to="/users/search"
          v-if="user.role && user.role === 3">
          <span class="icon">
            <i class="fas fa-search" />
          </span>
          <span class="text">
            Search Files
          </span>
        </nuxt-link>
        <nuxt-link
          @click.native="toggleModalDrawer(false)"
          class="side-item"
          tag="a"
          to="/business-users/upload-files"
          v-if="user.role && user.role === 2">
          <span class="icon">
            <i class="fas fa-upload" />
          </span>
          <span class="text">
            Upload Files
          </span>
        </nuxt-link>
        <nuxt-link
          @click.native="toggleModalDrawer(false)"
          class="side-item"
          tag="a"
          to="/upload_file"
          v-if="user.role && user.role === 3">
          <span class="icon">
            <i class="fas fa-upload" />
          </span>
          <span class="text">
            Upload Files
          </span>
        </nuxt-link>
        <a
          @click.prevent="logout()"
          class="side-item"
          v-if="user">
          <span class="icon">
            <i class="fas fa-sign-out-alt" />
          </span>
          <span class="text">
            Logout
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ModalDrawer',
  computed: {
    ...mapGetters('user_mgt', ['user']),
    ...mapGetters('modals', ['getModalState']),
  },
  methods: {
    ...mapMutations('modals', ['toggleModalDrawer']),
    ...mapActions('user_mgt', ['logout_user']),
    formImage() {
      if (!this.user.image) {
        return require('../../assets/img/avatar5.png');
      }
      return this.$API + this.user.image;
    },
    logout() {
      this.toggleModalDrawer(false);
      this.logout_user();
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
  .overlay {
    min-width: 100vw;
    min-height: 100%;
    position: absolute;
    background: rgba(53, 53, 53, 0.5);
    top: 0;
    left: 0;
    z-index: 990;
  }

  a.nuxt-link-active,
  a.nuxt-link-exact-active {
    background-color: #f7f7f7;

    span {
      color: #78c360 !important;
    }
  }

  .sidenav {
    height: 100vh;
    width: 270px;
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    transform: translateX(+100%);
    overflow-x: hidden;
    transition: 0.3s;

    &.opened {
      box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 5px 8px 0 rgba(0, 0, 0, .14), 0 1px 14px 0 rgba(0, 0, 0, .12);
      transform: translateX(0);
    }

    .header {
      padding: 20px 32px;
      box-shadow: 0 3px 3px -2px rgba(170, 170, 170, .2), 0 3px 4px 0 rgba(170, 170, 170, .14), 0 1px 8px 0 rgba(170, 170, 170, .12);
      margin-bottom: 20px;

      .profile-img {
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          max-width: 100%;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          border: 2px solid #f7f7;
        }
      }

      .profile-name {
        text-align: center;
        font-weight: bold;
      }
    }

    .sidenav-items {
      display: flex;
      flex-direction: column;

      .is-active-link {
        .icon,
        .text {
          color: #78c360;
        }
      }

      a {

        margin-left: 25px;
        margin-right: 25px;
        padding: 10px;

        &:not(:last-child) {
          border-bottom: 1px solid #9f9f9f;
        }

        .icon {
          font-size: 20px;
          color: #2e2e2e;
        }

        .text {
          font-weight: 400;
          font-size: 18px;
          color: #2e2e2e;
        }
      }
    }

    .closebtn {
      position: absolute;
      top: 0;
      right: 25px;
      font-size: 36px;
      margin-left: 50px;
    }
  }

  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }
</style>
