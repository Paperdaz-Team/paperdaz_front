<template>
  <v-app>
    <p-header />
    <v-content>
      <b-row class="main-default-row container">
        <b-col
          class="ml-mr__auto coupon-col__container"
          md="auto"
          sm="12"
          v-if="softLaunch">
          <div
            class="circular boxs"
            style="width: 100%;"
            v-if="$route.query.package">
            <package-details />
          </div>
          <div
            class="circular boxs"
            style="width: 100%;"
            v-else>
            <b-cuponcode />
          </div>
        </b-col>

        <b-col
          class="hidden-xs"
          lg="2"
          style="padding-left: 0;"
          v-if="isLoggedIn">
          <user-sidebar />
        </b-col>

        <b-col class="ml-mr__auto">
          <nuxt />
        </b-col>
      </b-row>
    </v-content>
    <b-footer />
    <b-modal-drawer />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import header from '@/components/header';
import footer from '@/components/footer';
import UserSidebar from '@/components/users_sidebar';
import cuponcode from '@/components/cuponcode';
import ModalDrawer from '../components/modals/ModalDrawer';
import PackageDetails from '@/components/PackageDetails';

export default {
  components: {
    pHeader: header,
    bFooter: footer,
    bCuponcode: cuponcode,
    bModalDrawer: ModalDrawer,
    UserSidebar,
    PackageDetails,
  },
  data() {
    return {
      confirmed: false,
      accessPage: true,
    };
  },
  mounted() {
    if (this.$route.query.confirmed) {
      this.confirmed = true;
    } else {
      this.confirmed = false;
    }
    if (this.$route.name === 'login' || this.$route.name === 'register') {
      this.accessPage = true;
    } else {
      this.accessPage = false;
    }
  },
  updated() {
    if (this.$route.name === 'login' || this.$route.name === 'register') {
      this.accessPage = true;
    } else {
      this.accessPage = false;
    }
  },
  computed: {
    ...mapGetters('user_mgt', ['session']),
    ...mapGetters('user_mgt', {
      isLoggedIn: 'isLoggedIn',
    }),
    image() {
      const t = require('./../assets/img/left-img.png');
      // console.log(t);
      return t;
    },
    image_other() {
      const t = require('./../assets/img/seeds.png');
      // console.log(t);
      return t;
    },
    softLaunch() {
      if (
        (this.$route.path === '/' && this.$route.query.soft_launch)
          || (this.$route.path === '/register'
            && this.$route.query.soft_launch
            && !this.$route.query.invite_code)
          || this.$route.path === '/confirm_details'
      ) {
        return true;
      }
      return false;
    },
    bgIss() {
      if (this.$route.query.confirmed) {
        this.confirmed = true;
      } else {
        this.confirmed = false;
      }
    },
  },
};
</script>


<style type="text/css">
  body {
    overflow-y: scroll !important;
    background-color: #fafafa !important;
  }

  .v-content {
    padding-top: 90px !important;
  }

  .el-input__inner {
    height: 45px;
    line-height: 45px;
  }

  input::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #c6c6c6;
  }

  input::-moz-placeholder {
    /* Firefox 19+ */
    color: #c6c6c6;
  }

  input:-ms-input-placeholder {
    /* IE 10+ */
    color: #c6c6c6;
  }

  input:-moz-placeholder {
    /* Firefox 18- */
    color: #c6c6c6;
  }

  .f-400 {
    font-weight: 400;
  }

  .circular {
    height: 70vh;
    background-size: contain;
  }

  .circular2 {
    height: 240px;
    background-position: center;
    background-size: contain;
  }

  .custom-control-label {
    position: relative;
    margin-bottom: 0;
    vertical-align: top;
    color: #55a73c;
    font-size: 12px;
  }

  .thanks_txt {
    font-size: 26px;
    font-weight: 100;
    letter-spacing: 1px;
  }

  .planting_txt {
    font-size: 26px;
    font-weight: 600;
    color: #53a63e;
  }

  .enterpwd {
    margin-top: 50px;
    opacity: 0.8;
    font-size: 14px;
    font-weight: 300;
    text-align: center;
  }

  .main-default-row {
    margin: 0;
    padding: 0 24px;
  }

  .container {
    flex-grow: 1;
    margin: 0 auto;
    position: relative;
  }

  .ml-mr__auto {
    margin-right: auto;
    margin-left: auto;
  }

  @media screen and (min-width: 1024px) {
    .container {
      max-width: 1150px;
    }
  }

  @media (max-width: 1900px) {
    .col-xl-8 {
      flex: 0 0 55%;
      max-width: 55%;
    }

    .col-xl-4 {
      flex: 0 0 45%;
      max-width: 45%;
    }

    /* .boxs {
          padding-right: 150px;
        } */
  }

  @media (max-width: 1800px) {
    .circular {
      height: 630px;
      background-size: contain;
      background-position: bottom;
    }

    .or_option {
      margin: 20px 0;
    }
  }

  @media (max-width: 1440px) {
    .p-5 {
      padding: 1rem !important;
    }

    .circular {
      height: 580px;
    }

    .col-xl-8 {
      flex: 0 0 60%;
      max-width: 60%;
    }

    .col-xl-4 {
      flex: 0 0 40%;
      max-width: 40%;
    }
  }

  @media (max-width: 1199px) {
    .col-xl-8,
    .col-xl-4 {
      flex: 0 0 50%;
      max-width: 50%;
    }

    .circular {
      height: 570px;
    }
  }

  @media screen and (max-width: 959px) {
    .coupon-col__container {
      margin-bottom: 30px;
    }
  }

  @media (max-width: 991px) {
    .col-xl-8,
    .col-xl-4 {
      flex: 0 0 100%;
      max-width: 100%;
    }

    .card.p-5 {
      max-width: 80%;
      margin: 30px auto 0;
    }

    .circular {
      height: auto;
    }
  }

  @media (max-width: 767px) {
    .card.p-5 {
      max-width: 90%;
      margin: 0 auto;
    }

    .p-5 {
      padding: 0 !important;
    }

    .boxs {
      padding-right: 0px;
    }

    .card-title {
      font-size: 18px;
    }
  }
</style>
