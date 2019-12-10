<template>
  <b-navbar
    class="mb-4"
    style="background: #fff;"
    toggleable="md">
    <div class="container">
      <b-navbar-brand>
        <div
          class="col-xs-2 mx-2"
          v-if="$route.name.split('-')[0] === 'users'">
          <b-nav-item
            @click="view_and_confirm()"
            class="btn btn-xs header-btn shadow"
            v-if="file.fileStatus === 0">
            Viewed and Completed
          </b-nav-item>
        </div>
      </b-navbar-brand>
      <b-navbar-nav>
        <div
          class="col-xs-2 mx-4"
          v-if="$route.name.split('-')[0] === 'users'" />
        <div class="col-xs-4 mx-2 px-2">
          <b-nav-item
            @click="downloadPdf()"
            class="btn btn-xs header-btn shadow">
            download
          </b-nav-item>
          <b-nav-item
            @click="save()"
            class="btn btn-xs header-btn shadow">
            Save
          </b-nav-item>
        </div>
        <div class="col-xs-4 mx-2">
          <b-nav-item>
            <div class="row">
              <div class="col-xs-8">
                <!-- <el-input-number v-model="curent" :min="1" :max="totalPages" style="width: 40px;" label=""></el-input-number> -->
                <input
                  :max="totalPages"
                  class="form-control"
                  min="1"
                  style="width: 60px; margin-right: 5px;"
                  type="number"
                  v-model="curent">
              </div>
              <div
                class="col-xs-4"
                style="line-height: 30px;">
                / <span>{{ totalPages }}</span>
              </div>
            </div>
          </b-nav-item>
        </div>
        <div class="col-xs-2 mx-2">
          <b-nav-item
            @click="page(0)"
            class="btn btn-xs header-btn shadow">
            <i class="ti ti-arrow-left" />
          </b-nav-item>
        </div>
        <div class="col-xs-2 mx-2">
          <b-nav-item
            @click="page(1)"
            class="btn btn-xs header-btn shadow">
            <i class="ti ti-arrow-right" />
          </b-nav-item>
        </div>
        <div class="col-xs-2 mx-2 visible-xs">
          <b-nav-item @click="openMenu">
            <span class="ti ti-menu fa-2x" />
          </b-nav-item>
        </div>

        <div class="col-xs-2 mx-2">
          <b-nav-item @click="closePdf">
            <span class="ti ti-close fa-2x" />
          </b-nav-item>
        </div>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  props: ['currentPage', 'totalPages'],
  data() {
    return {};
  },
  computed: {
    ...mapGetters('user_mgt', ['user', 'isLoggedIn']),
    ...mapGetters('files', ['file']),
    curent() {
      return this.currentPage;
    },
  },
  watch: {},
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('files', ['getFile', 'update']),
    ...mapMutations('files', ['confirm']),
    logout() {
      this.logout_user();
      this.$router.push('/');
    },
    view_and_confirm() {
      const localObj = JSON.parse(JSON.stringify(this.file));
      const savedCanvas = document.querySelector('#intro-canvas');
      // Returns the image data URL, parameter: image format and clarity (0-1)
      const savedPageData = savedCanvas.toDataURL('image/jpeg', 1.0);

      // Default vertical direction, size ponits, format a4[595.28,841.89]
      const savedPdf = new jsPDF('', 'pt', 'a4');

      // Two parameters after addImage control the size of the added image, where the page height is compressed according to the width-height ratio column of a4 paper.
      savedPdf.addImage(savedPageData, 'JPEG', 0, 0, 595.28, (592.28 / savedCanvas.width * savedCanvas.height) + 80);
      const pdfData = savedPdf.output('datauristring');

      this.confirm({ actor: this.user.Id });
      this.callWithToken({
        parameters: {
          file: this.file,
          pdfTitle: this.file.title,
          pdfData,
        },
        action: this.update,
      }).then((success) => {
        this.getSingleFile();
      });
    },
    closePdf() {
      this.$router.back();
    },
    downloadPdf() {
      this.$emit('download');
    },
    openMenu() {
      this.$emit('mini');
    },
    page(dir) {
      if (dir === 1) {
        var page = this.currentPage === this.totalPages ? this.totalPages : this.currentPage + 1;
        this.$emit('page', page);
      }

      if (dir === 0) {
        var page = this.currentPage === 1 ? 1 : this.currentPage - 1;
        this.$emit('page', page);
      }
    },
    save() {
      this.$emit('save');
    },
    goto() {
      console.log(this.currentPage);
    },
    openDrawer() {
      this.$emit('drawer');
    },
    ...mapActions('user_mgt', ['logout_user']),
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .signup_btn {
    background: #53A63E;
  }

  .navbar-light .navbar-nav .signup_btn .nav-link {
    color: #fff;
  }

  .navbar-light .navbar-nav .login-btn .nav-link {
    color: #53A63E;
  }

  .navbar-light .navbar-nav .nav-link {
    font-weight: 300;
  }

  .btn-link p, .svg-inline--fa {
    color: #5C5D5F !important;
    font-weight: 700;
  }

  .header-btn {
    padding: 0 24px;
    margin: 7px;
    color: #fff;
  }

  .login-btn {
    background: #fff;
  }

  .container {
    padding: 0 !important;
  }

  .btn-link {
    padding-bottom: 0;
    padding-top: 5%;
    text-decoration: none !important;
  }

  .btn-blc .nav-link {
    color: #fff !important;
  }

  .height53 {
    height: 53px;
  }

  @media (max-width: 767px) {
    .height53 {
      height: 45px;
    }

    .logo_img {
      width: 100px;
    }

    .header-btn {
      padding: 0 10px;
      margin: 5px;
      font-size: 12px;
    }

    .navbar-nav {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
</style>
