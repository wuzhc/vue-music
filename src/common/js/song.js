export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
} 

export function createSong(musicData, vkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${vkey}&guid=3392836028&uin=2010504188&fromtag=66`
  })
}

function filterSinger(singer) {
  let singerData = []
  let len = singer.length

  if (len == 0) {
    return ''
  }

  for (let i = 0; i < len; i++) {
    singerData.push(singer[i].name)
  }

  return singerData.join('/')
}