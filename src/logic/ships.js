import * as H from '../utils/func_helpers'

const types = {
  2: 'Patrol boat',
  3: 'Destroyer',
  4: 'Battleship',
  5: 'Carrier'
}

const isSunk = (segments) => segments

const Ship = (size) => {
  const type = types[String(size)]
  if (type === undefined) throw new Error('Improper ship size')

  const segments = new Array(size).fill(1)

  return {
    type,
    segments,
    hit(segment) { segments[segment] = 0 },
    isSunk() { return !(H.areArrValuesTruthy(segments)) },
  }
}

export { Ship }
