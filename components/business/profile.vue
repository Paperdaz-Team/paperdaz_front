<template>
  <section class="profile_tab">
    <div class="row">
      <div class="col-lg-9 form-container">
        <div class="form-group">
          <label>Email</label>
          <base-input
            :disabled="disabled.email"
            name="email"
            placeholder="Email Address"
            type="text"
            v-model="userData.email">
            <template v-slot:icon>
              <i class="fas fa-envelope" />
            </template>
          </base-input>
        </div>

        <div class="form-group">
          <label>Password</label>
          <base-input
            :disabled="disabled.password"
            name="email"
            placeholder="Password"
            type="password"
            v-model="userData.password">
            <template v-slot:icon>
              <i class="fas fa-unlock" />
            </template>
          </base-input>
        </div>

        <div class="form-group">
          <label>Name</label>
          <base-input
            :disabled="disabled.name"
            name="firstName"
            placeholder="First name"
            type="text"
            v-model="userData.firstName">
            <template v-slot:icon>
              <i class="fas fa-user" />
            </template>
          </base-input>
          <base-input
            :disabled="disabled.lastName"
            name="lastName"
            placeholder="Last name"
            type="text"
            v-model="userData.lastName">
            <template v-slot:icon>
              <i class="fas fa-user" />
            </template>
          </base-input>
        </div>

        <div
          class="form-group"
          v-if="userData.role === 2">
          <label>Business Name</label>
          <base-input
            :disabled="disabled.businessName"
            name="businessName"
            placeholder="Business name"
            type="text"
            v-model="userData.businessName">
            <template v-slot:icon>
              <i class="fas fa-briefcase" />
            </template>
          </base-input>
        </div>

        <div
          class="form-group"
          v-if="userData.role === 2">
          <label>Industry</label>
          <base-input
            :disabled="disabled.industry"
            name="industry"
            placeholder="Industry"
            type="text"
            v-model="userData.industry">
            <template v-slot:icon>
              <i class="fas fa-industry" />
            </template>
          </base-input>
        </div>

        <div
          class="form-group"
          v-if="userData.role === 2">
          <label>Address</label>
          <base-input
            :disabled="disabled.address"
            name="address"
            placeholder="Address"
            type="text"
            v-model="userData.address">
            <template v-slot:icon>
              <i class="fas fa-map-marked-alt" />
            </template>
          </base-input>
        </div>

        <div
          class="form-group"
          v-if="userData.role === 2">
          <label>Telephone</label>
          <base-input
            :disabled="disabled.telephone"
            name="telephone"
            placeholder="Phone number"
            type="text"
            v-model="userData.telephone">
            <template v-slot:icon>
              <i class="fas fa-phone" />
            </template>
          </base-input>
        </div>

        <div class="form-group">
          <label>Country</label>
          <base-select
            :disabled="disabled.country"
            :options="countries"
            name="country"
            placeholder="Select your country.."
            v-model="userData.country">
            <template v-slot:icon>
              <i class="fas fa-globe" />
            </template>
          </base-select>
        </div>

        <div
          class="form-group"
          v-if="userData.role === 2">
          <label>Role</label>
          <base-input
            :disabled="disabled.position"
            name="position"
            placeholder="Position"
            type="text"
            v-model="userData.position">
            <template v-slot:icon>
              <i class="fas fa-user-tie" />
            </template>
          </base-input>
        </div>

        <div class="form-group">
          <label>Date</label>
          <base-input
            :disabled="disabled.dateAndTime"
            name="date"
            placeholder="Date"
            style="margin-right: 0;"
            type="text"
            v-model="date">
            <template v-slot:icon>
              <i class="fas fa-calendar-alt" />
            </template>
          </base-input>
        </div>

        <div class="form-group">
          <label>Time</label>
          <base-input
            :disabled="disabled.dateAndTime"
            name="time"
            placeholder="Time"
            style="margin-right: 0;"
            type="text"
            v-model="time">
            <template v-slot:icon>
              <i class="fas fa-clock" />
            </template>
          </base-input>
        </div>

        <div
          class="form-group"
          v-if="userData.role === 2">
          <label>White Page Link</label>
          <base-input
            :disabled="disabled.white_page"
            name="white_page"
            placeholder="White Page Link"
            type="text"
            v-model="white_page">
            <template v-slot:icon>
              <i class="fas fa-link" />
            </template>
          </base-input>
          <base-button
            @click="copyLink"
            button-class="mdc-button--unelevated is-success">
            <i class="far fa-copy" />
          </base-button>
        </div>
        <div class="form-group save-button-container">
          <base-button
            @click="updateItem"
            button-class="mdc-button--raised is-success save-changes-button">
            <span v-if="savingChanges === false">
              save changes
              <i class="far fa-save" />
            </span>
            <span v-else>
              Saving
              <i class="fas fa-cog fa-spin" />
            </span>
          </base-button>
        </div>
      </div>

      <!-- Avatar column -->
      <div class="col-lg-3 avatar-container">
        <v-avatar
          :size="avatarSize"
          :tile="tile"
          @click="$refs.fileInput.click()"
          color="grey lighten-4"
          v-if="imageExists">
          <img
            :src="formImage"
            alt="avatar"
            width="118">
        </v-avatar>
        <div
          @click="$refs.fileInput.click()"
          class="avatar-upload-container"
          v-else>
          <div class="avatar-circle">
            Upload Image
          </div>
        </div>
        <input
          @change="onFileChange"
          enctype="multipart/form-data"
          ref="fileInput"
          style="display: none"
          type="file">
        <base-button
          :disabled="loading"
          @click="$refs.fileInput.click()"
          button-class="mdc-button--raised is-success"
          v-if="!selectedFile">
          <span>Change</span>
          <i class="fas fa-edit" />
        </base-button>

        <div class="button-group">
          <base-button
            :disabled="loading"
            @click="uploadImage()"
            button-class="mdc-button--raised is-success"
            v-if="selectedFile">
            <i
              class="fas fa-cloud-upload-alt"
              v-if="!loading" />
            <i
              class="fas fa-spinner fa-spin"
              v-if="loading" />
          </base-button>
          <base-button
            :disabled="loading"
            @click="clearImageToUpload"
            button-class="mdc-button--raised is-danger"
            v-if="selectedFile">
            <i class="fas fa-trash-alt" />
          </base-button>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import BaseInput from '@/components/base-components/BaseInput';
import BaseSelect from '@/components/base-components/BaseSelect';
import BaseButton from '@/components/base-components/BaseButton';

export default {
  components: {
    BaseInput,
    BaseSelect,
    BaseButton,
  },
  data() {
    return {
      slider: 130,
      tile: false,
      url: null,
      disabled: {
        email: false,
        password: false,
        name: false,
        lastName: false,
        country: false,
        dateAndTime: true,
        position: false,
        telephone: false,
        address: false,
        industry: false,
        businessName: false,
        white_page: true,
      },
      userData: {
        role: null,
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        country: null,
        position: null,
        telephone: null,
        address: null,
        industry: null,
        businessName: null,
      },
      loading: false,
      selectedFile: null,
      countries: [
        'United States',
        'United Kingdom',
        'Canada',
        'United Arab Emirates',
      ],
      savingChanges: false,
    };
  },
  computed: {
    ...mapGetters('user_mgt', {
      user: 'user',
      isLoggedIn: 'isLoggedIn',
      session: 'session',
    }),
    ...mapGetters('countries', ['getCountries']),
    avatarSize() {
      return `${this.slider}px`;
    },
    imageExists() {
      if ((this.user.image && this.user.image.length > 5) || this.url) {
        return true;
      }
      return false;
    },
    formImage() {
      if (this.url && this.selectedFile) {
        return this.url;
      } if (this.user.image && !this.selectedFile) {
        return `${this.$API}${this.user.image}`;
      } if (!this.user.image && !this.selectedFile) {
        return require('@/assets/img/avatar5.png');
      }
    },
    date: {
      get() {
        const dateString = new Date(this.user.date_created);
        return dateString.toDateString();
      },
    },
    time: {
      get() {
        const timeString = new Date(this.user.date_created);
        return timeString.toLocaleTimeString();
      },
    },
    white_page: {
      get() {
        const apiURL = 'http://35.192.235.248/';
        const link = `${apiURL}companies/?companyId=${this.user.teamId}`;
        return link;
      },
    },
  },
  mounted() {
    this.userData = { ...this.user };
  },
  methods: {
    ...mapActions('user_mgt', ['callWithToken', 'setUser', 'updateUser']),
    ...mapActions('users', ['getUser']),
    ...mapActions('countries', ['setCountries']),
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      this.selectedFile = file;
    },
    clearImageToUpload() {
      this.url = null;
      this.selectedFile = null;
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
    copyLink() {
      const el = document.createElement('textarea');
      el.value = this.white_page;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$message({
        message: 'Link Copied',
        type: 'info',
      });
    },
    uploadImage() {
      if (this.selectedFile   !==   null && !this.loading) {
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
        this.$blackAxios
          .post('api/users/update', data, config)
          .then((response) => {
            this.loading = false;
            this.selectedFile = null;
            this.url = null;

            if (response.data.success) {
              this.selectedFile = null;
              const t = {
                user: response.data.result,
                token,
              };
                // update  the local variable image
              this.userData.image = t.user.image;
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
    updateItem() {
      this.disabled = {
        email: true,
        password: true,
        name: true,
        lastName: true,
        country: true,
        dateAndTime: true,
        position: true,
        telephone: true,
        address: true,
        industry: true,
        businessName: true,
        white_page: true,
      };
      this.savingChanges = true;
      this.callWithToken({
        parameters: {
          user: this.userData,
        },
        action: this.updateUser,
      }).then((success) => {
        this.disabled = {
          email: false,
          password: false,
          name: false,
          lastName: false,
          country: false,
          dateAndTime: true,
          position: false,
          telephone: false,
          address: false,
          industry: false,
          businessName: false,
          white_page: false,
        };
        this.savingChanges = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .form-group {
    display: flex;
    align-items: center;
    flex-basis: 0;
    flex-grow: 5;
    flex-shrink: 1;
    width: 100%;
    max-width: 450px;
    margin-right: auto;
    margin-left: auto;

    &.save-button-container {
      justify-content: flex-end;
      padding-left: 79px;

      button {
        width: 100%;
      }
    }

    .button {
      height: 46px !important;
    }

    label {
      min-width: 65px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
      flex-basis: 0;
      flex-shrink: 0;
      margin-right: 1rem;
      text-align: right;
      white-space: normal;
    }

    .input-container,
    .select-container {
      margin-right: 0;
      width: 100%
    }

    .input-container:not(:last-child) {
      margin-bottom: 0;
      margin-right: 0.75rem;
    }
  }

  .avatar-container {
    display: flex;
    flex-direction: column;

    .v-avatar {
      max-width: 118px !important;
      max-height: 118px !important;
      margin: 0 auto;

      img {
        width: 118px !important;
        height: 118px !important;
        border: 4px solid #f5f5f5;
        cursor: pointer;
      }
    }

    .avatar-upload-container {
      border: 2px solid #78c360;
      border-radius: 50%;
      height: 118px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      cursor: pointer;
      color: rgba(120, 195, 96, 0.8);
    }

    .button {
      margin-top: 15px;
      margin-left: auto;
      margin-right: auto;
    }

    .button-group {
      margin-left: auto;
      margin-right: auto;
      display: flex;

      .button:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
</style>
