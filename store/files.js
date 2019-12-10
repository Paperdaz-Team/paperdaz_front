/* eslint-disable */
import api from '@/api/files';

// Remember to update resetState mutation
const state = ()=>({
  sub: {
    files: [],
    file: {},
    error: false,
    message: '',
    loading: false,
    pages: 1,
    page: 1,
    total: null,
  }
})

const getters = {
	files: state => state.sub.files,
  file: state => state.sub.file,
  error: state => state.sub.error,
  message: state => state.sub.message,
  loading: state => state.sub.loading,
  pages: state => state.sub.pages,
  page: state => state.sub.page,
  total: state => state.sub.total,
}


const actions = {

  uploadFile ({ dispatch, commit, state }, dargs) {
        // Loading

        console.log(dargs);
        return api.uploadFile(dargs)
            .then((result) => {
                if (result.error === undefined) {
                    // Use response body
                    const data = result.data
                    return true;
                }

                return false;
            })
    },
    persistForGuest({ dispatch, commit, state }, dargs){
      return api.persistGuest(dargs)
            .then((result) => {
                if (result.error === undefined) {
                    // Use response body
                    commit('setFile', result.data.updated)
                    const data = result.data
                    return data;
                }

            }).catch(error=>{
            commit('setError', true)
            commit('setMessage', error.message)
            return error.message;
          });
    },
  getFiles({ dispatch, commit, state }, args) {

    return api.getAll(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
        commit('setFiles', result.data.result.files);
        commit('setPages', result.data.result);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },
  requestAccess({ dispatch, commit, state }, args) {

    return api.requestaxs(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  sendReq({ dispatch, commit, state }, args){
    return api.send_request(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  getCompanyFiles({ dispatch, commit, state }, args) {

    return api.getCompany(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
        commit('setPages', result.data.result);
          commit('setFiles', result.data.result.files);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },
  searchFiles({ dispatch, commit, state }, args) {

    return api.search(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
        commit('setFiles', result.data.result.files);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  removeFile({ dispatch, commit, state }, args) {

    return api.removeOne(args)
    .then(function (result) {
          return result;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  getFile({ dispatch, commit, state }, args) {

    return api.getOne(args)
    .then(function (result) {
      commit('setFile', result.data.result.file)
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  swapFiles({ dispatch, commit, state }, args) {

    return api.swap(args)
    .then(function (result) {
      return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  update({ dispatch, commit, state }, args) {
    return api.update(args)
    .then(function (result) {
      console.log(result.data.updated)
      commit('setFile', result.data.updated)
      return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },









}

const mutations = {

  setFiles (state, files) {
    state.sub.files = files.reverse()
  },

  setFile (state, file) {
    state.sub.file = file
  },
  removeRequests (state, pls) {
    var index = state.sub.file.access_requests.indexOf(pls.user);
    state.sub.file.access_requests.splice(index, 1);
    state.sub.file.actors.push(pls.actor);
    state.sub.file.actions.push("Request Declined");
  },
  addGranted(state, pls){
    state.sub.file.actors.push(pls.actor);
    state.sub.file.actions.push("Request Granted");
    state.sub.file.access_granted.push(pls.user);
    var index = state.sub.file.access_requests.indexOf(pls.user);
    state.sub.file.access_requests.splice(index, 1);
  },
  confirm(state, pls){
    state.sub.file.actors.push(pls.actor);
    state.sub.file.actions.push(state.sub.file.action_request === 1?"Viewed and Completed":"Viewed & Confirmed");
    state.sub.file.fileStatus = 1;
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
  addActorsAfterChanges(state, pls){
    state.sub.file.actors.push(pls.actor);
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
      files: [],
      file: {},
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
