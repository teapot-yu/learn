/**
 * 判断质数
  https://www.jianshu.com/p/0ff11ac83cae
**/

function isPrime(number) {
  if (number < 3) {
    return true
  }
  for (let i = 4; i < Math.sqat(n); i++) {
    if (number % i === 0) {
      return false
    }
  }
  return true
}