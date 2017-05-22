<template>
	<div id="recommend">
		<div class="swiper-container">
          <swiper :options="swiperOptionIn">
    	     <swiper-slide class="swiper-item" v-for='item in slider'>
    	     	<img v-lazy="item.pic" alt="" class="focus-img"/>
             </swiper-slide>

            <div class="swiper-pagination-white swiper-pagination-position" slot="pagination"></div>
    </swiper>
</div>
	    <div class="host-list">
	    	<div class="host-header">热门歌单</div>
	    	<div class="host-body">
	    	<div class="host-list-item" v-for="item in songList" @click="$router.push({name: 'cd',params: {id: item.dissid}})">
	    		<div class="host-img-wrap">
	    		<img class="host-list-item-bg-img" v-lazy="item.imgurl" alt="" />
	    		<div class="lisen-count">
	    			<img class="host-list-item-small-img" src="../assets/下载.svg" alt="" />
	    			<span class="count">{{item.listennum}}</span>
	    		</div>
	    		</div>
	    		<p class="list-name">{{item.dissname}}</p>
	    		<span class="list-author">{{item.author}}</span>
	    	</div>
	    </div>
	    </div>
	</div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data: function () {
    return {
      slider: [],
      songList: [],
      swiperOptionIn: {
        pagination: '.swiper-pagination-white',
        paginationClickable: true,
        autoplay: 1000
      }
    }
  },
  created: function () {
    this.$store.dispatch('getRecommands').then((response) => {
      this.slider = response.data.data.focus
      this.songList = response.data.data.hotdiss.list
    })
  }
}
</script>
<style>
.swiper-box{
		width: 100% !important;
		height: 100% !important;
	}
	.swiper-item{
		width: 100%;
		height: 100%;
	}
	.swiper-item img{
		width:100%;
		height: 184px;
	}
	.swiper-pagination-position {
         position: absolute;
         bottom: 0;
         z-index: 2;
         display: flex;
         justify-content: center;
      }
      .focus-img{
      	width: 100%;
      }
      .host-list{
      	margin-top: 10px;
      }
      .host-body{
      	display: flex;
      	flex-wrap: wrap;
      }
      .host-list-item{
      	width: 50%;
      }
      .host-header{
      	width: 100%;
      	height: 50px;
      	line-height: 50px;
      	text-align: center;
      	background: #fff;
      }
      .host-img-wrap{
      	position: relative;
      }
      .host-img-wrap .count{
      	color: #fff;
      	font-size: 10px;
      }
      .host-list-item-bg-img{
      	display: block;
      	width: 100%;
      }
      .lisen-count{
      position: absolute;
      bottom: 5px;
      left: 10px;
      z-index: 3;
      color: #E3E3E3;
      }
      .host-list-item-small-img{
      	width: 15px;
      }
      .host-list .list-name{
      	font-weight: 300;
      	font-size: 14px;
      	overflow: hidden;
      	white-space: nowrap;
      	text-overflow: ellipsis;
      	padding-left: 10px;
      }
     .host-list .list-author{
      font-size: 12px;
      font-weight: 50;
      color: #777;
      padding-left: 10px;
      }
      .host-list-item{
        padding-bottom: 10px;
      	background: #fff;
      	cursor: pointer;
      }
</style>
