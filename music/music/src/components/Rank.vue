<template>
	<div id="rank">
		<div class="rank-item" v-for="item in rankList" @click="$router.push({name:'rankpage',params:{id:item.id}})">
			<div class="rank-img-wrap">
				<img class="rank-music-img" v-lazy="item.picUrl" alt="" />
				<span class="rank-num">{{item.listenCount | listenCount}}</span>
			</div>
			 <div class="rank-info">
			 	<h4>{{item.topTitle}}</h4>
			 	<p v-for="(song,index) in item.songList"><span class="rank-music-index">{{index+1}}</span><span>{{song.songname}}</span><span class="rank-author">-{{song.singername}}</span></p>
			 	
			 </div>
		</div>
	</div>
</template>

<script>
export default{
  data: function () {
    return {
      rankList: []
    }
  },
  created: function () {
    this.$store.dispatch('getRankList').then((res) => {
      this.rankList = res.data.data.topList
    })
  },
  filters: {
    listenCount: count => {
      return Math.round(count / 1000) / 10 + '万'
    }
  }
}
</script>
<style>
	#rank{
		background: #E3E3E3;
		padding: 10px;
		height: 100%;
	}
	.rank-item{
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		margin-bottom: 10px;
		background: #fff;
		cursor: pointer;
	}
	.rank-img-wrap{
		position: relative;
		width: 100px;
		height: 100px;
	}
	.rank-img-wrap .rank-music-img{
		width: 100px;
		height: 100px;
		
	}
	.rank-img-wrap .rank-num{
		position: absolute;
		left: 5px;
		bottom: 10px;
		font-size: 10px;
		color: #fff;
	}
	.rank-info{
		flex: 1;
		padding-left: 10px;
		padding-top: 10px;
	}
	.rank-info h4{
		font-weight: 300;
	}
	.rank-info span{
		font-size: 14px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.rank-info .rank-music-index{
		padding-right: 4px;
	}
	.rank-info .rank-author{
		color: #8f8f8f;
	}
</style>
