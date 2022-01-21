import { Gameboard, _createGameboard } from '../factories/gameboard'
import { repeat } from '../utils/func_helpers'

describe('Gameboard methods work correctly', () => {
  test('place() correctly changes virtual board after placing ship horizontally (1)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    expected[0][0] = 's'
    expected[0][1] = 's'
    gameboard.place(2, 1, 1, 'horizontally')
    expect(gameboard.board).toEqual(expected)
  })

  test('place() correctly changes virtual board after placing ship horizontally (2)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    expected[6][6] = 's'
    expected[6][7] = 's'
    expected[6][8] = 's'
    gameboard.place(3, 7, 7, 'horizontally')
    expect(gameboard.board).toEqual(expected)
  })

  test('place() correctly changes virtual board after placing ship vertically (1)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    expected[0][0] = 's'
    expected[1][0] = 's'
    gameboard.place(2, 1, 1, 'vertically')
    expect(gameboard.board).toEqual(expected)
  })

  test('place() correctly changes virtual board after placing ship vertically (2)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    expected[6][6] = 's'
    expected[7][6] = 's'
    expected[8][6] = 's'
    gameboard.place(3, 7, 7, 'vertically')
    expect(gameboard.board).toEqual(expected)
  })

  test("place() doesn't place ships in an invalid position (1)", () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 1, 'horizontally')
    expect(gameboard.place(2, 1, 1, 'horizontally')).toBe('This spot is occupied')
  })

  test("place() doesn't place ships on top of another ship (2)", () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 1, 'horizontally')
    expect(gameboard.place(2, 1, 2, 'horizontally')).toBe('This spot is occupied')
  })

  test("place() places ships if they are on the edge of a board (1)", () => {
    const gameboard = Gameboard()
    expect(gameboard.place(2, 10, 9, 'horizontally')).toBe('Ship was placed successfully')
  })

  test("place() places ships if they are on the edge of a board (2)", () => {
    const gameboard = Gameboard()
    expect(gameboard.place(3, 8, 10, 'vertically')).toBe('Ship was placed successfully')
  })

  test("place() doesn't place ships if there is not enough room (1)", () => {
    const gameboard = Gameboard()
    expect(gameboard.place(2, 10, 10, 'horizontally')).toBe('Ship is too big')
  })

  test("place() doesn't place ships if there is not enough room (2)", () => {
    const gameboard = Gameboard()
    expect(gameboard.place(3, 7, 9, 'horizontally')).toBe('Ship is too big')
  })

  test("place() doesn't place ships if there is not enough room (3)", () => {
    const gameboard = Gameboard()
    expect(gameboard.place(3, 9, 7, 'vertically')).toBe('Ship is too big')
  })

  test("place() doesn't place ships if adjacent to any ship (1)", () => {
    const gameboard = Gameboard()
    gameboard.place(2, 2, 2, 'horizontally')
    expect(gameboard.place(2, 3, 2, 'horizontally')).toBe('Ship is adjacent to other ship')
  })

  test("place() doesn't place ships if adjacent to any ship (2)", () => {
    const gameboard = Gameboard()
    gameboard.place(2, 2, 2, 'horizontally')
    expect(gameboard.place(2, 1, 2, 'horizontally')).toBe('Ship is adjacent to other ship')
  })

  test('receiveAttack() correctly determines whether ship was hit or not (1)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 1, 'horizontally')
    gameboard.receiveAttack(1, 1)
    expect(gameboard.fleet[0].segments[0]).toEqual({ y: 1, x: 1, intact: false })
    expect(gameboard.fleet[0].segments[1]).toEqual({ y: 1, x: 2, intact: true })
  })

  test('receiveAttack() correctly determines whether ship was hit or not (2)', () => {
    const gameboard = Gameboard()
    gameboard.place(3, 7, 7, 'horizontally')
    gameboard.receiveAttack(7, 8)
    expect(gameboard.fleet[0].segments[0]).toEqual({ y: 7, x: 7, intact: true })
    expect(gameboard.fleet[0].segments[1]).toEqual({ y: 7, x: 8, intact: false })
    expect(gameboard.fleet[0].segments[2]).toEqual({ y: 7, x: 9, intact: true })
  })

  test('receiveAttack() correctly determines whether ship was hit or not (3)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 5, 5, 'vertically')
    gameboard.receiveAttack(7, 8)
    expect(gameboard.fleet[0].segments[0]).toEqual({ y: 5, x: 5, intact: true })
    expect(gameboard.fleet[0].segments[1]).toEqual({ y: 6, x: 5, intact: true })
  })

  test('receiveAttack() correctly records missed attacks (1)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 5, 5, 'vertically')
    gameboard.receiveAttack(7, 8)
    expect(gameboard.missed[0]).toEqual({ y: 7, x: 8 })
  })

  test('receiveAttack() correctly records missed attacks (2)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 5, 5, 'vertically')
    gameboard.receiveAttack(3, 2)
    gameboard.receiveAttack(5, 2)
    expect(gameboard.missed[0]).toEqual({ y: 3, x: 2 })
    expect(gameboard.missed[1]).toEqual({ y: 5, x: 2 })
  })

  test('receiveAttack() correctly records missed attacks (3)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 1, 'horizontally')
    gameboard.receiveAttack(1, 1)
    expect(gameboard.missed).toEqual([])
  })

  test('receiveAttack() correctly maps missed attacks on the virtual board (1)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    gameboard.receiveAttack(1, 1)
    expected[0][0] = 'm'
    expect(gameboard.board).toEqual(expected)
  })

  test('receiveAttack() correctly maps missed attacks on the virtual board (2)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    gameboard.receiveAttack(2, 1)
    gameboard.receiveAttack(7, 7)
    expected[1][0] = 'm'
    expected[6][6] = 'm'
    expect(gameboard.board).toEqual(expected)
  })

  test('receiveAttack() correctly maps hit attacks on the virtual board (1)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    gameboard.place(2, 1, 1, 'vertically')
    gameboard.receiveAttack(1, 1)
    expected[0][0] = 'h'
    expected[1][0] = 's'
    expect(gameboard.board).toEqual(expected)
  })

  test('receiveAttack() correctly maps hit attacks on the virtual board (2)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    gameboard.place(3, 7, 7, 'horizontally')
    gameboard.receiveAttack(7, 7)
    gameboard.receiveAttack(7, 8)
    expected[6][6] = 'h'
    expected[6][7] = 'h'
    expected[6][8] = 's'
    expect(gameboard.board).toEqual(expected)
  })

  test('isFleetSunk() correctly determines status of the ships (1)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 1, 'horizontally')
    gameboard.receiveAttack(1, 1)
    gameboard.receiveAttack(1, 2)
    expect(gameboard.isFleetSunk()).toBe(true)
  })

  test('isFleetSunk() correctly determines status of the ships (2)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 1, 'horizontally')
    gameboard.receiveAttack(1, 1)
    gameboard.receiveAttack(2, 2)
    expect(gameboard.isFleetSunk()).toBe(false)
  })

  test('isFleetSunk() correctly determines status of the ships (3)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 1, 'horizontally')
    gameboard.place(2, 4, 4, 'horizontally')
    gameboard.receiveAttack(1, 1)
    gameboard.receiveAttack(1, 2)
    expect(gameboard.isFleetSunk()).toBe(false)
  })
})
