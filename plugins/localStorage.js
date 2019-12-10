import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
  createPersistedState({
    key: 'Paperdaz v.1.1.0',
    // paths: ['user_mgt']
  })(store);
};
