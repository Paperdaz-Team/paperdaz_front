<template>
  <div v-if="window.width < 1024">
    <input
      class="customBox"
      id="customBox"
      type="checkbox">
    <label
      @click="save"
      class="mdc-elevation--z2"
      for="customBox">
      <span class="icon">
        <img
          alt="Save button"
          class="fa-spin"
          src="../../assets/img/spinner.png"
          v-if="isLoading.savingData">
        <img
          alt="Save button"
          src="../../assets/img/save.png"
          v-else>
      </span>
    </label>
    <div
      @click="closePdf"
      class="one">
      <img
        alt="Exit button"
        src="../../assets/img/exit.png">
    </div>
    <div
      @click="downloadPdf"
      class="two">
      <img
        alt="Save button"
        class="fa-spin"
        src="../../assets/img/spinner.png"
        v-if="isLoading.downloadingPdf">
      <img
        alt="Download PDF button"
        src="../../assets/img/download.png"
        v-else>
    </div>
    <!-- <div class="two">
      <img src="../../assets/img/share.png" alt="">
    </div> -->
    <div
      @click="view_and_confirm"
      class="three">
      <img
        alt="Save button"
        class="fa-spin"
        src="../../assets/img/spinner.png"
        v-if="isLoading.viewAndConfirm">
      <img
        alt="View and Confirm button"
        src="../../assets/img/check-file.png"
        v-else>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  props: [
    'currentPage',
    'totalPages',
    'isLoading',
  ],
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
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    ...mapGetters('user_mgt', ['user', 'isLoggedIn']),
    ...mapGetters('files', ['file']),
    curent: {
      set(val) {
        let page = val;
        if (val < 1) {
          page = 1;
        }
        if (val > this.totalPages) {
          page = this.totalPages;
        }
        this.$emit('page', page);
      },
      get() {
        return this.currentPage;
      },
    },
  },
  watch: {},
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('files', ['getFile', 'update']),
    ...mapMutations('files', ['confirm']),
    handleResize() {
      this.window.width = window.innerWidth;
    },
    logout() {
      this.logout_user();
      this.$router.push('/');
    },
    view_and_confirm() {
      if (this.isLoading.viewAndConfirm) return;
      this.$emit('viewAndConfirm');
    },
    closePdf() {
      this.$router.back();
    },
    downloadPdf() {
      if (this.isLoading.downloadingPdf) return;
      this.$emit('download');
    },
    openMenu() {
      this.$emit('mini');
    },
    page(dir) {
      if (dir === 1) {
        var page = this.currentPage === this.totalPages ? this.totalPages : this.currentPage + 1;
        this.$emit('page', page);
      }

      if (dir === 0) {
        var page = this.currentPage === 1 ? 1 : this.currentPage - 1;
        this.$emit('page', page);
      }
    },
    save() {
      if (this.isLoading.savingData === false) {
        this.$emit('save');
      }
    },
    goto() {
      console.log(this.currentPage);
    },
    openDrawer() {
      this.$emit('drawer');
    },
    ...mapActions('user_mgt', ['logout_user']),
  },

};
</script>

<style lang="scss" scoped>
  @import "~@material/elevation/mdc-elevation";

  .customBox {
    display: none;
  }

  .hiddeBox {
    display: none;
  }

  .customBox + label {
    cursor: pointer;
    position: fixed;
    left: 2.9em;
    bottom: .75em;
    background-color: hsl(141, 71%, 48%);
    padding: 1em;
    border-radius: 50%;
    z-index: 9999999999;
  }

  .customBox + label > .icon > img {
    width: 32px;
  }

  .one, .two, .three, .four {
    cursor: pointer;
    position: fixed;
    left: 13.5em;
    bottom: 1.8em;
    width: 3.2em;
    height: 3.2em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    opacity: 0;
    z-index: 1;
    transform: rotateZ(90deg);
    font-size: 1em;
    color: #fff;
    transition-property: all;
    transition-duration: .35s;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 980;
  }

  .one:active,
  .two:active,
  .three:active,
  .four:active {
    background-color: #1ca04a !important;
  }

  .one > img, .two > img, .three > img, .four > img {
    width: 24px;
  }

  .customBox:checked ~ .one, .customBox:checked ~ .two, .customBox:checked ~ .three, .customBox:checked ~ .four {
    opacity: 1;
  }

  .customBox:checked ~ .one {
    background-color: hsl(141, 71%, 48%);
    transform: translateX(-5em);
    transition-delay: .2s;
  }

  .customBox:checked ~ .two {
    background-color: hsl(141, 71%, 48%);
    transform: translateX(-6.5em) translateY(-3.5em);
    transition-delay: .1s;
  }

  .customBox:checked ~ .three {
    background-color: hsl(141, 71%, 48%);
    transform: translateX(-10em) translateY(-5em);
  }

  .customBox:checked ~ .four {
    background-color: hsl(141, 71%, 48%);
    transform: translateX(-3.5em) translateY(3.7em);
  }

  .customBox:checked ~ .one:hover, .customBox:checked ~ .two:hover, .customBox:checked ~ .three:hover, .customBox:checked ~ .four:hover {
    opacity: .9;
  }

  @media screen and (min-width: 360px) {
    .customBox + label {
      left: 1.2em;
    }
    .one, .two, .three, .four {
      left: 12em;
    }
  }
</style>
