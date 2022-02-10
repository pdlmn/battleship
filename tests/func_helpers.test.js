import { hasTruthyValues, replaceAt, replaceEveryNth, map, pipe, curry, decrement, decrementEach, increment, incrementEach, repeat, find, findIndex, forEach, hasFalsyValues, flatten, filter, objEqual, objectInArray, remove, all, any, modify, removeDuplicateObj } from '../src/utils/func_helpers'

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

  test('decrement correctly subtracts from a number', () => {
    expect(decrement(1)).toBe(0)
  })

  test('decrement correctly subracts from array items', () => {
    expect(decrement([1, 2, 3, 'heh', true])).toEqual([0, 1, 2, 'heh', true])
  })

  test('decrement correctly subracts from object properties', () => {
    expect(decrement({ a: 1, b: 2, c: 3, d: 'heh', f: true })).toEqual({ a: 0, b: 1, c: 2, d: 'heh', f: true })
  })

  test('decrementEach correctly subracts from nested arrays and objects inside an array', () => {
    expect(decrementEach([[1, 2, 3, 'heh', true], { a: 1, b: 2, c: 3, d: 'heh', f: true }]))
      .toEqual([[0, 1, 2, 'heh', true], { a: 0, b: 1, c: 2, d: 'heh', f: true }])
  })

  test('increment correctly adds to a number', () => {
    expect(increment(1)).toBe(2)
  })

  test('increment correctly adds to array items', () => {
    expect(increment([1, 2, 3, 'heh', true])).toEqual([2, 3, 4, 'heh', true])
  })

  test('increment correctly subracts from object properties', () => {
    expect(increment({ a: 1, b: 2, c: 3, d: 'heh', f: true })).toEqual({ a: 2, b: 3, c: 4, d: 'heh', f: true })
  })

  test('incrementEach correctly subracts from nested arrays and objects inside an array', () => {
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

  test('remove returns an array without specified item', () => {
    const arr = [1, 'heh', false, null]
    expect(remove(1, arr)).toEqual(['heh', false, null])
    expect(remove('heh', arr)).toEqual([1, false, null])
    expect(remove(false, arr)).toEqual([1, 'heh', null])
    expect(remove(null, arr)).toEqual([1, 'heh', false])
    expect(remove('anything', [])).toEqual([])
  })

  test('all returns true if all items in array matches the predicate', () => {
    const arr1 = [2, 4, 6]
    const arr2 = [1, 4, 6]
    const arr3 = [1, 3, 5]
    const arr4 = [3, 3, 3]
    const pred1 = (n) => n % 2 === 0
    const pred2 = (n) => n === 3
    expect(all(pred1, arr1)).toBe(true)
    expect(all(pred1, arr2)).toBe(false)
    expect(all(pred1, arr3)).toBe(false)
    expect(all(pred2, arr4)).toBe(true)
  })

  test('any returns true if one of items in array matches the predicate', () => {
    const arr1 = [2, 4, 6]
    const arr2 = [1, 4, 6]
    const arr3 = [1, 3, 5]
    const arr4 = [3, 3, 3]
    const pred1 = (n) => n % 2 === 0
    const pred2 = (n) => n === 3
    expect(any(pred1, arr1)).toBe(true)
    expect(any(pred1, arr2)).toBe(true)
    expect(any(pred1, arr3)).toBe(false)
    expect(any(pred2, arr4)).toBe(true)
  })

  test('modify returns an object with modified property', () => {
    const obj = { id: 12 }
    expect(modify('id', increment, obj)).toEqual({ id: 13 })
  })

  test('removeDuplicateObj removes a duplicate object from an array', () => {
    const arr = [
      { name: 'John', age: 20 },
      { name: 'Bob', age: 32 },
      { name: 'Alice', age: 40 },
      { name: 'John', age: 22 },
      { name: 'John', age: 20 }
    ]
    const expected = [
      { name: 'John', age: 20 },
      { name: 'Bob', age: 32 },
      { name: 'Alice', age: 40 },
      { name: 'John', age: 22 }
    ]
    expect(removeDuplicateObj(arr)).toMatchObject(expected)
  })
})
