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
          Packages Features List
        </h3>
      </d-col>
    </d-row>

    <!-- Packages features Light Table -->
    <div class="row">
      <div class="col">
        <div class="card card-small mb-4">
          <div class="card-header border-bottom">
            <h6 class="m-0">
              List of available features in the packages
            </h6>
          </div>
          <div class="card-body p-0 pb-3 text-center table-responsive">
            <table
              class="table mb-0 table-hover"
              v-if="features && !loadingFeatures">
              <thead class="bg-light">
                <tr>
                  <th class="text-center">
                    <d-button
                      @click="toggleOrder"
                      style="font-weight: 700;"
                      theme="success">
                      {{ orderFeatures ? 'Save' : 'Order' }}
                      <i
                        class="fas fa-sort"
                        v-if="!orderFeatures" />
                      <i
                        class="fas fa-check"
                        v-else />
                    </d-button>
                  </th>
                  <th
                    class="border-0 py-3 text-center"
                    scope="col">
                    Title
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
                  v-for="(feature, index) in features">
                  <td v-if="orderFeatures">
                    <d-button
                      :disabled="index <= 0"
                      @click="orderFeaturesArray(index, index - 1)"
                      theme="success">
                      <i
                        class="fas fa-arrow-up" />
                    </d-button>
                    <d-button
                      :disabled="index >= features.length - 1"
                      @click="orderFeaturesArray(index, index + 1)"
                      theme="success">
                      <i
                        class="fas fa-arrow-down" />
                    </d-button>
                  </td>
                  <td v-else>
                    {{ index + 1 }}
                  </td>
                  <td>
                    {{ feature.label }}
                  </td>
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
  </d-container>
</template>

<script>
import { mapActions } from 'vuex';
// Components
import VLoader from '@/components/Loader';

export default {
  layout: 'super-user-layout',

  name: 'PackagesFeaturesPage',

  components: {
    VLoader,
  },

  data() {
    return {
      features: null,
      loadingFeatures: false,
      orderFeatures: false,
    };
  },

  beforeMount() {
    this.getPackageFeatures();
  },

  beforeDestroy() {
    this.features = null;
  },

  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('solutions', ['FETCH_SOLUTIONS']),
    getPackageFeatures(page = 1) {
      this.loadingFeatures = true;
      this.callWithToken({
        parameters: { page },
        action: this.FETCH_SOLUTIONS,
      }).then((success) => {
        const localObj = JSON.parse(JSON.stringify(this.$store.getters['solutions/getSolutions']));
        this.features = localObj;
        this.loadingFeatures = false;
      })
        .catch(error => console.error(error));
    },
    toggleOrder() {
      this.orderFeatures = !this.orderFeatures;
    },
    orderFeaturesArray(from, to) {
      this.features.splice(to, 0, this.features.splice(from, 1)[0]);
    },
  },
};
</script>
