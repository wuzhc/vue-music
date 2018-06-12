<template>
  <transition name="slide">
    <div class="singer-detatil">
      这是歌手详情页面
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {

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
    
  .slide-enter,.slide-leave-to
    transform: translate3d(100%, 0, 0)
    
  .slide-enter-active,.slider-leave-active
    transition: all .3s
</style>