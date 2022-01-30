const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const getRandomCoords = () => {
  const y = getRandomInteger(1, 10)
  const x = getRandomInteger(1, 10)
  return [y, x]
}

export { getRandomInteger, getRandomCoords }
