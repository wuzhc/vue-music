import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    _: 1526209722516
  });

  return jsonp(url, data, options);
}

export function getDiscList() {
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    format: 'json',
    rnd: Math.random()
  })

  return axios.get('/api/getDiscList', {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
