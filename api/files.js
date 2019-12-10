import { blackAxios } from '../plugins/config';

// const blackAxios = config.blackAxios

export default {
  resource: {
    files: 'api/files/all',
    send: 'api/files/send_request',
    search: 'api/files/search',
    swap: 'api/files/swap-all',
    companyF: 'api/files/',
    file: 'api/files/file/',
    preview: 'api/files/preview/',
    add: 'api/files/add-file/',
    freeAdd: 'api/files/free-add-file/',
    guestAdd: 'api/files/guest-add-file/',
    persistGuest: 'api/files/guest-persist-file/',
    update: 'api/files/update/',
    request: 'api/files/req-access/',
  },


  freeUpload(dargs) {
    return blackAxios.post(this.resource.freeAdd, dargs, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => response)
      .catch(error => error);
  },
  guestUpload(dargs) {
    return blackAxios.post(this.resource.guestAdd, dargs, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => response)
      .catch(error => error);
  },
  persistGuest(dargs) {
    return blackAxios.post(this.resource.persistGuest, dargs)
      .then(response => response)
      .catch(error => error);
  },

  getAll(dargs) {
    return blackAxios.get(`${this.resource.files}?page=${dargs.page}&completed=${dargs.completed}` || false, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  swap(dargs) {
    return blackAxios.put(this.resource.swap, { files: dargs.files }, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  requestaxs(dargs) {
    return blackAxios.get(this.resource.request + dargs.file, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  send_request(dargs) {
    return blackAxios.post(this.resource.send, dargs, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  search(dargs) {
    return blackAxios.get(`${this.resource.search}?q=${dargs.query}&completed=${dargs.completed}` || false, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  getCompany(dargs) {
    return blackAxios.get(`${this.resource.companyF + dargs.teamId}?page=${dargs.page}`, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  removeOne(dargs) {
    return blackAxios.delete(this.resource.file + dargs.Id, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  getOne(dargs) {
    return blackAxios.get(this.resource.preview + dargs.name, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

  update(dargs) {
    const body = {
      file: dargs.file,
      pdfTitle: dargs.pdfTitle,
      pdfData: dargs.pdfData,
    };
    return blackAxios.put(this.resource.update + dargs.file.name, body, { headers: { token: dargs.token } })
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },

};
