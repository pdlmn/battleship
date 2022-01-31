import { decrement } from '../utils/func_helpers'

export const Player = (name, isFirst) => {
  let turn = isFirst

  const changeTurn = () => { turn = !turn }

  const attack = (board, y, x) => {
    board.receiveAttack(y, x)
    const status = board.getAttackStatus(y, x)
    if (status.value !== 'hit') {
      changeTurn()
    }
  }

  return {
    get name () { return name },
    get turn () { return turn },
    attack,
    changeTurn
  }
}
