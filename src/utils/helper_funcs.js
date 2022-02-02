const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const getRandomCoords = () => {
  const y = getRandomInteger(1, 10)
  const x = getRandomInteger(1, 10)
  return { y, x }
}

const delay = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export { getRandomInteger, getRandomCoords, delay }
