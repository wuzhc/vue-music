<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll' 

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      data: {
        type: Array,
        default: null 
      },
      listenScroll: {
        type: Boolean,
        default: false
      }
    },
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

        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType
        })

        // 监听scroll滚动
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        this.$nextTick(() => {
          this.refresh()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  
</style>