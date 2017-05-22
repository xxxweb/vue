import Vue from 'vue'
import VueX from 'vuex'
import ApiServer from './apiServer'
import PlayServer from './PlayService.js'
Vue.use(VueX)

export default new VueX.Store({
  modules: {
    ApiServer,
    PlayServer
  }
})
