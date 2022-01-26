const _types = {
  2: 'Patrol boat',
  3: 'Destroyer',
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

const Ship = (y, x, size, plane) => {
  const type = _types[size]
  if (type === undefined) throw new Error('Improper ship size')

  const segments = _segmentsCreator[plane](y, x, size)

  return {
    get size () { return size },
    get type () { return type },
    get segments () { return segments },
    hit (segment) { segments[segment].intact = false },
    isSunk () { return segments.every((segment) => segment.intact === false) }
  }
}

export { Ship }