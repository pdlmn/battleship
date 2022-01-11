import { hasTruthyValues } from '../utils/func_helpers'

describe('func helpers work properly', () => {
  test('hasTruthyValues correctly determines truthiness of values in an array (1)', () => {
    expect(hasTruthyValues([1, 2, 3])).toBe(true)
  })
  test('hasTruthyValues correctly determines truthiness of values in an array (2)', () => {
    expect(hasTruthyValues([null, undefined, 0])).toBe(false)
  })
})
