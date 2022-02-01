const _types = {
  1: 'Patrol boat',
  2: 'Destroyer',
  3: 'Cruiser',
  4: 'Battleship',
  5: 'Carrier'
}

const _segmentsCreator = {
  horizontally (y, x, size) {
    const segments = []
    for (let i = 0; i < size; i++) {
      segments[i] = { y, x: (x + i), intact: true }
    }
    return segments
  },
  vertically (y, x, size) {
    const segments = []
    for (let i = 0; i < size; i++) {
      segments[i] = { y: (y + i), x, intact: true }
    }
    return segments
  }
}

export const Ship = (y, x, size, plane) => {
  const type = _types[size]
  if (type === undefined) throw new Error('Improper ship size')

  const segments = _segmentsCreator[plane](y, x, size)

  const hit = (segment) => { segments[segment].intact = false } 

  const isSunk = () => segments.every((segment) => segment.intact === false)

  return {
    hit,
    isSunk,
    get size () { return size },
    get type () { return type },
    get segments () { return segments }
  }
}
