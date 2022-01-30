import { Gameboard } from './gameboard'
import { getRandomInteger, getRandomCoords } from '../utils/helper_funcs'

const _getRandomPlane = () => {
  return randomInteger(1, 2) === 1 ? 'horizontally' : 'vertically'
}

export const AiGameboard = () => {
  const gameboard = Gameboard()

  const _placeShipAtRandom = (size) => {
    const plane = _getRandomPlane()
    let [y, x] = getRandomCoords()
    gameboard.setPlane(plane)
    while (!gameboard.isValid(y, x, size)) {
      [y, x] = getRandomCoords()
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
