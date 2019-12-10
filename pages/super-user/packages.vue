<template>
  <d-container
    class="main-content-container px-4"
    fluid>
    <!-- Page Header -->
    <d-row
      class="page-header pt-4 pb-2 m-0"
      no-gutters>
      <d-col
        class="text-center text-sm-left mb-4 mb-sm-0"
        col
        sm="4">
        <span class="text-uppercase page-subtitle">Overview</span>
        <h3 class="page-title">
          Packages List
        </h3>
      </d-col>
    </d-row>

    <!-- Packages Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0">
              List of available packages
            </h6>
          </div>
          <div class="card-body p-0 pb-3 text-center table-responsive">
            <table
              class="table mb-0 table-hover"
              v-if="packages && !loadingPackages">
              <thead class="bg-light">
                <tr>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    #
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Title
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Features
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Price
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Edit
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  :key="index"
                  class="pointer"
                  v-for="(item, index) in packages">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>
                    <d-button
                      @click="toggleFeaturesModal(item.solutions, true)"
                      theme="success">
                      Features
                    </d-button>
                  </td>
                  <td>$ {{ item.price }}</td>
                  <td>
                    <d-button theme="success">
                      Edit
                    </d-button>
                  </td>
                  <td>
                    <d-button theme="danger">
                      Delete
                    </d-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="loader"
              style="margin-top: 16px;"
              v-else>
              <v-loader />
            </div>
          </div>
        </div>
      </div>
    </div>
    <features-list-modal
      :open="isOpenModal.featuresList"
      :solutions="itemFeatures"
      @close="toggleFeaturesModal(null, false)"
      v-if="isOpenModal.featuresList" />
  </d-container>
</template>

<script>
import { mapActions } from 'vuex';
// Components
import VLoader from '@/components/Loader';
import FeaturesListModal from '@/components/modals/PackagesListModal';

export default {
  layout: 'super-user-layout',

  name: 'PackagesFeaturesPage',

  components: {
    VLoader,
    FeaturesListModal,
  },

  data() {
    return {
      packages: null,
      loadingPackages: false,
      isOpenModal: {
        featuresList: false,
      },
      itemFeatures: null,
    };
  },

  beforeMount() {
    this.getPackage();
  },

  beforeDestroy() {
    this.packages = null;
    (this.isOpenModal.featuresList = false), (this.itemFeatures = null);
  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('packages', ['FETCH_PACKAGES']),
    getPackage(page = 1) {
      this.loadingPackages = true;
      this.callWithToken({
        parameters: { page },
        action: this.FETCH_PACKAGES,
      })
        .then((success) => {
          this.packages = this.$store.getters['packages/getPackages'];
          this.loadingPackages = false;
        })
        .catch(error => console.error(error));
    },
    toggleFeaturesModal(features, value) {
      this.itemFeatures = features;
      this.isOpenModal.featuresList = value;
    },
  },
};
</script>
