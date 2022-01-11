import { hasTruthyValues, replaceEveryNth } from '../utils/func_helpers'

describe('func helpers work properly', () => {
  test('hasTruthyValues correctly determines truthiness of values in an array (1)', () => {
    expect(hasTruthyValues([1, 2, 3])).toBe(true)
  })

  test('hasTruthyValues correctly determines truthiness of values in an array (2)', () => {
    expect(hasTruthyValues([null, undefined, 0])).toBe(false)
  })

  test('replaceEveryNth replaces every second value correctly (1)', () => {
    const replaceEverySecond = replaceEveryNth(2, 2, null)
    expect(replaceEverySecond([1, 2, 3, 4])).toEqual([1, 2, 3, 2])
  })

  test('replaceEveryNth replaces every second value correctly (2)', () => {
    const replaceEverySecond = replaceEveryNth(2, 2, null)
    expect(replaceEverySecond([1, 2, 3, 4, 4])).toEqual([1, 2, 3, 2, 4])
  })

  test('replaceEveryNth replaces until specified value', () => {
    const replaceEverySecond = replaceEveryNth(2, 2, 4)
    expect(replaceEverySecond([1, 2, 3, 4, 5, 6])).toEqual([1, 2, 3, 2, 5, 6])
  })
})
