<template>
  <section>
    <el-dialog
      :before-close="handleClose"
      :visible.sync="open"
      style="margin-top: -100px"
      title="Edit this Coupon"
      width="50%">
      <div class="container">
        <div class="my-1 form-group">
          <label class="bmd-label-floating">Coupon Title</label>
          <input
            class="form-control"
            name="title"
            placeholder="Enter Coupon Title"
            v-model="couponNew.title"
            v-validate="'required'"></input>
          <p
            class="text-right text-danger"
            v-if="errors.has('title')">
            {{ errors.first('title') }}
          </p>
        </div>

        <div class="my-1 form-group">
          <label class="bmd-label-floating">Coupon Code</label>
          <input
            class="form-control"
            disabled
            name="code"
            placeholder="Enter Coupon Code"
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
            placeholder="Enter Subscription Fee"
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
            placeholder="Select a Subscription Type"
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
          <label class="bmd-label-floating">Description</label>
          <textarea
            class="form-control"
            name="description"
            placeholder="Please Enter Coupon Description"
            rows="2"
            v-model="couponNew.description" />
          <p
            class="text-right text-danger"
            v-if="errors.has('description')">
            {{ errors.first('description') }}
          </p>
        </div>
        <div class="my-1 form-group">
          <b-form-checkbox
            :unchecked-value="0"
            :value="1"
            v-model="couponNew.couponState">
            <span class="ml-4">Coupon Active</span>
          </b-form-checkbox>
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
  props: ['open', 'item'],
  data() {
    return {
      couponNew: {},
    };
  },
  computed: {
    dialogVisible() {
      return this.open;
    },
  },
  mounted() {
    const localObj = JSON.parse(JSON.stringify(this.item));
    this.couponNew = localObj;
  },
  methods: {
    handleClose() {
      this.$emit('close');
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
