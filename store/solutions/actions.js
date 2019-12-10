import api from '@/api/solutions';

export default {
  FETCH_SOLUTIONS: ({ commit }, args) => {
    console.log('Arguments', args);
    return api.getAll(args)
      .then((response) => {
        commit('SET_SOLUTIONS', response.data.result.solutions);
        return response;
      })
      .catch(error => console.error(error));
  },
  NEW_SOLUTION: ({ commit }, args) => {
    api.store(args)
      .then(response => response)
      .catch(error => console.error(error));
  },
  UPDATE_SOLUTION: ({ commit }, args) => {
    api.update(args)
      .then(response => response)
      .catch(error => console.error(error));
  },
  DELETE_SOLUTION: ({ commit }, args) => {
    api.delete(args)
      .then(() => commit('DELETE_SOLUTION', args))
      .catch(error => console.error(error));
  },
};
