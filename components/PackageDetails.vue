<template>
  <div
    class="card package-card shadow col-lg-8 col-md-6 col-sm-12"
    v-if="selectedPackage._id">
    <div class="card-body">
      <div class="package-title__container">
        <h1>Name:</h1>
        <p>{{ selectedPackage.name }}</p>
      </div>

      <div class="package-description__container">
        <h2>Package Price</h2>
        <p>${{ selectedPackage.price }}</p>
      </div>

      <div class="package-description__container">
        <h2>Package Features</h2>
        <ul class="selectedSolutions__list">
          <li
            :key="index"
            v-for="(item, index) in selectedPackage.solutions">
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    selectedPackage() {
      return this.$store.getters['packages/getSelectedPackage'];
    },
  },
  beforeMount() {
    const parameters = {
      page: 1,
      package: {
        _id: this.$route.query.package,
      },
      token: this.$store.getters['user_mgt/session'] || '',
    };
    this.$store.dispatch('packages/FETCH_A_PACKAGE', parameters);
  },
  beforeDestroy() {
    this.$store.commit('packages/CLEAR_SELECTED_PACKAGE');
  },
};
</script>


<style scoped>
  @import "./../cssm/var.css";
  @import "./../cssm/btn.css";
  @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500);

  .package-card {
    width: 100%;
    max-width: 450px !important;
  }

  .package-title__container h1,
  .package-description__container h2,
  .package-subscription__container h2 {
    font-size: 20px;
    font-family: sans-serif;
    letter-spacing: 0.25px;
    line-height: 32px;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    margin-bottom: 0;
  }

  .package-title__container p,
  .package-description__container p,
  .package-subscription__container p {
    font-size: 14px;
    letter-spacing: .1px;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
    line-height: 22px;
    color: #53a63ea8;
  }

  .selectedSolutions__list {
    padding: 0;
    list-style: none;
  }

  .selectedSolutions__list li {
    line-height: 22px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(83, 166, 62, 0.65882);
  }

  @media (max-width: 991px) {
    .circular {
      height: auto;
      background-size: contain;
      background-position: center;
    }
  }
</style>
