<template>
  <section>
    <div class="row">
      <div class="col-lg-10" />
      <div class="col-lg-2 pull-right">
        <base-button
          @click="toggleNewPackageModal"
          class="mdc-button--raised is-success pull-right">
          New Package
        </base-button>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card card-plain">
        <div class="card-header card-header-success">
          <h4 class="card-title mt-0">
            Packages List
          </h4>
          <p class="card-category">
            Here is a list of available Packages
          </p>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class>
                <th>#</th>
                <th>Title</th>
                <th>Features</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </thead>
              <tbody>
                <template v-if="packages.length > 0">
                  <tr
                    :key="index"
                    v-for="(item, index) in packages">
                    <td>
                      <strong>{{ index +1 }}</strong>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>
                      <base-button
                        @click="toggleModal(item.solutions)"
                        class="mdc-button--unelevated is-success">
                        Show Features
                      </base-button>
                    </td>
                    <td>
                      ${{ item.price }}
                    </td>
                    <td>
                      <base-button
                        @click="toggleEditPackageModal(true, item)"
                        class="mdc-button--unelevated is-warning"
                        style="color: #363636">
                        Edit
                      </base-button>
                    </td>
                    <td>
                      <base-button
                        @click="deletePackage({ id: item._id, index })"
                        class="mdc-button--unelevated is-danger">
                        Delete
                      </base-button>
                    </td>
                  </tr>
                </template>
                <template v-if="loadingPackages">
                  <tr>
                    <td>
                      Loading packages
                    </td>
                  </tr>
                </template>
                <template v-if="!loadingPackages && packages.length <= 0">
                  <tr>
                    <td>
                      No packages registered
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <packages-list-modal
      :open="openModal"
      :solutions="solutionsToShow"
      @close="closeModal"
      v-if="openModal" />
    <new-package-modal
      :open="openNewPackageModal"
      :solutions="solutions"
      @close="closeNewPackageModal"
      @save="savePackage"
      v-if="openNewPackageModal" />
    <edit-package-modal
      :open="openEditPackageModal"
      :selected-item="selectedItem"
      :solutions="solutions"
      @close="toggleEditPackageModal(false)"
      @save="saveEditedPackage"
      v-if="openEditPackageModal" />
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import BaseButton from '@/components/base-components/BaseButton';
import PackagesListModal from '@/components/modals/PackagesListModal';
import NewPackageModal from '@/components/modals/NewPackageModal';
import EditPackageModal from '@/components/modals/EditPackageModal';

export default {
  layout: 'super_layout',
  components: {
    BaseButton,
    PackagesListModal,
    NewPackageModal,
    EditPackageModal,
  },
  data() {
    return {
      openModal: false,
      openNewPackageModal: false,
      openEditPackageModal: false,
      solutionsToShow: null,
      selectedItem: null,
      loadingPackages: false,
    };
  },
  mounted() {
    this.fetchPackages();
    this.fetchSolutions();
  },
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('packages', ['FETCH_PACKAGES', 'NEW_PACKAGE', 'UPDATE_PACKAGE', 'DELETE_PACKAGE']),
    ...mapActions('solutions', ['FETCH_SOLUTIONS']),
    ...mapMutations('packages', ['CLEAR_PACKAGES']),
    closeModal() {
      this.openModal = false;
    },
    closeNewPackageModal() {
      this.openNewPackageModal = false;
    },
    toggleModal(solutions) {
      this.solutionsToShow = solutions;
      this.openModal = true;
    },
    toggleNewPackageModal() {
      this.openNewPackageModal = true;
    },
    toggleEditPackageModal(value, item = null) {
      this.selectedItem = item;
      this.openEditPackageModal = value;
    },
    savePackage(data) {
      const solutionTitle = data.title;
      const parameters = {
        package: data,
        token: this.session,
      };
      this.NEW_PACKAGE(parameters)
        .then(() => this.fetchPackages());
      this.closeNewPackageModal();
    },
    saveEditedPackage(data) {
      const packageData = data;
      const parameters = {
        page: 1,
        package: packageData,
        token: this.session,
      };
      this.UPDATE_PACKAGE(parameters)
        .then(() => {
          this.loadingPackages = true;
          this.CLEAR_PACKAGES();
          this.fetchPackages()
            .then(() => this.loadingPackages = false);
        });
      this.toggleEditPackageModal(false);
    },
    deletePackage(data) {
      const packageToDelete = {
        _id: data.id,
        index: data.index,
      };
      this.callWithToken({
        parameters: {
          package: packageToDelete,
        },
        action: this.DELETE_PACKAGE,
      });
    },
    fetchPackages() {
      const parameters = {
        page: 1,
        token: this.$store.getters['user_mgt/session'] || '',
      };
      return this.$store.dispatch('packages/FETCH_PACKAGES', parameters)
        .then(response => response);
    },
    fetchSolutions() {
      this.callWithToken({
        parameters: {
          page: 1,
        },
        action: this.FETCH_SOLUTIONS,
      });
    },
  },
  computed: {
    ...mapGetters('user_mgt', ['session']),
    ...mapGetters('packages', {
      packages: 'getPackages',
    }),
    ...mapGetters('solutions', {
      solutions: 'getSolutions',
    }),
  },
};
</script>

<style>
</style>
