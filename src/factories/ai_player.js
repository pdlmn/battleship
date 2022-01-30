import { Player } from './player'
import { getRandomCoords,  } from '../utils/helper_funcs'

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

  return Object.assign(player, {
    findSpotToAttack
  })
}
