<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(item,index) in data">
        <div class="rank">
          <!-- <span>{{'[' + (index + 1) + ']'}}</span> -->
        </div>
        <div class="content">
          <h2 class="name" v-html="item.name"></h2>
          <p class="desc" v-html="item.album"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    created() {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  .song-list
    padding: 20px 10px
    .item
      display: flex
      // align-content: space-around
      height: 45px
      margin-bottom: 10px
      box-sizing: border-box
      .rank
        flex: 0 1 auto
        padding-left: 10px
      .content
        padding-left: 10px
        flex: auto
        display: flex
        flex-flow: column nowrap
        justify-content: space-around
        .name
          // font-size: $font-size-medium
        .desc
          font-size: $font-size-small-s
          color: $color-text-d
          
        
</style>