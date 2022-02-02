import { repeat, findIndex, pipe, map, flatten, decrement, curry, eq, any, filter, objectInArray, gt, lt, removeDuplicateObj } from '../utils/func_helpers'
import { Ship } from './ship'
import { states } from '../constants/cell_states'

const _createRow = () => repeat(() => states.WATER, 10)
const _createGameboard = () => repeat(_createRow, 10)

const _mapCoords = curry((board, value, coords) => {
  const result = [...board]
  for (let i = 0; i < coords.length; i++) {
    const { y, x } = decrement(coords[i])
    result[y][x] = value
  }
  return result
})

const _coordsToIndexes = (y, x) => {
  return decrement([y, x])
}

export const Gameboard = () => {
  const fleet = []
  const missed = []
  let plane = 'horizontally'
  let state = _createGameboard()

  const _mapBoard = _mapCoords(state)
  const _mapShip = _mapBoard(states.SHIP)
  const _mapMissed = _mapBoard(states.MISSED)
  const _mapHit = _mapBoard(states.HIT)
  const _mapSunk = _mapBoard(states.SUNK)
  const _mapAround = _mapBoard(states.AROUND_SUNK)

  const _findShip = (y, x) =>
    fleet.find((ship) => ship.segments.find((segment) => segment.y === y && segment.x === x))

  const _getSegments = (ship) => ship.segments

  const _isShipSunk = (ship) => ship.isSunk()

  const _getShipCells = () => pipe(
    map(_getSegments),
    flatten
  )(fleet)

  const _getSunkCells = () => pipe(
    filter(_isShipSunk),
    map(_getSegments),
    flatten,
    map((cell) => ({ y: cell.y, x: cell.x }))
  )(fleet)

  const _anyShip = any(eq(states.SHIP))

  const isFleetSunk = () => fleet.every(_isShipSunk)

  const _isOverlaps = (y, x, size) => {
    const occupiedCells = _getShipCells()
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

  const _getCellState = (y, x) => {
    const [iy, ix] = _coordsToIndexes(y, x)
    const row = state[iy]
    return row
    ? state[iy][ix]
    : null
  }

  const _isAdjacentToShips = (y, x, size) => {

    if (plane === 'horizontally') {
      const tail = x + size

      for (let i = x; i < tail; i++) {
        const topCell = _getCellState(y - 1, i)
        const bottomCell = _getCellState(y + 1, i)
        if (_anyShip([topCell, bottomCell])) {
          return true
        }
      }

      const leftCell = _getCellState(y, x - 1)
      const rightCell = _getCellState(y, tail)
      if (_anyShip([leftCell, rightCell])) {
        return true
      }

      const topLeft = _getCellState(y - 1, x - 1)
      const bottomLeft = _getCellState(y + 1, x - 1)
      const topRight = _getCellState(y - 1, tail)
      const bottomRight = _getCellState(y + 1, tail)
      if (_anyShip([topLeft, bottomLeft, topRight, bottomRight])) {
        return true
      }
    }

    if (plane === 'vertically') {
      const tail = y + size

      const topCell = _getCellState(y - 1, x)
      const bottomCell = _getCellState(tail, x)
      if (_anyShip([topCell, bottomCell])) {
        return true
      }

      for (let i = y; i < tail; i++) {
        const leftCell = _getCellState(i, x - 1)
        const rightCell = _getCellState(i, x + 1)
        if (_anyShip([leftCell, rightCell])) {
          return true
        }
      }

      const topLeft = _getCellState(y - 1, x - 1)
      const topRight = _getCellState(y - 1, x + 1)
      const bottomLeft = _getCellState(tail, x - 1)
      const bottomRight = _getCellState(tail, x + 1)
      if (_anyShip([topLeft, bottomLeft, topRight, bottomRight])) {
        return true
      }
    }
    return false
  }

  const _getSurroundingCells = ({ y, x }) => {
    return [
      { y: y - 1, x},
      { y: y + 1, x},
      { y, x: x - 1},
      { y, x: x + 1},
      { y: y - 1, x: x - 1},
      { y: y + 1, x: x + 1},
      { y: y - 1, x: x + 1},
      { y: y + 1, x: x - 1},
    ]
  }

  const _isCellValid = ({ y, x }) => 
    !any((axis) => (gt(axis, 10) || lt(axis, 1)), [x, y])

  const getAreaAroundSunk = () => {
    const sunkCells = _getSunkCells()
    return pipe(
      map(_getSurroundingCells),
      flatten,
      filter((cell) => !objectInArray(cell, sunkCells)),
      filter(_isCellValid),
      removeDuplicateObj
    )(sunkCells)
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

  const isValidTarget = (y, x) => {
    const [iy, ix] = _coordsToIndexes(y, x)
    const row = state[iy]
    if (row) {
      switch (state[iy][ix]) {
        case states.SHIP:
        case states.WATER:
          return true
        case states.MISSED:
        case states.HIT:
        case states.SUNK:
        case states.AROUND_SUNK:
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
    const hitSegmentIndex = findIndex(segment => segment.y === y && segment.x === x, hitShip.segments)
    hitShip.hit(hitSegmentIndex)
    if (hitShip.isSunk()) {
      state = _mapSunk(hitShip.segments)
      state = _mapAround(getAreaAroundSunk())
    }
    else {
      state = _mapHit([{ y, x }])
    }
  }

  const getAttackStatus = (y, x) => {
    const coords = { y, x }
    const attackedCell = _getCellState(y, x)
    let ship
    let status
    switch (attackedCell) {
      case states.MISSED:
        return Object.assign({ value: 'missed' }, coords)
      case states.HIT:
      case states.SUNK:
        ship = _findShip(y, x)
        status = { value: 'hit', ship: ship.type }
        return ship.isSunk()
          ? Object.assign(status, coords, { shipStatus: 'destroyed' })
          : Object.assign(status, coords, { shipStatus: 'damaged' })
      default:
        return Object.assign({ value: attackedCell }, coords)
    }
  }

  const setPlane = (newPlane) => { plane = newPlane }

  return {
    get state () { return state },
    get fleet () { return fleet },
    get missed () { return missed },
    isValidForPlace,
    place,
    isValidTarget,
    receiveAttack,
    getAttackStatus,
    getAreaAroundSunk,
    isFleetSunk,
    setPlane
  }
}

export { _createGameboard }
