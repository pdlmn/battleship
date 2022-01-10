import { areArrValuesTruthy } from '../utils/func_helpers'

describe('func helpers work properly', () => {
  test('areArrayValuesTruthy correctly determines truthiness of values in an array (1)', () => {
    expect(areArrValuesTruthy([1, 2, 3])).toBe(true)
  })
  test('areArrayValuesTruthy correctly determines truthiness of values in an array (2)', () => {
    expect(areArrValuesTruthy([null, undefined, 0])).toBe(false)
  })
})
