import { Ship } from '../src/factories/ship'

describe('Ship factory is working correctly', () => {
  test('correctly defines type of a ship based on length', () => {
    const ship2 = Ship(3, 3, 2, 'horizontally')
    const ship3 = Ship(5, 5, 3, 'horizontally')
    const ship4 = Ship(7, 7, 4, 'horizontally')
    const ship5 = Ship(9, 9, 5, 'horizontally')
    expect(ship2.type).toBe('Destroyer')
    expect(ship3.type).toBe('Cruiser')
    expect(ship4.type).toBe('Battleship')
    expect(ship5.type).toBe('Carrier')
  })

  test('segments of a ship filled with correct segment objects (1)', () => {
    const ship = Ship(1, 1, 2, 'horizontally')
    expect(ship.segments[0]).toEqual({ y: 1, x: 1, intact: true })
    expect(ship.segments[1]).toEqual({ y: 1, x: 2, intact: true })
  })

  test('segments of a ship filled with correct segment objects (2)', () => {
    const ship = Ship(7, 7, 3, 'horizontally')
    expect(ship.segments[0]).toEqual({ y: 7, x: 7, intact: true })
    expect(ship.segments[1]).toEqual({ y: 7, x: 8, intact: true })
    expect(ship.segments[2]).toEqual({ y: 7, x: 9, intact: true })
  })

  test('segments of a ship filled with correct segment objects (3)', () => {
    const ship = Ship(6, 6, 4, 'vertically')
    expect(ship.segments[0]).toEqual({ y: 6, x: 6, intact: true })
    expect(ship.segments[1]).toEqual({ y: 7, x: 6, intact: true })
    expect(ship.segments[2]).toEqual({ y: 8, x: 6, intact: true })
    expect(ship.segments[3]).toEqual({ y: 9, x: 6, intact: true })
  })

  test("can't create ships with improper size", () => {
    expect(() => Ship(6)).toThrow('Improper ship size')
  })
})

describe('ship methods are working correctly', () => {
  test('hit() changes segment.intact to false (1)', () => {
    const ship = Ship(1, 1, 2, 'horizontally')
    ship.hit(0)
    expect(ship.segments[0]).toEqual({ y: 1, x: 1, intact: false })
    expect(ship.segments[1]).toEqual({ y: 1, x: 2, intact: true })
  })

  test('hit() changes segment.intact to false (2)', () => {
    const ship = Ship(7, 7, 3, 'horizontally')
    ship.hit(0)
    ship.hit(2)
    expect(ship.segments[0]).toEqual(
      expect.objectContaining({ intact: false }))
    expect(ship.segments[1]).toEqual(
      expect.objectContaining({ intact: true }))
    expect(ship.segments[2]).toEqual(
      expect.objectContaining({ intact: false }))
  })

  test('isSunk() correctly determines if ship is sunk (1)', () => {
    const ship = Ship(1, 1, 2, 'horizontally')
    ship.hit(0)
    expect(ship.isSunk()).toBe(false)
  })

  test('isSunk() correctly determines if ship is sunk (2)', () => {
    const ship = Ship(1, 1, 2, 'horizontally')
    ship.hit(0)
    ship.hit(1)
    expect(ship.isSunk()).toBe(true)
  })
})
