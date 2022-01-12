import { Ship } from '../logic/ships'
import { Gameboard } from '../logic/gameboard'

describe('gameboard works correctly', () => {
  test('gameboard correctly places ships horizontally (1)', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    gameboard.place(ship).horizontally()
    expect(ship.tailCoords).toEqual({ x: 1, y: 3 })
  })

  test('gameboard correctly places ships horizontally (2)', () => {
    const gameboard = Gameboard()
    const ship = Ship(3, 7, 7)
    gameboard.place(ship).horizontally()
    expect(ship.tailCoords).toEqual({ x: 7, y: 10 })
  })

  test('gameboard correctly places ships vertically (1)', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    gameboard.place(ship).vertically()
    expect(ship.tailCoords).toEqual({ x: 3, y: 1 })
  })

  test('gameboard correctly places ships vertically (2)', () => {
    const gameboard = Gameboard()
    const ship = Ship(3, 7, 7)
    gameboard.place(ship).vertically()
    expect(ship.tailCoords).toEqual({ x: 10, y: 7 })
  })

  test('virtual board correctly changes after placing ship horizontally (1)', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    const expected = new Array(100).fill(1, 0, 2).fill(0, 2)
    gameboard.place(ship).horizontally()
    expect(gameboard.board).toEqual(
      expected
    )
  })

  test('virtual board correctly changes after placing ship horizontally (2)', () => {
    const gameboard = Gameboard()
    const ship = Ship(3, 7, 7)
    const expected = new Array(100).fill(1, 0, 2).fill(0, 2)
    gameboard.place(ship).horizontally()
    expect(gameboard.board).toEqual(
      expected
    )
  })

  test('virtual board correctly changes after placing ship vertically (1)', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    const expected = new Array(100).fill(0)
    expected[0] = 1
    expected[10] = 1
    gameboard.place(ship).vertically()
    expect(gameboard.board).toEqual(
      expected
    )
  })

  test('virtual board correctly changes after placing ship vertically (2)', () => {
    const gameboard = Gameboard()
    const ship = Ship(3, 7, 7)
    const expected = new Array(100).fill(0)
    expected[0] = 1
    expected[10] = 1
    gameboard.place(ship).vertically()
    expect(gameboard.board).toEqual(
      expected
    )
  })

})
