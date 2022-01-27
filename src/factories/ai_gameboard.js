import { Gameboard } from './gameboard'

const _randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const _getRandomCoords = () => {
  const y = _randomInteger(1, 10)
  const x = _randomInteger(1, 10)
  return [y, x]
}

export const AiGameboard = () => {
  const gameboard = Gameboard()

  const placeShipAtRandom = (size) => {
    let [y, x] = _getRandomCoords()
    while (!gameboard.isValid(y, x, size)) {
      [y, x] = _getRandomCoords()
    }
    gameboard.place(y, x, size)
  }

  return Object.assign(gameboard, {
    placeShipAtRandom
  })
}
