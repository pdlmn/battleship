import { decrement } from "../utils/func_helpers"

export const Player = (name, isFirst) => {
  let turn = isFirst

  const changeTurn = () => { turn = !turn }

  const isValidAttackTarget = (enemyBoard, y, x) => {
    const state = enemyBoard.state
    const [dy, dx] = decrement([y, x])
    const row = state[dy]
    if (row) {
      switch (state[dy][dx]) {
        case 's':
        case 'w':
          return true
        case 'm':
        case 'h':
          return false
      }
    }
    return false
  }

  const attack = (enemyBoard, y, x) => { 
    enemyBoard.receiveAttack(y, x) 
    if (!enemyBoard.isAttackHit(y, x)) {
      changeTurn()
    }
  }

  return {
    get name () { return name },
    get turn () { return turn },
    isValidAttackTarget,
    attack,
    changeTurn
  }
}
