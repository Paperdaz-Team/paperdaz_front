<template>
  <section>
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
            Solution list
          </h2>
          <div
            class="mdc-dialog__content"
            id="my-dialog-content">
            <ul>
              <li
                :key="index"
                v-for="(solution, index) in solutions">
                {{ solution.label }}:
                <span
                  class="dialog__content__feature-status-success"
                  v-if="solution.active">
                  <i class="fas fa-check" />
                </span>
                <span
                  class="dialog__content__feature-status-danger"
                  v-else>
                  <i class="fas fa-times" />
                </span>
                <span
                  class="dialog__content__feature-value"
                  v-if="solution.value">
                  {{ solution.value }}
                </span>
              </li>
            </ul>
          </div>
          <footer class="mdc-dialog__actions">
            <base-button
              @click="handleClose"
              class="mdc-button--unelevated is-danger mdc-dialog__button">
              Close
            </base-button>
          </footer>
        </div>
      </div>
      <div class="mdc-dialog__scrim" />
    </div>
  </section>
</template>


<script>
import { MDCDialog } from '@material/dialog';
import BaseInput from '@/components/base-components/BaseInput';
import BaseButton from '@/components/base-components/BaseButton';

export default {
  components: {
    BaseInput,
    BaseButton,
  },
  props: ['open', 'solutions'],
  data() {
    return {
      newSolution: {
        title: '',
      },
    };
  },
  computed: {
    dialogVisible() {
      return this.open;
    },
  },
  mounted() {
    this.dialog = new MDCDialog(this.$refs.logRegModal);
    if (this.dialogVisible) this.dialog.open();
    const vm = this;
    this.dialog.listen('MDCDialog:closing', () => {
      vm.handleClose();
    });
  },
  beforeDestroy() {
    this.dialog.destroy();
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    saveItem() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('save', this.newSolution);
        } else {
          this.$message({
            message: 'Title field is required',
            type: 'error',
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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

      .mdc-dialog__content {
        .dialog__content__feature-status-success {
          color: #76c45f !important;
        }

        .dialog__content__feature-status-danger {
          color: #ff3860 !important;
        }

        .form-group {
          .input-container {
            .input::placeholder,
            .input-container::-moz-placeholder {
              vertical-align: middle !important;
              align-items: center !important;
              color: red !important;
            }
          }
        }
      }


      .mdc-dialog__actions {
        padding: 15px 24px 20px 24px;
        justify-content: center;
      }
    }
  }
</style>
