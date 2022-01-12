import { hasTruthyValues, replaceAt, replaceEveryNth, pipe } from '../utils/func_helpers'

describe('func helpers work properly', () => {
  test('hasTruthyValues correctly determines truthiness of values in an array (1)', () => {
    expect(hasTruthyValues([1, 2, 3])).toBe(true)
  })

  test('hasTruthyValues correctly determines truthiness of values in an array (2)', () => {
    expect(hasTruthyValues([null, undefined, 0])).toBe(false)
  })

  test('replaceEveryNth replaces values correctly (1)', () => {
    const replaceEverySecond = replaceEveryNth(2, 'heh', null)
    expect(replaceEverySecond([0, 1, 2, 3])).toEqual([0, 'heh', 2, 'heh'])
  })

  test('replaceEveryNth replaces values correctly (2)', () => {
    const replaceEverySecond = replaceEveryNth(3, 'heh', null)
    expect(replaceEverySecond([1, 2, 3, 4])).toEqual([1, 2, 'heh', 4])
  })

  test('replaceEveryNth replaces until specified value', () => {
    const replaceEverySecond = replaceEveryNth(2, 'heh', 4)
    expect(replaceEverySecond([1, 2, 3, 4, 5, 6])).toEqual([1, 'heh', 3, 'heh', 5, 6])
  })

  test('replaceAt replaces value at specified index', () => {
    const replaceAtTwo = replaceAt(2, 'heh')
    expect(replaceAtTwo([1, 2, 3, 4])).toEqual([1, 2, 'heh', 4])
  })

  test('pipe joins different functions in a correct order', () => {
    const func1 = (n) => n + 2
    const func2 = (n) => n * 2
    const addAndMultiply = pipe(func1, func2)
    expect(addAndMultiply(4)).toBe(12)
  })
})
