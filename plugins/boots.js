import Vue from 'vue';
// import Boots from 'bootstrap'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';


import 'vue-fabric/dist/vue-fabric.min.css';
import { Fabric } from 'vue-fabric';

import GAuth from 'vue-google-oauth2';

const clientId = '993472828761-ucqhdqlicnonq0s8b7t18c4nejittcgp.apps.googleusercontent.com';
//  const clientSecrete = 'm9scRRgzAeWX6YMzapv3-zr7';
const gauthOption = {
  clientId,
  scope: 'profile email',
  prompt: 'select_account',
};


export default () => {
  Vue.use(GAuth, gauthOption);
  Vue.use(Fabric);

  // Vue.use(Boots)
  Vue.use(ElementUI)
}
