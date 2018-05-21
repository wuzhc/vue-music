import originJSON from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') > 0 ? '&' : '?') + querystring(data)
  return new Promise((resolve, reject) => {
    originJSON(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    })
  });
}

function querystring(data) {
  var querystring = '';
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    querystring += `&${k}=${encodeURIComponent(value)}`;
  }
  return querystring ? querystring.substring(1) : '';
}
