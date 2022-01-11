const Gameboard = () => {
  let board = new Array(10).fill(new Array(10).fill(0))

  const place = (ship) => {
    const { x, y } = ship.headCoords
    return {
      horizontally () {
        ship.tailCoords = { x: x + ship.size, y }
        for (let i = 0; i <= ship.tailCoords.x; i++) {
          board[x][ship.tailCoords.y] = 1
        }
      },
      vertically () {
        ship.tailCoords = { x, y: y + ship.size }
        for (let i = 0; i <= ship.tailCoords.y; i++) {
          board[ship.tailCoords.x][y] = 1
        }
      }
    }
  }

  const recieveAttack = () => {

  }

  return {
    place
  }
}

export { Gameboard }
