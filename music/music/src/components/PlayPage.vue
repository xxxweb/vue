<template>
	<div id="PlayPage">
		<img class='playBg' src="../assets/play-default.png" alt="" />
		<div class="closePlayPage" @click='closePlayPage()'>
			<img src="../assets/slideDown.png" alt="" />
		</div>
		<div class="lyricWrap">
			<h4>歌名：{{songName}}</h4>
			<h5>歌手： {{typeof singName === 'undefined' ? 'xuxinxin' : singName[0].name}}</h5>
		</div>
		<div class="music-progress">
		  <div class="progress" :style="{width:currentProgress+'%'}"></div>
		</div>
		<div class="music-current-time">{{currentText}}</div>
		<div class="music-total-time">{{totalText}}</div>
		<div class="ft-menu">
		  <ul class="menu-list">
		  	<li class="menu-list-item music-like"><img src="../assets/like.png" @click='ss()'></li>
		  	<li class="menu-list-item flex1"><img src="../assets/pre.png" @click='playPre()'></li>
		  	<li class="menu-list-item flex1"><img :src='pagePlay?iconPause:iconPlay' @click='playOrPause()'></li>
		  	<li class="menu-list-item flex1"><img src="../assets/next.png" @click='playNext()'></li>
		  	<li class="menu-list-item music-list-menu"><img src="../assets/icon-list.png"></li>
		  </ul>
		</div>
	</div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
export default {
  props: ['pagePlay'],
  methods: {
    ss () {
    },
    closePlayPage () {
      document.getElementById('app').style.height = ''
      this.$emit('closePlay')
    },
    ...mapMutations([
      'play', 'pause', 'playContinueMusic', 'playPreMusic'
    ]),
    playOrPause () {
      this.pagePlay === true ? this.pause() : this.play()
    },
    playNext () {
      this.$store.commit('play')
      this.playContinueMusic()
    },
    playPre () {
      this.$store.commit('play')
      this.playPreMusic()
    }
  },
  data: function () {
    return {
      lyric: [],
      musicTime: [],
      musicText: [],
      iconPlay: require('../assets/icon-play.png'),
      iconPause: require('../assets/icon-pause.png')
    }
  },
  watch: {
    play: function (val) {
      if (val) {
        document.getElementById('audo').play()
      } else {
        document.getElementById('audo').pause()
      }
    }
  },
  computed: {
    currentProgress: function () {
      return this.currentTime / this.totalTime * 100
    },
    currentText: function () {
      return Math.floor(this.currentTime / 60) + ':' + this.currentTime % 60
    },
    totalText: function () {
      return Math.floor(this.totalTime / 60) + ':' + this.totalTime % 60
    },
    ...mapGetters([
      'currentTime', 'totalTime'
    ]),
    ...mapState({
      songId (state) {
        return state.PlayServer.song.id
      },
      songName (state) {
        return state.PlayServer.song.name
      },
      singName (state) {
        return state.PlayServer.song.singer
      }
    }),
    currentTimeNum: function () {
      var SM = this.current.split('.')
      var time = parseInt(SM[0]) * 100 + parseInt(SM[1])
      return time
    }
  }
}
</script>

<style>
	#PlayPage{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.playBg{
		vertical-align: top;
		width: 100%;
		height: 100%;
	}
	.closePlayPage{
		position: absolute;
		left: 10px;
		top: 20px;
		width: 26px;
		height: 26px;
		box-sizing: border-box;
		padding-top: 2px;
		padding-left: 7px;
		background: rgba(255,255,255,0.8);
		border-radius:50%;
		cursor: pointer;
	}
	.closePlayPage img{
		width: 12px;
		height: 12px;
	}
	.lyricWrap{
		position: absolute;
		top: 10%;
		left: 20%;
		width: 60%;
		height: 70%;
		text-align: center;
	}
	.lyricWrap h4{
	  color: #fff;
	 }
	 .lyricWrap h5{
	  color: #fff;
	 }
	.ft-menu{
		position: absolute;
		left: 0;
		bottom: 0;
		height: 10%;
		width: 100%;
	}
	.menu-list{
	 display: flex;
	}
	.menu-list .menu-list-item{
	height: 50px;
	box-sizing: border-box;
	padding-top: 16px;
	padding-left: 16px;
	cursor: pointer;
	}
	.flex1{
	 flex: 1;
	 text-align: center;
	}
	.flex1 img{

	}
	
	.music-progress{
	 position: absolute;
	 left: 0;
	 bottom: 11%;
	 width: 100%;
	 background: #E3E3E3;
	}
	.music-progress .progress{
	 background: #666;
	 width: 0;
	 height: 2px;
	}
	.music-current-time{
	  position: absolute;
	  left: 10px;
	  bottom: 11%;
	  margin-bottom: 4px;
	}
	.music-total-time{
	  position: absolute;
	  right: 10px;
	  bottom: 11%;
	  margin-bottom: 4px;
	}
	
	.menu-list .menu-list-item img{
	height: 35px;
	}
	.menu-list .music-like{
	 margin-left: 4px;
	}
	.menu-list .music-list-menu{
	 margin-right: 20px;
	}
</style>
