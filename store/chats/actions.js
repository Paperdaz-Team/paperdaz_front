import api from '@/api/solutions';

export default {
  addToChats({ commit }, args) {
    commit('updateChats', args);
  },
  setChatUser({ commit }, args) {
    commit('updateUser', args);
  },
  reset({ commit }) {
    commit('resetState');
  },
};
