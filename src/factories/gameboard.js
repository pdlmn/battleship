import { repeat, find, findIndex, pipe, map, flatten, decrement, decrementEach } from '../utils/func_helpers'
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

const _mapCoords = (value, board, coords) => {
  const result = [...board]
  for (let i = 0; i < coords.length; i++) {
    let {y, x} = decrement(coords[i])
    result[y][x] = value
  }
  return result
}

export const Gameboard = () => {
  const fleet = []
  const missed = []
  const hit = []
  let plane = 'horizontally'
  let board = _createGameboard()

  const _findShip = (y, x) =>
    find((ship) =>
      find((segment) => segment.y === y && segment.x === x, ship.segments)
    , fleet)

  const _shipPlacer = {
    horizontally (y, x, size) {
      const shipTail = x + size
      const ship = Ship(y, x, size, 'horizontally')
      fleet.push(ship)
      board = _mapCoords(_SHIP, board, ship.segments)
    },

    vertically (y, x, size) {
      const shipTail = y + size
      const ship = Ship(y, x, size, 'vertically')
      fleet.push(ship)
      board = _mapCoords(_SHIP, board, ship.segments)
    }
  }

  const getOccupiedCells = pipe(
    map((ship) => ship.segments),
    flatten
  )

  const isOverlaps = (y, x) => _findShip(y, x)

  const isEnoughRoom = (y, x, size) => {
    if ((plane === 'horizontally' && x + (size - 1) > 10) ||
        (plane === 'vertically' && y + (size - 1) > 10)) {
      return true
    }
    return false
  }

  const _isHorzinotallyAdjacent = (y, x, size) => {
    const tail = x + size
    let i = x
    while (i < tail) {
      if (_findShip(y + 1, i) || _findShip(y - 1, i)) {
        return true
      }
      i++
    }
    return false
  }

  const isAdjacentToShips = (y, x, size) => {
    if (plane === 'horizontally') {
      return _isHorzinotallyAdjacent(y, x, size)
    }
    if (plane === 'vertically') {

    }
  }

  const place = (y, x, size) => {
    if (isOverlaps(y, x)) return 'This spot is occupied'
    if (isEnoughRoom(y, x, size)) return 'Ship is too big'
    if (isAdjacentToShips(y, x, size)) return 'Ship is adjacent to other ship'

    _shipPlacer[plane](y, x, size)
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

  const setPlane = (newPlane) => { plane = newPlane }

  return {
    get board () { return board },
    get fleet () { return fleet },
    get missed () { return missed },
    getOccupiedCells,
    place,
    receiveAttack,
    isFleetSunk,
    setPlane
  }
}

export { _createGameboard }
