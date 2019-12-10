<template>
  <section>
    <div class="row">
      <div class="col-lg-10" />
      <div class="col-lg-2 pull-right">
        <base-button
          @click="openModal = true"
          class="mdc-button--raised is-success pull-right">
          New Feature
        </base-button>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card card-plain">
        <div class="card-header card-header-success">
          <h4 class="card-title mt-0">
            Packages Features
          </h4>
          <p class="card-category">
            Here is a list of available features
          </p>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class>
                <th>#</th>
                <th>Title</th>
                <th>Edit</th>
                <th>Delete</th>
              </thead>
              <tbody>
                <template v-if="solutions.length > 0">
                  <tr
                    :key="index"
                    v-for="(solution, index) in solutions">
                    <td>
                      <strong>{{ index +1 }}</strong>
                    </td>
                    <td>{{ solution.label }}</td>
                    <td>
                      <base-button
                        @click="editSolution(solution)"
                        class="mdc-button--unelevated is-success">
                        Edit
                      </base-button>
                    </td>
                    <td>
                      <base-button
                        @click="deleteSolution({ id: solution._id, index: index })"
                        class="mdc-button--unelevated is-danger">
                        Delete
                      </base-button>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td>No solutions registered</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <new-package-solution
      :open="openModal"
      @close="closeModal"
      @save="saveSolution"
      v-if="openModal" />
    <edit-solution-modal
      :open="openEditModal"
      :selected-item="selectedItem"
      @close="closeEditModal"
      @save="saveEditedSolution"
      v-if="openEditModal" />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseButton from '@/components/base-components/BaseButton';
import NewPackageSolution from '@/components/modals/NewPackageSolution';
import EditSolutionModal from '@/components/modals/EditSolutionModal';

export default {
  layout: 'super_layout',
  components: {
    BaseButton,
    NewPackageSolution,
    EditSolutionModal,
  },
  data() {
    return {
      openModal: false,
      openEditModal: false,
      selectedItem: null,
    };
  },
  mounted() {
    this.fetchSolutions();
  },
  methods: {
    ...mapActions('user_mgt', ['callWithToken']),
    ...mapActions('solutions', ['FETCH_SOLUTIONS', 'NEW_SOLUTION', 'UPDATE_SOLUTION', 'DELETE_SOLUTION']),
    closeModal() {
      this.openModal = false;
    },
    closeEditModal() {
      this.openEditModal = false;
      this.selectedItem = null;
    },
    saveSolution(data) {
      const solutionTitle = data.title;
      const parameters = {
        page: 1,
        solution: {
          label: solutionTitle,
        },
        token: this.session,
      };
      this.NEW_SOLUTION(parameters)
        .then(() => this.FETCH_SOLUTIONS(parameters));
      this.closeModal();
    },
    saveEditedSolution(data) {
      const solutionData = data;
      const parameters = {
        page: 1,
        solution: {
          label: solutionData.label,
          _id: solutionData.id,
        },
        token: this.session,
      };
      this.UPDATE_SOLUTION(parameters)
        .then(() => this.FETCH_SOLUTIONS(parameters));
      this.closeEditModal();
    },
    deleteSolution(data) {
      const solution = {
        _id: data.id,
        index: data.index,
      };
      this.callWithToken({
        parameters: {
          solution,
        },
        action: this.DELETE_SOLUTION,
      });
    },
    fetchSolutions() {
      this.callWithToken({
        parameters: {
          page: 1,
        },
        action: this.FETCH_SOLUTIONS,
      });
    },
    editSolution(solution) {
      this.selectedItem = solution;
      this.openEditModal = true;
    },
  },
  computed: {
    ...mapGetters('solutions', {
      solutions: 'getSolutions',
    }),
    ...mapGetters('user_mgt', ['session']),
  },
};
</script>
