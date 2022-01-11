import { Ship } from '../logic/ships'
import { Gameboard } from '../logic/gameboard'

describe('gameboard works correctly', () => {
  test('gameboard correctly places ships horizontally', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    gameboard.place(ship).horizontally()
    expect(ship.tailCoords).toEqual({ x: 3, y: 1 })
  })

  test('gameboard correctly places ships vertically', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    gameboard.place(ship).vertically()
    expect(ship.tailCoords).toEqual({ x: 1, y: 3 })
  })

  test('virtual board changes after placing ship', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    gameboard.place(ship).horizontally()
    expect().toEqual()
  })
})
