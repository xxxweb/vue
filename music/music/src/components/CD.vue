<template>
	<div id="cd">
		<div class="cd-header">
			<img class="cd-header-bg" v-lazy="imgUrl" alt="" />
			<div class="back-wrap" @click="backRcommend">
				<img class="back-img"  src="../assets/back.svg" alt="" />
				<div class="back-text">歌单</div>
			</div>
			<div class="cd-info" v-if="cd != null">
				<div class="cd-info-detail">
				<h1>{{cd.dissname}}</h1>
				<p>{{cd.visitnum | listenCount}}播放 来自：{{cd.nick}}</p>
			</div>
			<div class="play-btn">
				<img src="../assets/playbtn.png" alt="" />
			</div>
			</div>
		</div>
	    <div class="singList" v-if="cd != null">
	    	<div class="cd-list-item" v-for="(item,index) in cd.songlist" @click="play(index)">
	    		<div class="left-info">
	    			<p>{{item.name}}</p>
	    			<span v-for="singername in item.singer">{{singername.name}}-</span>
	    			 <span>{{item.subtitle}}</span>
	    		</div>
	    		<div class="right-menu">
	    			<img src="../assets/icon-...black.png" alt="" />
	    		</div>
	    	</div>
	    </div>
	</div>
</template>

<script>
export default {
  data: function () {
    return {
      cd: null
    }
  },
  methods: {
    backRcommend: function () {
      this.$router.go(-1)
    },
    play: function (index) {
      let songList = []
      this.cd.songlist.forEach(item => {
        songList.push({
          id: item.id,
          mid: item.mid,
          name: item.name,
          singer: item.singer
        })
      })
      this.$store.commit('setPlayList', {
        index: index,
        list: songList
      })
      this.$store.commit('play')
    }
  },
  created: function () {
    this.$store.dispatch('getCdList', this.$route.params.id).then((res) => {
      this.cd = res.data.cdlist[0]
    })
  },
  filters: {
    listenCount: function (num) {
      return Math.round(num / 1000) / 10 + '万'
    }
  },
  computed: {
    imgUrl: function () {
      return this.cd == null ? null : this.cd.logo
    }
  }
}
</script>

<style>
	#cd{
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
	}
	.cd-header{
		position: relative;
	}
	.cd-header .cd-header-bg{
		width: 100%;
	}
	.back-wrap{
		position: absolute;
		top: 10px;
		left: 10px;
		cursor: pointer;
	}
	.cd-header .back-img{
		float: left;
		width: 24px;
	}
	.back-wrap .back-text{
		float: left;
		color: #333;
	}
	.cd-info{
		display: flex;
		position: absolute;
		left: 0;
		bottom: 0;
		color: #fff;
		padding-bottom: 20px;
		padding-left: 10px;
		background: linear-gradient(to top,#e237a1,transparent);
	}
   .cd-info-detail{
   	flex: 1;
   }
	.play-btn{
		height: 50px;
		width: 50px;
		box-sizing: border-box;
		border-radius:50%;
		margin-top: 20px;
		padding: 13px;
		background: rgba(200,200,200,0.4);
		cursor: pointer;
	}
	.play-btn img{
		margin: 0 auto;
		width: 24px;
	}
	.singList{
		width: 100%;
		background: #e237a1;
	}
	.cd-list-item{
		cursor: pointer;
	  display: flex;
	  height: 49px;
	  padding-left: 10px;
	  border-bottom: 1px solid #E3E3E3;
	}
	.left-info{
		flex: 1;
	}
	.left-info p{
		color: #fff;
	}
	.left-info span{
		color: #E3E3E3;
		font-size: 10px;
	}
	.right-menu{
        margin-right: 10px;
		padding-top: 10px;
		cursor: pointer;
	}

	.right-menu img{
		height: 25px;
	}
</style>
