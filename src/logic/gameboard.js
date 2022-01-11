const Gameboard = () => {
  const board = new Array(100).fill(0)

  const place = (ship) => {
    const { x, y } = ship.headCoords
    return {
      horizontally () {
        ship.tailCoords = { x: x + ship.size, y }
        for (let i = y; i <= ship.tailCoords.y; ++i) {
          board[i] = 1
        }
      },

      vertically () {
        ship.tailCoords = { x, y: y + ship.size }
      }
    }
  }

  const recieveAttack = () => {

  }

  return {
    get board () { return board },
    place
  }
}

export { Gameboard }
