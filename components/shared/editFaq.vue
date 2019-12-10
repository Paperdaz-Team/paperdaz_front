<template>
  <el-dialog
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    title="Add an FAQ"
    v-if="dialogVisible"
    width="50%">
    <div class="container">
      <div class="form-group">
        <label class="bmd-label-floating">Question.</label>
        <textarea
          class="form-control"
          name="question"
          rows="1"
          v-model="faq.question"
          v-validate="'required'" />
      </div>
      <div class="form-group">
        <label class="bmd-label-floating">Category of Question.</label>
        <select
          class="form-control"
          name="category"
          v-model="faq.category"
          v-validate="'required'">
          <option value="0">
            General
          </option>
          <option value="1">
            Business
          </option>
          <option value="2">
            Users
          </option>
          <option value="3">
            Billing
          </option>
        </select>
      </div>
      <div class="form-group">
        <label class="bmd-label-floating">Answer to question.</label>
        <textarea
          class="form-control"
          name="answer"
          rows="2"
          v-model="faq.answer"
          v-validate="'required'" />
      </div>
    </div>
    <span
      class="dialog-footer"
      slot="footer">
      <el-button
        @click="handleClose"
        class="btn btn-primary">Cancel</el-button>
      <el-button
        @click="saveItem"
        class="btn btn-success">Save Item</el-button>
    </span>
  </el-dialog>
</template>


<script type="text/javascript">

export default {
  props: ['open', 'item'],
  data() {
    return {
      faq: {},
    };
  },
  computed: {
    dialogVisible() {
      return this.open;
    },
  },
  mounted() {
    const localObj = JSON.parse(JSON.stringify(this.item));
    this.faq = localObj;
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    saveItem() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('save', this.faq);
        } else {
          this.$message({
            message: 'All fields are required',
            type: 'error',
          });
        }
      });
    },
  },
};
</script>

<style scoped type="text/css">
  .login-btn {
    background: #fff;
    border: 1px solid #53A63E;
    color: #53A63E !important;
  }
</style>
