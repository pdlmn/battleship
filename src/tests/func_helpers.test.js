import { hasTruthyValues, replaceAt, replaceEveryNth, map, pipe, curry, decrement, decrementEach, increment, incrementEach, repeat, find, findIndex, forEach, hasFalsyValues, flatten, filter, objEqual, objectInArray } from '../utils/func_helpers'

describe('func helpers work properly', () => {
  test('hasTruthyValues correctly determines truthiness of values in an array (1)', () => {
    expect(hasTruthyValues([1, 2, 3])).toBe(true)
  })

  test('hasTruthyValues correctly determines truthiness of values in an array (2)', () => {
    expect(hasTruthyValues([null, undefined, 0])).toBe(false)
  })

  test('hasFalsyValues correctly determines truthiness of values in an array (1)', () => {
    expect(hasFalsyValues([1, 2, 3])).toBe(false)
  })

  test('hasFalsyValues correctly determines truthiness of values in an array (2)', () => {
    expect(hasFalsyValues([1, 2, null])).toBe(true)
  })

  test('replaceEveryNth replaces values correctly (1)', () => {
    const replaceEverySecond = replaceEveryNth(2, null, null, 'heh')
    expect(replaceEverySecond([0, 1, 2, 3])).toEqual([0, 'heh', 2, 'heh'])
  })

  test('replaceEveryNth replaces values correctly (2)', () => {
    const replaceEverySecond = replaceEveryNth(3, null, null, 'heh')
    expect(replaceEverySecond([1, 2, 3, 4])).toEqual([1, 2, 'heh', 4])
  })

  test('replaceEveryNth replaces starting from specified value', () => {
    const replaceEverySecond = replaceEveryNth(2, 2, null, 'heh')
    expect(replaceEverySecond([1, 2, 3, 4, 5, 6])).toEqual([1, 2, 'heh', 4, 'heh', 6])
  })

  test('replaceEveryNth replaces starting from specified value', () => {
    const replaceEverySecond = replaceEveryNth(2, 0, null, 'heh')
    expect(replaceEverySecond([1, 2, 3, 4, 5, 6])).toEqual(['heh', 2, 'heh', 4, 'heh', 6])
  })

  test('replaceEveryNth replaces until specified value', () => {
    const replaceEverySecond = replaceEveryNth(2, null, 4, 'heh')
    expect(replaceEverySecond([1, 2, 3, 4, 5, 6])).toEqual([1, 'heh', 3, 'heh', 5, 6])
  })

  test('replaceAt replaces value at specified index', () => {
    const replaceAtTwo = replaceAt(2, 'heh')
    expect(replaceAtTwo([1, 2, 3, 4])).toEqual([1, 2, 'heh', 4])
  })

  test('map correctly applies function to array items', () => {
    const mapAdd = map((a) => a + 2)
    expect(mapAdd([1, 2, 3])).toEqual([3, 4, 5])
  })

  test('map correctly applies function to object properties', () => {
    const mapAdd = map((a) => a + 2)
    expect(mapAdd({ a: 1, b: 2, c: 3 })).toEqual({ a: 3, b: 4, c: 5 })
  })

  test('pipe joins different functions in a correct order', () => {
    const func1 = (n) => n + 2
    const func2 = (n) => n * 2
    const addAndMultiply = pipe(func1, func2)
    expect(addAndMultiply(4)).toBe(12)
  })

  test('curry correctly curries a function (1)', () => {
    const func = (a, b) => a + b
    const curriedFunc = curry(func)
    expect(curriedFunc(1)(2)).toBe(3)
  })

  test('curry correctly curries a function (2)', () => {
    const func = (a, b) => a + b
    const curriedFunc = curry(func)
    expect(curriedFunc()(1, 2)).toBe(3)
  })

  test('curry functions work like regular functions', () => {
    const func = (a, b) => a + b
    const curriedFunc = curry(func)
    expect(curriedFunc(1, 2)).toBe(3)
  })

  test('decrement correctly subracts from an array items', () => {
    expect(decrement([1, 2, 3, 'heh', true])).toEqual([0, 1, 2, 'heh', true])
  })

  test('decrement correctly subracts from an object properties', () => {
    expect(decrement({ a: 1, b: 2, c: 3, d: 'heh', f: true })).toEqual({ a: 0, b: 1, c: 2, d: 'heh', f: true })
  })

  test('decrementEach correctly subracts from nested arrays an objects inside an array', () => {
    expect(decrementEach([[1, 2, 3, 'heh', true], { a: 1, b: 2, c: 3, d: 'heh', f: true }]))
      .toEqual([[0, 1, 2, 'heh', true], { a: 0, b: 1, c: 2, d: 'heh', f: true }])
  })

  test('increment correctly subracts from an array items', () => {
    expect(increment([1, 2, 3, 'heh', true])).toEqual([2, 3, 4, 'heh', true])
  })

  test('increment correctly subracts from an object properties', () => {
    expect(increment({ a: 1, b: 2, c: 3, d: 'heh', f: true })).toEqual({ a: 2, b: 3, c: 4, d: 'heh', f: true })
  })

  test('incrementEach correctly subracts from nested arrays an objects inside an array', () => {
    expect(incrementEach([[1, 2, 3, 'heh', true], { a: 1, b: 2, c: 3, d: 'heh', f: true }]))
      .toEqual([[2, 3, 4, 'heh', true], { a: 2, b: 3, c: 4, d: 'heh', f: true }])
  })

  test('repeat correctly creates an array of repeated values', () => {
    expect(repeat(() => 'heh', 3)).toEqual(['heh', 'heh', 'heh'])
  })

  test('find returns correct item from an array', () => {
    expect(find((n) => n % 2 === 0, [1, 5, 9, 10])).toBe(10)
  })

  test('findIndex returns correct index of an item from an array', () => {
    expect(findIndex((n) => n % 2 === 0, [1, 5, 9, 10])).toBe(3)
  })

  test('forEach calls a function for every item in the list correctly', () => {
    const arr = [1, 2, 3]
    forEach((n) => arr.push(n), [4, 5, 6])
    expect(arr).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('flatten makes a flat array from a nested one', () => {
    expect(flatten([1, [2, 3, [4, 5]]])).toEqual([1, 2, 3, 4, 5])
  })

  test('filter creates a new filtered out array with correct elements', () => {
    const predicate = (n) => n % 2 === 0
    expect(filter(predicate, [1, 2, 3, 4, 5])).toEqual([2, 4])
  })

  test('objEquals returns true if properties of two different objects are the same', () => {
    const obj1 = { name: 'John', age: 32, married: false }
    const obj2 = { name: 'John', age: 32, married: false }
    expect(objEqual(obj1, obj2)).toBe(true)
  })

  test('objEquals returns false if properties of two different objects are not the same', () => {
    const obj1 = { name: 'John', age: 32, married: true }
    const obj2 = { name: 'John', age: 32, married: false }
    expect(objEqual(obj1, obj2)).toBe(false)
  })

  test('objectInArray returns true if there is an object with the same properties in an array', () => {
    const obj1 = { name: 'John', age: 32, married: true }
    const arr = [
      { name: 'Mary', age: 22, married: false },
      { name: 'John', age: 32, married: true },
      { name: 'Stew', age: 40, married: true }
    ]
    expect(objectInArray(obj1, arr)).toBe(true)
  })

  test('objectInArray returns false if there is no object with the same properties in an array', () => {
    const obj1 = { name: 'John', age: 32, married: true }
    const arr = [
      { name: 'Mary', age: 22, married: false },
      { name: 'John', age: 33, married: true },
      { name: 'Stew', age: 40, married: true }
    ]
    expect(objectInArray(obj1, arr)).toBe(false)
  })
})
