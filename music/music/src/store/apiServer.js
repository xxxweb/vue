import Vue from 'vue'
import API from '../config/api.js'

function apiFactory (api) {
  return (id = null) => Vue.http.jsonp(
    api.url,
    {
      params: api.params(id),
      jsonp: api.jsonp
    }
  )
}
export default {
  actions: {
    search (index, key) {
      return apiFactory(API.search)(key)
    },
    getHotkey () {
      return apiFactory(API.hotkey)()
    },
    getRecommands () {
      return apiFactory(API.first_page_data)()
    },
    getRankList () {
      return apiFactory(API.rank_list)()
    },
    getCdList (index, id) {
      return apiFactory(API.cd)(id)
    },
    getRankSongs (index, id) {
      return apiFactory(API.rank_songs)(id)
    },
    getLyric (index, id) {
      return Vue.http.jsonp('https://api.darlin.me/music/lyric/' + id + '/', {jsonp: 'callback'})
    }
  }
}
