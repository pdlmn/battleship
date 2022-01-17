import { repeat, find } from '../utils/func_helpers'
import { Ship } from './ship'

const _WATER = 'w'
const _SHIP = 's'
const _MISSED = 'm'
const _HIT = 'h'

const _createGameBoard = () =>
  // 'w' for 'water'
  repeat(() => repeat(() => _WATER, 10), 10)

const _fillRow = (x, yStart, yFinish, value, board) => {
  const result = [...board]
  for (let i = yStart - 1; i < yFinish - 1; i++) {
    result[x - 1][i] = value
  }
  return result
}

const _fillColumn = (xStart, xFinish, y, value, board) => {
  const result = [...board]
  for (let i = xStart - 1; i < xFinish - 1; i++) {
    result[i][y - 1] = value
  }
  return result
}

const Gameboard = () => {
  const fleet = []
  const missed = []
  let board = _createGameBoard()

  const _findHitShip = (x, y, fleet) => 
    find((ship) => find((segment) =>
      segment.x === x && segment.y === y, ship.segments))
  (fleet)

  const place = (size, headX, headY) => {
    return {
      horizontally () {
        const tailY = headY + size
        const ship = Ship(size, headX, headY, 'horizontally')
        fleet.push(ship)
        board = _fillRow(headX, headY, tailY, _SHIP, board)
      },

      vertically () {
        const tailX = headX + size
        const ship = Ship(size, headX, headY, 'vertically')
        fleet.push(ship)
        board = _fillColumn(headX, tailX, headY, _SHIP, board)
      }
    }
  }

  const recieveAttack = (x, y) => {
    const hitShip = _findHitShip(x, y, fleet)
    if (!hitShip) {
      missed.push({ x, y })
      board = _fillRow(x, y, (y + 1), _MISSED, board)
      return false
    }
    const hitSegment = hitShip.segments.findIndex(segment => segment.x === x && segment.y === y)
    hitShip.hit(hitSegment)
    board = _fillRow(x, y, (y + 1), _HIT, board)
    return true
  }

  const isFleetSunk = () =>
    fleet.every((ship) => ship.isSunk())

  return {
    get board () { return board },
    get fleet () { return fleet },
    get missed () { return missed },
    place,
    recieveAttack,
    isFleetSunk
  }
}

export { Gameboard }
