<template>
  <section>
    <div class="col-md-12">
      <div class="card card-plain">
        <div class="card-header card-header-success">
          <h4 class="card-title mt-0">
            Business User Accounts
          </h4>
          <p class="card-category">
            Here is a list of your business user
            accounts
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
                  First Name
                </th>
                <th>
                  Last Name
                </th>
                <th>
                  Email
                </th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in users">
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
                    {{ item.firstName }}
                  </td>
                  <td>
                    {{ item.lastName }}
                  </td>
                  <td>
                    {{ item.email }}
                  </td>
                </tr>
                <tr v-if="users.length === 0">
                  <td
                    class="text-center"
                    colspan="4">
                    No Business Users Yet
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
                @click="setSelected"
                class="btn btn-success pull-right">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';
import userslist from '@/components/super/users_list';
import profile from '@/components/super/user_profile';


export default {
  layout: 'super_layout',
  meta: {
    requiresAuth: true,
  },
  head: {
    title: 'Admin Dashboard',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
  components: { userslist, profile },
  data() {
    return {
      g: [],
      selected: -2,
    };
  },
  computed: {
    ...mapGetters('users', ['users', 'user', 'error', 'message', 'loading']),
    ...mapGetters('coupons', ['coupon']),
    setSelect() {
      if (this.$route.query.id) {
        this.selectUser(this.users.find(a => a.Id === this.$route.query.id));
      } else {
        this.selectUser({});
      }
    },
    checkforquery() {
      if (this.$route.query.id) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.getFreeUsers();
  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('users', ['findBiz', 'setUser']),
    ...mapActions('coupons', ['getCoupon', 'createCoupon']),
    getFreeUsers() {
      this.callWithToken({
        parameters: {},
        action: this.findBiz,
      }).then((success) => {

      });
    },
    setSelected() {
      const user = this.users[this.selected];
      this.setUser(user);
      this.$router.push({ path: `/super/users/business/${user.Id}` });
    },
    selectUser(user) {
      this.setUser(user);
    },
    checkforquery() {
      if (this.$route.query.id) {
        return true;
      }
      return false;
    },
    saveCoupon() {
      this.callWithToken({
        parameters: this.coupon,
        action: this.createCoupon,
      }).then((success) => {
        this.getStatistics();
        this.$message({
          message: success.message,
          type: success.success ? 'success' : 'error',
          duration: 0,
          showClose: true,
        });
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
    handleView(index, row) {
      this.$router.push({ name: 'admin_single_user', params: { id: row.Id } });
    },
  },
};
</script>
