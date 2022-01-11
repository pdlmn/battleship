import * as H from '../utils/func_helpers'

const types = {
  2: 'Patrol boat',
  3: 'Destroyer',
  4: 'Battleship',
  5: 'Carrier'
}

const Ship = (size, x, y) => {
  const type = types[String(size)]
  if (type === undefined) throw new Error('Improper ship size')

  const segments = new Array(size).fill(1)
  const headCoords = { x, y }
  let tailCoords

  return {
    get size () { return size },
    get type () { return type },
    get headCoords () { return headCoords },
    get tailCoords () { return tailCoords },
    set tailCoords (val) { tailCoords = val },
    get segments () { return segments },
    hit (segment) { segments[segment] = 0 },
    isSunk () { return !(H.hasTruthyValues(segments)) }
  }
}

export { Ship }
