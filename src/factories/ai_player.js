import { Player } from './player'
import { getRandomCoords, randomInteger } from '../utils/helper_funcs'

const _randomCoordMutations = {
  1: (y, x) => [y - 1, x],
  2: (y, x) => [y + 1, x],
  3: (y, x) => [y, x - 1],
  4: (y, x) => [y, x + 1],
}

export const AiPlayer = (name, isFirst) => {
  const player = Player(name, isFirst)

  const findSpotToAttack = (board) => {
    let [y, x] = getRandomCoords()
    while (board.state[y - 1][x - 1] === 'h' || board.state[y - 1][x - 1] === 'm') {
      [y, x] = getRandomCoords()
    }
    return [y, x]
  }

  const findAdjacentSpotToAttack = (board, hitCells) => {
    hitCells.forEach(({y, x}) => {
      let randomNumber = randomInteger(1, 4)
      let mutatedCoords = _randomCoordMutations[randomNumber](y, x)
      if (player.isValidAttackTarget(board, ...mutatedCoords)) {
        return mutatedCoords
      }
    })
  }

  return Object.assign(player, {
    findSpotToAttack
  })
}
