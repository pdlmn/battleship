import { Player } from './player'
import { getRandomCoords, randomInteger } from '../utils/helper_funcs'

const _coordMutations = [
  (y, x) => [y - 1, x],
  (y, x) => [y + 1, x],
  (y, x) => [y, x - 1],
  (y, x) => [y, x + 1],
]

export const AiPlayer = (name, isFirst) => {
  const player = Player(name, isFirst)

  const findSpotToAttack = (board) => {
    let [y, x] = getRandomCoords()
    while (board.state[y - 1][x - 1] === 'h' || board.state[y - 1][x - 1] === 'm') {
      [y, x] = getRandomCoords()
    }
    return [y, x]
  }

  const findAdjacentSpotToAttack = (board) => {
    const result = []
    for (let coords of board.hit) {
      let {y, x} = coords
      for (let j = 0; j < 4; j++) {
        let mutatedCoords = _coordMutations[j](y, x)
        if (player.isValidAttackTarget(mutatedCoords)) {
          result.push(mutatedCoords)
        }
      }
    }
    return result
  }

  return Object.assign(player, {
    findSpotToAttack
  })
}
