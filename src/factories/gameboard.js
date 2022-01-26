import { repeat, findIndex, pipe, map, flatten, decrement, increment, curry } from '../utils/func_helpers'
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

  const _isAdjacentToShips = (y, x, size) => {
    const [dy, dx] = decrement([y, x])

    if (plane === 'horizontally') {
      const tail = dx + size
      for (let i = dx; i < tail; i++) {
        let topCell = board[dy - 1] ? board[dy - 1][i] : null
        let bottomCell = board[dy + 1] ? board[dy + 1][i] : null
        if (topCell === _SHIP || bottomCell === _SHIP) {
          return true
        }
      }
      const leftCell = board[dy][dx - 1]
      const rightCell = board[dy][tail]
      if (leftCell === _SHIP || rightCell === _SHIP) {
        return true
      }
      const topLeft = board[dy - 1] ? board[dy - 1][dx - 1] : null
      const bottomLeft = board[dy + 1] ? board[dy + 1][dx - 1] : null
      const topRight = board[dy - 1] ? board[dy - 1][tail] : null
      const bottomRight = board[dy + 1] ? board[dy + 1][tail] : null
      if (topLeft === _SHIP || bottomLeft === _SHIP || topRight === _SHIP || bottomRight === _SHIP) {
        return true
      }
    }
    if (plane === 'vertically') {
      const tail = dy + size
      const topCell = board[dy - 1] ? board[dy - 1][dx] : null
      const bottomCell = board[tail] ? board[tail][dx] : null
      if (topCell === _SHIP || bottomCell === _SHIP) {
        return true
      }
      for (let i = dy; i < tail; i++) {
        let leftCell = board[i][dx - 1]
        let rightCell = board[i][dx + 1]
        if (leftCell === _SHIP || rightCell === _SHIP) {
          return true
        }
      }
      const topLeft = board[dy - 1] ? board[dy - 1][dx - 1] : null
      const topRight = board[dy - 1] ? board[dy - 1][dx + 1] : null
      const bottomLeft = board[tail] ? board[tail][dx - 1] : null
      const bottomRight = board[tail] ? board[tail][dx + 1] : null
      if (topLeft === _SHIP || bottomLeft === _SHIP || topRight === _SHIP || bottomRight === _SHIP) {
        return true
      }
    }
    return false
  }

  const isValid = (y, x, size) => (
    !_isOverlaps(y, x, size) &&
    !_isOverflows(y, x, size) &&
    !_isAdjacentToShips(y, x, size)
  )

  const place = (y, x, size) => {
    if (!isValid(y, x, size)) return

    const ship = Ship(y, x, size, plane)
    fleet.push(ship)
    board = _mapShip(ship.segments)
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
