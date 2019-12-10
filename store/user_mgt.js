/* eslint-disable */
import api from '@/api/userMgt';

// Remember to update resetState mutation
const state = ()=>({
  sub: {
    session: '',
    user: [],
    isLoggedIn: false,
    dash: false,
    signature : ""
  }
})

const getters = {
	session:    state => state.sub.session,
  user:       state => state.sub.user,
  admins:     state => state.sub.admins,
  isLoggedIn: state => state.sub.isLoggedIn,
  dash:       state => state.sub.dash,
  userSignature:  state => state.sub.signature
}


const actions = {

  updateUser ({ dispatch, commit, state }, args) {
    return api.update(args)
    .then(function (result) {
      var far = result.data;
      if(far.success){
        commit('setUser', far.result);
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

  updateDash({dispatch, commit, state}, args){
    commit('setDash', args);
  },  

  setUser({ dispatch, commit, state }, args){
    console.log(args);
  	commit('setSession', args.token);
    commit('setUser', args.user);
    commit('setIsAuth', true);
  },

  logout_user({ dispatch, commit, state }, args){
    commit('resetState');
  },
  callWithToken({dispatch, commit, state}, args){
    const params = args.parameters;
    const storeAction = args.action;
    const token = state.sub.session;
    params.token = token;    

    return storeAction(params);
  }


}

const mutations = {
  
  setUser (state, user) {
    user.password = '';
    state.sub.user = user
  },
  setSession (state, session) {
    state.sub.session = session
  },
  
  setIsAuth (state, auth) {
    state.sub.isLoggedIn = auth
  },

  setDash (state, auth) {
    state.sub.dash = auth
  },

  clearErrors (state) {
    
  },
  setSignature(state,image) {
    state.sub.signature = image
  },
  resetState (state) {
    state.sub = {
      session: '',
      user: [],
      isLoggedIn: false,
      signature : ""
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