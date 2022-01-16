const Player = (name, isFirst) => {
  const eventName = (isFirst) ? 'Player one attacked' : 'Player two attacked'
  let turn = isFirst

  const changeTurn = () => {
    turn = !turn
  }

  const attack = (gameboard, x, y) => {
    gameboard.recieveAttack(x, y)
  }

  return {
    get name () { return name },
    get turn () { return turn },
    set turn(val) { turn = val },
    attack
  }
}

export { Player }
