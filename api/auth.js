import { blackAxios } from '../plugins/config';

// const blackAxios = config.blackAxios

export default {
  resource: {
    res: 'api/users/login',
    google: 'api/users/google-login',
    recover: 'api/users/recover-password',
    change: 'api/users/save-new-password',
    resend_confirmation: 'api/users/resend-confirmation',
    confirm_email: 'api/users/verify/',
    register: 'api/users/signup',
    face: 'api/users/facebook/login',
  },


  login(dargs) {
    return blackAxios.post(this.resource.res, dargs)
      .then(response => response)
      .catch((error) => {
        const err = {};
        err.message = error.message;
        err.status = false;
        err.error = true;
        throw err;
      });
  },

  gLogin(dargs) {
    return blackAxios.post(this.resource.google, dargs)
      .then(response => response)
      .catch((error) => {
        const err = {};
        err.message = error.message;
        err.status = false;
        err.error = true;
        throw err;
      });
  },

  fLogin(dargs) {
    return blackAxios.post(this.resource.face, dargs)
      .then(response => response)
      .catch((error) => {
        const err = {};
        err.message = error.message;
        err.status = false;
        err.error = true;
        throw err;
      });
  },

  signup(dargs) {
    return blackAxios.post(this.resource.register, dargs)
      .then(response => response)
      .catch(error => error);
  },

  forgotPassword(dargs) {
    return blackAxios.post(this.resource.recover, dargs)
      .then(response => response)
      .catch(error => error);
  },

  changePassword(dargs) {
    return blackAxios.post(this.resource.change, dargs)
      .then(response => response)
      .catch(error => error);
  },


  resend_confirmation(dargs) {
    return blackAxios.post(this.resource.resend_confirmation, { query: dargs })
      .then(response => response)
      .catch(error => error);
  },
  confirm_email(dargs) {
    return blackAxios.get(this.resource.confirm_email + dargs.token)
      .then(response => response)
      .catch(error => error);
  },
};
