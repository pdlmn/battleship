import { repeat, find, findIndex, pipe } from '../utils/func_helpers'
import { Ship } from './ship'

const _WATER = 'w'
const _SHIP = 's'
const _MISSED = 'm'
const _HIT = 'h'
const _SIZE = 10

const _createGameBoard = () =>
  repeat(() => repeat(() => _WATER, _SIZE), _SIZE)

const _fillRow = (y, xStart, xFinish, value, board) => {
  const result = [...board]
  for (let i = xStart - 1; i < xFinish - 1; i++) {
    result[y - 1][i] = value
  }
  return result
}

const _fillColumn = (yStart, yFinish, x, value, board) => {
  const result = [...board]
  for (let i = yStart - 1; i < yFinish - 1; i++) {
    result[i][x - 1] = value
  }
  return result
}

const Gameboard = () => {
  const fleet = []
  const missed = []
  const hit = []
  let board = _createGameBoard()

  const _findShip = (y, x) => 
    find((ship) => 
      find((segment) => segment.y === y && segment.x === x, ship.segments)
      , fleet)

  const _shipPlacer = {
    horizontally (size, y, x) {
      const shipTail = x + size
      const ship = Ship(size, y, x, 'horizontally')
      fleet.push(ship)
      board = _fillRow(y, x, shipTail, _SHIP, board)
    },

    vertically (size, y, x) {
      const shipTail = y + size
      const ship = Ship(size, y, x, 'vertically')
      fleet.push(ship)
      board = _fillColumn(y, shipTail, x, _SHIP, board)
    }
  }

  //possbily public methods
  const isOccupied = (y, x) => Boolean(_findShip(y, x))

  const isEnoughRoom = (size, y, x, plane) => {
    if (plane === 'horizontally' && x + (size - 1) > 10 ||
        plane === 'vertically' && y + (size - 1) > 10) {
      return true
    }
    return false
  }

  const place = (size, y, x, plane) => {
    if (isOccupied(y, x)) return 'This spot is occupied'
    if (isEnoughRoom(size, y, x, plane)) return 'Ship is too big'

    _shipPlacer[plane](size, y, x)
    return 'Ship was placed successfully'
  }

  const recieveAttack = (y, x) => {
    const hitShip = _findShip(y, x)
    if (!hitShip) {
      missed.push({ y, x })
      board = _fillRow(y, x, (x + 1), _MISSED, board)
      return false
    }
    pipe(
      findIndex(segment => segment.y === y && segment.x === x),
      hitShip.hit
    )(hitShip.segments)
    hit.push({ y, x })
    board = _fillRow(y, x, (x + 1), _HIT, board)
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
