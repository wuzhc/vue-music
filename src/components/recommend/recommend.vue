<template>
	<div class="recommend">
		<scroll class="recommend-content" :data="discList" ref="scroll">
			<div>
				<!-- 轮播图start -->
				<div class="recommend-slider">
					<div v-if="recommends.length" class="slider-wrapper">
						<slider>
							<div v-for="item in recommends">
								<a :href="item.linkUrl">
									<img :src="item.picUrl" @load="loadImg">
								</a>
							</div>
					</slider>
				</div>
				</div>
				<!-- 轮播图end -->
				<!-- 推荐列表start -->
				<div class="recommend-list">
					<h1 class="list-title">推荐歌单</h1>
					<ul v-for="item in discList">
						<li class="recommend-item">
							<div class="icon">
								<img width="60" height="60" v-lazy="item.imgurl">
					    </div>
			        <div class="text">
			            <h2 class="name" v-html="item.creator.name"></h2>
			            <p class="desc" v-html="item.dissname"></p>
			        </div>
						</li>
					</ul>
				</div>
				<!-- 推荐列表end -->
			</div> 
			<!-- 加载动画 -->
			<div class="loading-container" v-show="!discList.length">
				<loading></loading>
			</div>
			<!-- 加载动画end -->
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
import {ERR_OK} from 'api/config'
import {getRecommend,getDiscList} from 'api/recommend'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'

export default {
	data() {
		return {
			recommends: [],
			discList: []
		};
	},
	created() {
		this._getRecommend()
		this._getDiscList()
	},
	methods: {
		_getRecommend() {
			getRecommend().then((res) => {
				if (res.code === ERR_OK) {
					this.recommends = res.data.slider
				}
			});
		},
		_getDiscList() {
			getDiscList().then((res) => {
				if (res.code === ERR_OK) {
					this.discList = res.data.list
				}
			})
		},
		loadImg() {
			if (!this.loadImgFlag) {
				this.$refs.scroll.refresh()
				this.loadImgFlag = true
			}
		}
	},
	components: {
		Slider,
		Loading,
		Scroll
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.recommend
	position: fixed
	width: 100%
	top: 88px
	bottom: 0
	.recommend-content
		height: 100%
		overflow: hidden
		.recommend-list
			.list-title
				text-align: center
				line-height: 65px
				color: $color-theme
			.recommend-item
				display: flex
				box-sizing: border-box
				align-items: center
				padding: 0 20px 20px 20px
				.icon
					flex: 0 0 60px
					width: 60px
					padding-right: 20px
				.text
					display: flex
					flex-direction: column
					justify-content: center
					flex: 1
					line-height: 20px
					overflow: hidden
					font-size: $font-size-medium
					.name
						margin-bottom: 10px
						color: $color-text
					.desc
						color: $color-text-d
		.loading-container
			position: absolute
			top: 50%
			width: 100%
			text-align: center
			
			
			
</style>