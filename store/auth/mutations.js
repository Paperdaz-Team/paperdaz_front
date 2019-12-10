export default {
  loading(state) {
    state.sub.loading = true;
  },
  regSuccess(state) {
    state.sub.regSuccess = true;
  },
  notLoading(state) {
    state.sub.loading = false;
  },

  setError(state, error) {
    state.sub.error = error;
  },
  setErrorMsg(state, error) {
    state.sub.errorMsg = error;
  },
  setUser(state, user) {
    state.sub.user = user;
  },
  setEmail(state, email) {
    state.sub.email_token = email;
  },


  clearErrors(state) {
    state.sub.loading = false;
    state.sub.error = false;
    state.sub.errorMsg = '';
  },

  resetState(state) {
    state.sub = {
      error: false,
      errorMsg: false,
      loading: false,
    };
  },

  notVerified(state) {
    state.sub.error = true;
    state.sub.autherrorMsg = 'Please confirm you account from your email';
  },
};
