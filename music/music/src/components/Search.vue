<template>
	<div id="search">
		<div class="search">
			<div class="search-input">
				<img :src="searchIco" alt="" />
				<form @submit.prevent="search(key)">
					<input type="text" v-model="key" placeholder="搜索 歌曲/专辑/歌手" @focus="focus()"/>
				</form>
			</div>
			<div class="search-cancel" v-show="showSearchPage" @click="cancelSearchPage()">
				<span>取消</span>
			</div>
		</div>
	    <div class="hot-key" v-if="searchRes == null&&showSearchPage==true">
	    	<div class="search-history">
	    	<ul>
	    		<li class="search-history-item" v-for='item in searchHistory'>{{item}}</li>
	    	</ul>
	    	</div>
	    	<ul>
	    		<li class="hot-key-item" v-for="(item,index) in hotkeyList" @click='search(item.k)'>
	    			<span>{{index+1}}</span>
	    			<p class="hot-name">{{item.k}}</p>
	    			<span>{{item.n}}</span>
	    		</li>
	    	</ul>
	    	
	    </div>
	    <div class="show-search-result" v-if="searchRes !=null&&showSearchPage==true">
	    	<div class="result-group" v-if="searchRes.song!=null">
	    		
	    		<div class="group-head">
	    			<img src="../assets/icon-music.png"></img>
	    			<p>单曲</p>
	    		</div>
	    		<div class="group-body">
	    			<div class="song-item"  v-for="(item, index) in searchRes.song.itemlist" @click='play(index)'>
	    					<p class="result-title">{{item.name}}</p>
	    					<p class="result-author">-{{item.singer}}</p>
	    					<div class="result-btn-menu">
	    						<img src="../assets/icon-...black.png" alt="" />
	    					</div>
	    			</div>
	    		</div>
	    		</div>
	    	<div class="result-group" v-if="searchRes.album!=null">
	    		<div class="group-head">
	    			<img src="../assets/icon-album.png"></img>
	    			<p>专辑</p>
	    		</div>
	    		<div class="group-body">
	    			<div class="album-item tb-item" v-for="item in searchRes.album.itemlist">
	    				<img v-lazy="item.pic" alt="" class="left-img"/>
	    				<div class="tb-info">
	    				<p class="tb-title">{{item.name}}</p>
	    				<p class="tb-author">{{item.singer}}</p>
	    				</div>
	    			</div>
	    		</div>
	    		</div>
	    	<div class="result-group">
	    		<div class="group-head">
	    			<img src="../assets/icon-album.png" class="left-img-bg"></img>
	    			<p>歌手</p>
	    		</div>
	    		<div class="group-body" v-if="searchRes.singer!=null">
	    			<div class="author-item" v-for="item in searchRes.singer.itemlist">
	    				<img v-lazy="item.pic" alt="" class="left-img"/>
	    				<p class="author-name">{{item.name}}</p>
	    				</div>
	    			</div>
	    	</div>
	    	<div class="result-group" v-if="searchRes.mv!=null">
	    		<div class="group-head">
	    			<img src="../assets/icon-album.png"></img>
	    			<p>MV</p>
	    		</div>
	    		<div class="group-body">
	    			<div class="mv-item tb-item" v-for="item in searchRes.mv.itemlist">	    			
	    				<div class="tb-info">
	    				<p class="tb-title">{{item.name}}</p>
	    				<p class="tb-author">{{item.singer}}</p>
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	    	
	    
	    
	    </div>
	    </div>
	</div>
</template>

<script>
export default {
  data: function () {
    return {
      searchHistory: [],
      key: '',
      searchRes: null,
      hotkeyList: [],
      showSearchPage: false,
      searchIco: require('../assets/icon-search.png')
    }
  },
  methods: {
    search: function (key) {
      this.$store.dispatch('search', key).then((response) => {
        this.searchRes = response.data.data
        var indexHasKey = this.searchHistory.indexOf(key)
        if (indexHasKey !== -1) {
          this.searchHistory.splice(indexHasKey, 1)
        }
        this.searchHistory.unshift(key)
        this.searchHistory = this.searchHistory.slice(0, 4)
        localStorage.searchHistory = JSON.stringify(this.searchHistory)
      })
    },
    focus: function () {
      this.showSearchPage = true
      this.$emit('searchHidden')
    },
    cancelSearchPage: function () {
      this.showSearchPage = false
      this.key = ''
      this.$emit('searchShow')
      this.searchRes = null
    },
    play: function (index) {
      this.$store.commit('setPlayList', {
        index: index,
        list: this.searchRes.song.itemlist
      })
    }
  },
  created: function () {
    this.$store.dispatch('getHotkey').then((response) => {
      this.hotkeyList = response.data.data.hotkey.slice(0, 5)
    })
    if (localStorage.searchHistory) {
      this.searchHistory = JSON.parse(localStorage.searchHistory)
    }
  }
}
</script>

<style>
	#search{
		
	}
  .search{
  	
  	display: flex;
  	padding: 10px;
  	border-bottom: 1px solid #eee;
  }
  .search-input{
  	display: flex;
  	height: 40px;
  	flex: 1;
  	border-radius: 5px;
  	background: #eee;
  }
  .search-input img{
  	width: 30px;
  	height: 30px;
  	margin:5px;
  }
  .search-input form{
  	flex: 1;
  }
  .search-input input{
  	width: 100%;
  	height: 40px;
  	border: none;
  	outline: none;
  	background: #eee;
  }
  .search-cancel{
  	margin-left: 5px;
  	width: 40px;
  	height: 40px;
  	text-align: center;
  	cursor: pointer;
  	
  }
  .search-cancel span{
  	line-height: 40px;
  }
  .hot-key{
  	
  }
  .search-history{
  	display: flex;
  	border-bottom: 1px solid #eee;
  	padding: 10px;
  }
  .search-history ul{
  	display: flex;
  }
  .hot-key .search-history-item{
  	height: 20px;
  	line-height: 20px;
  	margin-right: 20px;
  	padding: 0 10px;
  	border-radius: 15%;
  	border: 1px solid #000;
  	cursor: pointer;
  }
  .hot-key-item{
  	cursor: pointer;
  	display: flex;
  	border-bottom: 1px solid #eee;
  	padding: 0 10px;
  }
  .hot-key-item span{
  	line-height: 40px;
  }
  .hot-key-item .hot-name{
  	flex: 1;
  	padding-left: 10px;
  	line-height: 40px;
  }
  .result-group{
   
  }
  .result-group .group-head{
  	display: flex;
  	align-items: center;
  	justify-content: flex-start;
  	height: 50px;
    padding-left: 10px;
  	background: #E3E3E3;
  }
  .left-img-bg{
  	width: 25px;
  	height: 25px;
  	padding-right: 4px;
  }
  .result-group .group-head img{
  	width: 25px;
  	height: 25px;
  	padding-right: 4px;
  }
  .result-group .group-head p{
  	
  }
  .song-item{
  	display: flex;
  	height: 40px;
  	padding:0 10px;
  	align-items: center;
  	border-bottom: 1px solid #E3E3E3;
  	cursor: pointer;
  }
  .result-author{
  	flex: 1;
  }
  .result-btn-menu img{
  	width: 25px;
  	height: 25px;
  }
  .tb-item{
  	padding: 10px 0;
  	border-bottom: 1px solid #E3E3E3;
  	display: flex;
  }
  .album-item{
  	
  }
  .tb-title{
  	height: 20px;
  	font-size: 0.7em;
  	line-height: 20px;
  	font-weight: bold;
  }
  .tb-author{
  	height: 20px;
  	line-height: 20px;
  	font-size: 0.7em;
  }
  .author-item{
  	padding: 10px 0;
  	border-bottom: 1px solid #E3E3E3;
  	display: flex;
  }
  .author-item .author-name{
  	line-height: 40px;
  }
  .left-img{
  	width: 40px;
  	height: 40px;
  	padding: 0 10px;
  }
  .mv-name{
  	line-height: 30px;
  }
  .mv-author{
  	line-height: 10px;
  }
  .mv-item{
  	padding-left: 10px;
  }
</style>
