/* eslint-disable */
import api from '@/api/users';

// Remember to update resetState mutation
const state = ()=>({
  sub: {
    team_mates: [],
    error: false,
    message: '',
    loading: false,
    pages: 1,
    page: 1,
    total: null,
  }
})

const getters = {
	team_mates: state => state.sub.team_mates,
  file: state => state.sub.file,
  error: state => state.sub.error,
  message: state => state.sub.message,
  loading: state => state.sub.loading,
  pages: state => state.sub.pages,
  page: state => state.sub.page,
  total: state => state.sub.total,
}


const actions = {

  invite({ dispatch, commit, state }, args) {
    commit('setLoading');
    return api.sendInvite(args)
    .then(function (result) {
      commit('setNotLoading');
        commit('setMessage', result.data.message);
          return result.data;
    }).catch(error=>{
      commit('setNotLoading');
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  getTeam({ dispatch, commit, state }, args) {

    return api.getTeam(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
        commit('setTeam', result.data.result.users);
        // commit('setPages', result.data.result);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },


  

  

 
  


}

const mutations = {
  
  setTeam (state, team) {
    console.log(team)
    state.sub.team_mates = team
  },
  
  setError (state, error) {
    state.sub.error = error
  },
  setMessage (state, msg) {
    state.sub.message = msg
  },
  setPages (state, data) {
    state.sub.pages = data.pages;
    state.sub.page = data.current;
    state.sub.total = data.total;
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
      team: [],
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