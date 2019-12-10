/* eslint-disable */
import api from '@/api/pages';

// Remember to update resetState mutation
const state = ()=>({
  sub: {
    pages: [],
    page: {},
    error: false,
    message: '',
    loading: false,
  }
})

const getters = {
  error: state => state.sub.error,
  message: state => state.sub.message,
  loading: state => state.sub.loading,
  pages: state => state.sub.pages,
  page: state => state.sub.page,
}


const actions = {

  getPages({ dispatch, commit, state }, args) {

    return api.getAll(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
        commit('setPages', result.data.result);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  

  

  

 
  


}

const mutations = {
  
  setError (state, error) {
    state.sub.error = error
  },
  setMessage (state, msg) {
    state.sub.message = msg
  },
  setPages (state, pages) {
    state.sub.pages = pages;
  },
  setPage (state, page) {
    state.sub.page = page;
  },
  setLoading (state) {
    state.sub.loading = true
  },
  setNotLoading (state) {
    state.sub.loading = false
  },

  clearErrors (state) {
    
  },

  resetState (state) {
    state.sub = {
      coupons: [],
      coupon: {},
      message: '',
      error: false
    };
  },

 
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}