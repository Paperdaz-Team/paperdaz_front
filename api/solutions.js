import { blackAxios } from '../plugins/config';

const $api_prefix = 'api/solutions/';

export default {
  resource: {
    solutions: `${$api_prefix}list`,
    save: `${$api_prefix}store`,
    update: `${$api_prefix}update/`,
    delete: `${$api_prefix}solution/`,
    findOne: `${$api_prefix}getOne/`,
  },


  store(dargs) {
    return blackAxios.post(this.resource.save, dargs)
      .then(response => response)
      .catch(error => error);
  },

  getAll(dargs) {
    return blackAxios.get(`${this.resource.solutions}?page=${dargs.page}`, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        console.log('Error in solutions api getAll function', error);
        throw error;
      });
  },

  update(dargs) {
    const body = {
      solution: dargs.solution,
    };
    return blackAxios.put(this.resource.update + dargs.solution._id, body, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },
  delete(dargs) {
    return blackAxios.delete(this.resource.delete + dargs.solution._id, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },
  getOne(dargs) {
    return blackAxios.get(this.resource.findOne + dargs.solution._id, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },
};
