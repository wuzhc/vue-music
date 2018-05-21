<template>
  <div class="warpper" ref="warpper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll' 

  export default {
    mounted() {
      this.$nextTick(() => {
        this._initBScroll()
      })
    },
    methods: {
      _initBScroll() {
        if (!this.$refs.wrapper) {
          return
        }

        this.scroll = new BScroll(this.$refs.warpper, {
          probeType: 1
        })
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  
</style>