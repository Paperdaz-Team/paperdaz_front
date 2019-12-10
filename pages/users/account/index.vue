<template>
  <section class="container p-0">
    <profile />
  </section>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from 'vuex';
import profile from '@/components/business/profile';

export default {
  layout: 'users-layout',
  components: { profile },
  data() {
    return {
      slider: 130,
      tile: false,
      url: null,
      disable_email: true,
      disable_password: true,
      loading: false,
      selectedFile: null,
      userNew: {},
    };
  },
  computed: {
    ...mapGetters('user_mgt', ['user']),
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
    const localObj = JSON.parse(JSON.stringify(this.user));
    this.userNew = localObj;
  },
  methods: {
    ...mapActions('user_mgt', ['callWithToken', 'setUser', 'updateUser']),
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

    updateItem() {
      this.callWithToken({
        parameters: {
          user: this.userNew,
        },
        action: this.updateUser,
      }).then((success) => {

      });
    },
  },
};
</script>
