import { Gameboard } from './gameboard'
import { getRandomInteger, getRandomCoords } from '../utils/helper_funcs'

const _getRandomPlane = () => {
  return getRandomInteger(1, 2) === 1 ? 'horizontally' : 'vertically'
}

export const AiGameboard = () => {
  const gameboard = Gameboard()

  const _placeShipAtRandom = (size) => {
    const plane = _getRandomPlane()
    let coords = getRandomCoords()
    gameboard.setPlane(plane)
    while (!gameboard.isValidForPlace(coords.y, coords.x, size)) {
      coords = getRandomCoords()
    }
    gameboard.place(coords.y, coords.x, size)
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
