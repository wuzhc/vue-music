export default class Singer {
  constructor({ id, name }) {
    this.id = id
    this.name = name
    this.portrait = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }

  getInfo() {
    console.log(this.id, this.name, this.portrait);
  }
}
