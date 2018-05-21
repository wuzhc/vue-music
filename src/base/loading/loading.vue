<template>
  <div class="loading">
    <img src="./loading.gif">
    <p class="title">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: 'loading...'
      }
    } 
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import '~common/stylus/variable'
  
  .loading
    width: 100%
    text-aligin: center
    .title
      font-size: $font-size-medium 
</style>