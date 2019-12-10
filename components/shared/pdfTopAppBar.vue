<template>
  <div
    :class="{'top-bar-mobile': window.width < 768, 'top-bar-tablet': window.width >= 760}"
    class="top-bar">
    <div class="top-bar-container">
      <div class="start-nav">
        <a
          :class="{'active-tool': elementType === 6}"
          @click="selectTool(6)"
          class="top-bar-item">
          <span class="icon has-text-success">
            <img
              alt="Text button"
              src="../../assets/img/text.png">
          </span>
          <span class="text">
            Text
          </span>
        </a>
        <a
          :class="{'active-tool': elementType === 1}"
          @click="selectTool(1)"
          class="top-bar-item">
          <span class="icon has-text-success">
            <img
              alt="Check button"
              src="../../assets/img/check.png">
          </span>
          <span class="text">
            Check
          </span>
        </a>
        <a
          :class="{'active-tool': elementType === 2}"
          @click="selectTool(2)"
          class="top-bar-item">
          <span class="icon has-text-success">
            <img
              alt="Mark button"
              src="../../assets/img/mark.png">
          </span>
          <span class="text">
            Mark
          </span>
        </a>
        <a
          :class="{'active-tool': elementType === 3}"
          @click="selectTool(3)"
          class="top-bar-item">
          <span class="icon has-text-success">
            <img
              alt="Dot button"
              src="../../assets/img/dot.png">
          </span>
          <span class="text">
            Dot
          </span>
        </a>
        <a
          :class="{'active-tool': elementType === 10}"
          @click="selectTool(10)"
          class="top-bar-item">
          <span class="icon has-text-success">
            <img
              alt="Circle button"
              src="../../assets/img/circle.png">
          </span>
          <span class="text">
            Circle
          </span>
        </a>
        <a
          :class="{'active-tool': elementType === 12}"
          @click="selectTool(12)"
          class="top-bar-item">
          <span class="icon has-text-success">
            <img
              alt="Line button"
              src="../../assets/img/line.png">
          </span>
          <span class="text">
            Line
          </span>
        </a>
        <a
          :class="{'active-tool': elementType === 14}"
          @click="selectTool(14)"
          class="top-bar-item">
          <span class="icon has-text-success">
            <img
              alt="Highlight button"
              src="../../assets/icons/highlight.png">
          </span>
          <span class="text">
            Highlight
          </span>
        </a>
        <a
          :class="{'active-tool': elementType === 15}"
          @click="selectTool(15)"
          class="top-bar-item">
          <span class="icon has-text-success">
            <img
              alt="Free Draw"
              src="../../assets/img/free_draw.png">
          </span>
          <span class="text">
            Free Draw
          </span>
        </a>
        <!-- <a class="top-bar-item" @click="selectTool(16)" :class="{'active-tool': elementType === 16}">
          <span class="icon has-text-success">
            <img src="../../assets/img/eraser.png" alt="Eraser">
          </span>
          <span class="text">
            Eraser
          </span>
        </a> -->
        <a
          :class="{'active-tool': elementType === 5}"
          @click="selectTool(5)"
          class="top-bar-item">
          <span class="icon has-text-success">
            <img
              alt="Date button"
              src="../../assets/img/calendar.png">
          </span>
          <span class="text">
            Date
          </span>
        </a>
        <a
          :class="{'active-tool': elementType === 7}"
          @click="selectTool(7)"
          class="top-bar-item">
          <span class="icon has-text-success">
            <img
              alt="Name button"
              src="../../assets/img/name.png">
          </span>
          <span class="text">
            Name
          </span>
        </a>
        <a
          :class="{'active-tool': elementType === 8}"
          class="top-bar-item">
          <span
            @click="openSigModal()"
            class="icon has-text-success"
            v-if="!sigSvg">
            <img
              alt="Signature button"
              src="../../assets/img/signature.png">
          </span>
          <img
            :src="sigSvg"
            @click="selectTool(8)"
            class="sig-img"
            height="27"
            v-if="sigSvg"
            width="55">
          <span
            @click="openSigModal()"
            class="sig-edit"
            v-if="sigSvg   !==   ''">Edit</span>
        </a>
        <a
          :class="{'active-tool': elementType === 9}"
          @click="selectTool(9)"
          class="top-bar-item">
          <span class="icon has-text-success">
            <img
              alt="Name initials button"
              src="../../assets/img/initial.png">
          </span>
          <span class="text">
            Initial
          </span>
        </a>
      </div>
      <div
        :class="{'end-nav-none': window.width < 768}"
        class="end-nav">
        <a
          @click="page(0)"
          class="top-bar-item"
          id="prev-page">
          <span class="icon has-text-success">
            <img
              alt="Previous page button"
              src="../../assets/img/arrow_up.png">
          </span>
        </a>
        <a
          @click="page(1)"
          class="top-bar-item"
          id="next-page">
          <span class="icon has-text-success">
            <img
              alt="Next page button"
              src="../../assets/img/arrow_down.png">
          </span>
        </a>
        <div
          class="top-bar-item"
          id="pdf-pages-count">
          <span
            class="pdf-page"
            id="page-num">{{ currentPage }}</span>
          <span class="separator">/</span>
          <span
            class="pdf-page-count"
            id="page-count">{{ totalPages }}</span>
        </div>
      </div>
      <div class="float-right-menu">
        <a
          @click="toggleIsDone"
          class="top-bar-item done-button"
          v-if="!isDone">
          Done
        </a>
        <a
          @click="closePdf"
          class="top-bar-item close-pdf-button"
          v-if="isLoggedIn && isDone">
          <span class="icon has-text-success">
            <img
              alt="Exit button"
              src="../../assets/img/exit.png">
          </span>
        </a>
        <a
          @click="view_and_confirm"
          class="top-bar-item send-pdf-button"
          v-if="isLoggedIn && isDone">
          <span class="icon has-text-success">
            <img
              alt="Save button"
              class="fa-spin"
              src="../../assets/img/spinner.png"
              v-if="isLoading.viewAndConfirm">
            <span
              class="icon"
              v-else>
              <i class="fas fa-paper-plane" />
            </span>
          </span>
        </a>
        <a
          @click="downloadPdf"
          class="top-bar-item download-pdf-button"
          v-if="isLoggedIn && isDone">
          <span class="icon has-text-success">
            <img
              alt="Save button"
              class="fa-spin"
              src="../../assets/img/spinner.png"
              v-if="isLoading.downloadingPdf">
            <span
              class="icon"
              v-else>
              <i class="fas fa-download" />
            </span>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  props: [
    'sigSvg',
    'signa',
    'signaModal',
    'currentPage',
    'totalPages',
    'isLoading',
    'elementType',
  ],
  data() {
    return {
      window: {
        width: 0,
      },
      isDone: false,
    };
  },
  created() {
    console.log(this.visibleEraser);
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
  },
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('files', ['getFile', 'update']),
    ...mapMutations('files', ['confirm']),
    handleResize() {
      this.window.width = window.innerWidth;
    },
    selectTool(toolId) {
      if (toolId === this.elementType) {
        this.$emit('selectTool', 0);
      } else {
        this.$emit('selectTool', toolId);
      }
    },
    openSigModal() {
      this.$emit('openSigModal');
    },
    closeSigModal() {
      this.$emit('closeSigModal');
    },
    rmSignatue() {
      this.$emit('rmSignatue');
    },
    saveSignatue() {
      this.$emit('saveSignatue');
      console.log(this.sigSvg);
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
    view_and_confirm() {
      if (this.isLoading.viewAndConfirm) return;
      this.$emit('viewAndConfirm');
    },
    closePdf() {
      console.log(this.$router);
      this.$router.back();
    },
    downloadPdf() {
      if (this.isLoading.downloadingPdf) return;
      this.$emit('download');
    },
    save() {
      if (this.isLoading.savingData) return;
      this.$emit('save');
    },
    toggleIsDone() {
      if (!this.isLoggedIn) {
        this.$emit('toggleLogRegModal', true);
      } else {
        this.isDone = !this.isDone;
      }
    },
  },
};
</script>

<style scoped>
  .sig-modal {
    display: block;
    position: absolute;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 4px;
    padding: 10px 16px;
    left: 25%;
    top: 90px;
  }

  #sig-canvas {
    width: 100%;
    border-radius: 4px;
    background-color: #eee;
    margin-bottom: 8px;
  }

  .sig-img {
    border: 1px solid;
    border-radius: 4px;
    display: inline-block;
  }

  .sig-edit {
    display: inline-block;
    font-size: 15.0
  }

  .signature-buttons {
    display: flex;
    justify-content: space-between;
  }

  .del-sig {
    padding: 4px 8px;
    border-radius: 4px;
    background-color: hsl(348, 100%, 61%);
    color: #fff;
    font-weight: 800;
    margin-right: 5px;
    display: inline-block;
  }

  .clear-sig {
    padding: 4px 12px;
    background-color: hsl(0, 0%, 96%);
    border-radius: 4px;
    display: inline-block;
  }

  .save-sig {
    display: inline-block;
    float: right;
    width: 32px;
  }

  .top-bar {
    background-color: #fff;
    color: #6e6f70;
    font-size: 1rem;
    font-weight: 400;
    font-family: 'PT Sans', sans-serif;
    max-width: 100vw;
    margin-bottom: 15px;
    position: relative;
    z-index: 10;
  }

  .top-bar-mobile {
    padding: 10px 24px;
    min-height: 52px !important;
  }

  .top-bar-mobile > .top-bar-container > .start-nav {
    border-right: none !important;
  }

  .top-bar-tablet {
    padding: 16px 32px;
    min-height: 55px !important;
  }

  .top-bar > .top-bar-container {
    align-items: stretch;
    display: flex;
    min-height: 3.25rem;
    width: 100%;
    justify-content: center;
  }

  .start-nav {
    border-right: 1px solid #e7e7e6;
    display: flex;
    justify-content: flex-start;
    /* margin-right: auto; */
  }

  .start-nav::-webkit-scrollbar {
    display: none;
  }

  .end-nav {
    border-right: 1px solid #e7e7e6;
    display: flex;
    justify-content: flex-start;
    margin-left: 10px;
  }

  .top-bar-item {
    align-items: center;
    border-radius: 4px;
    color: #4a4a4a;
    cursor: pointer;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-direction: column;
    /* min-height: 100%; */
    justify-content: center;
    line-height: 1.5;
    padding: .5rem .75rem;
    position: relative;
    margin-right: 10px;
    user-select: none;
  }

  .top-bar-item > .icon {
    align-items: center;
    display: flex;
    justify-content: center;
    max-width: 2rem;
    max-height: 2rem;
  }

  .top-bar-item > .text {
    color: #6e6f70;
    font-size: .9rem;
    font-weight: 400;
  }

  .top-bar-item#pdf-pages-count {
    color: #6e6f70;
    flex-direction: row;
    font-weight: bold;
    font-size: 1.5rem;
    user-select: none;
  }

  .top-bar-item#pdf-pages-count > .separator {
    margin: 0 5px;
  }

  .top-bar-item > .icon {
    height: 1.5rem;
  }

  .top-bar-item > .icon > img {
    max-height: 1.5rem;
  }

  .end-nav > .top-bar-item > .icon > img {
    min-width: 100%;
    min-height: 100%;
    max-height: 2rem;
    max-width: 2rem;
  }

  .end-nav > .top-bar-item {
    margin-right: 0;
    transition: all .3s;
  }

  .end-nav > .top-bar-item:nth-last-child(1) {
    margin-right: 10px;
  }

  .float-right-menu {
    position: absolute;
    right: 0;
    top: -14.7px;
    width: 87px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .float-right-menu > .top-bar-item {
    background-color: #23d160;
    border-bottom: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 0;
    margin: 0;
    min-width: 100%;
    height: 87px;
    padding: 0;
    cursor: pointer;
  }


  .float-right-menu > .top-bar-item:nth-last-child(1) {
    border-bottom: none;
    border-radius: 0 0 4px 4px;
  }

  .float-right-menu > .top-bar-item:active {
    background-color: #1fb653;
  }

  .active-tool {
    background-color: #06f85b8e;
  }

  .top-bar-container {
    margin: 0 auto;
    position: relative;
    max-width: 960px;
  }

  .done-button {
    color: #fff !important;
    font-weight: 600;
  }

  .icon {
    font-size: 21px;
    color: #fff;
  }

  /* Top app bar Media Queries */
  @media screen and (min-width: 360px) {
    .top-bar-item {
      padding: 4px 6px;
    }

    .top-bar-item > .icon > img {
      max-height: 24px;
    }

    .top-bar-item#pdf-pages-count {
      font-size: 1rem;
    }

    .top-bar-item#pdf-pages-count > .separator {
      margin: 0 5px;
    }

    .top-bar-item > .text {
      display: none;
    }

    .start-nav {
      overflow-x: scroll;
    }

    .end-nav {
      border-right: none;
    }

    .end-nav > .top-bar-item > .icon > img {
      min-width: 100%;
      min-height: 100%;
      max-height: 24px;
      max-width: 24px;
    }

    .end-nav > .top-bar-item:nth-last-child(1) {
      margin-right: 0;
    }

    .float-right-menu {
      display: none;
    }

    .canvas-container {
      height: 80%;
    }
  }

  @media screen and (min-width: 1024px) {
    .top-bar-item:hover {
      background-color: #06f85b8e;
    }
  }

  @media screen and (min-width: 1024px) {
    .top-bar-item {
      padding: .5rem .75rem;
    }

    .top-bar-item > .icon > img {
      max-height: 1.5rem;
    }

    .top-bar-item#pdf-pages-count {
      font-size: 1.5rem;
    }

    .top-bar-item > .text {
      display: none;
    }

    .top-bar-item {
      margin-right: 10px;
    }

    .start-nav {
      overflow-x: initial;
    }

    .end-nav {
      border-right: 1px solid #e7e7e6;
    }

    .end-nav > .top-bar-item > .icon > img {
      min-width: 100%;
      min-height: 100%;
      max-height: 2rem;
      max-width: 2rem;
    }

    .end-nav > .top-bar-item:nth-last-child(1) {
      margin-right: 10px;
    }

    .float-right-menu {
      display: flex;
    }

    .canvas-container {
      height: initial;
    }
  }

  @media screen and (min-width: 1024px) {
    .float-right-menu {
      right: -31px;
    }
  }

  @media screen and (min-width: 1088px) {
    .top-bar-item {
      margin-right: 10px;
    }

    .top-bar-item > .text {
      display: none;
    }

    .start-nav {
      overflow-x: initial;
    }

    .float-right-menu {
      right: -60px;
    }
  }

  @media screen and (min-width: 1280px) {
    .top-bar-item > .text {
      display: block;
    }

    .float-right-menu {
      right: -160px;
    }
  }

  @media screen and (min-width: 1325px) {
    .float-right-menu {
      right: -180px;
    }
  }

  .btn {
    background: coral;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0.7rem 2rem;
  }

  .btn:hover {
    opacity: 0.9;
  }

  .page-info {
    margin-left: 1rem;
  }

  .end-nav-none {
    display: none !important;
  }
</style>
