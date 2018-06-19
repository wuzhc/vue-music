import originJSON from 'jsonp'

export default function jsonp(url, params, option) {
  url += (url.indexOf('?') > 0 ? '&' : '?') + querystring(params)
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

function querystring(params) {
  if (!params) {
    return '';
  }
  
  var querystring = '';
  for (let k in params) {
    let value = params[k] !== undefined ? params[k] : '';
    querystring += `&${k}=${encodeURIComponent(value)}`;
  }
  return querystring ? querystring.substring(1) : '';
}
