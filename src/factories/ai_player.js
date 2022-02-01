import { Player } from './player'
import { getRandomInteger, getRandomCoords } from '../utils/helper_funcs'
import { curry, remove } from '../utils/func_helpers'

const _potentialAttackDirections = {
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
  const hit = []
  let hitCells = []
  let lastHit = {}
  let direction = ''

  const findRandomSpotToAttack = (board) => {
    let [y, x] = getRandomCoords()
    while (board.state[y - 1][x - 1] === 'h' || board.state[y - 1][x - 1] === 'm') {
      [y, x] = getRandomCoords()
    }
    return { y, x }
  }

  const _findSpotAfterHit = (board, y, x) => {
    let directions = Object.keys(_potentialAttackDirections)
    let randomDirection = directions[getRandomInteger(0, 3)]
    let { y: ry, x: rx } = _potentialAttackDirections[randomDirection](y, x)

    while (!board.isValidAttackTarget(ry, rx) && directions.length > 1) {
      directions = remove(randomDirection, directions)
      randomDirection = directions[getRandomInteger(0, directions.length - 1)]
      const randomCoords = _potentialAttackDirections[randomDirection](y, x)
      ry = randomCoords.y
      rx = randomCoords.x
    }
    if (!board.isValidAttackTarget(ry, rx)) {
      return { validity: false }
    }
    return { validity: true, direction: randomDirection, y: ry, x: rx }
  }

  const _gainOppositeEnd = () => {
    switch (_isShipHorizontal(hitCells)) {
      case true:
        const leftmost = _leftmostCell(hitCells)
        const rightmost = _rightmostCell(hitCells)
        return lastHit.x === leftmost.x
          ? rightmost
          : leftmost
      case false:
        const topmost = _topmostCell(hitCells)
        const bottommost = _bottommostCell(hitCells)
        return lastHit.y === topmost.y
          ? bottommost
          : topmost
      default:
        return {}
    }
  }

  const attackPlayer = (board, y, x) => {
    if (y && x) {
      computer.attack(board, y, x)
      const status = board.getAttackStatus(y, x)
      if (status.shipStatus === 'damaged') {
        lastHit = { y, x }
        hitCells.push(lastHit)
      }
      return status
    } else if (lastHit.y && lastHit.x && direction !== '') {
      const { y: hy, x: hx } = lastHit
      const coordsForAttack = _potentialAttackDirections[direction](hy, hx)
      const { y: ay, x: ax } = coordsForAttack
      if (!board.isValidAttackTarget(ay, ax)) {
        direction = _getOppositeDirection(direction)
        lastHit = _gainOppositeEnd()
        if (!board.isValidAttackTarget(_potentialAttackDirections[direction](lastHit.y, lastHit.x))) {
          direction = ''
        }
        return attackPlayer(board)
      }
      computer.attack(board, ay, ax)
      const status = board.getAttackStatus(ay, ax)
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
        lastHit = { y: ay, x: ax }
        hitCells.push(lastHit)
      }
      return status
    } else if (lastHit.y && lastHit.x) {
      const { y: hy, x: hx } = lastHit
      const coords = _findSpotAfterHit(board, hy, hx)
      if (!coords.validity) {
        lastHit = {}
        hitCells = []
        return attackPlayer(board)
      }
      const { y: ay, x: ax } = coords
      direction = coords.direction
      computer.attack(board, ay, ax)
      const status = board.getAttackStatus(ay, ax)
      if (status.value !== 'hit') {
        return status
      }
      lastHit = { y: ay, x: ax }
      hitCells.push(lastHit)
      return status
    } else if (!(lastHit.y && lastHit.x)) {
      const randomCoords = findRandomSpotToAttack(board)
      const { y, x } = randomCoords
      computer.attack(board, y, x)
      const status = board.getAttackStatus(y, x)
      if (status.value === 'hit' && status.shipStatus === 'damaged') {
        lastHit = { y, x }
        hitCells.push(lastHit)
      }
      return status
    }
  }

  const setDirection = (val) => { direction = val }

  return Object.assign({
    findRandomSpotToAttack,
    attackPlayer,
    setDirection,
    get direction () { return direction },
  }, computer)
}
