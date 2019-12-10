/* eslint-disable */

// Remember to update resetState mutation

let state = ()=>({
    sub: {
      redirectedFromPdfToolPage: false,
      lastFileID: "",
      lastFileFabricObjects: null
    }
})
  
const getters = {
redirectedFromPdfToolPage   : state => state.sub.redirectedFromPdfToolPage,
lastFileID                  : state => state.sub.lastFileID,
lastFileFabricObjects       : state => state.sub.lastFileFabricObjects,
}


let mutations = {
setRedirectedFromPdfToolPage (state, val) {
    state.sub.redirectedFromPdfToolPage = val;
},
setLastFileID (state, val) {
    state.sub.lastFileID = val;
},
setLastFileFabricObjects (state, val) {
    state.sub.lastFileFabricObjects = val;
},
resetState (state) {
    state.sub = {
        redirectedFromPdfToolPage: false,
        lastFileID: "",
        lastFileFabricObjects: []
    };
},
}

export default {
namespaced: true,
state,
getters,
mutations,
}