import { Player } from './player'
import { getRandomInteger, getRandomCoords } from '../utils/helper_funcs'

const _potentialDirections = {
  left: (y, x) => ({ y, x: x - 1 }),
  right: (y, x) => ({ y, x: x + 1 }),
  top: (y, x) => ({ y: y - 1, x }),
  bottom: (y, x) => ({ y: y + 1, x })
}

export const AiPlayer = (name, isFirst) => {
  const player = Player(name, isFirst)
  let direction = 'left'

  const findSpotToAttack = (board) => {
    let [y, x] = getRandomCoords()
    while (board.state[y - 1][x - 1] === 'h' || board.state[y - 1][x - 1] === 'm') {
      [y, x] = getRandomCoords()
    }
    return { y, x }
  }

  const attackAfterHit = (board) => {
    const directions = Object.keys(_potentialDirections)
    let randomDirection = directions[getRandomInteger(0, 3)]
    // if (board)
  }

  return Object.assign(player, {
    findSpotToAttack
  })
}
