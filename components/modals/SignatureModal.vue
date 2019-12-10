<template>
  <div
    class="signature-modal-container"
    v-show="signaModal">
    <div class="news-feed-form">
      <!-- Nav tabs -->
      <div
        class="tabs is-boxed is-medium"
        style="margin-bottom: 0;">
        <ul>
          <li>
            <a style="user-select: none; cursor: initial;">
              <span class="icon is-small"><i class="fas fa-signature" /></span>
              <span>Draw your signature</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- Tab content -->
      <div class="tab-content">
        <div
          aria-expanded="true"
          class="tab-pane active"
          id="home-1"
          role="tabpanel">
          <div class="sig-items-container">
            <div class="field field-signature">
              <div
                class="control mdc-elevation--z1"
                id="sig-pad-container">
                <canvas
                  height="176"
                  id="sig-canvas"
                  width="656" />
              </div>
            </div>
            <div class="options-buttons">
              <div class="buttons">
                <base-button
                  @click="closeModal"
                  class="mdc-button--outlined is-outlined-danger">
                  Close
                </base-button>
                <base-button
                  @click="rmSignatue"
                  class="mdc-button--outlined is-outlined-dark">
                  Clear
                </base-button>
              </div>
              <base-button
                @click="saveSignatue"
                class="mdc-button--unelevated is-success">
                Save
              </base-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '../base-components/BaseButton';

export default {
  name: 'SignatureModal',
  components: {
    BaseButton,
  },
  props: [
    'signaModal',
  ],
  methods: {
    closeModal() {
      this.$emit('closeSigModal');
    },
    rmSignatue() {
      this.$emit('rmSignatue');
    },
    saveSignatue() {
      this.$emit('saveSignatue');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@material/elevation/mdc-elevation";

  .signature-modal-container {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 150px;
    background-color: rgba(35, 35, 35, .5);
  }

  #sig-canvas {
    position: relative;
    z-index: 1;
  }

  .news-feed-form {
    font-family: 'Oxygen', sans-serif;
    background: #fff;
    overflow: hidden;
    width: 70%;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  }

  .tabs {
    align-items: stretch;
    display: flex;
    font-size: 1rem;
    justify-content: space-between;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
  }

  .tabs ul {
    border-bottom: 2px solid #f5f5f5;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    list-style: none;
    padding: 0;
    margin-bottom: 10px;
  }

  .tabs a {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #4a4a4a;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-bottom: -1px;
    padding: 15px 20px;
    vertical-align: top;
  }

  .tabs .is-boxed a {
    border: 1px solid transparent;
    border-radius: 4px 4px 0 0;
  }

  .tabs .icon:first-child {
    margin-right: 0.5em
  }

  .icon {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    height: 1.5rem;
    width: 1.5rem;
  }

  .icon .is-small {
    height: 1rem;
    width: 1rem;
  }

  .news-feed-form .form-group.with-icon::after {
    display: none;
  }

  .news-feed-form .nav-tabs {
    background-color: #fafbfd;
    border-bottom: none;
  }

  .news-feed-form .nav-tabs .nav-link {
    padding: 20px;
    border: none;
    border-bottom: 1px solid #e6ecf5;
    border-right: 1px solid #e6ecf5;
    fill: #888da8;
    color: #888da8;
  }

  .news-feed-form .nav-tabs .nav-link.active {
    background-color: #fff;
    fill: #ff5e3a;
    color: #515365;
    border-bottom: transparent;
  }

  .news-feed-form .nav-tabs .nav-link svg {
    margin-right: 10px;
    width: 18px;
  }

  .news-feed-form .sig-items-container {
    position: relative;
  }

  .news-feed-form .options-buttons {
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .buttons {
    margin-bottom: 0 !important;
  }

  .field-signature {
    margin-bottom: 0;
    height: 200px;
    padding: 10px 20px;
  }

  .field-signature .control {
    position: relative;
    border-radius: 4px;
    height: 100%;
    // border: 1px solid #23d160;
    background: #f5f5f5;
  }

  /* .field-signature .control:before {
    content: "";
    position: absolute;
    left: 60px;
    top: 30px;
    height: 120px;
    width: 2px;
    background: #23d160;
    z-index: 0;
  }
  .field-signature .control:after {
    content: "";
    position: absolute;
    right: 0;
    top: 100px;
    height: 3px;
    width: 100%;
    background: #23d160;
    z-index: 0;
  } */
  .field-signature .control .sig-pad {
    padding: 25px 18px !important;
    display: block;
    border-radius: 0;
    border-left: none;
    border-right: none;
    min-height: 50px !important;
  }

  @media screen and (max-width: 767px) {
    .news-feed-form {
      width: 350px;
    }
    .button {
      height: 26px;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 0.6rem;
    }
  }

  @media screen and (min-width: 768px) {
    .news-feed-form {
      width: 700px;
    }
  }
</style>
