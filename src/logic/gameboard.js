import * as H from '../utils/func_helpers'
import { Ship } from './ships'

const _createGameBoard = () => 
  H.repeat(() => H.repeat(() => 'w', 10), 10)

const _fillRow = (headX, headY, tailY, board) => {
  const result = [...board]
  for (let i = headY; i < tailY; i++) {
    result[headX][i] = 's'
  }
  return result
}

const _fillColumn = (headX, tailX, headY, board) => {
  const result = [...board]
  for (let i = headX; i < tailX; i++) {
    result[i][headY] = 's'
  }
  return result
}

const Gameboard = () => {
  const fleet = []
  let board = _createGameBoard()

  const place = (size, headX, headY) => {
    // decrement so that coords would match array indexes
    return {
      horizontally () {
        const tailY = headY + size
        const ship = Ship(size, headX, headY, 'horizontally')
        fleet.push(ship)
        board = _fillRow(headX, headY, tailY, board)
      },

      vertically () {
        ship.tailCoords = { x: (headX + ship.size - 1), y: headY }
        const { x: tailX } = ship.tailCoords
        board = _fillColumn(headX, tailX, headY, board)
      }
    }
  }

  const recieveAttack = (x, y) => {
    // decrement so that coords would match array indexes
    const [dx, dy] = H.decrement([x, y])
    
  }

  return {
    get board () { return board },
    get fleet () { return fleet },
    place,
    recieveAttack
  }
}

export { Gameboard }
