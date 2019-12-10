<template>
  <section>
    <div
      aria-describedby="my-dialog-content"
      aria-labelledby="my-dialog-title"
      aria-modal="true"
      class="mdc-dialog"
      ref="editSolution"
      role="alertdialog">
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface">
          <h2
            class="mdc-dialog__title"
            id="my-dialog-title">
            Editing the selected feature
          </h2>
          <div
            class="mdc-dialog__content"
            id="my-dialog-content">
            <div class="my-1 form-group">
              <label class="bmd-label-floating">Feature Title</label>
              <input
                @keyup.enter="saveChanges"
                class="form-control"
                name="title"
                v-model="item.label"
                v-validate="'required'">
            </div>
          </div>
          <footer class="mdc-dialog__actions">
            <base-button
              @click="saveChanges"
              class="mdc-button--unelevated is-success mdc-dialog__button">
              Save Changes
            </base-button>
            <base-button
              @click="handleClose"
              class="mdc-button--unelevated is-danger mdc-dialog__button">
              Cancel
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
  props: ['open', 'selectedItem'],
  data() {
    return {
      item: null,
    };
  },
  computed: {
    dialogVisible() {
      return this.open;
    },
  },
  beforeMount() {
    const item = {
      id: this.selectedItem._id,
      label: this.selectedItem.label,
    };
    this.item = item;
  },
  mounted() {
    this.dialog = new MDCDialog(this.$refs.editSolution);
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
    saveChanges() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('save', this.item);
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
  @import "~@material/dialog/mdc-dialog";
  @import url("https://fonts.googleapis.com/css?family=Roboto:300, 400, 500");

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
