<template>
  <section v-if="done">
    <div class="header">
      <div class="container">
        <div class="left-navbar">
          <div
            class="logo-img__container"
            v-if="companyImage">
            <img
              :src="companyImage"
              alt="company logo"
              class="logo_img">
          </div>
          <div
            class="address_bar"
            v-if="company">
            <p>
              {{ company.businessName }}
              <br>
              {{ company.address }}
              <br>
              {{ company.telephone }}
            </p>
          </div>
        </div>
        <div class="text-right">
          <base-button
            @click="goTo('/login')"
            button-class="is-outlined-success mdc-button--outlined"
            class="mr-1"
            v-if="!isLoggedIn">
            Log in
          </base-button>

          <base-button
            @click="goTo('/register')"
            button-class="is-success mdc-button--raised"
            v-if="!isLoggedIn">
            Sign up
          </base-button>

          <b-dropdown
            no-caret
            style
            v-if="user.role && user.role   !==   1"
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
        </div>
      </div>
    </div>

    <div class="body">
      <div class="container">
        <div class="box">
          <p>
            Reduce carbon footprint and save our planet by completing any of
            our forms electronically.
          </p>
          <img :src="require('@/assets/img/devices.png')">
        </div>
        <div class="right-item">
          <div class="features-row">
            <div class="icon-features__container">
              <img :src="require('../../assets/img/nopen.png')">
              <span>No Pen</span>
            </div>
            <div class="icon-features__container">
              <img :src="require('../../assets/img/nopaper.png')">
              <span>No Paper</span>
            </div>
            <div class="icon-features__container">
              <img :src="require('../../assets/img/noprinter.png')">
              <span>No Printer</span>
            </div>
            <div class="icon-features__container">
              <img :src="require('../../assets/img/noscanner.png')">
              <span>No Scanner</span>
            </div>
          </div>
          <div class="our-files__container">
            <h2>Our Files</h2>
            <ul v-if="businessProfile">
              <li
                :key="index"
                v-for="(file, index) in files">
                {{ file.title }}
                <b-dropdown
                  no-caret
                  size="lg"
                  variant="link">
                  <template slot="button-content">
                    <i class="fa fa-ellipsis-h is-success-icon" />
                  </template>
                  <b-dropdown-item
                    @click.prevent="openFile(file)"
                    href="#"
                    v-if="check_access(file)">
                    {{ file.action_type === '1'?'View & Complete':'View & Confirm'
                    }}
                  </b-dropdown-item>
                </b-dropdown>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="container">
        <div class="">
          powered by
          <img
            :src="require('@/assets/img/logo.png')"
            style="width: 160px;">
        </div>
        <div class="">
          <p class="foot_p">
            2018 &copy; PAPERDAZ | All Right Reserved
          </p>
        </div>
        <div class=" text-right">
          <ul class="social_icons">
            <li class="mx-2 colorwhite">
              <i class="ion ion-social-linkedin" />
            </li>
            <li class="mx-2 colorwhite">
              <i class="fion ion-social-twitter" />
            </li>
            <li class="mx-2 colorwhite">
              <i class="ion ion-social-facebook" />
            </li>
            <li class="mx-2 colorwhite">
              <i class="ion ion-social-youtube" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>


<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '@/components/base-components/BaseButton';
import Footer from '@/components/footer';

export default {
  layout: 'complete',
  components: {
    BaseButton,
    Footer,
  },
  data() {
    return {
      done: false,
    };
  },
  computed: {
    ...mapGetters('users', ['businessProfile']),
    ...mapGetters('user_mgt', ['user', 'isLoggedIn']),
    ...mapGetters('files', [
      'files',
    ]),
    companyImage() {
      if (this.businessProfile.company) {
        return this.$API + this.businessProfile.company.image;
      }
    },
    company: {
      get() {
        if (this.businessProfile.company) {
          return this.businessProfile.company;
        }
      },
    },
  },
  methods: {
    ...mapActions('users', ['getBizProfile']),
    ...mapActions('user_mgt', ['logout_user']),
    ...mapActions('files', [
      'getCompanyFiles',
      'requestAccess',
    ]),
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
    },
    check_access(file) {
      // console.log(file, file.title);
      if (
        (file.file_type === 'private'
            && file.access_granted.includes(this.user.Id))
          || file.file_type === 'public'
      ) {
        return true;
      }
      return false;
    },
    fetchCompanyInfo() {
      this.getBizProfile({ teamId: this.$route.query.companyId }).then((dal) => {
        this.done = true;
      });
    },
    goTo(path) {
      this.$router.push(path);
    },
    logout() {
      this.logout_user();
      this.$router.push('/');
    },
  },
  mounted() {
    this.fetchCompanyInfo();
    this.getCompanyFiles({ teamId: this.$route.query.companyId });
  },
  head: {
    title: 'Company Profile',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      {
        hid: 'description',
        name: 'description',
        content: 'Paperdaz, Let us go green!!! ',
      },
    ],
  },
};
</script>


<style scoped type="text/css">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600&display=swap');

  section {
    height: 100%;
    background-color: #fff;
    overflow: hidden;
    font-family: 'Source Sans Pro', sans-serif;
  }

  .social_icons li {
    display: inline-block;
  }

  .social_icons {
    margin: 7px 0 0;
  }

  .social_icons i {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ccc;
    color: #fff;
    text-align: center;
    font-size: 18px;
    display: block;
    line-height: 30px;
  }

  .header {
    width: 100%;
    background: rgb(247, 247, 247, .8) !important;
    padding-top: 25px;
    padding-bottom: 25px;
  }

  .header .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .navbar {
    box-shadow: 0 2px 3px rgba(0, 0, 0, .2);
    margin-bottom: 0 !important;
    min-height: 100%;
    background: rgb(247, 247, 247, .8) !important;
  }

  .left-navbar {
    display: flex;
  }

  .left-navbar .address_bar {
    padding-left: 25px;
    font-size: 15px;
  }

  .left-navbar .address_bar p {
    margin-bottom: 0 !important;
  }

  .left-navbar .logo_img {
    border-radius: 50%;
  }

  .body {
    width: 100%;
    background: #fff;
  }

  .right-item {
    padding-left: 100px;
    width: 100%;
  }

  .right-item .our-files__container h2 {
    color: #7bbf68;
    font-size: 50px;
    margin-bottom: 0;
    font-weight: 600;
    line-height: 1;
  }

  .right-item .our-files__container ul {
    list-style: none;
    padding-left: 10px;
  }

  .right-item .our-files__container ul li {
    font-size: 20px;
    font-weight: normal;
  }

  .icon-features__container {
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .features-row {
    display: flex;
    justify-content: space-between;
    padding-bottom: 100px;
  }

  .is-text-dark {
    font-size: 16px !important;
    color: #363636 !important;
  }

  .footer {
    width: 100%;
    background: #f7f7f7 !important;
    padding: 18px 0;
    position: absolute;
    bottom: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
  }

  .footer .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn-link p,
  .svg-inline--fa {
    color: #5c5d5f !important;
    font-weight: 700;
  }

  .header-btn {
    padding: 0 24px;
    margin: 7px;
    color: #fff;
  }

  .login-btn {
    background: #fff;
  }

  .container {
    flex-grow: 1;
    margin: 0 auto;
    position: relative;
    padding: 0;
  }

  @media screen and (min-width: 1024px) {
    .container {
      max-width: 960px;
    }
  }

  @media screen and (min-width: 1216px) {
    .container {
      max-width: 1150px;
    }
  }

  .btn-link {
    padding-bottom: 0;
    padding-top: 5%;
    text-decoration: none !important;
  }

  .btn-blc .nav-link {
    color: #fff !important;
  }

  .height53 {
    height: 53px;
  }

  .logo_img {
    width: 65px;
    height: 65px;
  }

  .box {
    padding: 50px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .3) !important;
    max-width: 505px;
  }

  .box p {
    font-size: 20px;
    font-weight: normal !important;
    text-align: justify;
    padding-bottom: 50px;
    line-height: 1.4;
  }

  .box img {
    width: 100%;
  }

  .body .container {
    padding-top: 100px !important;
    padding-bottom: 132px !important;
    display: flex;
  }

  .py-6 {
    padding: 90px 0;
  }

  .foot_p {
    text-align: center;
    margin: 12px 0 0;
  }

  @media screen and (max-width: 768px) {
    .header .container {
      flex-direction: column;
    }

    .header .container .left-navbar {
      padding-bottom: 15px;
    }

    .body .container {
      padding-bottom: 278px;
    }

    .footer .container {
      flex-direction: column;
    }

    .foot_p {
      margin-bottom: 20px;
      margin-top: 20px;
    }
  }

  @media (max-width: 991px) {
    .footer .col-sm-4 img {
      width: 130px !important;
    }
  }

  @media screen and (max-width: 1023px) {
    .body .container {
      flex-direction: column;
      align-items: center;
    }

    .box {
      margin-bottom: 60px;
    }

    .right-item {
      padding: 0;
      max-width: 500px;
    }

    .features-row {
      padding-bottom: 50px;
    }
  }
</style>
