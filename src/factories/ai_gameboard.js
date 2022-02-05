import { Gameboard } from './gameboard'
import { getRandomInteger, getRandomCoords } from '../utils/helper_funcs'

/* AiGameboard factory for gameboards controlled by an ai.
 * Those objects have methods that help AI to play the game,
 * like for placing random ships across virtual board. */

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
    const sizes = [5, 4, 3, 2, 2]
    for (let size of sizes) {
      _placeShipAtRandom(size)
    }
  }

  return Object.assign(gameboard, {
    placeFleet
  })
}
