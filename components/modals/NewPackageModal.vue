<template>
  <section>
    <div
      aria-describedby="my-dialog-content"
      aria-labelledby="my-dialog-title"
      aria-modal="true"
      class="mdc-dialog"
      ref="packageModal"
      role="alertdialog">
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface">
          <h2
            class="mdc-dialog__title"
            id="my-dialog-title">
            Adding a new package
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
                v-model="newPackage.name"
                v-validate="'required'">
            </div>
            <div class="my-1 form-group">
              <label class="bmd-label-floating">Package Price</label>
              <input
                @keyup.enter="saveItem"
                class="form-control"
                name="price"
                v-model="newPackage.price"
                v-validate="'required|numeric'">
            </div>
            <label>Pick the features</label>
            <ul class="feature-list__container">
              <li
                :key="index"
                v-for="(solution, index) in listOfSolutions">
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
              @click="saveItem"
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
import BaseInput from '@/components/base-components/BaseInput';
import BaseButton from '@/components/base-components/BaseButton';
import BaseCheckbox from '@/components/base-components/BaseCheckbox';

export default {
  components: {
    BaseInput,
    BaseButton,
    BaseCheckbox,
  },
  props: ['open', 'solutions'],
  data() {
    return {
      newPackage: {
        name: '',
        price: null,
      },
    };
  },
  computed: {
    dialogVisible() {
      console.log('this', this);
      return this.open;
    },
    listOfSolutions() {
      return this.solutions.map(solution => ({
        _id: solution._id,
        label: solution.label,
        active: false,
        value: null,
      }));
    },
  },
  mounted() {
    this.dialog = new MDCDialog(this.$refs.packageModal);
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
      if (this.listOfSolutions.length > 0) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            const checkSolutions = [];
            for (let i = 0; i < this.listOfSolutions.length; i++) {
              if (this.listOfSolutions[i].active === true) {
                checkSolutions.push(this.listOfSolutions[i]);
              }
            }
            console.log('check solu', checkSolutions);
            const newPackage = {
              name: this.newPackage.name,
              price: parseInt(this.newPackage.price),
              solutions: checkSolutions,
            };
            console.log('new pack', newPackage);
            this.$emit('save', newPackage);
          } else {
            console.log('Check all fields');
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

    .solution-list__container {
      list-style: none;
      padding: 0;

      .custom-checkbox {
        padding: 0;
      }

      .label-checkbox {
        padding-left: 20px;
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
