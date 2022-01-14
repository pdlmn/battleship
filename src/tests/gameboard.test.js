import { Ship } from '../logic/ships'
import { Gameboard } from '../logic/gameboard'

const createPseudoBoard = () =>
  Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => 'w'))

describe('gameboard methods work correctly', () => {
  test('horizontally correctly places ships (1)', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    gameboard.place(ship).horizontally()
    expect(ship.tailCoords).toEqual({ x: 1, y: 2 })
  })

  test('horizontally correctly places ships (2)', () => {
    const gameboard = Gameboard()
    const ship = Ship(3, 7, 7)
    gameboard.place(ship).horizontally()
    expect(ship.tailCoords).toEqual({ x: 7, y: 9 })
  })

  test('vertically correctly places ships (1)', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    gameboard.place(ship).vertically()
    expect(ship.tailCoords).toEqual({ x: 2, y: 1 })
  })

  test('vertically correctly places ships (2)', () => {
    const gameboard = Gameboard()
    const ship = Ship(3, 7, 7)
    gameboard.place(ship).vertically()
    expect(ship.tailCoords).toEqual({ x: 9, y: 7 })
  })

  test('horizontally correctly changes virtual board (1)', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    const expected = createPseudoBoard()
    expected[0][0] = 's'
    expected[0][1] = 's'
    gameboard.place(ship).horizontally()
    expect(gameboard.board).toEqual(expected)
  })

  test('horizontally correctly changes virtual board (2)', () => {
    const gameboard = Gameboard()
    const ship = Ship(3, 7, 7)
    const expected = createPseudoBoard()
    expected[6][6] = 's'
    expected[6][7] = 's'
    expected[6][8] = 's'
    gameboard.place(ship).horizontally()
    expect(gameboard.board).toEqual(expected)
  })

  test('vertically correctly changes virtual board (1)', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    const expected = createPseudoBoard()
    expected[0][0] = 's'
    expected[1][0] = 's'
    gameboard.place(ship).vertically()
    expect(gameboard.board).toEqual(expected)
  })

  test('vertically correctly changes virtual board (2)', () => {
    const gameboard = Gameboard()
    const ship = Ship(3, 7, 7)
    const expected = createPseudoBoard()
    expected[6][6] = 's'
    expected[7][6] = 's'
    expected[8][6] = 's'
    gameboard.place(ship).vertically()
    expect(gameboard.board).toEqual(expected)
  })

  test('receiveAttack correctly determines whether ship was hit or not (1)', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    const expected = createPseudoBoard()
  })
})
