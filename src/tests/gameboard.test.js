import { Ship } from '../logic/ships'
import { Gameboard } from '../logic/gameboard'

const createNestedArrays = () => 
  Array.from({length: 10}, () => 
    Array.from({length: 10}, () => 'w'))

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

  test.only('virtual board correctly changes after placing ship horizontally (1)', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    const expected = createNestedArrays()
    expected[0][0] = 's'
    expected[0][1] = 's'
    gameboard.place(ship).horizontally()
    console.log(expected)
    console.log(gameboard.board)
    expect(gameboard.board).toEqual(expected)
  })

  test('virtual board correctly changes after placing ship horizontally (2)', () => {
    const gameboard = Gameboard()
    const ship = Ship(3, 7, 7)
    const expected = createNestedArrays() 
    gameboard.place(ship).horizontally()
    expect(gameboard.board).toEqual(expected)
  })

  test('virtual board correctly changes after placing ship vertically (1)', () => {
    const gameboard = Gameboard()
    const ship = Ship(2, 1, 1)
    const expected = createNestedArrays() 
    expected[0] = 1
    expected[10] = 1
    gameboard.place(ship).vertically()
    expect(gameboard.board).toEqual(expected)
  })

  test('virtual board correctly changes after placing ship vertically (2)', () => {
    const gameboard = Gameboard()
    const ship = Ship(3, 7, 7)
    const expected = createNestedArrays() 
    expected[0] = 1
    expected[10] = 1
    gameboard.place(ship).vertically()
    expect(gameboard.board).toEqual(expected)
  })

})
