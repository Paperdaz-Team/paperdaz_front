import api from '@/api/packages';

export const strict = false;
const state = () => ({
  sub: {
    packages: [],
    selectedPackage: null,
  },
});

const getters = {
  getPackages: state => state.sub.packages,
  getSelectedPackage: state => state.sub.selectedPackage,
};

const mutations = {
  SET_PACKAGES: (state, data) => state.sub.packages = data,
  SET_NEW_PACKAGE: (state, data) => state.sub.packages.push(data),
  SET_A_PACKAGE: (state, data) => state.sub.selectedPackage = data,
  CLEAR_PACKAGES: state => state.sub.packages = [],
  CLEAR_SELECTED_PACKAGE: state => state.sub.selectedPackage = {},
  DELETE_PACKAGE: (state, data) => state.sub.packages.splice(data.package.index),
  RELOAD_PACKAGES: (context, data) => context.dispatch('FETCH_PACKAGES', data),
};

const actions = {
  FETCH_PACKAGES: ({ commit }, args) => api.getAll(args)
    .then((response) => {
      commit('SET_PACKAGES', response.data.result.packages);
      return response;
    })
    .catch(error => console.error(error)),
  FETCH_A_PACKAGE: ({ commit }, args) => api.getOne(args)
    .then(response => commit('SET_A_PACKAGE', response.data.result.package))
    .catch(error => console.error(error)),
  NEW_PACKAGE: ({ commit }, args) => {
    api.store(args)
      .then(response => response)
      .catch(error => console.error(error));
  },
  UPDATE_PACKAGE: ({ commit }, args) => {
    api.update(args)
      .then(response => response)
      .catch(error => console.error(error));
  },
  DELETE_PACKAGE: ({ commit }, args) => {
    api.delete(args)
      .then(() => commit('DELETE_PACKAGE', args))
      .catch(error => console.error(error));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
