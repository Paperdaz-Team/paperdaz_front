/* eslint-disable */
import api from '@/api/users';

// Remember to update resetState mutation
const state = ()=>({
  sub: {
    users: [],
    user: {},
    error: false,
    message: '',
    loading: false,
    pages: 1,
    page: 1,
    statistics: {},
    businessProfile: {},
    bill: {},
    dashboard: []
  }
})

const getters = {
	users: state => state.sub.users,
  user: state => state.sub.user,
  error: state => state.sub.error,
  message: state => state.sub.message,
  loading: state => state.sub.loading,
  pages: state => state.sub.pages,
  page: state => state.sub.page,
  bill: state => state.sub.bill,
  businessProfile: state => state.sub.businessProfile,
  statistics: state => state.sub.statistics,
  dashboard: state => state.sub.dashboard,
}


const actions = {

  getBizProfile({ dispatch, commit, state }, args) {

    return api.getBizProfile(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
        commit('setProfile', result.data.result.profile);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  getAction({ dispatch, commit, state }, args) {
    return api.getUserAction(args)
    .then(function (result) {
      commit('setMessage', result.data.message);
      commit('setDashboard', result.data.result.dash);
      return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  getSearches({ dispatch, commit, state }, args) {

    return api.getUserSearches(args)
    .then(function (result) {
      console.log(result.data.result.users)
      commit('setUsers', result.data.result.users);
      return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  getUsers({ dispatch, commit, state }, args) {

    return api.getAll(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
        commit('setUsers', result.data.result.users);
        commit('setPages', result.data.result);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  getBill({ dispatch, commit, state }, args) {

    return api.getCurrentBill(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
        commit('setBill', result.data.result.bill);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  payBill({ dispatch, commit, state }, args) {

    return api.payCurrentBill(args)
    .then(function (result) {
      return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  executeBill({ dispatch, commit, state }, args) {

    return api.executeCurrentBill(args)
    .then(function (result) {
      return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  findBusiness({ dispatch, commit, state }, args) {

    return api.findAll(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
        commit('setUsers', result.data.result.users);
        commit('setPages', result.data.result);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  getUser({ dispatch, commit, state }, args) {

    return api.getOne(args)
    .then(function (result) {
        if(result.data.success){
          commit('setMessage', result.data.message);
        commit('setUser', result.data.result);
        }
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  getStats({ dispatch, commit, state }, args) {

    return api.getStatistics(args)
    .then(function (result) {
        if(result.data.success){
          commit('setMessage', result.data.message);
        commit('setStatistics', result.data.result);
        }
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  setUser({ dispatch, commit, state }, args) {
    commit('setUser', args);
  },

  findFree({ dispatch, commit, state }, args) {

    return api.free_users(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
        commit('setUsers', result.data.result.users);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  findBiz({ dispatch, commit, state }, args) {

    return api.biz_users(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
        commit('setUsers', result.data.result.users);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },


  

  

 
  


}

const mutations = {
  
  setUsers (state, users) {
    state.sub.users = users
  },

  setProfile (state, profile) {
    state.sub.businessProfile = profile
  },

  setBill (state, bill) {
    state.sub.bill = bill
  },

  setDashboard (state, dash) {
    state.sub.dashboard = dash
  },
  
  setUser (state, user) {
    state.sub.user = user
  },
  setError (state, error) {
    state.sub.error = error
  },
  setMessage (state, msg) {
    state.sub.message = msg
  },
  setStatistics (state, stat) {
    state.sub.statistics = stat
  },
  setPages (state, data) {
    state.sub.pages = data.pages;
    state.sub.page = data.current;
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
      users: [],
      user: {},
      error: false,
      message: '',
      loading: false,
      pages: 1,
      page: 1,
      statistics: {},
      bill: {},
      businessProfile: {},
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