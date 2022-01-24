import { repeat, findIndex, pipe, map, flatten, decrement, curry } from '../utils/func_helpers'
import { Ship } from './ship'

const _WATER = 'w'
const _SHIP = 's'
const _MISSED = 'm'
const _HIT = 'h'

const _createRow = () => repeat(() => _WATER, 10)
const _createGameboard = () => repeat(_createRow, 10)

const _mapCoords = curry((board, value, coords) => {
  const result = [...board]
  for (let i = 0; i < coords.length; i++) {
    let {y, x} = decrement(coords[i])
    result[y][x] = value
  }
  return result
})

export const Gameboard = () => {
  const fleet = []
  const missed = []
  const hit = []
  let plane = 'horizontally'
  let board = _createGameboard()

  const _mapBoard = _mapCoords(board)
  const _mapShip = _mapBoard(_SHIP)
  const _mapMissed = _mapBoard(_MISSED)
  const _mapHit = _mapBoard(_HIT)

  const _findShip = (y, x) =>
    fleet.find((ship) => ship.segments.find((segment) => segment.y === y && segment.x === x))

  const getOccupiedCells = () => pipe(
    map((ship) => ship.segments),
    flatten
  )(fleet)

  const _isOverlaps = (y, x, size) => {
    const occupiedCells = getOccupiedCells()
    if (plane === 'horizontally' && occupiedCells.length > 0) { 
      const tail = x + size
      for (let i = 0; i < occupiedCells.length; i++) {
        for (let j = x; j < tail; j++) {
          if (occupiedCells[i].y === y && occupiedCells[i].x === j) {
            return true
          }
        }
      }
    }
    if (plane === 'vertically' && occupiedCells.length > 0) { 
      const tail = y + size
      for (let i = 0; i < occupiedCells.length; i++) {
        for (let j = y; j < tail; j++) {
          if (occupiedCells[i].y === j && occupiedCells[i].x === x) {
            return true
          }
        }
      }
    }
    return false
  }

  const _isOverflows = (y, x, size) => {
    if ((plane === 'horizontally' && x + --size > 10) ||
        (plane === 'vertically' && y + --size > 10)) {
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

  const isValid = (y, x, size) => (
    !_isOverlaps(y, x, size) &&
    !_isOverflows(y, x, size)
  )

  const place = (y, x, size) => {
    if (_isOverlaps(y, x, size)) return 'This spot is occupied'
    if (_isOverflows(y, x, size)) return 'Ship is too big'
    if (isAdjacentToShips(y, x, size)) return 'Ship is adjacent to other ship'

    const ship = Ship(y, x, size, plane)
    fleet.push(ship)
    board = _mapShip(ship.segments)
    return 'Ship was placed successfully'
  }

  const receiveAttack = (y, x) => {
    const hitShip = _findShip(y, x)
    if (!hitShip) {
      missed.push({ y, x })
      board = _mapMissed([{ y, x }])
      return false
    }
    pipe(
      findIndex(segment => segment.y === y && segment.x === x),
      hitShip.hit
    )(hitShip.segments)
    hit.push({ y, x })
    board = _mapHit([{ y, x }])
    return true
  }

  const isFleetSunk = () => fleet.every((ship) => ship.isSunk())

  const setPlane = (newPlane) => { plane = newPlane }

  return {
    get board () { return board },
    get fleet () { return fleet },
    get missed () { return missed },
    getOccupiedCells,
    isValid,
    place,
    receiveAttack,
    isFleetSunk,
    setPlane
  }
}

export { _createGameboard }
