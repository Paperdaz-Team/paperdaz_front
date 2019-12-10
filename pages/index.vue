<template>
  <v-app>
    <Header />
    <v-content style="padding-bottom: 80px;">
      <Container>
        <ARow class="d-flex align-items-center">
          <ACol
            span="8"
            offset="1">
            <FlexBox
              direction="column"
              class="text-right mb-4">
              <p class="text-secondary text-regular mb-0">
                Reduce carbon footprint in the world we live in
              </p>
              <h1 class="mb-0 text-primary text-bold text-xxl">
                Complete files
              </h1>
              <p class="text-secondary text-large m-0 w-min">
                anytime, anywhere
              </p>
            </FlexBox>

            <Form
              class="mb-4"
              @submit.prevent="searchUser">
              <AInputSearch
                v-model="username"
                size="large"
                placeholder="Business email or user name"
                @search="searchUser" />
            </Form>

            <FlexBox style="height: 100px;">
              <p
                v-if="errorMsg"
                class="text-muted">
                {{ errorMsg }}
              </p>
              <FlexBox
                v-else-if="!isEmpty(user)"
                align-items="center"
                class="ml-2">
                <AvatarImage
                  :path="user.avatar"
                  size="medium" />
                <FlexBox
                  direction="column"
                  class="ml-3">
                  <p class="mb-0 text-bold">
                    {{ user.username }}
                  </p>
                  <p class="mb-0 text-primary">
                    {{ user.profession }}
                  </p>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </ACol>
          <ACol
            span="14"
            offset="1">
            <FlexBox
              justify="center"
              class="my-5">
              <HeroIcon size="400" />
            </FlexBox>
          </ACol>
        </ARow>
      </Container>

      <!-- instruction -->

      <section id="instruction">
        <div class="container">
          <b-row
            align-h="center"
            class="featues_row">
            <b-col
              cols="6"
              sm="3">
              <img
                :src="require('../assets/img/nopen.png')"
                alt="nopen image">
              <h4>No Pen</h4>
            </b-col>
            <b-col
              cols="6"
              sm="3">
              <img
                :src="require('../assets/img/nopaper.png')"
                alt="nopaper image">
              <h4>No Paper</h4>
            </b-col>
            <b-col
              cols="6"
              sm="3">
              <img
                :src="require('../assets/img/noprinter.png')"
                alt="noprinter image">
              <h4>No Printer</h4>
            </b-col>
            <b-col
              cols="6"
              sm="3">
              <img
                :src="require('../assets/img/noscanner.png')"
                alt="noscanner image">
              <h4>No Scanner</h4>
            </b-col>
          </b-row>
          <b-row class="mb-5">
            <b-col>
              <h3>NO PROBLEM!</h3>
            </b-col>
          </b-row>
          <b-row
            align-h="center"
            align-v="end"
            class="process_row">
            <div
              @click="goTo('/upload_file')"
              class="process-box__container">
              <base-icon
                height="95"
                icon-name="icon-upload"
                width="105.56">
                <icon-upload />
              </base-icon>
              <span>
                Upload your file
              </span>
            </div>
            <div class="process-box__container">
              <base-icon
                height="95"
                icon-name="icon-upload"
                width="105.56">
                <icon-complete />
              </base-icon>
              <span>
                Complete files
                electronically
              </span>
            </div>
            <div class="process-box__container">
              <base-icon
                height="95"
                icon-name="icon-upload"
                width="105.56">
                <icon-send />
              </base-icon>
              <span>
                Completed file will be
                sent to your email
              </span>
            </div>
          </b-row>
        </div>
      </section>

      <!-- about section -->
      <section class="world_greener">
        <div class="container">
          <div class="world_greener-text">
            <h2>
              Let’s Make The World Greener
            </h2>
            <p>
              Business displaying our <span class="icons-link">icons</span> in
              their
              communications media has pledged to
              reduce paper usage at work. Support them
              and view all the paper that can be completed
              on our unique platform. We will plant a tree for
              each file uploaded by the business. Each file
              completed on Paperdaz represents a leaf!
              Please
              <router-link
                class="join-link"
                tag="a"
                to="/register">
                join
              </router-link>
              our mission to reduce carbon
              footprint for a greener world.
            </p>
          </div>
          <div class="world_greener-img">
            <img
              :src="require('@/assets/img/about-section-bg.jpg')"
              alt="About section image">
          </div>
        </div>
      </section>
    </v-content>
    <Footer />
    <modal-drawer />
  </v-app>
</template>

<script>
import Header from '../components/header';
import Footer from '../components/footer';
import BaseButton from '@/components/base-components/BaseButton';
import BaseSearchInput
  from '@/components/base-components/BaseSearchInput';
import BaseIcon from '@/components/base-components/BaseIcon';
import IconUpload from '@/components/icons/IconUpload';
import IconComplete from '@/components/icons/IconComplete';
import IconSend from '@/components/icons/IconSend';
import ModalDrawer from '@/components/modals/ModalDrawer';
import Container from '../components/base/Container';
import FlexBox from '../components/base/FlexBox';
import AvatarImage from '../components/elements/AvatarImage';
import HeroIcon from '../components/svg/HeroIcon';

export default {
  name: 'LandingPage',
  components: {
    HeroIcon,
    AvatarImage,
    FlexBox,
    Container,
    Header,
    Footer,
    BaseButton,
    BaseSearchInput,
    BaseIcon,
    IconUpload,
    IconComplete,
    IconSend,
    ModalDrawer,
  },
  layout: 'complete',
  data() {
    return {
      username: '',
      errorMsg: '',
      user: {},
      confirmed: false,
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'business', text: 'Business Name' },
        { value: 'name', text: 'File Name' },
        { value: 'number', text: 'File Number' },
      ],
      stats: [
        { number: '23', text: 'Businesses in <br> Network' },
        { number: '105', text: 'Files Uploaded' },
        { number: '2550', text: 'Files Completed' },
        { number: '4550', text: 'Number of <br>Shares' },
      ],
    };
  },
  watch: {
    bgIss() {
      this.confirmed = this.$route.query.confirmed;
    },
  },
  mounted() {
    if (this.$route.query.confirm) {
      this.$router.push({ path: `/confirm_user?token=${this.$route.query.code}` });
    }
    if (this.$route.query.invite) {
      this.$router.push({ path: `/invite?invite_code=${this.$route.query.code}` });
    }
    if (this.$route.query.confirmed) {
      this.confirmed = true;
    } else {
      this.confirmed = false;
    }
  },
  head: {
    title: 'Home',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    searchUser() {
      this.clearError();
      const { username } = this;
      if (username.length) {
        // call api action
        if (username === 'mystars70') {
          this.user = {
            avatar: 'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg',
            username: 'mystars70',
            profession: 'Spark Dental Clinic',
          };
        } else {
          this.errorMsg = 'Oops! No result found';
          this.user = {};
        }
      }
    },

    clearError() {
      this.errorMsg = '';
      this.user = {};
    },
  },
};
</script>

<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,400,500,700|Quicksand:300,400,500,700");

  .v-content {
    padding-top: 90px !important;
  }

  .is-marginless {
    margin: 0 !important;
  }

  .search-input-container {
    width: 90%;
    max-width: 640px;
  }

  .v-content__wrap {
    font-family: "Quicksand", sans-serif;
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
  }

  @media screen and (min-width: 1216px) {
    .container {
      max-width: 1150px;
    }
  }

  #instruction .process_row img {
    width: 100px;
  }

  .space70 {
    margin-top: 70px;
  }

  section#banner {
    padding: 40px 0 300px;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #banner img.pc_img {
    max-width: 520px;
    max-height: 350px;
    right: 0;
    width: 95%;
    margin-bottom: -400px;
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
  }

  #banner p {
    line-height: 28px;
    margin-bottom: 0;
  }

  #banner h1 {
    font-size: 24px;
    line-height: 40px;
    margin-top: 0;
  }

  .input-group {
    max-width: 434px;
    margin: 30px auto;
    height: 40px;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
  }

  .input-group .form-control {
    border-color: transparent !important;
    color: #979797;
  }

  .input-group .form-control {
    height: 100%;
  }

  .input-group .form-control:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .input-group .btn-success {
    color: #fff;
    background-color: #fff;
    border-color: #fff;
    width: 50px;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-control:focus {
    border-color: #76c360;
    box-shadow: none;
  }

  .featues_row {
    max-width: 590px;
    margin: 0 auto;
    margin-bottom: 60px;
  }

  .process_row {
    max-width: 100%;
    margin: 0 !important;
    margin-top: 25px;

    .process-box__container {
      width: 275px;
      height: 245px;
      border: 2px dashed #C4C4C4;
      color: #C4C4C4;
      display: flex;
      padding: 20px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 10px;

      &:first-child {
        border-color: #76c360;
        color: #76c360;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
        cursor: pointer;
      }

      span {
        font-size: 20px;
        padding-top: 15px;
      }
    }
  }

  h1,
  h2 {
    color: #78c360;
    font-family: "Noto Sans JP", sans-serif;
    font-size: 28px;
    font-weight: 700;
    line-height: 28px;
    margin-top: 20px;
    margin-bottom: 50px;
  }

  p {
    color: #4a4a4a;
    font-family: "Quicksand", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    margin-top: 20px;
  }

  .btn_search {
    height: 48px;
    width: 280px;
    background: #78c360;
    color: #fff;
    display: block;
    border-radius: 5px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    line-height: 48px;
    border: 1px solid #78c360;
    transition: all 0.3s ease;
    margin-top: 20px;
  }

  .btn_search:hover {
    background: transparent;
    color: #78c360;
  }

  #mission {
    background: #fff;
    padding: 0 0 100px;
  }

  #instruction {
    background: #fff;
    padding: 200px 0 100px;
    text-align: center;
  }

  #instruction h4 {
    margin-top: 20px;
    font-size: 22px;
    font-weight: 300;
    color: #363636;
    font-family: "Segoe UI";
  }

  #instruction h3 {
    color: #78c360;
    font-family: "Noto Sans JP", sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 40px;
    text-transform: uppercase;
    margin: 50px 0 0;
  }

  .input-group input:nth-child(2) {
    width: 30%;
  }

  .video {
    width: 100%;
    height: 100%;
    border: 10px solid #000;
    border-radius: 12px;
  }

  .video iframe {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }

  .mission_text {
    padding-left: 15%;
  }

  #service {
    background: #f7f7f7;
    padding: 80px 0;
  }

  .service_box {
    box-shadow: 0 2px 4px #cbcbcb;
    border-radius: 30px;
    background-color: #ffffff;
    padding: 50px;
    text-align: center;
  }

  .service_box p {
    line-height: 42px;
  }

  .service_box h3 {
    font-size: 30px;
    font-weight: 700;
    color: #6d6e70;
    margin-top: 40px;
  }

  // world greener Section
  .world_greener {
    background: #fff;
    padding-bottom: 30px;

    .container {
      display: flex;
      justify-content: space-between;

      .world_greener-text {
        max-width: 450px;
        flex-shrink: .5;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h2 {
          margin-bottom: 20px;
        }

        p {
          .icons-link {
            color: #78c360;
            font-weight: 500;
          }

          .join-link {
            font-weight: bold;
          }
        }
      }

      .world_greener-img {
        max-width: 550px;

        img {
          width: 100%;
          max-width: 100%;
        }
      }
    }
  }

  .upload-file__link {
    cursor: pointer;
  }

  @media (max-width: 1199px) {
    .service_box {
      padding: 20px;
    }
    .service_box p {
      line-height: 30px;
    }
    p {
      margin-top: 10px;
    }
    .service_box h3 {
      font-size: 24px;
    }
    h1,
    h2 {
      font-size: 28px;
      line-height: 40px;
      margin-top: 20px;
    }
  }

  @media (max-width: 991px) {
    .service_box h3 {
      margin-top: 20px;
    }
    .service_box img {
      width: 90px;
    }
    br {
      display: none;
    }
    #mission {
      padding: 50px 0;
    }
    #instruction img {
      width: 50px;
    }
    #instruction {
      padding: 200px 0 30px;
    }
    .world_greener {
      .container {
        flex-wrap: wrap;
        justify-content: center;

        .world_greener-text {
          flex-shrink: 1;
        }

        .world_greener-img {
          img {
            flex-shrink: .5;
            width: 100%;
            max-width: 600px;
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    .input-group input:nth-child(2) {
      width: 100%;
    }
    #banner p {
      font-size: 14px;
    }
    #instruction .col-sm-4:nth-child(2) {
      margin: 20px 0;
    }
    #instruction h4 {
      margin-top: 10px;
      font-size: 14px;
      margin-bottom: 10px;
    }
    #instruction h3 {
      font-size: 18px;
      margin: 20px 0 0;
    }
    .process_row {
      margin: 20px auto 0;
    }
    #instruction {
      padding: 30px 15px;
    }
    .service_box img {
      width: 50px;
      margin-top: 10px;
    }
    section#banner {
      margin-bottom: 110px;
    }
    .container {
      padding: 0 15px;
    }
    h1,
    h2,
    #banner h1 {
      font-size: 20px;
      line-height: 32px;
      margin-top: 0;
    }
    p {
      font-size: 14px;
      line-height: 24px;
    }
    .btn_search {
      height: 38px;
      width: 230px;
      font-size: 14px;
      line-height: 38px;
    }
    #banner img.pc_img {
      position: relative;
      top: auto;
      max-width: 100%;
      margin-top: 20px;
      left: auto;
    }
    .mission_text {
      padding-left: 0;
      margin-top: 15px;
    }
    #service {
      padding: 40px 0;
    }
    .service_box {
      padding: 10px;
      margin-bottom: 15px;
    }
  }

  .is-dark-text {
    color: #4a4a4a !important;
  }

  .ant-input-search {
    input[type=text].ant-input  {
      border-radius: 60px !important;
      padding-left: 1rem !important;
      padding-right: 2.5rem !important;
    }
    .ant-input-suffix {
      right: 15px !important;
      svg {
        height: 1.1rem;
        width: 1.1rem;
      }
    }
  }
</style>
