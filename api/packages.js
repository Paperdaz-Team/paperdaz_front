import { blackAxios } from '../plugins/config';

const $api_prefix = 'api/packages/';

export default {
  resource: {
    packages: `${$api_prefix}list`,
    save: `${$api_prefix}store`,
    update: `${$api_prefix}update/`,
    delete: `${$api_prefix}package/`,
    findOne: `${$api_prefix}getOne/`,
  },


  store(dargs) {
    return blackAxios.post(this.resource.save, dargs)
      .then(response => response)
      .catch(error => error);
  },

  getAll(dargs) {
    return blackAxios.get(`${this.resource.packages}?page=${dargs.page}`, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        console.log('Error in packages');
        throw error;
      });
  },

  update(dargs) {
    const body = {
      package: dargs.package,
    };
    return blackAxios.put(this.resource.update + dargs.package._id, body, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },
  delete(dargs) {
    return blackAxios.delete(this.resource.delete + dargs.package._id, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },
  getOne(dargs) {
    return blackAxios.get(this.resource.findOne + dargs.package._id, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },
};
