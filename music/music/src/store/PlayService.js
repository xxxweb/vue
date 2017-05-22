export default {
  state: {
    index: 0,
    songList: [],
    playStatus: false,
    song: {},
    musicTotalTime: 0,
    musicCurrentTime: 0
  },
  mutations: {
    play (state) {
      state.playStatus = true
    },
    setPlayList (state, item) {
      state.songList = item.list
      state.index = item.index
      state.song = state.songList[state.index]
    },
    pause (state) {
      state.playStatus = false
    },
    playContinueMusic (state) {
      state.index++
      state.song = state.songList[state.index]
    },
    setMusicTotalTime (state, mu) {
      state.musicTotalTime = mu
    },
    setMusicCurrentTime (state, m) {
      state.musicCurrentTime = m
    },
    playPreMusic (state) {
      state.index--
      state.song = state.songList[state.index]
    }
  },
  getters: {
    currentTime: function (state) {
      let time = state.musicCurrentTime.toFixed()
      return time
    },
    totalTime: function (state) {
      let time = state.musicTotalTime.toFixed()
      return time
    },
    musicImgUrl: function (state) {
      if (state.song.albummid) {
        return 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + state.song.albummid + '.jpg'
      } else {
        return require('../assets/play-default.png')
      }
    }
  }
}
