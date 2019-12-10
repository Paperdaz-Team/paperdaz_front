/* eslint-disable */
import api from '@/api/faq';

// Remember to update resetState mutation
const state = ()=>({
  sub: {
    faqs: [],
  }
})

const getters = {
  faqs: state => state.sub.faqs,
}


const actions = {

  fetchFaqs ({ dispatch, commit, state }, args) {
    return api.all(args)
    .then(function (result) {
      var far = result.data;
      if(far.success){
        commit('setFaqs', far.result.faqs);
        return far
      }else{
        return far;
      }
    })
    .catch((error)=>{
      commit('notLoading');
      commit('setErrorMsg', error.message);
      commit('setError',error.error);
      throw error;
    })
  },

  createFaqs ({ dispatch, commit, state }, args) {
    return api.create(args)
    .then(function (result) {
      var far = result.data;
        return far;
    })
    .catch((error)=>{
      commit('setErrorMsg', error.message);
      commit('setError',error.error);
      throw error;
    })
  },
  deleteFaqs ({ dispatch, commit, state }, args) {
    return api.remove(args)
    .then(function (result) {
      var far = result.data;
        return far;
    })
    .catch((error)=>{
      commit('setErrorMsg', error.message);
      commit('setError',error.error);
      throw error;
    })
  },

}

const mutations = {
  
  setFaqs (state, faqs) {
    state.sub.faqs = faqs
  },

  clearErrors (state) {
    
  },

  resetState (state) {
    state.sub = {
      session: '',
      user: [],
      isLoggedIn: false,
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