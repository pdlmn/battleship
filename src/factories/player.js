export const Player = (name, isFirst) => {
  let turn = isFirst

  const changeTurn = () => { turn = !turn }

  const attack = (enemyBoard, y, x) => { 
    enemyBoard.receiveAttack(y, x) 
  }

  return {
    get name () { return name },
    get turn () { return turn },
    changeTurn,
    attack
  }
}
