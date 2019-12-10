import { blackAxios } from '../plugins/config';

// const blackAxios = config.blackAxios

export default {
  resource: {
    faqs: 'api/admin/faqs',
    remove: 'api/admin/faqs/',
    coupon: 'api/coupons/coupon/',
    add: 'api/admin/add-faq/',
    update: 'api/coupons/update',
  },


  create(dargs) {
    return blackAxios.post(this.resource.add, dargs.faq)
      .then(response => response)
      .catch((error) => {
        const err = {};
        err.message = error.message;
        err.status = false;
        err.error = true;
        throw err;
      });
  },

  all(dargs) {
    return blackAxios.get(this.resource.faqs, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  remove(dargs) {
    return blackAxios.delete(this.resource.remove + dargs.id, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

};
