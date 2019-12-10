<template>
  <section id="cuponcodea">
    <div
      class="shadow mission_box"
      id="cuponcode">
      <h2 class="pt-4">
        Our Mission
      </h2>
      <p class="pt-1">
        To reduce carbon footprint in the world with a unique
        platform for everyone to view and complete files more efficiently and
        conviniently anywhere, anytime
      </p>

      <h2 class="pt-2">
        Our Vision
      </h2>
      <p class="pt-1">
        One platform to complete all necessary documents!
      </p>
    </div>
    <div class="pl-2 hidden-xs">
      <img
        :src="bg"
        class="tree_img">
    </div>
  </section>
</template>

<script>

export default {
  props: ['bg'],
  data() {
    return {
      code: '',
    };
  },
  computed: {},
  mounted() {

  },
  methods: {},
};
</script>


<style scoped>

  @import './../cssm/var.css';
  @import './../cssm/btn.css';

  #cuponcodea {
    min-height: 550px;
    position: relative;
  }

  #cuponcode {
    background: rgba(245, 245, 245, 0.92) !important;
    padding: 100px 40px;
    position: relative;
    z-index: 4;
    max-width: 620px;
    border-radius: 10px;
    margin-left: 20%;
    height: 540px;
    display: block;
  }

  p {
    color: #53A63E;
    font-size: 18px;
    line-height: 28px;
    font-weight: normal;
  }

  #cuponcode h2 {
    font-size: 42px;
    font-weight: 400;
  }

  .fb-btn {
    background: #4267B2;
    color: #fff;
  }

  .fb-btn:hover {
    color: #fff;
  }

  .pl-2 {
    position: absolute;
    height: 79vh;
    top: 0;
    bottom: 0;
    width: 100%;
  }

  img.tree_img {
    position: absolute;
    bottom: 4px;
  }

  .social-btn {
    width: 100%;
    border: 1px solid #53A63E !important;
    text-align: left !important;
    padding: 0px 15px !important;
    font-weight: 700 !important;
    height: 40px;
  }

  .btn-blockc {
    width: 100%;
    background: #53A63E;
    color: #FFFFFF;
    font-weight: 700 !important;
  }

  .btn-blockc:hover {
    color: #fff !important;
    background: #53A63E !important;
  }

  .btn-blc {
    background: #53A63E;
    color: #FFFFFF;
    font-weight: 700 !important;
  }

  .form-controlc {
    background: #ECECEC;
    color: #5C5D5F;
    font-weight: 700;
  }

  .colorwhite {
    color: #FFFFFF;
  }

  a, a:hover {
    text-decoration: none;
  }

  @media (max-width: 1440px) {
    #cuponcode {
      padding: 40px;
      height: auto;
    }

    img.tree_img {
      bottom: 9px;
    }

    .mission_div {
      width: 100%;
    }

    #cuponcode h2 {
      font-size: 36px;
      padding-top: 0 !important;
    }
  }

  @media (max-width: 1366px) {
    img.tree_img {
      bottom: 0;
    }
  }

  @media (max-width: 1280px) {
    img.tree_img {
      bottom: 25px;
    }
  }

  @media (max-width: 1199px) {
    #cuponcode h2 {
      font-size: 30px;
      padding: 0 !important;
    }

    p {
      font-size: 14px;
      line-height: 24px;
    }

    #cuponcode {
      padding: 15px;
    }

    img.tree_img {
      bottom: 0;
    }
  }

  @media (max-width: 991px) {
    #cuponcode {
      padding: 15px;
      margin: 0 auto;
    }

    img.tree_img {
      bottom: -170px;
    }

    .pl-2 {
      position: initial;
      height: auto;
      top: auto;
      bottom: auto;
      width: 100%;
    }

    .circular {
      height: auto;
    }
  }

  @media (max-width: 767px) {
    #cuponcode {
      max-width: 90%;
    }

    #cuponcode h2 {
      font-size: 22px;
    }

    p {
      font-size: 12px;
      line-height: 20px;
    }

    #cuponcodea {
      min-height: auto;
      margin-bottom: 20px;
    }

  }
</style>
