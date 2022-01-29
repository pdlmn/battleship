export const Player = (name, isFirst) => {
  let turn = isFirst

  const attack = (enemyBoard, y, x) => { 
    enemyBoard.receiveAttack(y, x) 
    turn = !turn
  }

  return {
    get name () { return name },
    get turn () { return turn },
    attack
  }
}
