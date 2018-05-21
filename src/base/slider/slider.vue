<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(item,index) in dots" :class="{active: currentPageIndex === index}"></span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'

export default {
	name: 'slider',
	props: {
		loop: {
			type: Boolean,
			default: true
		},
		autoPlay: {
			type: Boolean,
			default: true
		},
		interval: {
			type: Number,
			default: 2000
		}
	},
	data() {
		return {
			dots: [],
			currentPageIndex: 0
		}
	},
	created() {
	},
	mounted() {
		this.$nextTick(() => {
			this._initSliderWidth()
			this._initDots()
			this._initSlider()

			if (this.autoPlay) {
				this._play()
			}
		})

		window.addEventListener('resize', () => {
			if (!this.slider) {
				return ;
			}
			this._initSliderWidth(true)
		})
	},
	methods: {
		_initSliderWidth(isResize) {
			let width = 0
			let sliderWidth = this.$refs.slider.clientWidth
			this.children = this.$refs.sliderGroup.children

			for (let i = this.children.length - 1; i >= 0; i--) {
				let child = this.children[i]
				addClass(child, 'slider-item')
				child.style.width = sliderWidth + 'px'
				width += sliderWidth
			}

			// 一开始是5个chilren,BScroll实例化后变为7个,这时候重新监控就不需要加2了
			if (this.loop && !isResize) {
				width += 2 * sliderWidth
			}

			this.$refs.sliderGroup.style.width = width + 'px'
		},	
		_initSlider() {
			this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })

      this.slider.on('scrollEnd', () => {
      	let pageIndex = this.slider.getCurrentPage().pageX
      	if (this.loop) {
      		pageIndex -= 1
      	}
      	this.currentPageIndex = pageIndex

      	if (this.autoPlay) {
      		clearTimeout(this.timer)
      		this._play()
      	}
      })
		},
		_initDots() {
			this.dots = new Array(this.children.length)
		},
		_play() {
			let nextPage = this.currentPageIndex + 1
			if (this.loop) {
				nextPage += 1
			}
			this.timer = setTimeout(() => {
				this.slider.goToPage(nextPage, 0, 400)
			}, this.interval);
		}
	},
	destroyed() {
		clearTimeout(this.timer);
	}
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import "~common/stylus/variable"

.slider
	min-height: 1px
	position: relative
	.slider-group
		position: relative
		overflow: hidden
		white-space: nowrap
		.slider-item
			box-sizing: border-box
			overflow: hidden
			text-align: center
			float: left
			a
				display: block
				width: 100%
				overflow: hidden
				text-decoration: none
			img
				display: block
				width: 100%
	.dots
		position: absolute
		right: 0
		left: 0
		bottom: 12px
		text-align: center
		.dot 
			display: inline-block
			margin: 0 4px
			width: 8px
			height: 8px
			border-radius: 50%
			background: $color-text-l
			&.active
				width: 20px
				border-radius: 5px
				background: $color-text-ll
		
</style>