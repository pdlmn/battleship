/* Factory for player objects.
 * Players have name, turn precedence, can attack other boards, have types. */

const Player = (name, isFirst) => {
  const type = isFirst ? 'player' : 'computer'
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
    get type () { return type },
    get turn () { return turn },
    attack,
    changeTurn
  }
}

export { Player }
