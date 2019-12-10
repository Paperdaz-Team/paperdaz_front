export default {
  SET_SOLUTIONS: (state, data) => state.sub.solutions = data,
  SET_NEW_SOLUTION: (state, data) => state.sub.solutions.push(data),
  CLEAR_SOLUTIONS: state => state.sub.solutions = [],
  DELETE_SOLUTION: (state, data) => state.sub.solutions.splice(data.solution.index),
  RELOAD_SOLUTIONS: (context, data) => context.dispatch('FETCH_SOLUTIONS', data),
};
