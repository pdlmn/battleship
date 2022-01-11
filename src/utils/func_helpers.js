const checkTruthiness = (el) => Boolean(el)

const hasTruthyValues = (arr) => arr.some(checkTruthiness)

export { hasTruthyValues }
