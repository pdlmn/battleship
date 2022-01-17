import { Gameboard } from '../factories/gameboard'
import { repeat } from '../utils/func_helpers'

const createPseudoBoard = () =>
  repeat(() => repeat(() => 'w', 10), 10)

describe('Gameboard methods work correctly', () => {
  test('horizontally() correctly changes virtual board (1)', () => {
    const gameboard = Gameboard()
    const expected = createPseudoBoard()
    expected[0][0] = 's'
    expected[0][1] = 's'
    gameboard.place(2, 1, 1).horizontally()
    expect(gameboard.board).toEqual(expected)
  })

  test('horizontally() correctly changes virtual board (2)', () => {
    const gameboard = Gameboard()
    const expected = createPseudoBoard()
    expected[6][6] = 's'
    expected[6][7] = 's'
    expected[6][8] = 's'
    gameboard.place(3, 7, 7).horizontally()
    expect(gameboard.board).toEqual(expected)
  })

  test('vertically() correctly changes virtual board (1)', () => {
    const gameboard = Gameboard()
    const expected = createPseudoBoard()
    expected[0][0] = 's'
    expected[1][0] = 's'
    gameboard.place(2, 1, 1).vertically()
    expect(gameboard.board).toEqual(expected)
  })

  test('vertically() correctly changes virtual board (2)', () => {
    const gameboard = Gameboard()
    const expected = createPseudoBoard()
    expected[6][6] = 's'
    expected[7][6] = 's'
    expected[8][6] = 's'
    gameboard.place(3, 7, 7).vertically()
    expect(gameboard.board).toEqual(expected)
  })

  test('recieveAttack() correctly determines whether ship was hit or not (1)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 1).horizontally()
    gameboard.recieveAttack(1, 1)
    expect(gameboard.fleet[0].segments[0]).toEqual({ x: 1, y: 1, intact: false })
    expect(gameboard.fleet[0].segments[1]).toEqual({ x: 1, y: 2, intact: true })
  })

  test('recieveAttack() correctly determines whether ship was hit or not (2)', () => {
    const gameboard = Gameboard()
    gameboard.place(3, 7, 7).horizontally()
    gameboard.recieveAttack(7, 8)
    expect(gameboard.fleet[0].segments[0]).toEqual({ x: 7, y: 7, intact: true })
    expect(gameboard.fleet[0].segments[1]).toEqual({ x: 7, y: 8, intact: false })
    expect(gameboard.fleet[0].segments[2]).toEqual({ x: 7, y: 9, intact: true })
  })

  test('recieveAttack() correctly determines whether ship was hit or not (3)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 5, 5).vertically()
    gameboard.recieveAttack(7, 8)
    expect(gameboard.fleet[0].segments[0]).toEqual({ x: 5, y: 5, intact: true })
    expect(gameboard.fleet[0].segments[1]).toEqual({ x: 6, y: 5, intact: true })
  })

  test('recieveAttack() correctly records missed attacks (1)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 5, 5).vertically()
    gameboard.recieveAttack(7, 8)
    expect(gameboard.missed[0]).toEqual({ x: 7, y: 8 })
  })

  test('recieveAttack() correctly records missed attacks (2)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 5, 5).vertically()
    gameboard.recieveAttack(3, 2)
    gameboard.recieveAttack(5, 2)
    expect(gameboard.missed[0]).toEqual({ x: 3, y: 2 })
    expect(gameboard.missed[1]).toEqual({ x: 5, y: 2 })
  })

  test('recieveAttack() correctly records missed attacks (3)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 1).horizontally()
    gameboard.recieveAttack(1, 1)
    expect(gameboard.missed).toEqual([])
  })

  test('recieveAttack() correctly maps missed attacks on the virtual board (1)', () => {
    const gameboard = Gameboard()
    const expected = createPseudoBoard()
    gameboard.recieveAttack(1, 1)
    expected[0][0] = 'm'
    expect(gameboard.board).toEqual(expected)
  })

  test('recieveAttack() correctly maps missed attacks on the virtual board (2)', () => {
    const gameboard = Gameboard()
    const expected = createPseudoBoard()
    gameboard.recieveAttack(2, 1)
    gameboard.recieveAttack(7, 7)
    expected[1][0] = 'm'
    expected[6][6] = 'm'
    expect(gameboard.board).toEqual(expected)
  })

  test('recieveAttack() correctly maps hit attacks on the virtual board (1)', () => {
    const gameboard = Gameboard()
    const expected = createPseudoBoard()
    gameboard.place(2, 1, 1).vertically()
    gameboard.recieveAttack(1, 1)
    expected[0][0] = 'h'
    expected[1][0] = 's'
    expect(gameboard.board).toEqual(expected)
  })

  test('recieveAttack() correctly maps hit attacks on the virtual board (2)', () => {
    const gameboard = Gameboard()
    const expected = createPseudoBoard()
    gameboard.place(3, 7, 7).horizontally()
    gameboard.recieveAttack(7, 7)
    gameboard.recieveAttack(7, 8)
    expected[6][6] = 'h'
    expected[6][7] = 'h'
    expected[6][8] = 's'
    expect(gameboard.board).toEqual(expected)
  })

  test('isFleetSunk() correctly determines status of the ships (1)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 1).horizontally()
    gameboard.recieveAttack(1, 1)
    gameboard.recieveAttack(1, 2)
    expect(gameboard.isFleetSunk()).toBe(true)
  })

  test('isFleetSunk() correctly determines status of the ships (2)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 1).horizontally()
    gameboard.recieveAttack(1, 1)
    gameboard.recieveAttack(2, 2)
    expect(gameboard.isFleetSunk()).toBe(false)
  })

  test('isFleetSunk() correctly determines status of the ships (3)', () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 1).horizontally()
    gameboard.place(2, 4, 4).horizontally()
    gameboard.recieveAttack(1, 1)
    gameboard.recieveAttack(1, 2)
    expect(gameboard.isFleetSunk()).toBe(false)
  })
})
