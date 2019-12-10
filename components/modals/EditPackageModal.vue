<template>
  <section>
    <div
      aria-describedby="my-dialog-content"
      aria-labelledby="my-dialog-title"
      aria-modal="true"
      class="mdc-dialog"
      ref="editPackageModal"
      role="alertdialog">
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface">
          <h2
            class="mdc-dialog__title"
            id="my-dialog-title">
            Editing package
          </h2>
          <div
            class="mdc-dialog__content"
            id="my-dialog-content">
            <div class="my-1 form-group">
              <label class="bmd-label-floating">Package Name</label>
              <input
                @keyup.enter="saveItem"
                class="form-control"
                name="title"
                v-model="packageToEdit.name"
                v-validate="'required'">
            </div>
            <div class="my-1 form-group">
              <label class="bmd-label-floating">Package Price</label>
              <input
                @keyup.enter="saveItem"
                class="form-control"
                name="price"
                v-model="packageToEdit.price"
                v-validate="'required|numeric'">
            </div>

            <label>Selected features</label>
            <ul class="feature-list__container">
              <li
                :key="index"
                v-for="(solution, index) in packageToEdit.solutions">
                <base-checkbox
                  :checked="true"
                  :unchecked="false"
                  v-model="solution.active">
                  {{ solution.label }}
                </base-checkbox>

                <input
                  class="feature-form__input"
                  placeholder="Feature value"
                  type="text"
                  v-model="solution.value">
              </li>
            </ul>
          </div>
          <footer class="mdc-dialog__actions">
            <base-button
              @click="saveChanges"
              class="mdc-button--unelevated is-success mdc-dialog__button">
              Save
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
import { mapState } from 'vuex';
import BaseInput from '@/components/base-components/BaseInput';
import BaseButton from '@/components/base-components/BaseButton';
import BaseCheckbox from '@/components/base-components/BaseCheckbox';

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseCheckbox,
  },
  props: ['open', 'solutions', 'selectedItem'],
  data() {
    return {
      packageToEdit: {
        _id: this.selectedItem._id,
        name: this.selectedItem.name,
        price: this.selectedItem.price,
        solutions: [],
      },
    };
  },
  mounted() {
    this.dialog = new MDCDialog(this.$refs.editPackageModal);
    if (this.dialogVisible) this.dialog.open();
    const vm = this;
    this.dialog.listen('MDCDialog:closing', () => {
      vm.handleClose();
    });
  },
  beforeDestroy() {
    this.dialog.destroy();
  },
  computed: {
    ...mapState({
      allSolutions: state => state.solutions.sub.solutions,
    }),

    dialogVisible() {
      function removeA(arr) {
        let what;
        const a = arguments;
        let L = a.length;
        let ax;
        while (L > 1 && arr.length) {
          what = a[--L];
          while ((ax = arr.indexOf(what))   !==   -1) {
            arr.splice(ax, 1);
          }
        }
        return arr;
      }

      const { allSolutions } = this;
      const uncheckedFeature = [];

      for (let i = 0; i < allSolutions.length; i++) {
        uncheckedFeature.push(allSolutions[i].label);
      }

      for (let i = 0; i < this.selectedItem.solutions.length; i++) {
        if (uncheckedFeature.includes(this.selectedItem.solutions[i].label)) {
          this.packageToEdit.solutions.push({
            _id: this.selectedItem.solutions[i]._id,
            active: this.selectedItem.solutions[i].active,
            label: this.selectedItem.solutions[i].label,
            value: this.selectedItem.solutions[i].value,
          });
          removeA(uncheckedFeature, this.selectedItem.solutions[i].label);
        }
      }
      for (let i = 0; i < allSolutions.length; i++) {
        if (uncheckedFeature.includes(allSolutions[i].label)) {
          this.packageToEdit.solutions.push(allSolutions[i]);
        }
      }
      return this.open;
    },
  },
  methods: {
    logedValue(dat) {
      console.log(dat);
    },
    handleClose() {
      this.$emit('close');
    },
    saveChanges() {
      console.log('my change', this.packageToEdit);
      if (this.packageToEdit.solutions.length > 0) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            const { packageToEdit } = this;
            this.$emit('save', packageToEdit);
          } else {
            this.$message({
              message: 'Check all fields',
              type: 'error',
            });
          }
        });
      } else {
        this.$message({
          message: 'Check all fields',
          type: 'error',
        });
      }
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

    .feature-list__container {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        align-items: center;

        &:not(:last-child) {
          padding-bottom: 10px;
        }

        .feature-form__input {
          border: 1px solid #707070;
          border-radius: 4px;
          padding-top: 4px;
          padding-left: 10px;
          margin-left: 5px;
        }
      }
    }
  }
</style>
