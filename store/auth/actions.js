import api from '@/api/auth';

export default {
  login({ dispatch, commit, state }, args) {
    commit('loading');
    return api.login(args)
      .then((result) => {
        commit('notLoading');
        // save user's permission
        if (result.data.success) {
          dispatch('user_mgt/setUser', result.data.result, { root: true })
            .then((status) => {
              // User is set
            });
        }
        return result;
      })
      .catch((error) => {
        commit('notLoading');
        commit('setErrorMsg', error.message);
        commit('setError', error.error);
        throw error;
      });
  },
  loginWithFacebook({ dispatch, commit, state }, args) {
    commit('loading');
    return api.fLogin(args)
      .then((result) => {
        commit('notLoading');
        // save user's permission
        if (result.data.success) {
          dispatch('user_mgt/setUser', result.data.result, { root: true })
            .then((status) => {
              // User is set
            });
        }
        return result;
      })
      .catch((error) => {
        commit('notLoading');
        commit('setErrorMsg', error.message);
        commit('setError', error.error);
        throw error;
      });
  },

  googleLogin({ dispatch, commit, state }, args) {
    commit('loading');
    return api.gLogin(args)
      .then((result) => {
        commit('notLoading');
        // save user's permission
        if (result.data.success) {
          dispatch('user_mgt/setUser', result.data.result, { root: true })
            .then((status) => {
              // User is set
            });
        }
        return result;
      })
      .catch((error) => {
        commit('notLoading');
        commit('setErrorMsg', error.message);
        commit('setError', error.error);
        throw error;
      });
  },

  signup({ dispatch, commit, state }, args) {
    commit('loading');
    return api.signup(args)
      .then((result) => {
        commit('notLoading');
        return result;
      })
      .catch((error) => {
        commit('notLoading');
        commit('setErrorMsg', error.message);
        commit('setError', error.error);
        throw error;
      });
  },

  resend_confirmation({ dispatch, commit, state }, args) {
    commit('loading');
    return api.resend_confirmation(args)
      .then((result) => {
        commit('notLoading');
        return result;
      })
      .catch((error) => {
        commit('notLoading');
        commit('setErrorMsg', error.message);
        commit('setError', error.error);
        throw error;
      });
  },
  recover_password({ dispatch, commit, state }, args) {
    commit('loading');
    return api.forgotPassword(args)
      .then((result) => {
        commit('notLoading');
        return result;
      })
      .catch((error) => {
        commit('notLoading');
        commit('setErrorMsg', error.message);
        commit('setError', error.error);
        throw error;
      });
  },

  change_password({ dispatch, commit, state }, args) {
    commit('loading');
    return api.changePassword(args)
      .then((result) => {
        commit('notLoading');
        return result;
      })
      .catch((error) => {
        commit('notLoading');
        commit('setErrorMsg', error.message);
        commit('setError', error.error);
        throw error;
      });
  },


  confirm_email({ dispatch, commit, state }, args) {
    commit('loading');
    return api.confirm_email(args)
      .then((result) => {
        commit('notLoading');
        commit('setEmail', result.data.user);
        return result;
      })
      .catch((error) => {
        commit('notLoading');
        commit('setErrorMsg', error.message);
        commit('setError', error.error);
        throw error;
      });
  },

  setUser({ dispatch, commit, state }, user) {
    commit('setUser', user);
  },

  clearErrors({ commit, state }) {
    commit('clearErrors');
  },
  resetState({ commit, state }) {
    commit('resetState');
  },
};
