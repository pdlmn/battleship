import { Player } from './player'
import { getRandomInteger, getRandomCoords } from '../utils/helper_funcs'
import { curry, remove } from '../utils/func_helpers'

const _attackDirections = {
  left: (y, x) => ({ y, x: x - 1 }),
  right: (y, x) => ({ y, x: x + 1 }),
  top: (y, x) => ({ y: y - 1, x }),
  bottom: (y, x) => ({ y: y + 1, x })
}

const _getOppositeDirection = (direction) => {
  switch (direction) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    case 'top':
      return 'bottom'
    case 'bottom':
      return 'top'
    default:
      return ''
  }
}

const _isShipHorizontal = (hitCells) =>
  hitCells.length > 1
    ? hitCells[0].y === hitCells[1].y
    : false

const _firstOnAxis = curry((axis, hitCells) => hitCells.reduce((prev, next) =>
  prev[axis] < next[axis]
    ? prev
    : next
))

const _lastOnAxis = curry((axis, hitCells) => hitCells.reduce((prev, next) =>
  prev[axis] < next[axis]
    ? next
    : prev
))

const _leftmostCell = _firstOnAxis('x')
const _rightmostCell = _lastOnAxis('x')
const _topmostCell = _firstOnAxis('y')
const _bottommostCell = _lastOnAxis('y')

export const AiPlayer = () => {
  const computer = Player('Computer', false)
  let hitCells = []
  let lastHit = {}
  let direction = ''

  const _findRandomSpotToAttack = (board) => {
    let [y, x] = getRandomCoords()
    while (board.state[y - 1][x - 1] === 'h' || board.state[y - 1][x - 1] === 'm') {
      [y, x] = getRandomCoords()
    }
    return { y, x }
  }

  const _findSpotAfterHit = (board, y, x) => {
    let directions = Object.keys(_attackDirections)
    let randomDirection = directions[getRandomInteger(0, 3)]
    let { y: ry, x: rx } = _attackDirections[randomDirection](y, x)

    while (!board.isValidTarget(ry, rx) && directions.length > 1) {
      directions = remove(randomDirection, directions)
      randomDirection = directions[getRandomInteger(0, directions.length - 1)]
      const randomCoords = _attackDirections[randomDirection](y, x)
      ry = randomCoords.y
      rx = randomCoords.x
    }
    if (!board.isValidTarget(ry, rx)) {
      return { validity: false }
    }
    return { validity: true, direction: randomDirection, y: ry, x: rx }
  }

  const _gainOppositeEnd = () => {
    let leftmost
    let rightmost
    let topmost
    let bottommost
    switch (_isShipHorizontal(hitCells)) {
      case true:
        leftmost = _leftmostCell(hitCells)
        rightmost = _rightmostCell(hitCells)
        return lastHit.x === leftmost.x
          ? rightmost
          : leftmost
      case false:
        topmost = _topmostCell(hitCells)
        bottommost = _bottommostCell(hitCells)
        return lastHit.y === topmost.y
          ? bottommost
          : topmost
      default:
        return {}
    }
  }

  const _attackSpecificSpot = (board, y, x) => {
    computer.attack(board, y, x)
    const status = board.getAttackStatus(y, x)
    if (status.shipStatus === 'damaged') {
      lastHit = { y, x }
      hitCells.push(lastHit)
    }
    return status
  }

  const _attackInDirection = (board) => {
    const coords = _attackDirections[direction](lastHit.y, lastHit.x)
    if (!board.isValidTarget(coords.y, coords.x)) {
      direction = _getOppositeDirection(direction)
      lastHit = _gainOppositeEnd()
      if (!board.isValidTarget(_attackDirections[direction](lastHit.y, lastHit.x))) {
        direction = ''
      }
      return attackPlayer(board)
    }
    computer.attack(board, coords.y, coords.x)
    const status = board.getAttackStatus(coords.y, coords.x)
    if (status.value !== 'hit') {
      direction = _getOppositeDirection(direction)
      lastHit = _gainOppositeEnd()
    }
    if (status.shipStatus === 'destroyed') {
      direction = ''
      lastHit = {}
      hitCells = []
    }
    if (status.shipStatus === 'damaged') {
      lastHit = { y: coords.y, x: coords.x }
      hitCells.push(lastHit)
    }
    return status
  }

  const _attackAfterHit = (board) => {
    const coords = _findSpotAfterHit(board, lastHit.y, lastHit.x)
    if (!coords.validity) {
      lastHit = {}
      hitCells = []
      return attackPlayer(board)
    }
    direction = coords.direction
    computer.attack(board, coords.y, coords.x)
    const status = board.getAttackStatus(coords.y, coords.x)
    if (status.value !== 'hit') {
      return status
    }
    lastHit = { y: coords.y, x: coords.x }
    hitCells.push(lastHit)
    return status
  }

  const _attackRandomCell = (board) => {
    const randomCoords = _findRandomSpotToAttack(board)
    computer.attack(board, randomCoords.y, randomCoords.x)
    const status = board.getAttackStatus(randomCoords.y, randomCoords.x)
    if (status.value === 'hit' && status.shipStatus === 'damaged') {
      lastHit = { y: randomCoords.y, x: randomCoords.x }
      hitCells.push(lastHit)
    }
    return status
  }

  const attackPlayer = (board, y, x) => {
    if (y && x) {
      return _attackSpecificSpot(board, y, x)
    } else if (lastHit.y && lastHit.x && direction !== '') {
      return _attackInDirection(board)
    } else if (lastHit.y && lastHit.x) {
      return _attackAfterHit(board)
    } else if (!(lastHit.y && lastHit.x)) {
      return _attackRandomCell(board)
    }
  }

  const setDirection = (val) => { direction = val }

  return {
    attackPlayer,
    setDirection,
    get direction () { return direction },
    get name () { return computer.name },
    get type () { return computer.type }
  }
}
