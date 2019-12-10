<template>
  <v-app>
    <p-header />
    <v-content class="px-1 container">
      {{ bgIss }}
      <!-- <nuxt /> -->
      <b-row class="space50">
        <b-col
          :class="$route.name === 'index'?'d-block d-sm-none':''"
          lg="6"
          sm="12">
          <div class="circular pt-1">
            <b-cuponcode
              :bg="image"
              class="mt-1" />
          </div>
        </b-col>
        <b-col
          lg="6"
          md="12"
          sm="12">
          <div class="mission_div">
            <img
              :src="image_other[0]"
              class="imgA1">
            <iframe
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="imgB1"
              frameborder="0"
              height="315"
              src="https://www.youtube.com/embed/3PZlBFFenS8"
              width="420" />
          </div>
        </b-col>
      </b-row>
    </v-content>
    <b-footer />
  </v-app>
</template>

<script>

import header from '@/components/header';
import footer from '@/components/footer';
import cuponcode from '@/components/mission';

export default {
  components: {
    pHeader: header,
    bFooter: footer,
    bCuponcode: cuponcode,
  },
  layout: 'complete',
  data() {
    return {
      confirmed: false,
    };
  },
  computed: {
    image() {
      const t = require('@/assets/img/tree_big.png');
      // console.log(t);
      return t;
    },
    image_other() {
      const t = [];
      t[0] = require('@/assets/img/ipad.png');
      t[1] = require('@/assets/img/ipad_video_picture.jpg');
      t[2] = require('@/assets/img/play_button.png');
      return t;
    },
    bgIss() {
      if (this.$route.query.confirmed) {
        this.confirmed = true;
      } else {
        this.confirmed = false;
      }
    },
  },
  mounted() {
    if (this.$route.query.confirmed) {
      this.confirmed = true;
    } else {
      this.confirmed = false;
    }
  },
  head: {
    title: 'Mission',
    titleTemplate: '%s - Paperdaz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      { hid: 'description', name: 'description', content: 'Meta description' },
    ],
  },
};
</script>


<style scoped type="text/css">
  .mission_div {
    position: relative;
    width: 90%;
    margin: 0 auto;
  }

  .space50 {
    margin-top: 50px;
  }

  .circular {
    height: 550px;
  }

  .circular2 {
    height: 350px;
  }

  .imgA1 {
    width: 100%;
  }

  .imgB1 {
    position: absolute;
    top: 4.5%;
    width: 85%;
    left: 0;
    right: 0;
    height: 91.2%;
    -o-object-fit: cover;
    object-fit: cover;
    margin: 0 auto;
  }

  .imgC1 {
    width: 80px;
    height: 80px;
    position: absolute;
    left: 0;
    top: 42%;
    right: 0;
    margin: 0 auto;
  }

  @media (max-width: 1440px) {
    .mission_div {
      width: 100%;
    }
  }

  @media (min-width: 1450px) {
    .mission_div {
      margin-top: 85px;
    }
  }

  @media (max-width: 991px) {
    .circular {
      height: auto;
    }

    .mission_div {
      width: 90%;
    }
  }

  @media (max-width: 767px) {
    .space50 {
      margin-top: 0;
    }

    .imgC1 {
      width: 50px;
      height: 50px;
    }
  }
</style>
