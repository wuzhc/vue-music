<template>
  <div class="singer-detatil">
    <div class="back" @click="goBack">
      <b>返回</b>
    </div>
    <div class="title" v-html="title"></div>
    <div class="singer-top" :style="bgStyle" ref="bgStyle"> 
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="bgLayer"></div>
    <scroll class="song-content" ref="songContent" 
    :data="songs"
    :probeType="probeType"
    :listenScroll="listenScroll"
    @scroll="scroll">
      <song-list :data="songs"></song-list>
      <!-- 加载动画 -->
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
      <!-- 加载动画end -->
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import SongList from 'base/song-list/song-list'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'

  const TITLE_HEIGHT = 40

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      bgImg: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    methods: {
      goBack() {
        console.log('go back')
        this.$router.back()
      },
      scroll(pos) {
        let height = pos.y
        if (this.imageHeight + height < TITLE_HEIGHT) {
          height = -(this.imageHeight - TITLE_HEIGHT)
          this.$refs.bgStyle.style.zIndex = 1
          this.$refs.bgStyle.style.paddingTop = `${TITLE_HEIGHT}px`
        } else {
        console.log(height)
          this.$refs.bgStyle.style.zIndex = 0
          this.$refs.bgStyle.style.paddingTop = '70%'
        }

        let blur = 0
        let percent = Math.abs(pos.y / this.imageHeight)
        if (pos.y > 0) {
          let scale = 1 + percent 
          this.$refs.bgStyle.style.transform = `scale(${scale})` 
        } else {
          let blur = Math.min(20, percent * 20) 
        }

        this.$refs.filter.style.backdrop = `blur(${blur})`
        this.$refs.bgLayer.style['transform'] = `translate3d(0,${height}px,0)`
      }
    },
    mounted() {
      this.imageHeight = this.$refs.bgStyle.clientHeight
      this.$refs.songContent.$el.style.top = `${this.imageHeight}px` 
      // this.$refs.bgLayer.style.top = `${this.imageHeight}px`
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImg})`
      }
    },
    watch: {
      songs() {
        console.log('songs refresh')
        console.log(this.songs)
      }
    },
    components: {
      SongList,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
 .singer-detatil
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  z-index: 100
  overflow: hidden
  background: $color-background
  .back 
    position: fixed
    top: 0
    left: 20px
    height: 35px
    line-height: 35px
    z-index: 50
    color: $color-theme
    b
      font-size: $font-size-medium
  .title
    position: fixed
    top: 0
    width: 100%
    height: 40px
    z-index: 40
    line-height: 40px
    text-align: center
    font-size: 20px
    font-weight: bold
    color: $color-theme
  .singer-top
    position: relative
    width: 100%
    padding-top: 70%
    z-index: 0
    background-size: cover
    .filter
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 1
      background: rgba(7, 17, 27, 0.4)
  .bg-layer
    position: relative
    width: 100%
    height: 100%
    background: $color-background
  .song-content
    width: 100%
    position: fixed
    bottom: 0
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      text-align: center
</style>