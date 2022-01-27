import { Gameboard } from './gameboard'

const _randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const _getRandomCoords = () => {
  const y = _randomInteger(1, 10)
  const x = _randomInteger(1, 10)
  return [y, x]
}

const _getRandomPlane = () => {
  return _randomInteger(1, 2) === 1 ? 'horizontally' : 'vertically'
}

export const AiGameboard = () => {
  const gameboard = Gameboard()

  const _placeShipAtRandom = (size) => {
    const plane = _getRandomPlane()
    let [y, x] = _getRandomCoords()
    gameboard.setPlane(plane)
    while (!gameboard.isValid(y, x, size)) {
      [y, x] = _getRandomCoords()
    }
    gameboard.place(y, x, size)
  }

  const placeFleet = () => {
    let size = 5
    while (size > 0) {
      _placeShipAtRandom(size)
      size--
    }
  }

  return Object.assign(gameboard, {
    placeFleet
  })
}
