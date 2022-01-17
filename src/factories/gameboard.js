import { repeat, find, findIndex, pipe } from '../utils/func_helpers'
import { Ship } from './ship'

const _WATER = 'w'
const _SHIP = 's'
const _MISSED = 'm'
const _HIT = 'h'
const _SIZE = 10

const _createGameBoard = () =>
  repeat(() => repeat(() => _WATER, _SIZE), _SIZE)

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

  const _findShip = (x, y) => 
    find((ship) => 
      find((segment) => segment.x === x && segment.y === y, ship.segments)
      , fleet)

  const _shipPlacer = {
    horizontally (size, x, y) {
      const shipTail = y + size
      const ship = Ship(size, x, y, 'horizontally')
      fleet.push(ship)
      board = _fillRow(x, y, shipTail, _SHIP, board)
    },

    vertically (size, x, y) {
      const shipTail = x + size
      const ship = Ship(size, x, y, 'vertically')
      fleet.push(ship)
      board = _fillColumn(x, shipTail, y, _SHIP, board)
    }
  }

  const place = (size, x, y, plane) => {
    const isOccupied = _findShip(x, y)
    if (isOccupied) return 'This spot is occupied'

    _shipPlacer[plane](size, x, y)
  }

  const recieveAttack = (x, y) => {
    const hitShip = _findShip(x, y)
    if (!hitShip) {
      missed.push({ x, y })
      board = _fillRow(x, y, (y + 1), _MISSED, board)
      return false
    }
    pipe(
      findIndex(segment => segment.x === x && segment.y === y),
      hitShip.hit
    )(hitShip.segments)
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
