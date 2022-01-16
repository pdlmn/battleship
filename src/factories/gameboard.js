import { repeat, find } from '../utils/func_helpers'
import { Ship } from './ship'

const _createGameBoard = () =>
  repeat(() => repeat(() => 'w', 10), 10)

const _fillRow = (headX, headY, tailY, board) => {
  const result = [...board]
  for (let i = headY - 1; i < tailY - 1; i++) {
    result[headX - 1][i] = 's'
  }
  return result
}

const _fillColumn = (headX, tailX, headY, board) => {
  const result = [...board]
  for (let i = headX - 1; i < tailX - 1; i++) {
    result[i][headY - 1] = 's'
  }
  return result
}

const Gameboard = () => {
  const fleet = []
  const missed = []
  let board = _createGameBoard()

  const _findHitShip = (x, y, fleet) =>
    find((ship) => find((segment) =>
      segment.x === x && segment.y === y, ship.segments))
    (fleet)

  const place = (size, headX, headY) => {
    return {
      horizontally () {
        const tailY = headY + size
        const ship = Ship(size, headX, headY, 'horizontally')
        fleet.push(ship)
        board = _fillRow(headX, headY, tailY, board)
      },

      vertically () {
        const tailX = headX + size
        const ship = Ship(size, headX, headY, 'vertically')
        fleet.push(ship)
        board = _fillColumn(headX, tailX, headY, board)
      }
    }
  }

  const recieveAttack = (x, y) => {
    const hitShip = _findHitShip(x, y, fleet)
    if (!hitShip) {
      missed.push({ x, y })
      return false
    }
    const hitSegment = hitShip.segments.findIndex(segment => segment.x === x && segment.y === y)
    hitShip.hit(hitSegment)
    return true
  }

  const isFleetSunk = () =>
    fleet.every((ship) => ship.isSunk())

  return {
    get board () { return board },
    get fleet () { return fleet },
    get missed () { return missed },
    place,
    recieveAttack,
    isFleetSunk
  }
}

export { Gameboard }
