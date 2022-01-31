import { Player } from './player'
import { getRandomInteger, getRandomCoords } from '../utils/helper_funcs'
import { remove } from '../utils/func_helpers'

const _potentialDirections = {
  left: (y, x) => ({ y, x: x - 1 }),
  right: (y, x) => ({ y, x: x + 1 }),
  top: (y, x) => ({ y: y - 1, x }),
  bottom: (y, x) => ({ y: y + 1, x })
}

export const AiPlayer = () => {
  const computer = Player('Computer', false)
  let hit = []
  let direction = ''

  const findSpotToAttack = (board) => {
    let [y, x] = getRandomCoords()
    while (board.state[y - 1][x - 1] === 'h' || board.state[y - 1][x - 1] === 'm') {
      [y, x] = getRandomCoords()
    }
    return { y, x }
  }

  const findSpotAfterHit = (board, y, x) => {
    let directions = Object.keys(_potentialDirections)
    let randomDirection = directions[getRandomInteger(0, 3)]
    let { y: ry, x: rx } = _potentialDirections[randomDirection](y, x)

    while (!board.isValidAttackTarget(ry, rx) && directions.length > 0) {
      directions = remove(randomDirection, directions)
      randomDirection = directions[getRandomInteger(0, directions.length - 1)]
      let randomCoords = _potentialDirections[randomDirection](y, x)
      ry = randomCoords.y
      rx = randomCoords.x
    }
    if (!board.isValidAttackTarget(ry, rx)) {
      return { validity: false }
    }
    return { validity: true, direction: randomDirection, y: ry, x: rx }
  }

  const attackPlayer = (board, y, x) => {
    if (y && x) {
      computer.attack(board, y, x)
      const status = board.getAttackStatus(y, x)
      if (status.value === 'hit' && status.shipStatus === 'damaged') {
        hit.push({ y, x })
      }
      return `attacked ${y}, ${x}`
    }

    else if (hit[0] && direction !== '') {
      const { y: hy, x: hx } = hit[0]     
      const coordsForAttack = _potentialDirections[direction](hy, hx)
      const { y: ay, x: ax } = coordsForAttack
      computer.attack(board, ay, ax)
      const status = board.getAttackStatus(ay, ax)
      if (status.value !== 'hit') {
        direction = ''
      }
      if (status.shipStatus === 'destroyed') {
        direction = ''
        hit.pop()
      }
      if (status.shipStatus === 'damaged') {
        hit[0] = { y: ay, x: ax }
      }
      return `attacked ${ay}, ${ax}`
    }

    else if (!hit[0]) {
      const randomCoords = findSpotToAttack(board)
      const { y, x } = randomCoords
      computer.attack(board, y, x)
      const status = board.getAttackStatus(y, x)
      if (status.value === 'hit' && status.shipStatus === 'damaged') {
        hit.push({ y, x })
      }
      return `attacked ${y}, ${x}`
    }

    else if (hit[0]) {
      const { y: hy, x: hx } = hit[0]
      const coords = findSpotAfterHit(board, hy, hx)
      if (!coords.validity) {
        hit.pop()
        attackPlayer(board)
        return
      }
      direction = coords.direction
      computer.attack(board, coords.y, coords.x)
      hit[0] = { y: coords.y, x: coords.x }
      return `attacked ${coords.y}, ${coords.x}`
    }
  }

  const attackAfterHit = (board, y, x) => {
    let directions = Object.keys(_potentialDirections)
    let randomDirection = directions[getRandomInteger(0, 3)]
    let { y: ry, x: rx } = _potentialDirections[randomDirection](y, x)

    let i = 2
    while (!board.isValidAttackTarget(ry, rx) && directions.length > 0) {
      directions = remove(randomDirection, directions)
      randomDirection = directions[getRandomInteger(0, i)]
      let randomCoords = _potentialDirections[randomDirection](y, x)
      ry = randomCoords.y
      rx = randomCoords.x
      i--
    }
    if (!board.isValidAttackTarget(ry, rx)) {
      direction = ''
      hit.pop()
      computer.attack(board, ry, rx)
      return
    }
    direction = randomDirection
    computer.attack(board, ry, rx)
  }

  return Object.assign(computer, {
    findSpotToAttack,
    attackAfterHit,
    attackPlayer
  })
}
