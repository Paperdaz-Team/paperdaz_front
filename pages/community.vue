<template>
  <div class="community-page">
    <div class="banner-hero-img">
      <img
        :src="require('@/assets/img/community-icon.svg')"
        class="banner-hero-icon">
    </div>
    <main class="community-page__content">
      <div class="content-left">
        <div class="community-page__title">
          <h2>
            Join our network,reduce carbon footprint and help make the world
            greener!
          </h2>

          <ul class="social-icons">
            <li class="social-icons-item">
              <a href="#">
                <i class="fab fa-linkedin" />
              </a>
            </li>
            <li class="social-icons-item">
              <a href="#">
                <i class="fab fa-facebook-square" />
              </a>
            </li>
            <li class="social-icons-item">
              <a href="#">
                <i class="fab fa-twitter-square" />
              </a>
            </li>
            <li class="social-icons-item">
              <a href="#">
                <i class="fab fa-youtube" />
              </a>
            </li>
          </ul>
        </div>

        <div class="files-counter__container">
          <div class="counter-item">
            <div class="counter-item__img">
              <img
                :src="require('@/assets/img/uploaded_files.svg')"
                alt="">
            </div>
            <div class="counter-item__text">
              <span>1573</span>
            </div>
          </div>
          <div class="counter-item">
            <div class="counter-item__img">
              <img
                :src="require('@/assets/img/completed_files.svg')"
                alt="">
            </div>
            <div class="counter-item__text">
              <span>31587</span>
            </div>
          </div>
          <div class="counter-item">
            <div class="counter-item__img">
              <img
                :src="require('@/assets/img/teams.svg')"
                alt="">
            </div>
            <div class="counter-item__text">
              <span>56886</span>
            </div>
          </div>
          <div class="counter-item">
            <div class="counter-item__img">
              <img
                :src="require('@/assets/img/suitcase.svg')"
                alt="">
            </div>
            <div class="counter-item__text">
              <span>33146</span>
            </div>
          </div>
        </div>

        <div
          :class="{ 'is-area-success': fileLoaded }"
          @click="searchFile"
          @dragover.prevent
          @drop.prevent="dropHandler"
          class="file-drop-area">
          <span
            class="file-msg"
            v-if="!fileLoaded">
            <img
              :src="require('@/assets/img/upload_new_file.svg')"
              alt="Load file image">
            <span v-if="message">{{ message }}</span>
          </span>
          <div
            class="name-file"
            v-else>
            <i class="far fa-file-pdf pdf-file" />
            <span>
              {{ fileLoaded.name }}
              <i
                @click="removeFileLoaded"
                class="fas fa-times-circle"
                v-if="!uploadingFile" />
            </span>
          </div>

          <input
            :disabled="uploadingFile"
            @change="loadFile"
            accept=".pdf"
            class="file-input"
            ref="myFile"
            type="file">
        </div>

        <div class="files-per-user__container">
          <div class="uploaded-files">
            <h3>Uploaded files</h3>
            <div class="file-info">
              <div class="file-user">
                <img
                  alt="User image"
                  class="file-user__profile-pick"
                  src="https://i.pravatar.cc/300">
                <span class="file-user__profile-name">Apple dental</span>
              </div>
              <span class="file-name">Patient intake profile.pdf</span>
            </div>
          </div>
          <div class="completed-files">
            <h3>Completed files</h3>
            <div class="file-info">
              <div class="file-user">
                <img
                  alt="User image"
                  class="file-user__profile-pick"
                  src="https://i.pravatar.cc/300">
                <span class="file-user__profile-name">Apple dental</span>
              </div>
              <span class="file-name">Completed file.pptx</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="search-users">
          <h3>Search users</h3>
          <base-input placeholder="Search users">
            <template v-slot:icon>
              <i class="fas fa-search" />
            </template>
          </base-input>
        </div>
        <div class="new-users">
          <h3>New members</h3>
          <ul class="new-users__list">
            <li>
              <img
                alt=""
                class="user-picture"
                src="https://i.pravatar.cc/300">
              <span class="user-name">Member name (UserName)</span>
            </li>
            <li>
              <img
                alt=""
                class="user-picture"
                src="https://i.pravatar.cc/300">
              <span class="user-name">Member name (UserName)</span>
            </li>
            <li>
              <img
                alt=""
                class="user-picture"
                src="https://i.pravatar.cc/300">
              <span class="user-name">Member name (UserName)</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BaseInput from '@/components/base-components/BaseInput';

export default {
  layout: 'community-layout',
  components: {
    BaseInput,
  },
  data() {
    return {
      fileLoaded: null,
      filePath: null,
      message: '',
      uploadingFile: false,
    };
  },
  methods: {
    loadFile() {
      if (this.uploadingFile) return;
      this.fileLoaded = this.$refs.myFile.files[0];
      this.filePath = this.$refs.myFile.value;
    },
    searchFile() {
      this.$refs.myFile.click();
    },
    dropHandler(ev) {
      if (this.uploadingFile) return;
      if (ev.dataTransfer.items[0].type   !==   'application/pdf') {
        this.message = 'Only drop PDF files';
      } else {
        const file = ev.dataTransfer.items[0].getAsFile();
        this.message = '';
        this.fileLoaded = file;
      }
      // Pass event to removeDragData for cleanup
      this.removeDragData(ev);
    },
    removeDragData(ev) {
      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to remove the drag data
        ev.dataTransfer.items.clear();
      } else {
        // Use DataTransfer interface to remove the drag data
        ev.dataTransfer.clearData();
      }
    },
  },
};
</script>

<style lang="scss">
  .community-page {
    padding-top: 68px;

    .banner-hero-img {
      background-image: url('~assets/img/community-banner-bg.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      width: 100%;
      height: 462px;
      position: relative;
      max-width: 1920px;

      .banner-hero-icon {
        position: absolute;
        bottom: 44px;
        left: 80px;
      }
    }

    &__content {
      background-color: #FCFCFC;
      height: 100%;
      width: 100%;
      max-width: 1920px;
      padding: 64px 60px;
      display: flex;

      .content-left {
        max-width: 980px;
        margin-right: 49px;
        flex-grow: 1;
      }

      .community-page__title {
        display: flex;

        h2 {
          color: #78C360;
          font-size: 23px;
          font-weight: normal;
          margin-bottom: 0;
          display: flex;
          align-items: center;
        }

        .social-icons {
          display: flex;
          list-style: none;
          height: 100%;
          margin-bottom: 0;
          padding-left: 48px;

          .social-icons-item {
            a {
              font-size: 28px;
              color: #595959;
            }
          }

          .social-icons-item:not(:last-child) {
            padding-right: 20.5px;
          }
        }
      }

      .files-counter__container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-top: 37px;

        .counter-item {
          width: 180px;
          height: 140px;
          background-color: #fff;
          box-shadow: 0 0 9px rgba(0, 0, 0, .06);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .counter-item__text {
            padding-top: 19px;
            color: #78C360;
            font-size: 16px;
          }
        }
      }

      .file-drop-area {
        width: 100%;
        height: 170px;
        margin-top: 46px;
        border: 1.5px dashed #707070;
        background-color: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .file-input {
          display: none;
        }
      }

      .files-per-user__container {
        padding-top: 27px;
        display: flex;
        justify-content: space-between;

        .uploaded-files,
        .completed-files {
          h3 {
            font-size: 23px;
            color: #78C360;
            margin: 0;
            padding-bottom: 17px;
          }

          .file-info {
            display: flex;

            .file-user {
              display: flex;
              flex-direction: column;

              img {
                max-width: 80px;
                border-radius: 50%;
                border: 1px solid #707070;
              }

              .file-user__profile-name {
                font-size: 16px;
                color: #A8A8A8;
                padding-top: 10px;
              }
            }

            .file-name {
              font-size: 23px;
              color: #727272;
              padding-left: 20px;
              padding-top: 20px;
            }
          }
        }
      }

      .content-right {
        margin-left: 49px;
        flex-grow: 1;

        .search-users {
          h3 {
            font-size: 30px;
            color: #78C360;
            text-transform: capitalize;
            margin: 0;
            padding-bottom: 30px;
          }

          .input-container {
            width: 100%;
          }
        }

        .new-users {
          h3 {
            color: #78C360;
            font-size: 30px;
            margin: 0;
            padding-bottom: 30px;
            padding-top: 41px;
          }

          .new-users__list {
            list-style: none;
            padding: 0;

            li {
              display: flex;
              align-items: center;

              &:not(:last-child) {
                padding-bottom: 20px;
              }

              img {
                max-width: 80px;
                border-radius: 50%;
                border: 1px solid #707070;
              }

              .user-name {
                font-size: 21px;
                color: #A8A8A8;
                padding-left: 30px;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 320px) and (max-width: 767px) {
    .community-page {
      padding-top: 50px;

      .banner-hero-img {
        .banner-hero-icon {
          left: 60px;
        }
      }

      &__content {
        flex-direction: column;
        padding: 34px 30px;

        .content-left {
          margin: 0;

          .community-page__title {
            flex-direction: column;

            h2 {
              font-size: 15px;
              text-align: center;
            }

            .social-icons {
              padding-left: 0;
              padding-top: 10px;
              justify-content: center;

              .social-icons-item {
                a {
                  font-size: 18px;
                }
              }
            }
          }

          .files-counter__container {
            padding-top: 25px;
            flex-wrap: wrap;
            justify-content: space-evenly;

            .counter-item {
              width: 100px;
              height: 90px;
              margin-bottom: 10px;

              .counter-item__img {
                img {
                  width: 30px;
                }
              }

              .counter-item__text {
                padding-top: 5px;
                font-size: 12px;
              }
            }
          }

          .file-drop-area {
            margin-top: 20px;
          }

          .files-per-user__container {
            padding-top: 30px;
            display: flex;
            flex-direction: column;

            .uploaded-files,
            .completed-files {
              h3 {
                font-size: 15px;
                margin: 0;
                padding-bottom: 15px;
              }

              .file-info {
                .file-user {
                  flex-direction: column;

                  img {
                    max-width: 50px;
                  }

                  .file-user__profile-name {
                    font-size: 13px;
                    padding-top: 5px;
                  }
                }

                .file-name {
                  font-size: 15px;
                  padding-left: 0px;
                  padding-top: 15px;
                }
              }
            }

            .completed-files {
              padding-top: 30px;
            }
          }
        }

        .content-right {
          margin: 0;
          padding-top: 40px;

          .search-users {
            h3 {
              font-size: 20px;
              padding-bottom: 20px;
            }
          }

          .new-users {
            h3 {
              font-size: 20px;
              padding-bottom: 20px;
              padding-top: 31px;
            }

            .new-users__list {
              li {
                img {
                  max-width: 50px;
                }

                .user-name {
                  font-size: 15px;
                  padding-left: 10px;
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1250px) {
    .community-page {
      &__content {
        flex-direction: column;
        align-items: center;
        padding: 44px 40px;

        .content-left {
          margin: 0;

          .community-page__title {
            flex-direction: column;

            h2 {
              text-align: center;
            }

            .social-icons {
              padding-left: 0;
              padding-top: 10px;
              justify-content: center;
            }
          }

          .files-counter__container {
            padding-top: 25px;
            flex-wrap: wrap;
            justify-content: space-between;

            .counter-item {
              width: 140px;
              height: 100px;
              margin-bottom: 10px;

              .counter-item__img {
                img {
                  width: 30px;
                }
              }

              .counter-item__text {
                padding-top: 5px;
                font-size: 12px;
              }
            }
          }

          .file-drop-area {
            margin-top: 20px;
          }

          .files-per-user__container {
            padding-top: 30px;
            display: flex;

            .uploaded-files,
            .completed-files {
              h3 {
                font-size: 25px;
                margin: 0;
                padding-bottom: 15px;
              }

              .file-info {
                .file-user {
                  flex-direction: column;

                  img {
                    max-width: 50px;
                  }

                  .file-user__profile-name {
                    font-size: 15px;
                    padding-top: 5px;
                  }
                }

                .file-name {
                  font-size: 18px;
                  padding-left: 0px;
                  padding-top: 13px;
                }
              }
            }
          }
        }

        .content-right {
          margin: 0;
          padding-top: 40px;

          .search-users {
            h3 {
              font-size: 25px;
              padding-bottom: 20px;
            }
          }

          .new-users {
            h3 {
              font-size: 20px;
              padding-bottom: 20px;
              padding-top: 31px;
            }

            .new-users__list {
              li {
                img {
                  max-width: 50px;
                }

                .user-name {
                  font-size: 18px;
                  padding-left: 15px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
