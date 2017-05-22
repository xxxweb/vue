<template>
	<div id="cd">
		<div class="cd-header" v-if="topListData !=null">
			<img class="cd-header-bg" v-lazy="topListData.topinfo.pic_album" alt="" />
			<div class="back-wrap" @click="backRcommend">
				<img class="back-img"  src="../assets/back.svg" alt="" />
				<div class="back-text">歌单</div>
			</div>
			<div class="cd-info" v-if="topListData != null">
				<div class="cd-info-detail">
				<h1>{{topListData.topinfo.ListName}}</h1>
				<p>{{topListData.topinfo.listennum | listenCount}}</p>
			</div>
			<div class="play-btn">
				<img src="../assets/playbtn.png" alt="" />
			</div>
			</div>
		</div>
	    <div class="singList" v-if="topListData != null">
	    	<div class="cd-list-item" v-for="(item,index) in topListData.songlist" @click="play(index)">
	    		<div class="rank-id">{{index+1}}</div>
	    		<div class="left-info">
	    			<p>{{item.data.songorig}}</p>
	    			<span v-for="singername in item.singer">{{singername.name}}-</span>
	    			 <span class="rank-ablbum">{{item.data.albumname}}</span>
	    		</div>
	    	</div>
	    </div>
	</div>
</template>

<script>
export default {
  methods: {
    backRcommend: function () {
      this.$router.go(-1)
    },
    play: function (index) {
      let list = []
      this.topListData.songlist.forEach(item => {
        list.push({
          id: item.data.songid,
          mid: item.data.songmid,
          name: item.data.songorig,
          singer: item.data.singer,
          albummid: item.data.albummid
        })
      })
      this.$store.commit('setPlayList', {
        index: index,
        list: list
      })
      this.$store.commit('play')
    }
  },
  data: function () {
    return {
      topListData: null
    }
  },
  created: function () {
    this.$store.dispatch('getRankSongs', this.$route.params.id).then((res) => {
      this.topListData = res.data
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
		overflow: hidden;
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
		width: 100%;
		display: flex;
		position: absolute;
		left: 0;
		bottom: 0;
		color: #fff;
		padding-bottom: 20px;
		padding-left: 10px;
		background: linear-gradient(to top,#000,transparent);
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
		margin-right: 20px;
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
		background: #000;
	}
	.cd-list-item{
		overflow: hidden;
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
	.rank-ablbum{
		white-space: normal;
       overflow: hidden;
       text-overflow: ellipsis;
	}
	.rank-id{
		width: 20px;
		color: #fff;
		line-height: 50px;
		margin-right: 20px;
	}
</style>
