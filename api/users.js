import { blackAxios } from '../plugins/config';

// const blackAxios = config.blackAxios

export default {
  resource: {
    users: 'api/users/all',
    free: 'api/users/get_free_users',
    action: 'api/users/getUserAction',
    biz: 'api/users/get_biz_users',
    bizProfile: 'api/users/get_profile/',
    search: 'api/users/find',
    teamsters: 'api/users/team',
    user: 'api/users/user/',
    bill: 'api/wallet/bill',
    stats: 'api/admin/general',
    invite: 'api/invites/send-invite',
    update: 'api/coupons/update',
    pay: 'api/wallet/pay_bill',
    execute: 'api/wallet/execute_bill',
    searches: 'api/users/searches/',
  },

  getAll(dargs) {
    return blackAxios.get(`${this.resource.users}?page=${dargs.page}`, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  getUserSearches(dargs) {
    return blackAxios.get(`${this.resource.searches}?in=${dargs.query}`, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  getUserAction(dargs) {
    return blackAxios.get(this.resource.action, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  getBizProfile(dargs) {
    return blackAxios.get(this.resource.bizProfile + dargs.teamId)
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  getCurrentBill(dargs) {
    return blackAxios.get(this.resource.bill, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  payCurrentBill(dargs) {
    return blackAxios.post(this.resource.pay, { bill: dargs.coupon }, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },
  executeCurrentBill(dargs) {
    return blackAxios.post(this.resource.execute, dargs, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  findAll(dargs) {
    return blackAxios.get(`${this.resource.search}?q=${dargs.query}&in=${dargs.in}`, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  sendInvite(dargs) {
    return blackAxios.post(this.resource.invite, dargs, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  getTeam(dargs) {
    return blackAxios.get(`${this.resource.teamsters}?page=${dargs.page}`, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  getOne(dargs) {
    return blackAxios.get(this.resource.user + dargs.Id, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  getStatistics(dargs) {
    return blackAxios.get(this.resource.stats, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  free_users(dargs) {
    return blackAxios.get(this.resource.free, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },
  biz_users(dargs) {
    return blackAxios.get(this.resource.biz, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

};
