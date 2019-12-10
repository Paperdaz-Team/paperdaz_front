<template>
  <section>
    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      title="New Coupon"
      width="50%">
      <div class="container">
        <div class="my-1 form-group">
          <label class="bmd-label-floating">Coupon Title</label>
          <input
            class="form-control"
            name="title"
            v-model="couponNew.title"
            v-validate="'required'"></input>
          <p
            class="text-right text-danger"
            v-if="errors.has('title')">
            {{ errors.first('title') }}
          </p>
        </div>

        <div class="my-1 form-group">
          <label class="bmd-label-floating">Coupon Code <a
            @click.prevent="randomCode"
            href="#">Generate Random Code</a></label>
          <input
            class="form-control"
            name="code"
            v-model="couponNew.code"
            v-validate="'required'">

          </input>
          <p
            class="text-right text-danger"
            v-if="errors.has('code')">
            {{ errors.first('code') }}
          </p>
        </div>

        <div class="my-1 form-group">
          <label class="bmd-label-floating">Subscription Fee</label>
          <input
            class="form-control"
            name="subscription_fee"
            v-model="couponNew.subscription_fee"
            v-validate="'required'"></input>
          <p
            class="text-right text-danger"
            v-if="errors.has('subscription_fee')">
            {{ errors.first('subscription_fee')
            }}
          </p>
        </div>

        <div class="my-1 form-group">
          <label class="bmd-label-floating">Subscription Type</label>
          <select
            class="form-control"
            name="subscription_type"
            style="width: 100%;"
            v-model="couponNew.subscription_type"
            v-validate="'required'">
            <option value="monthly">
              Monthly
            </option>
            <option value="yearly">
              Yearly
            </option>
          </select>
          <p
            class="text-right text-danger"
            v-if="errors.has('subscription_type')">
            {{ errors.first('subscription_type')
            }}
          </p>
        </div>

        <div class="my-1 form-group">
          <label class="bmd-label-floating">Coupon Description</label>
          <textarea
            class="form-control"
            name="description"
            rows="2"
            v-model="couponNew.description"
            v-validate="'required'" />
          <p
            class="text-right text-danger"
            v-if="errors.has('description')">
            {{ errors.first('description') }}
          </p>
        </div>
      </div>
      <span
        class="dialog-footer"
        slot="footer">
        <el-button
          @click="handleClose"
          class="btn btn-primary">Cancel</el-button>
        <el-button
          @click="saveItem()"
          class="btn btn-success">Save</el-button>
      </span>
    </el-dialog>
  </section>
</template>


<script type="text/javascript">

export default {
  props: ['open'],
  data() {
    return {
      couponNew: {
        code: '',
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

  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    randomCode() {
      this.couponNew.code = Math.random().toString(36).substr(2, 11).toUpperCase();
    },
    saveItem() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('save', this.couponNew);
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
<style lang="scss" scoped type="text/css">
  @import "~/assets/css/material-dashboard.css";
</style>
