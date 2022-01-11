const checkTruthiness = (el) => Boolean(el)

const hasTruthyValues = (arr) => arr.some(checkTruthiness)

const replaceEveryNth = (nth, value, until) => (arr) => {
  const result = [...arr]
  for (let i = nth - 1; i < until || arr.length; i += nth) {
    result[i] = value
  }
  return result
}

export { hasTruthyValues, replaceEveryNth }
