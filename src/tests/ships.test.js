import { Ship } from '../logic/ships'

describe('ship factory is working correctly', () => {

  test('correctly defines type of a ship based on length', () => {
    const ship = Ship(2)
    expect(ship.type).toBe('Patrol boat')
  })

  test('segments of a ship filled with 1s', () => {
    const ship = Ship(2)
    expect(ship.segments).toEqual([1, 1])
  })

  test("can't create ships with improper size", () => {
    expect(() => Ship(6)).toThrow('Improper ship size')
  })

})

describe('ship methods are working correctly', () => {

  test('hit() changes segment value from 1 to 0', () => {
    const ship = Ship(2)
    ship.hit(0)
    expect(ship.segments).toEqual([0, 1])
  })

  test('hit() changes different segments correctly', () => {
    const ship = Ship(3)
    ship.hit(0)
    ship.hit(2)
    expect(ship.segments).toEqual([0, 1, 0])
  })

  test('isSunk() correctly determines if ship is sunk (1)', () => {
    const ship = Ship(2)
    ship.hit(0)
    expect(ship.isSunk()).toBe(false)
  })

  test('isSunk() correctly determines if ship is sunk (2)', () => {
    const ship = Ship(2)
    ship.hit(0)
    ship.hit(1)
    expect(ship.isSunk()).toBe(true)
  })

})
