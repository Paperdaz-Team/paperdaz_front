<template>
  <div class="modal-confirm-send">
    <div class="overlay" />
    <div
      :class="{'is-show': showConfirmSendModal}"
      class="modal-wrapper">
      <h2>
        Check your email for a copy of completed file
      </h2>
      <div class="buttons-container">
        <base-button
          @click="goBack()"
          class="mdc-button--raised is-success">
          Ok
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/base-components/BaseButton';
import BaseIconButton from '@/components/base-components/BaseIconButton';

export default {
  name: 'ConfirmSendModal',
  components: {
    BaseButton,
    BaseIconButton,
  },
  props: {
    showConfirmSendModal: {
      default: false,
      type: Boolean,
    },
    userRole: {
      default: 3,
      type: Number,
    },
  },
  beforeDestroy() {
    this.closeConfirmSendModal();
  },
  methods: {
    closeConfirmSendModal() {
      this.$emit('closeConfirmSendModal', false);
    },
    goBack() {
      if (this.userRole === 3) {
        this.$router.push('/users/dashboard');
      } else {
        this.$router.push('/business-users/dashboard');
      }
    },
  },
};
</script>

<style lang="scss">
  .modal-confirm-send {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .overlay {
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, .2);
      position: fixed;
    }

    .modal-wrapper {
      position: relative;
      padding: 20px;
      margin-top: 150px;
      width: 80%;
      max-width: 500px;
      height: 200px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #fff;
      border-radius: 4px;

      -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
      box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);

      -webkit-transition: opacity .5s ease;
      -moz-transition: opacity .5s ease;
      -ms-transition: opacity .5s ease;
      -o-transition: opacity .5s ease;
      transition: opacity .5s ease;

      h2 {
        font-size: 20px;
        color: #363636;
        padding-bottom: 20px;
      }

      .buttons-container {
        .button {
          width: 100%;
          max-width: 310px !important;
        }
      }
    }

    .is-show {
      opacity: 1 !important;
    }
  }
</style>
