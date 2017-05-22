<template>
  <div id="app">
  <transition name='router-trans'>
  <router-view v-show='!isShowPlayPage'></router-view>
  </transition>
  <search @searchShow="showMainPage=true" @searchHidden="showMainPage=false" v-show='!isShowPlayPage'></search>
  <div class="swiper-container" v-show="showMainPage&&!isShowPlayPage">
    <swiper class="swiper-box" :options="swiperOption">
    	<swiper-slide>
        <Recommend></Recommend>
    	</swiper-slide>
    	<swiper-slide>
        <Rank></Rank>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</div>
  <div class="play-box" v-show='!isShowPlayPage'>
  	<audio id="audo" :src="musicUrl" autoplay="autoplay" 
  		@ended="playNextMusic()"
  		@timeupdate='upDateSongTime()'
  		></audio>
    <div class="song-img" @click='showPlayPage'>
  	<img :src="musicImgUrl" alt="" />
  	</div>
  	<p @click='showPlayPage'>歌曲:{{songName}}</p>
  	<div class="play-or-pause-btn" @click="playOrPause()">
  		<img  :src="playing?iconPause:iconPlay" alt="" />
  	</div>
  </div>
  <transition name='play-trans'>
   <PlayPage v-show='isShowPlayPage' @closePlay='isShowPlayPage=false' :pagePlay='playing'></PlayPage>
</transition>
  </div>
</template>

<script>
import Search from './components/Search'
import Recommend from './components/Recommend'
import Rank from './components/Rank'
import PlayPage from './components/PlayPage'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import {mapGetters, mapState, mapMutations} from 'vuex'
const TAB_NAME = ['推荐', '排行榜']
export default {
  methods: {
    playOrPause () {
      this.playing === true ? this.pause() : this.play()
    },
    ...mapMutations([
      'play', 'pause', 'playContinueMusic'
    ]),
    playNextMusic () {
      console.log(666)
      this.playContinueMusic()
    },
    upDateSongTime () {
      this.$store.commit('setMusicTotalTime', document.getElementById('audo').duration)
      this.$store.commit('setMusicCurrentTime', document.getElementById('audo').currentTime)
    },
    showPlayPage () {
      document.getElementById('app').style.height = '100%'
      this.isShowPlayPage = true
    }
  },
  components: {
    Search,
    swiper,
    swiperSlide,
    Recommend,
    Rank,
    PlayPage
  },
  data: function () {
    return {
      isShowPlayPage: false,
      iconPlay: require('./assets/icon-play.png'),
      iconPause: require('./assets/icon-pause.png'),
      showMainPage: true,
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender (swiper, index, className) {
          return `<span class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</span>`
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'musicImgUrl'
    ]),
    ...mapState({
      musicUrl (state) {
        var url = 'http://ws.stream.qqmusic.qq.com/' + state.PlayServer.song.id + '.m4a?fromtag=46'
        return url
      },
      playing (state) {
        console.log('boolean: ' + state.PlayServer.playStatus)
        return state.PlayServer.playStatus
      },
      song (state) {
        return state.PlayServer.song
      },
      songName (state) {
        return state.PlayServer.song.name
      }
    })
  },
  watch: {
    playing (val) {
      if (val) {
        document.getElementById('audo').play()
      } else {
        document.getElementById('audo').pause()
      }
    }
  }
}
</script>

<style>
	#app{
		 /*transform:translate(0,0)*/
	}
	.swiper-box{
		padding-top: 50px;
		background: #E3E3E3;
	}
	.swiper-pagination{
		background: #FFFFFF;
		top: 0;
		width: 100%;
		height: 50px;
	}
	.swiper-pagination{
		display: flex;
	}
	.swiper-pagination-bullet-custom{
		flex: 1;
		line-height: 50px;
		border-radius:0 !important;
		height: 100% !important;
		width: 100% !important;
		background: #fff !important;
		margin: 0 !important;
	}
	.swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
		background: #fff !important;
    color: #000;
  }
  .play-box{
  	width: 100%;
  	display: flex;
  	position: fixed;
  	bottom: 0;
  	height: 50px;
  	padding: 6px 10px;
  	z-index: 1100;
  	box-sizing: border-box;
  	background: #fff;
  	cursor: pointer;
  }
  @media only screen and (min-width: 700px) {
  	  .play-box{
    		width: 465px;
    	}
  }
  .play-box .song-img img{
  	width: 38px;
  }
  .play-box p{
  	flex: 1;
  	padding-left: 20px;
  	line-height: 38px;
  }
   .play-or-pause-btn{
   	width: 38px;
   	cursor: pointer;
   	padding-top: 9px;
   	padding-left: 9px;
   }
   .play-or-pause-btn img{
   	width: 20px;
   }
  .router-trans-enter-active{
    transition: all 0.6s ease;
   }
   .router-trans-leave-active{
    transition: all 0.6s ease;
   }
   .router-trans-enter, .router-trans-leave-active{
    transform: translateY(-100vh);
   }
   
   .play-trans-enter-active{
     transition: all 0.6s ease;
   }
   .play-trans-leave-active{
     transition: all 0.6s ease;
   }
   .play-trans-enter, .play-trans-leave-active{
     transform: translateY(100vh);
   }
</style>
