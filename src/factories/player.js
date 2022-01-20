const Player = (name, isFirst) => {
  const eventName = (isFirst) ? 'Player one attacked' : 'Player two attacked'
  let turn = isFirst

  const changeTurn = () => { turn = !turn }

  const attack = (enemyBoard, y, x) => { enemyBoard.recieveAttack(y, x) }

  return {
    get name () { return name },
    get turn () { return turn },
    set turn (val) { turn = val },
    attack
  }
}

export { Player }
