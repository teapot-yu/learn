function getParams(url) {
  let paramsArr = url.subString(usr.indexOf('?') + 1).split('&')
  let result = {}
  paramsArr.forEach(item => {
    const itemArr = item.split('=')
    result[itemArr[0]] = itemArr[1]
  })
  return result
}

const getURLParameters = url => url.match(/([^?=&]+)(=([^&]*))/g).reduce((a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
);

function trim(str) {
  return str.replace(/^\s+|\s*$/g, '');
}

console.log(getURLParameters('asfdas?a=1&b=2&c=3'))
