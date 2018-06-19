<template>
  <transition name="slide">
    <music-list :title="title" :bgImg="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters,mapState} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import {getSongVkey} from 'api/song'

  export default {
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.portrait
      },
      ...mapGetters([
          'singer'
        ])
    },
    data() {
      return {
        songs: ['ssss']
      };
    },
    created() {
      this._getSingerDetail(this.singer.id)
    },
    methods: {
      _getSingerDetail(singerID) {
        getSingerDetail(singerID).then((res) => {
          if (res.code == ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
        console.log(this.songs)
      },
      _normalizeSongs(list) {
        let songData = []
        list.forEach((item) => {
          let {musicData} = item
          // getSongVkey(musicData.songmid).then((res) => {
            // songData.push(createSong(musicData, res.data.items[0].vkey))
          // })
          songData.push(createSong(musicData, 'res.data.items[0].vkey'))
        })
        return songData
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable" 
  .slide-enter,.slide-leave-to
    transform: translate3d(100%, 0, 0)
    
  .slide-enter-active,.slider-leave-active
    transition: all .3s
</style>