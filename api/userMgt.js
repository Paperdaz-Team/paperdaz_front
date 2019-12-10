import { blackAxios } from '../plugins/config';

// const blackAxios = config.blackAxios

export default {
  resource: {
    fetchGroup: 'group/fetchAll',
    fetchUnc: 'users/unconfirmed',
    confirm: 'user/confirmAccount',
    createGroup: 'group/create',
    update: 'api/users/update',
    allAdmins: 'user/getAllAdmins/',
    block: 'user/blockAccount/',
    perms: 'user/permissions/',
    updatePe: 'user/permissionUpdate',
  },


  getGroups(dargs) {
    return blackAxios.get(`${this.resource.fetchGroup}/${dargs.session}`)
      .then(response => response)
      .catch(error => error);
  },

  getUncAdmins(dargs) {
    return blackAxios.get(`${this.resource.fetchUnc}/${dargs.session}`)
      .then(response => response)
      .catch(error => error);
  },
  confirmAdmin(dargs) {
    return blackAxios.get(`${this.resource.confirm}/${dargs.session}/${dargs.Id}`)
      .then(response => response)
      .catch(error => error);
  },


  createGroups(dargs) {
    debugger;
    return blackAxios.post(this.resource.createGroup, dargs)
      .then(response => response)
      .catch(error => error);
  },

  update(dargs) {
    return blackAxios.put(this.resource.update, dargs.user, { headers: { token: dargs.token } })
      .then(response => response)
      .catch(error => error);
  },

  updateP(dargs) {
    return blackAxios.post(this.resource.updatePe, dargs)
      .then(response => response)
      .catch(error => error);
  },

  getAdmins(dargs) {
    return blackAxios.get(this.resource.allAdmins + dargs.session)
      .then(response => response)
      .catch(error => error);
  },

  blockAccount(dargs) {
    return blackAxios.get(`${this.resource.block + dargs.session}/${dargs.Id}/${dargs.state}`)
      .then(response => response)
      .catch(error => error);
  },

  fetchPermissions(dargs) {
    return blackAxios.get(this.resource.perms + dargs.session)
      .then(response => response)
      .catch(error => error);
  },


};
