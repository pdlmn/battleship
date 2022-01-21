import { repeat, find, findIndex, pipe } from '../utils/func_helpers'
import { Ship } from './ship'

const _WATER = 'w'
const _SHIP = 's'
const _MISSED = 'm'
const _HIT = 'h'

const _createRow = () => repeat(() => _WATER, 10)
const _createGameboard = () => repeat(_createRow, 10)

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

export const Gameboard = () => {
  const fleet = []
  const missed = []
  const hit = []
  let board = _createGameboard()

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

  //possibly public methods
  const isOccupied = (y, x) => Boolean(_findShip(y, x))

  const isEnoughRoom = (size, y, x, plane) => {
    if (plane === 'horizontally' && x + (size - 1) > 10 ||
        plane === 'vertically' && y + (size - 1) > 10) {
      return true
    }
    return false
  }
  
  const _isHorzinotallyAdjacent = (size, y, x) => {
    let tail = x + size
    let i = x
    while (i < tail) {
      if (_findShip(y + 1, i) || _findShip(y - 1, i)) {
        return true
      }
      i++
    }
    return false
  }

  const isAdjacentToShips = (size, y, x, plane) => {
    if (plane === 'horizontally') {
      return _isHorzinotallyAdjacent(size, y, x)
    }
    if (plane === 'vertically') {
      return
    }
  }

  const place = (size, y, x, plane) => {
    if (isOccupied(y, x)) return 'This spot is occupied'
    if (isEnoughRoom(size, y, x, plane)) return 'Ship is too big'
    if (isAdjacentToShips(size, y, x, plane)) return 'Ship is adjacent to other ship'

    _shipPlacer[plane](size, y, x)
    return 'Ship was placed successfully'
  }

  const receiveAttack = (y, x) => {
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

  const isFleetSunk = () => fleet.every((ship) => ship.isSunk())

  return {
    get board () { return board },
    get fleet () { return fleet },
    get missed () { return missed },
    place,
    receiveAttack,
    isFleetSunk
  }
}

export { _createGameboard }
