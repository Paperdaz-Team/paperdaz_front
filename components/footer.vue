<template>
  <!-- Footer -->
  <div>
    <footer>
      <b-container>
        <b-row>
          <b-col v-if="window.width >= 1024">
            <a
              class="logo-img-container"
              href="#">
              <img
                :src="require('../assets/img/logo_tree.png')"
                alt
                class="logo_img"
                width="206">
            </a>
          </b-col>
          <b-col
            class="links"
            lg="2"
            md="2"
            sm="4">
            <p class="footer-link-title">
              Links
            </p>
            <p class="footer-link">
              <a @click="goToSearch()">Search business</a>
            </p>
            <p class="footer-link">
              <router-link
                tag="a"
                to="/upload_file">
                Upload your file
              </router-link>
            </p>
          </b-col>

          <b-col
            class="links"
            lg="2"
            md="2"
            sm="4">
            <p class="footer-link faq-link">
              <router-link
                tag="a"
                to="/faq/general">
                FAQ's
              </router-link>
            </p>
            <p class="footer-link">
              <router-link
                tag="a"
                to="/packages_price">
                Packages
              </router-link>
            </p>
          </b-col>

          <b-col
            class="links"
            lg="2"
            md="2"
            sm="4">
            <p class="footer-link contact-link">
              <base-button
                @click="$router.push('/contact')"
                button-class="mdc-button--unelevated is-success get_in_touch">
                Get in touch
              </base-button>
            </p>
          </b-col>

          <b-col
            class="links"
            md="4"
            sm="12">
            <div class="share_mission">
              <span class="share_mission-title">SHARE OUR MISSION</span>
              <ul class="list-inline social_icon">
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-linkedin social-icon-grey" />
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-facebook-square social-icon-grey" />
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-twitter-square social-icon-grey" />
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-youtube social-icon-grey" />
                  </a>
                </li>
                <li class="list-inline-item">
                  <router-link
                    tag="a"
                    to="/community">
                    <img
                      :src="require('@/assets/img/logo_pd.png')"
                      alt=""
                      class="share-logo">
                  </router-link>
                </li>
              </ul>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </footer>
    <div class="copyright">
      <span>
        <i class="far fa-copyright" />
        2019 Paperdaz. All right reserved
      </span>
    </div>
  </div>
  <!-- Footer -->
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '@/components/base-components/BaseButton';

var Tawk_API = Tawk_API || {}; const
  Tawk_LoadStart = new Date();
(function () {
  const s1 = document.createElement('script');
  const s0 = document.getElementsByTagName('script')[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/5c7024e63341d22d9ce5a5b5/default';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
}());

export default {
  scrollToTop: true,
  components: {
    BaseButton,
  },
  data() {
    return {
      window: {
        width: 0,
      },
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  mounted() {
    try {
      $_Tawk.showWidget();
    } catch (ex) {
    }
  },
  computed: {
    ...mapGetters('user_mgt', {
      isLoggedIn: 'isLoggedIn',
    }),
  },
  methods: {
    goToSearch() {
      if (this.$route.name   !==   'index') {
        this.$router.push('/');
      } else {
        window.scrollTo(0, 0);
      }
    },
    showcupon() {
      this.$emit('showcupon');
    },
    handleResize() {
      if (process.browser || process.client) {
        this.window.width = window.innerWidth;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,400,500,700|Quicksand:300,400,500,700");

  footer {
    background: #f7f7f7;
    position: relative;
    margin-top: 25px;
  }

  footer .container {
    padding: 24px 24px 0 24px;
  }

  .row {
    justify-content: center;
  }

  .social-icon-grey {
    color: #8e8d8d;
  }

  .logo-img-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .links {
    padding-bottom: 15px;
  }

  .footer-link,
  .footer-link-title {
    margin: 0;
    text-align: center;
    text-align: left;
  }

  .footer-link a {
    text-decoration: none;
    color: #363636;
  }

  .footer-link a:hover,
  .footer-link-title a:hover {
    color: #78c360;
  }

  .footer-link-title {
    font-size: 1.25rem;
    font-weight: 500;
    cursor: normal;
    color: #78c360;
  }

  .footer-link {
    font-size: 1rem;
    margin-top: .5rem;
  }

  .footer-link .button {
    font-size: 10px;
  }

  .has-font-weight-bold {
    font-weight: bold;
  }

  .form-control {
    border-radius: 0;
    box-shadow: none;
    border: 0;
    border-bottom: 1px solid #4a4a4a;
    background: transparent;
    padding: 5px 0 0;
    font-size: 12px;
  }

  .logo_img {
    position: absolute;
    bottom: 0;
    left: 0;
    max-width: 75px;
  }

  .copyright {
    height: 50px;
    background: #78c360;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .copyright > span {
    color: #fff;
    font-family: "Quicksand", sans-serif;
    font-weight: 400;
    line-height: 50px;
  }

  .contact_add {
    margin-left: -20px;
  }

  .faq-link,
  .contact-link {
    margin-top: 34px;
  }

  .share_mission {
    display: flex !important;
    flex-direction: column;
    padding: 0 20px;
    min-width: 93px;
    font-family: "Segoe UI";
    max-width: 250px;
  }

  .share_mission-title {
    font-size: 18px;
    color: #78c360;
    font-weight: 400;
    border-bottom: 1px solid #3636;
    text-align: center;
    padding-bottom: 5px;
  }

  .share_mission .social_icon {
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
  }

  .share_mission .social_icon a {
    color: #8e8d8d;
    font-size: 26px;
    margin-right: 30px;
  }

  .share_mission .social_icon li {
    width: 25px;
  }

  .share_mission .share-logo {
    max-width: 20px;
    margin-top: -7px;
    margin-left: 3px;
  }

  @media screen and (max-width: 575px) {
    .faq-link,
    .contact-link {
      margin-top: 0;
    }
  }

  @media (max-width: 1199px) {
    .contact_add {
      margin-left: -50px;
    }
  }

  @media (max-width: 991px) {
    ul.list-unstyled:not(:first-child) {
      padding-left: 20px;
    }

    .contact_add {
      margin-left: -100px;
    }

    .logo_img {
      max-width: 150px;
      bottom: -36px;
    }

    footer {
      padding: 50px 0 20px;
    }

    .footer-link,
    .footer-link-title {
      text-align: center;
    }

    .share_mission {
      margin: auto;
      padding-bottom: 10px;
    }
  }

  @media (max-width: 767px) {
    .logo_img {
      max-width: 100px;
    }

    footer {
      padding: 30px 0 10px;
    }

    .contact_add {
      margin-left: 0;
    }

    .copyright {
      line-height: 40px;
      font-size: 12px;
    }
  }
</style>
