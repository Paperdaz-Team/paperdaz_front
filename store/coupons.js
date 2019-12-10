/* eslint-disable */
import api from '@/api/coupons';

// Remember to update resetState mutation
const state = ()=>({
  sub: {
    coupons: [],
    coupon: {},
    error: false,
    message: '',
    loading: false,
    pages: 1,
    page: 1,
  }
});

const getters = {
	coupons: state => state.sub.coupons,
  coupon: state => state.sub.coupon,
  error: state => state.sub.error,
  message: state => state.sub.message,
  loading: state => state.sub.loading,
  pages: state => state.sub.pages,
  page: state => state.sub.page,
}


const actions = {

  createCoupon({ dispatch, commit, state }, args) {
    commit('setLoading');
    return api.create(args)
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

  getCoupons({ dispatch, commit, state }, args) {

    return api.getAll(args)
    .then(function (result) {
        commit('setMessage', result.data.message);
        commit('setCoupons', result.data.result.coupons);
        commit('setPages', result.data.result);
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  getCoupon({ dispatch, commit, state }, args) {

    return api.getOne(args)
    .then(function (result) {
        if(result.data.success){
          commit('setMessage', result.data.message);
        commit('setCoupon', result.data.result);
        }
          return result.data;
    }).catch(error=>{
      commit('setError', true)
      commit('setMessage', error.message)
      return error.message;
    })
  },

  deleteCoupon({ dispatch, commit, state }, args) {

    return api.deleteOne(args)
      .then(function(result) {
        if (result.data.success) {
          commit('setMessage', result.data.message);
        }
        return result.data;
      }).catch(error => {
        commit('setError', true)
        commit('setMessage', error.message)
        return error.message;
      })
  }
}

const mutations = {

  setCoupons (state, coupons) {
    state.sub.coupons = coupons
  },
  clearSelectedCoupon(state) {
    state.sub.coupon = {};
  },
  setCoupon (state, coupon) {
    state.sub.coupon = coupon
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
