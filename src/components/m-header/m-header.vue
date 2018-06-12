<template>
  <div class="m-header">
    <!-- <div class="logo"></div> -->
    <div class="title">Wuzhc Music</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
.m-header
  display: relative
  text-align: center
  height: 44px
  color: $color-theme
  font-size: 0
.logo
  margin-top: 6px
  width: 30px
  height: 32px
  margin-right: 9px
  display: inline-block
  vertical-align: top
  bg-image('logo')
  background-size: 30px 32px
.title
  display: inline-block
  vertical-align: top
  line-height: 44px
  font-size: $font-size-large
</style>