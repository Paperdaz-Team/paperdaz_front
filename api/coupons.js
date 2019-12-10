import { blackAxios } from '../plugins/config';

// const blackAxios = config.blackAxios

export default {
  resource: {
    coupons: 'api/coupons/all',
    coupon: 'api/coupons/coupon/',
    add: 'api/coupons/add-coupon/',
    update: 'api/coupons/update',
  },


  create(dargs) {
    return blackAxios.post(this.resource.add, dargs)
      .then(response => response)
      .catch((error) => {
        const err = {};
        err.message = error.message;
        err.status = false;
        err.error = true;
        throw err;
      });
  },

  getAll(dargs) {
    return blackAxios.get(`${this.resource.coupons}?page=${dargs.page}`, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  getOne(dargs) {
    return blackAxios.get(this.resource.coupon + dargs.code, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  deleteOne(dargs) {
    return blackAxios.delete(this.resource.coupon + dargs.code, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

};
