const curry = (fn) => {
  return function curried (...args) {
    if (fn.length !== args.length) {
      return curried.bind(null, ...args)
    }
    return fn(...args)
  }
}

const checkTruthiness = (el) => Boolean(el)

const hasTruthyValues = (arr) => arr.some(checkTruthiness)

const replaceEveryNth = curry((nth, start, until, value, arr) => {
  const result = [...arr]
  const s = (typeof start === 'number') ? start : nth - 1
  const l = until || arr.length
  for (let i = s; i < l; i += nth) {
    result[i] = value
  }
  return result
})

const replaceAt = curry((index, value, arr) => {
  const result = [...arr]
  result[index] = value
  return result
})

const map = curry((fn, functor) => {
  let result
  switch (Object.prototype.toString.call(functor)) {
    case '[object Array]':
      result = []
      for (const item of functor) {
        result.push(fn(item))
      }
      return result
    case '[object Object]':
      result = {}
      for (const prop of Object.keys(functor)) {
        result[prop] = fn(functor[prop])
      }
      return result
  }
})

const pipe = (...functions) =>
  (value) => functions.reduce((acc, fn) => fn(acc), value)

const decrement = map((n) => n - 1)

const repeat = curry((num, value) => {
  const result = []
  let i = 0
  while (i < num) {
    result[i] = value
    i++
  }
  return result
})

export { hasTruthyValues, replaceEveryNth, replaceAt, pipe, map, curry, decrement, repeat }
