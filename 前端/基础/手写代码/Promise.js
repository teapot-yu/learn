// https://github.com/YvetteLau/Blog/issues/2
// https://github.com/xieranmaya/blog/issues/3
// https://mp.weixin.qq.com/s/vFluh-_5ou0a_PnfLZacpA


function resolvePromsie(promsie2, x, resolve, reject) {
  if (x === promsie2) {
    return reject(new Error('is cycle promise'))
  }
  if (x instanceof Promise) {
    if (this.status === PENDING) {
      x.then((v) => resolvePromsie(promsie2, v, resolve, reject))
    } else {
      x.then(resolve, reject)
    }
  } else {
    resolve(x)
  }
}