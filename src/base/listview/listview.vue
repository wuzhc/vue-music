<template>
  <scroll class="scroll-div" 
  :data="data" 
  :listenScroll="listenScroll"
  :probeType="probeType"
  @scroll="scroll"
  ref="listview">
  <div class="singer-list">
    <!-- 一个分类begin -->
    <div class="item" v-for="(group, index) in data" ref="listGroup">
      <h2>{{group.title}}</h2>
      <!-- 歌手begin -->
      <div class="singer-one" v-for="singer in group.items" @click="selectItem(singer)">
        <div class="portrait">
          <img v-lazy="singer.portrait" width="50" height="50">
        </div>
        <div class="info">
          <div class="name">{{singer.name}}</div>
          <div class="desc">{{singer.name}}</div>
        </div>
      </div>
      <!-- 歌手end -->
    </div>
    <!-- 一个分类end -->
  </div>

  <!-- 固定导航start -->
  <div class="fix-nav" v-show="fixedTitle" ref="fixed">
    <h2>{{fixedTitle}}</h2>
  </div>
  <!-- 固定导航end -->

  <!-- 快捷导航start -->
  <div class="fix-short" 
   @touchstart.stop.prevent="onShortcutTouchStart"
   @touchmove.stop.prevent="onShortcutTouchMove"
   @touchend.stop>
    <ul>
      <li v-for="(item,index) in shortcutList" 
      :data-index="index" 
      :class="{'on':index===currentIndex}" :curindex="currentIndex">{{item}}</li>
    </ul>
  </div>
  <!-- 快捷导航end -->

  <!-- 加载中begin -->
  <div class="loading-container" v-show="!data.length">
      <loading></loading>
  </div>
  <!-- 加载中end -->

  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

const TITLE_HEIGHT = 32

export default {
  components: {
    Scroll,
    Loading
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  computed: {
    // 快捷导航列表计算属性
    shortcutList() {
      return this.data.map(res => {
        return res.title
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    selectItem(singer) {
      this.$emit('selectItem', singer)
    },
    // 触摸开始点击
    onShortcutTouchStart(e) {
      let touchIndex = e.target.getAttribute('data-index')  // shortcut当前索引
      this.touch.y1 = e.touches[0].pageY                    // 记录第一次触摸点位置
      this.touch.index = touchIndex                         // 记录触摸点开始索引
      this._scrollTo(touchIndex)
      // this.currentIndex = touchIndex * 1
    },
    // 触摸移动
    onShortcutTouchMove(e) {
      let offset = (e.touches[0].pageY - this.touch.y1) / 21 | 0
      let index = this.touch.index * 1 + offset
      this._scrollTo(index)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    // 计算列表每个区间的高度
    _calculateHeight() {
      this.listHeight.push(0)
      let height = 0
      for (let i = 0; i < this.data.length; i++) {
        height += this.$refs.listGroup[i].clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    scrollY(y) {
      let listHeight = this.listHeight
      if (y >= 0) {
        this.currentIndex = 0
      } else if (-y > 0 || -y < listHeight[listHeight.length - 1]) {
        for (let i = 0; i < listHeight.length - 1; i++) {
          if (-y >= listHeight[i] && -y < listHeight[i+1]) {
            this.currentIndex = i
            this.diff = listHeight[i+1] + y
            break
          }
        }
      } else {
        this.currentIndex = listHeight.length - 2
      }
    },
    data() {
      this.$nextTick(() => {
        this._calculateHeight()
      })
    },
    diff(v) {
        let fixedTop = (v > 0 && v < TITLE_HEIGHT) ? v - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return ;
        }  
        console.log(fixedTop)
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  }
}  
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.scroll-div
  height: 100%
  overflow: hidden
  .singer-list
    .item
      border-size: border-box
      h2
        background: $color-highlight-background
        height: 32px
        line-height: 32px
        padding-left: 20px
      .singer-one
        display: flex
        padding: 8px 5px
        .portrait
          flex: 0 1 80px
          width: 80px
          text-align: center
          img
            border-radius: 30px
        .info
          flex: 1
          display: flex
          flex-direction: column
          justify-content: space-around
          overflow: hidden
          .desc
            color: $color-text-d
            font-size: $font-size-small-s
          .name
            color: $color-text
  .fix-short
    position: fixed
    right: 0
    top: 160px
    ul
      background: $color-background-d
      li
        width: 22px
        height: 21px
        line-height: 21px
        color: $color-text
        font-size: $font-size-smalls
        text-align: center
        &.on
          background: #fff
          color: #000
  .fix-nav
    position: absolute
    top: 0
    width: 100%
    h2
      background: $color-highlight-background
      height: 32px
      line-height: 32px
      padding-left: 20px
  .loading-container
      position: absolute
      top: 45%
      width: 100%
      text-align: center
</style>