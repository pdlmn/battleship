import { Ship } from '../logic/ships'
import { Gameboard } from '../logic/gameboard'

describe('gameboard works correctly', () => {
  test('gameboard correctly places ships horizontally', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    gameboard.place(ship).horizontally()
    expect(ship.tailCoords).toEqual({ x: 1, y: 3 })
  })

  test('gameboard correctly places ships vertically', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    gameboard.place(ship).vertically()
    expect(ship.tailCoords).toEqual({ x: 3, y: 1 })
  })

  test('virtual board correctly changes after placing ship horizontally', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 0, 0)
    const expected = new Array(100).fill(1, 0, 2).fill(0, 2)
    gameboard.place(ship).horizontally()
    expect(gameboard.board).toEqual(
      expected
    )
  })

  test('virtual board correctly changes after placing ship', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 0, 0)
    const expected = new Array(100).fill(0)
    expected[0] = 1
    expected[10] = 1
    gameboard.place(ship).vertically()
    expect(gameboard.board).toEqual(
      expected
    )
  })
})
