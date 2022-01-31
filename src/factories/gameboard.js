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
    const { y, x } = decrement(coords[i])
    result[y][x] = value
  }
  return result
})

export const Gameboard = () => {
  const fleet = []
  const missed = []
  const hit = []
  let plane = 'horizontally'
  let state = _createGameboard()

  const _mapBoard = _mapCoords(state)
  const _mapShip = _mapBoard(_SHIP)
  const _mapMissed = _mapBoard(_MISSED)
  const _mapHit = _mapBoard(_HIT)

  const _findShip = (y, x) =>
    fleet.find((ship) => ship.segments.find((segment) => segment.y === y && segment.x === x))

  const _getOccupiedCells = () => pipe(
    map((ship) => ship.segments),
    flatten
  )(fleet)

  const _isOverlaps = (y, x, size) => {
    const occupiedCells = _getOccupiedCells()
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
        const topCell = state[dy - 1] ? state[dy - 1][i] : null
        const bottomCell = state[dy + 1] ? state[dy + 1][i] : null
        if (topCell === _SHIP || bottomCell === _SHIP) {
          return true
        }
      }

      const leftCell = state[dy][dx - 1]
      const rightCell = state[dy][tail]
      if (leftCell === _SHIP || rightCell === _SHIP) {
        return true
      }

      const topLeft = state[dy - 1] ? state[dy - 1][dx - 1] : null
      const bottomLeft = state[dy + 1] ? state[dy + 1][dx - 1] : null
      const topRight = state[dy - 1] ? state[dy - 1][tail] : null
      const bottomRight = state[dy + 1] ? state[dy + 1][tail] : null
      if (topLeft === _SHIP || bottomLeft === _SHIP || topRight === _SHIP || bottomRight === _SHIP) {
        return true
      }
    }
    if (plane === 'vertically') {
      const tail = dy + size

      const topCell = state[dy - 1] ? state[dy - 1][dx] : null
      const bottomCell = state[tail] ? state[tail][dx] : null
      if (topCell === _SHIP || bottomCell === _SHIP) {
        return true
      }

      for (let i = dy; i < tail; i++) {
        const leftCell = state[i][dx - 1]
        const rightCell = state[i][dx + 1]
        if (leftCell === _SHIP || rightCell === _SHIP) {
          return true
        }
      }

      const topLeft = state[dy - 1] ? state[dy - 1][dx - 1] : null
      const topRight = state[dy - 1] ? state[dy - 1][dx + 1] : null
      const bottomLeft = state[tail] ? state[tail][dx - 1] : null
      const bottomRight = state[tail] ? state[tail][dx + 1] : null
      if (topLeft === _SHIP || bottomLeft === _SHIP || topRight === _SHIP || bottomRight === _SHIP) {
        return true
      }
    }
    return false
  }

  const isValidForPlace = (y, x, size) => (
    !_isOverlaps(y, x, size) &&
    !_isOverflows(y, x, size) &&
    !_isAdjacentToShips(y, x, size)
  )

  const place = (y, x, size) => {
    if (!isValidForPlace(y, x, size)) return

    const ship = Ship(y, x, size, plane)
    fleet.push(ship)
    state = _mapShip(ship.segments)
    return ship
  }

  const isValidAttackTarget = (y, x) => {
    const [dy, dx] = decrement([y, x])
    const row = state[dy]
    if (row) {
      switch (state[dy][dx]) {
        case 's':
        case 'w':
          return true
        case 'm':
        case 'h':
          return false
      }
    }
    return false
  }

  const receiveAttack = (y, x) => {
    const hitShip = _findShip(y, x)
    if (!hitShip) {
      missed.push({ y, x })
      state = _mapMissed([{ y, x }])
      return
    }
    pipe(
      findIndex(segment => segment.y === y && segment.x === x),
      hitShip.hit
    )(hitShip.segments)
    hit.push({ y, x })
    state = _mapHit([{ y, x }])
  }

  const getAttackStatus = (y, x) => {
    const attackedCell = state[y - 1][x - 1]
    switch (attackedCell) {
      case _MISSED:
        return { value: 'missed' }
      case _HIT:
        const ship = _findShip(y, x)
        const status = { value: 'hit', ship: ship.type }
        return ship.isSunk()
          ? Object.assign(status, { shipStatus: 'destroyed' })
          : Object.assign(status, { shipStatus: 'damaged' })
    }
    return { value: attackedCell }
  }

  const isShipSunk = (y, x) => {
    const ship = _findShip(y, x)
    return ship ? ship.isSunk() : false
  }

  const isFleetSunk = () => fleet.every((ship) => ship.isSunk())

  const setPlane = (newPlane) => { plane = newPlane }

  return {
    get state () { return state },
    get fleet () { return fleet },
    get missed () { return missed },
    get hit () { return hit },
    isValidForPlace,
    place,
    isValidAttackTarget,
    receiveAttack,
    getAttackStatus,
    isShipSunk,
    isFleetSunk,
    setPlane
  }
}

export { _createGameboard }
