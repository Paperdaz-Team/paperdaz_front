<template>
  <section class="container">
    <div class="row">
      <div class="col-lg-1" />
      <div class="col-lg-10">
        <v-flex
          align-center

          justify-center
          layout
          text-xs-center
          v-if="imageExists">
          <v-avatar
            :size="avatarSize"
            :tile="tile"
            color="grey lighten-4">
            <img
              :src="formImage()"
              alt="avatar">
          </v-avatar>
        </v-flex>
        <div class="form-group">
          <label>Email</label>
          <el-input
            :disabled="disable_email"
            class=" form-controlc"
            name="email"
            placeholder="Email Address"
            type="text"
            v-model="user.email" />
        </div>

        <div
          class="form-group"
          v-if="user.role === 2">
          <label>Business Name</label>
          <el-input
            class=" form-controlc"
            disabled
            name="businessName"
            placeholder="Busniess name"
            type="text"
            v-model="user.businessName" />
        </div>
        <div
          class="form-group"
          v-if="user.role === 2">
          <label>Industry</label>
          <el-input
            class=" form-controlc"
            disabled
            name="industry"
            placeholder="Industry"
            type="text"
            v-model="user.industry" />
        </div>
        <div
          class="form-group"
          v-if="user.role === 2">
          <label>Address</label>
          <el-input
            class="form-controlc"
            disabled
            name="address"
            placeholder="Address"
            type="text"
            v-model="user.address" />
        </div>
        <div class="form-group">
          <label>Telephone</label>
          <el-input
            class=" form-controlc"
            disabled
            name="telephone"
            placeholder="Phone number"
            type="text"
            v-model="user.telephone" />
        </div>
        <div class="form-group">
          <label>Country</label>
          <el-select
            class="form-controlc"
            disabled
            filterable
            name="country"
            placeholder="Select your country.."
            style="width: 100%"
            v-model="user.country">
            <el-option
              :key="item.country"
              :label="item.country"
              :value="item.country"
              v-for="item in $countries" />
          </el-select>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label>First Name</label>
              <el-input
                class=" form-controlc"
                disabled
                name="firstName"
                placeholder="First name"
                type="text"
                v-model="user.firstName" />
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label>Last Name</label>
              <el-input
                class=" form-controlc"
                disabled
                name="lastName"
                placeholder="Last name"
                type="text"
                v-model="user.lastName" />
            </div>
          </div>
        </div>
        <div
          class="form-group"
          v-if="user.role === 2">
          <label>Role</label>
          <el-input
            class=" form-controlc"
            disabled
            name="position"
            placeholder="Position"
            type="text"
            v-model="user.position" />
        </div>

        <div class="form-group">
          <label>Date & Time</label>
          <el-input
            class=" form-controlc"
            disabled
            name="position"
            placeholder="Position"
            type="text"
            v-model="date" />
        </div>

        <div
          class="form-group"
          v-if="user.role === 2">
          <label>White Page Link</label>
          <el-input
            class=" form-controlc"
            disabled
            name="industry"
            placeholder="White Page Link"
            type="text"
            v-model="user.white_page">
            <el-button
              size="mini"
              slot="append">
              Copy
            </el-button>
          </el-input>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      slider: 130,
      tile: false,
      url: null,
      disable_email: true,
      disable_password: true,
      loading: false,
      selectedFile: null,
    };
  },
  computed: {
    ...mapGetters('users', ['user']),
    avatarSize() {
      return `${this.slider}px`;
    },
    imageExists() {
      if (this.user.image || this.url) {
        return true;
      }
      return false;
    },
    date: {
      get() {
        const ts = new Date(this.user.date_created);
        return this.$readableTime(this.user.date_created);
      },
    },

  },
  mounted() {

  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken', 'setUser', 'updateUser']),
    ...mapActions('users', ['getUser']),
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      this.selectedFile = file;
    },
    getSingleUser() {
      this.callWithToken({
        parameters: {
          Id: this.$route.params.id,
        },
        action: this.getUser,
      }).then((success) => {

      });
    },
    changeEmail() {
      if (this.disable_email) {
        this.disable_email = false;
      } else {
        this.disable_email = true;
        this.updateItem();
      }
    },
    changePassword() {
      if (this.disable_password) {
        this.disable_password = false;
      } else {
        this.disable_password = true;
        this.updateItem();
      }
    },
    uploadImage() {
      if (this.selectedFile   !==   null) {
        this.loading = true;
        const data = new FormData();
        data.append('image', this.selectedFile, this.selectedFile.data);
        const token = this.session;
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            token,
          },
        };
        this.$blackAxios.post('api/users/update', data, config)
          .then((response) => {
            this.loading = false;

            if (response.data.success) {
              this.selectedFile = null;
              const t = {
                user: response.data.result,
                token,
              };
              this.setUser(t);
            } else {
              this.$message({
                message: response.data.message,
                type: 'warning',
                duration: 0,
                showClose: true,
              });
            }
          })
          .catch((error) => {
            this.loading = false;
            console.log(JSON.stringify(error));
          });
      } else {
        this.$message({
          message: 'Select a File Please',
          type: 'warning',
          duration: 0,
          showClose: true,
        });
      }
    },
    formImage() {
      if (this.user.image.length < 3) {
        return require('@/assets/img/avatar5.png');
      }
      if (this.user.image && this.selectedFile === null) {
        return this.$API + this.user.image;
      } if (this.url) {
        return this.url;
      }
    },

    updateItem() {
      this.callWithToken({
        parameters: {
          user: this.user,
        },
        action: this.updateUser,
      }).then((success) => {

      });
    },


  },
};
</script>

<style scoped type="text/css">
  .el-tag {
    text-transform: capitalize !important;
  }
</style>
