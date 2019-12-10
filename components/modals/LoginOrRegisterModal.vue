<template>
  <div
    aria-describedby="my-dialog-content"
    aria-labelledby="my-dialog-title"
    aria-modal="true"
    class="mdc-dialog"
    ref="logRegModal"
    role="alertdialog">
    <div class="mdc-dialog__container">
      <div class="mdc-dialog__surface">
        <h2
          class="mdc-dialog__title"
          id="my-dialog-title">
          <span v-if="notFreeTool">
            Please register or log in to use
            <span style="color: #23d160;">{{ notFreeTool }}</span> tool
          </span>
          <span v-else>Please register or log in first to continue</span>
        </h2>
        <footer class="mdc-dialog__actions">
          <base-button
            @click="goTo('/login')"
            class="mdc-button--outlined is-outlined-success mdc-dialog__button">
            Login
          </base-button>
          <base-button
            @click="goTo('/register')"
            class="mdc-button--unelevated is-success mdc-dialog__button">
            Register
          </base-button>
        </footer>
      </div>
    </div>
    <div class="mdc-dialog__scrim" />
  </div>
</template>

<script>
import { MDCDialog } from '@material/dialog';
import { mapMutations } from 'vuex';
import BaseButton from '@/components/base-components/BaseButton';
import BaseIconButton from '@/components/base-components/BaseIconButton';

export default {
  name: 'LogOrRegisterModal',
  components: {
    BaseButton,
    BaseIconButton,
  },
  props: {
    showLogRegModal: {
      default: false,
      type: Boolean,
    },
    notFreeTool: {
      default: '',
      type: String,
    },
  },
  mounted() {
    this.dialog = new MDCDialog(this.$refs.logRegModal);
    if (this.showLogRegModal) this.dialog.open();
    const vm = this;
    this.dialog.listen('MDCDialog:closing', () => {
      vm.closeLogRegModal();
    });
  },
  beforeDestroy() {
    this.dialog.destroy();
  },
  methods: {
    ...mapMutations('pdfFile', ['setRedirectedFromPdfToolPage']),
    closeLogRegModal() {
      this.$emit('closeLogRegModal');
    },
    goTo(route) {
      this.setRedirectedFromPdfToolPage(true);
      this.$router.push(route);
    },
  },
};
</script>

<style lang="scss">
  @import "@material/dialog/mdc-dialog";
  @import url('https://fonts.googleapis.com/css?family=Roboto:300, 400, 500');

  .mdc-dialog__container {
    width: 80%;
    max-width: 500px;

    .mdc-dialog__surface {
      width: 100%;

      .mdc-dialog__title {
        text-align: center;
        font-size: 20px;
      }

      .mdc-dialog__actions {
        padding: 15px 24px 20px 24px;
        justify-content: center;
      }
    }
  }
</style>
