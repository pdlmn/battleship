const checkTruthiness = (el) => Boolean(el)

const hasTruthyValues = (arr) => arr.some(checkTruthiness)

const replaceEveryNth = (nth, value, until) => 
  (arr) => {
    const result = [...arr]
    const l = until || arr.length
    for (let i = nth - 1; i < l; i += nth) {
      result[i] = value
    }
    return result
  }

const replaceAt = (index, value) =>
  (arr) => {
    const result = [...arr]
    result[index] = value
    return result
  }

const map = (fn, arr) => arr.map(fn)

const pipe = (...functions) => 
  (value) => functions.reduce((acc, fn) => fn(acc), value)

export { hasTruthyValues, replaceEveryNth, replaceAt, pipe, map }
