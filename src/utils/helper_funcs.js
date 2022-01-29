const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const getRandomCoords = () => {
  const y = randomInteger(1, 10)
  const x = randomInteger(1, 10)
  return [y, x]
}

export { randomInteger, getRandomCoords }
