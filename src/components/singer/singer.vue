<template>
	<div class="singer">
    <list-view :data="singerList" @selectItem="selectItem"></list-view>
    <router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
  import ListView from 'base/listview/listview'
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import {SET_SINGER} from 'store/mutation-types'

  import {mapGetters, mapMutations} from 'vuex'

  const HOT_NAME = '热'
  const HOT_SINGER_LENGTH = 10

	export default {
    components: {
      ListView
    },
    data() {
        return {
          singerList: []
        }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      ...mapMutations({
        setSinger: SET_SINGER
      }),
      selectItem(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code == ERR_OK) {
            this.singerList = this._normalizeSinger(res.data.list)
            // console.log(res.data.list)
          }
        });
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }

        list.forEach((item, index) => {
          if (index < HOT_SINGER_LENGTH) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid, 
              name: item.Fsinger_name
            }));
          } else {
            if (!map[item.Findex]) {
              map[item.Findex] = {
                title: item.Findex,
                items: []
              }
            }
            map[item.Findex].items.push(new Singer({
              id: item.Fsinger_mid, 
              name: item.Fsinger_name
            }))
          }
        });

        let hot = []
        let letter = []

        Object.keys(map).forEach(key => {
          if (key == 'hot') {
            hot.push(map[key])
          } else if (/[A-Za-z]/.test(key)) {
            letter.push(map[key])
          }
        })

        letter.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })

        return hot.concat(letter)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
  overflow: hidden
  .singer-search
    height: 10%
    display: flex
    justify-content: center
    align-items: center
    input
      height: 35px
      width: 90%
  
</style>