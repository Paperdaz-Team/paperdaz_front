import { blackAxios } from '../plugins/config';

// const blackAxios = config.blackAxios

export default {
  resource: {
    pages: 'api/pages/all',
    update: 'api/pages/update',
  },


  getAll(dargs) {
    return blackAxios.get(this.resource.pages, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },


};
