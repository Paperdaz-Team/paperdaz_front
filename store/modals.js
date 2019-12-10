const state = () => ({
  showModal: {
    drawer: false,
  },
});

const getters = {
  getModalState: state => state.showModal,
};

const mutations = {
  toggleModalDrawer: (state, value) => state.showModal.drawer = value,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
