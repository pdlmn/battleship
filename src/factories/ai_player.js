import { Player } from './player'
import { getRandomCoords } from '../utils/helper_funcs'
import { objectInArray, objEqual } from '../utils/func_helpers'

export const AiPlayer = (name, isFirst) => {
  const player = Player(name, isFirst)

  const findSpotToAttack = (board) => {
    let [y, x] = getRandomCoords()
    while (board.state[y - 1][x - 1] === 'h' || board.state[y - 1][x - 1] === 'm') {
      [y, x] = getRandomCoords()
    }
    return { y, x }
  }

  return Object.assign(player, {
    findSpotToAttack
  })
}
