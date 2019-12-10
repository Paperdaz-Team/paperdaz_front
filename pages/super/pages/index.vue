<template>
  <section>
    <div class="col-md-12">
      <div class="card card-plain">
        <div class="card-header card-header-success">
          <h4 class="card-title mt-0">
            Web Pages
          </h4>
          <p class="card-category">
            Here is a list of available Pages
          </p>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="">
                <th />
                <th>
                  ID
                </th>
                <th>
                  Page
                </th>
                <th>
                  Last Update
                </th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in pages">
                  <td>
                    <b-form-checkbox
                      :unchecked-value="-2"
                      :value="index"
                      v-model="selected" />
                  </td>
                  <td>
                    {{ index+1 }}
                  </td>
                  <td>
                    {{ item.title }}
                  </td>
                  <td>
                    {{ $readableTime(item.lastUpdated) }}
                  </td>
                </tr>
                <tr v-if="pages.length === 0">
                  <td
                    class="text-center"
                    colspan="4">
                    No Pages Yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row">
            <div class="col-lg-7" />
            <div class="col-lg-5 pull-right">
              <button
                :disabled="selected === -2"
                @click="openPage"
                class="btn btn-success pull-right">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters, mapMutations } from 'vuex';
import nCoupon from '@/components/modals/newCoupon';
import eCoupon from '@/components/modals/editCoupon';

export default {
  meta: { requiresAuth: true },
  layout: 'super_layout',
  head: {
    title: 'Pages',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  components: { nCoupon, eCoupon },
  data() {
    return {
      selected: -2,
      openEdit: false,
      newCoupon: false,
    };
  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('pages', ['getPages']),
    ...mapMutations('pages', ['setPage']),

    update(index, row, which) {
      if (which === 'edit') {
        this.couponNew = row;
        this.newCoupon = true;
      }
      if (which === 'suspend') {
        row.couponState = 0;
        this.couponNew = row;
        this.saveCoupon();
      }
      if (which === 'activate') {
        row.couponState = 1;
        this.couponNew = row;
        this.saveCoupon();
      }
    },
    openPage() {
      this.setPage(this.pages[this.selected]);
      this.$router.push({ path: `/super/pages/${this.pages[this.selected].title.toLowerCase()}` });
    },
    getAllPages() {
      this.callWithToken({
        parameters: {},
        action: this.getPages,
      }).then((success) => {

      });
    },
    deleteItem() {

    },
    saveIt(coup) {
      this.couponNew = coup;
      this.saveCoupon();
    },
    saveCoupon() {
      this.callWithToken({
        parameters: this.couponNew,
        action: this.createCoupon,
      }).then((success) => {
        this.$message({
          message: success.message,
          type: success.success ? 'success' : 'error',
        });
        this.getAllCoupons();
      });
    },
    submitCoupon() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.saveCoupon();
        }
      }).catch((error) => {
        this.$message({
          message: error.message,
          type: 'error',
          duration: 0,
          showClose: true,
        });
      });
    },
  },
  mounted() {
    this.getAllPages();
  },
  computed: {
    ...mapGetters('user_mgt', ['session', 'user']),
    ...mapGetters('pages', ['pages', 'error', 'message', 'loading']),
    selectedItem() {
      if (this.selected   !==   -2) {
        return this.coupons[this.selected];
      }
      return {};
    },

  },
};
</script>
