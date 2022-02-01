import { Gameboard, _createGameboard } from '../factories/gameboard'

describe('Gameboard methods work correctly', () => {
  test('place() correctly changes virtual board after placing ship horizontally (1)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    expected[0][0] = 's'
    expected[0][1] = 's'
    gameboard.place(1, 1, 2, 'horizontally')
    expect(gameboard.state).toEqual(expected)
  })

  test('place() correctly changes virtual board after placing ship horizontally (2)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    expected[6][6] = 's'
    expected[6][7] = 's'
    expected[6][8] = 's'
    gameboard.place(7, 7, 3, 'horizontally')
    expect(gameboard.state).toEqual(expected)
  })

  test('place() correctly changes virtual board after placing ship vertically (1)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    gameboard.setPlane('vertically')
    expected[0][0] = 's'
    expected[1][0] = 's'
    gameboard.place(1, 1, 2)
    expect(gameboard.state).toEqual(expected)
  })

  test('place() correctly changes virtual board after placing ship vertically (2)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    gameboard.setPlane('vertically')
    expected[6][6] = 's'
    expected[7][6] = 's'
    expected[8][6] = 's'
    gameboard.place(7, 7, 3)
    expect(gameboard.state).toEqual(expected)
  })

  test('isValidForPlace() correctly determines works with ships at the edge of a board (1)', () => {
    const gameboard = Gameboard()
    expect(gameboard.isValidForPlace(10, 9, 2)).toBe(true)
    expect(gameboard.isValidForPlace(10, 10, 2)).toBe(false)
  })

  test('isValidForPlace() correctly determines works with ships at the edge of a board (2)', () => {
    const gameboard = Gameboard()
    gameboard.setPlane('vertically')
    expect(gameboard.isValidForPlace(8, 10, 3)).toBe(true)
    expect(gameboard.isValidForPlace(9, 10, 3)).toBe(false)
  })

  test('isValidForPlace() determines if ship overlaps with other ships (1)', () => {
    const gameboard = Gameboard()
    gameboard.place(1, 1, 2)
    expect(gameboard.isValidForPlace(1, 1, 2)).toBe(false)
  })

  test('isValidForPlace() determines if ship overlaps with other ships (2)', () => {
    const gameboard = Gameboard()
    gameboard.place(1, 1, 2)
    expect(gameboard.isValidForPlace(1, 2, 2)).toBe(false)
  })

  test('isValidForPlace() determines if ship overlaps with other ships (3)', () => {
    const gameboard = Gameboard()
    gameboard.setPlane('vertically')
    gameboard.place(2, 3, 3)
    gameboard.setPlane('horizontally')
    expect(gameboard.isValidForPlace(2, 1, 5)).toBe(false)
  })

  test('isValidForPlace() determines if ship overlaps with other ships (4)', () => {
    const gameboard = Gameboard()
    gameboard.setPlane('vertically')
    gameboard.place(2, 1, 2)
    expect(gameboard.isValidForPlace(1, 1, 5)).toBe(false)
  })

  test('isValidForPlace() determines if ship overflows from the board (1)', () => {
    const gameboard = Gameboard()
    expect(gameboard.isValidForPlace(10, 10, 2)).toBe(false)
  })

  test('isValidForPlace() determines if ship overflows from the board (2)', () => {
    const gameboard = Gameboard()
    gameboard.setPlane('vertically')
    expect(gameboard.isValidForPlace(8, 8, 5)).toBe(false)
  })

  test("isValidForPlace() doesn't place ships if adjacent horizontally to any ship (1)", () => {
    const gameboard = Gameboard()
    gameboard.place(2, 1, 2)
    expect(gameboard.isValidForPlace(1, 1, 2)).toBe(false)
    expect(gameboard.isValidForPlace(3, 1, 2)).toBe(false)
  })

  test("isValidForPlace() doesn't place ships if adjacent horizontally to any ship (2)", () => {
    const gameboard = Gameboard()
    gameboard.place(8, 8, 3)
    expect(gameboard.isValidForPlace(7, 7, 4)).toBe(false)
    expect(gameboard.isValidForPlace(9, 9, 2)).toBe(false)
  })

  test("isValidForPlace() doesn't place ships if adjacent horizontally to any ship (3)", () => {
    const gameboard = Gameboard()
    gameboard.setPlane('vertically')
    gameboard.place(3, 3, 3)
    expect(gameboard.isValidForPlace(1, 3, 2)).toBe(false)
    expect(gameboard.isValidForPlace(6, 3, 5)).toBe(false)
  })

  test("isValidForPlace() doesn't place ships if adjacent vertically to any ship (1)", () => {
    const gameboard = Gameboard()
    gameboard.place(1, 3, 3)
    expect(gameboard.isValidForPlace(1, 1, 2)).toBe(false)
    expect(gameboard.isValidForPlace(1, 6, 5)).toBe(false)
  })

  test("isValidForPlace() doesn't place ships if adjacent vertically to any ship (2)", () => {
    const gameboard = Gameboard()
    gameboard.setPlane('vertically')
    gameboard.place(8, 8, 3)
    expect(gameboard.isValidForPlace(8, 7, 2)).toBe(false)
    expect(gameboard.isValidForPlace(6, 9, 5)).toBe(false)
  })

  test("isValidForPlace() doesn't place ships if adjacent diagonally to any ship (1)", () => {
    const gameboard = Gameboard()
    gameboard.place(2, 3, 3)
    expect(gameboard.isValidForPlace(1, 1, 2)).toBe(false)
    expect(gameboard.isValidForPlace(3, 1, 2)).toBe(false)
    expect(gameboard.isValidForPlace(3, 5, 4)).toBe(false)
    expect(gameboard.isValidForPlace(1, 5, 5)).toBe(false)
  })

  test("isValidForPlace() doesn't place ships if adjacent diagonally to any ship (2)", () => {
    const gameboard = Gameboard()
    gameboard.setPlane('vertically')
    gameboard.place(6, 6, 3)
    expect(gameboard.isValidForPlace(3, 5, 3)).toBe(false)
    expect(gameboard.isValidForPlace(9, 5, 2)).toBe(false)
    expect(gameboard.isValidForPlace(1, 7, 5)).toBe(false)
    expect(gameboard.isValidForPlace(9, 7, 2)).toBe(false)
  })

  test('isValidAttackTarget() correctly determines if the attack target is valid', () => {
    const gameboard = Gameboard()
    gameboard.receiveAttack(1, 1)
    expect(gameboard.isValidAttackTarget(1, 1)).toBe(false)
    expect(gameboard.isValidAttackTarget(1, 2)).toBe(true)
    expect(gameboard.isValidAttackTarget(2, 2)).toBe(true)
    expect(gameboard.isValidAttackTarget(11, 10)).toBe(false)
    expect(gameboard.isValidAttackTarget(10, 11)).toBe(false)
    expect(gameboard.isValidAttackTarget(0, 1)).toBe(false)
    expect(gameboard.isValidAttackTarget(1, 0)).toBe(false)
  })

  test('receiveAttack() correctly determines whether ship was hit or not (1)', () => {
    const gameboard = Gameboard()
    gameboard.place(1, 1, 2)
    gameboard.receiveAttack(1, 1)
    expect(gameboard.fleet[0].segments[0]).toEqual({ y: 1, x: 1, intact: false })
    expect(gameboard.fleet[0].segments[1]).toEqual({ y: 1, x: 2, intact: true })
  })

  test('receiveAttack() correctly determines whether ship was hit or not (2)', () => {
    const gameboard = Gameboard()
    gameboard.place(7, 7, 3)
    gameboard.receiveAttack(7, 8)
    expect(gameboard.fleet[0].segments[0]).toEqual({ y: 7, x: 7, intact: true })
    expect(gameboard.fleet[0].segments[1]).toEqual({ y: 7, x: 8, intact: false })
    expect(gameboard.fleet[0].segments[2]).toEqual({ y: 7, x: 9, intact: true })
  })

  test('receiveAttack() correctly determines whether ship was hit or not (3)', () => {
    const gameboard = Gameboard()
    gameboard.setPlane('vertically')
    gameboard.place(5, 5, 2)
    gameboard.receiveAttack(7, 8)
    expect(gameboard.fleet[0].segments[0]).toEqual({ y: 5, x: 5, intact: true })
    expect(gameboard.fleet[0].segments[1]).toEqual({ y: 6, x: 5, intact: true })
  })

  test('receiveAttack() correctly records missed attacks (1)', () => {
    const gameboard = Gameboard()
    gameboard.setPlane('vertically')
    gameboard.place(5, 5, 2)
    gameboard.receiveAttack(7, 8)
    expect(gameboard.missed[0]).toEqual({ y: 7, x: 8 })
  })

  test('receiveAttack() correctly records missed attacks (2)', () => {
    const gameboard = Gameboard()
    gameboard.setPlane('vertically')
    gameboard.place(5, 5, 2, 'vertically')
    gameboard.receiveAttack(3, 2)
    gameboard.receiveAttack(5, 2)
    expect(gameboard.missed[0]).toEqual({ y: 3, x: 2 })
    expect(gameboard.missed[1]).toEqual({ y: 5, x: 2 })
  })

  test('receiveAttack() correctly records missed attacks (3)', () => {
    const gameboard = Gameboard()
    gameboard.place(1, 1, 2, 'horizontally')
    gameboard.receiveAttack(1, 1)
    expect(gameboard.missed).toEqual([])
  })

  test('receiveAttack() correctly maps missed attacks on the virtual board (1)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    gameboard.receiveAttack(1, 1)
    expected[0][0] = 'm'
    expect(gameboard.state).toEqual(expected)
  })

  test('receiveAttack() correctly maps missed attacks on the virtual board (2)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    gameboard.receiveAttack(2, 1)
    gameboard.receiveAttack(7, 7)
    expected[1][0] = 'm'
    expected[6][6] = 'm'
    expect(gameboard.state).toEqual(expected)
  })

  test('receiveAttack() correctly maps hit attacks on the virtual board (1)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    gameboard.setPlane('vertically')
    gameboard.place(1, 1, 2)
    gameboard.receiveAttack(1, 1)
    expected[0][0] = 'h'
    expected[1][0] = 's'
    expect(gameboard.state).toEqual(expected)
  })

  test('receiveAttack() correctly maps hit attacks on the virtual board (2)', () => {
    const gameboard = Gameboard()
    const expected = _createGameboard()
    gameboard.place(7, 7, 3, 'horizontally')
    gameboard.receiveAttack(7, 7)
    gameboard.receiveAttack(7, 8)
    expected[6][6] = 'h'
    expected[6][7] = 'h'
    expected[6][8] = 's'
    expect(gameboard.state).toEqual(expected)
  })

  test('getAttackStatus() returns the correct status object of an attack', () => {
    const gameboard = Gameboard()
    gameboard.place(1, 1, 2)
    gameboard.place(3, 3, 3)
    gameboard.receiveAttack(1, 1)
    expect(gameboard.getAttackStatus(1, 1)).toEqual({ value: 'hit', ship: 'Destroyer', shipStatus: 'damaged', y: 1, x: 1 })
    gameboard.receiveAttack(2, 2)
    expect(gameboard.getAttackStatus(2, 2)).toEqual({ value: 'missed', y: 2, x: 2 })
    gameboard.receiveAttack(3, 3)
    gameboard.receiveAttack(3, 4)
    gameboard.receiveAttack(3, 5)
    expect(gameboard.getAttackStatus(3, 3)).toEqual({ value: 'hit', ship: 'Cruiser', shipStatus: 'destroyed', y: 3, x: 3 })
  })

  test('isShipSunk() correctly determines status of a ship', () => {
    const gameboard = Gameboard()
    gameboard.place(1, 1, 2)
    gameboard.receiveAttack(1, 1)
    gameboard.receiveAttack(1, 2)
    expect(gameboard.isShipSunk(1, 1)).toBe(true)
    expect(gameboard.isShipSunk(1, 2)).toBe(true)
    expect(gameboard.isShipSunk(2, 2)).toBe(false)
  })

  test('isFleetSunk() correctly determines status of the ships (1)', () => {
    const gameboard = Gameboard()
    gameboard.place(1, 1, 2)
    gameboard.receiveAttack(1, 1)
    gameboard.receiveAttack(1, 2)
    expect(gameboard.isFleetSunk()).toBe(true)
  })

  test('isFleetSunk() correctly determines status of the ships (2)', () => {
    const gameboard = Gameboard()
    gameboard.place(1, 1, 2)
    gameboard.receiveAttack(1, 1)
    gameboard.receiveAttack(2, 2)
    expect(gameboard.isFleetSunk()).toBe(false)
  })

  test('isFleetSunk() correctly determines status of the ships (3)', () => {
    const gameboard = Gameboard()
    gameboard.place(1, 1, 2)
    gameboard.place(4, 4, 2)
    gameboard.receiveAttack(1, 1)
    gameboard.receiveAttack(1, 2)
    expect(gameboard.isFleetSunk()).toBe(false)
  })
})
