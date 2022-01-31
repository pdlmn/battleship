import { Player } from './player'
import { getRandomInteger, getRandomCoords } from '../utils/helper_funcs'
import { remove } from '../utils/func_helpers'

const _potentialAttackDirections = {
  left: (y, x) => ({ y, x: x - 1 }),
  right: (y, x) => ({ y, x: x + 1 }),
  top: (y, x) => ({ y: y - 1, x }),
  bottom: (y, x) => ({ y: y + 1, x })
}

export const AiPlayer = () => {
  const computer = Player('Computer', false)
  const hit = []
  let direction = ''

  const findSpotToAttack = (board) => {
    let [y, x] = getRandomCoords()
    while (board.state[y - 1][x - 1] === 'h' || board.state[y - 1][x - 1] === 'm') {
      [y, x] = getRandomCoords()
    }
    return { y, x }
  }

  const findSpotAfterHit = (board, y, x) => {
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

  const attackPlayer = (board, y, x) => {
    if (y && x) {
      console.log(`parametered attack ${y}, ${x}`)
      computer.attack(board, y, x)
      const status = board.getAttackStatus(y, x)
      if (status.shipStatus === 'damaged') {
        hit.push({ y, x })
      }
      return status
    } else if (hit[0] && direction !== '') {
      console.log(`Attack in ${direction}`)
      const { y: hy, x: hx } = hit[0]
      const coordsForAttack = _potentialAttackDirections[direction](hy, hx)
      const { y: ay, x: ax } = coordsForAttack
      if (!board.isValidAttackTarget(ay, ax)) {
        direction = ''
        return attackPlayer(board)
      }
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
      return status
    } else if (hit[0]) {
      console.log(`guessed attack`)
      console.log(direction)
      const { y: hy, x: hx } = hit[0]
      const coords = findSpotAfterHit(board, hy, hx)
      if (!coords.validity) {
        hit.pop()
        return attackPlayer(board)
      }
      const { y: ay, x: ax } = coords
      direction = coords.direction
      computer.attack(board, ay, ax)
      const status = board.getAttackStatus(ay, ax)
      if (status.value !== 'hit') {
        return status
      }
      hit[0] = { y: ay, x: ax }
      return status
    } else if (!hit[0]) {
      console.log('random attack')
      const randomCoords = findSpotToAttack(board)
      const { y, x } = randomCoords
      computer.attack(board, y, x)
      const status = board.getAttackStatus(y, x)
      if (status.value === 'hit' && status.shipStatus === 'damaged') {
        hit.push({ y, x })
      }
      return status
    }
  }

  const setDirection = (val) => { direction = val }

  return Object.assign({
    findSpotToAttack,
    attackPlayer,
    setDirection,
    get direction () { return direction },
  }, computer)
}
