import jsonp from 'common/js/jsonp'
import {commonParams, options} from 'api/config'
import axios from 'axios'

export function getSongVkey(songmid) {
  const data = Object.assign({}, commonParams, {
    g_tk: 1288794082,
    loginUin: 2010504188,
    hostUin:0, 
    platform:'yqq',
    needNewCode:0,
    cid:205361747,
    uin:2010504188,
    songmid:songmid,
    filename:'C400'+songmid+'.m4a',
    guid:3392836028
  })

  return axios.get('/api/getSongVkey', {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}