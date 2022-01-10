const checkTruthiness = (el) => Boolean(el)
const areArrValuesTruthy = (arr) => arr.some(checkTruthiness)

export { areArrValuesTruthy }
