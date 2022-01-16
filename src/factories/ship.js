const _types = {
  2: 'Patrol boat',
  3: 'Destroyer',
  4: 'Battleship',
  5: 'Carrier'
}

const _segmentsCreator = {
  horizontally (size, headX, headY) {
    const segments = []
    for (let i = 0; i < size; i++) {
      segments[i] = { x: headX, y: (headY + i), intact: true }
    }
    return segments
  },
  vertically (size, headX, headY) {
    const segments = []
    for (let i = 0; i < size; i++) {
      segments[i] = { x: (headX + i), y: headY, intact: true }
    }
    return segments
  }
}

const Ship = (size, headX, headY, position) => {
  const type = _types[size]
  if (type === undefined) throw new Error('Improper ship size')

  const segments = _segmentsCreator[position](size, headX, headY)

  return {
    get size () { return size },
    get type () { return type },
    get segments () { return segments },
    hit (segment) { segments[segment].intact = false },
    isSunk () { return segments.every((segment) => segment.intact === false) }
  }
}

export { Ship }
