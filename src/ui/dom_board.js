import { forEach, hasFalsyValues, pipe, filter } from '../utils/func_helpers'

const _createCell = (isHidden, y, x) => {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  cell.dataset.y = y
  cell.dataset.x = x
  if (isHidden) cell.classList.add('fog-of-war')
  return cell
}

const _cellsFinder = {
  horizontally (y, x, size) {
    const segments = []
    const tail = x + size
    for (let i = x; i < tail; i++) {
      segments.push(document.querySelector(`[data-y='${y}'][data-x='${i}']`))
    }
    return segments
  },
  vertically (y, x, size) {
    const segments = []
    const tail = y + size
    for (let i = y; i < tail; i++) {
      segments.push(document.querySelector(`[data-y='${i}'][data-x='${x}']`))
    }
    return segments
  }
}

const extractCoords = (cell) =>
  [cell.dataset.y, cell.dataset.x].map(coord => Number(coord))

const _isOverlapsWithShip = (segments) =>
  segments.some((el) => el.classList.contains('ship'))

const _adjacencyChecker = {
  horizontal (segments) {
    for (let i = 0; i < segments.length; i++) {
      const [y, x] = extractCoords(segments[i])
      const [left, right] = [
        document.querySelector(`[data-y='${y}'][data-x='${x - 1}']`),
        document.querySelector(`[data-y='${y}'][data-x='${x + 1}']`)
      ]
        .filter((el) => Boolean(el))
        .map((el) => el.classList.contains('ship'))
      if (left || right) {
        return true
      }
    }
    return false
  },

  vertical (segments) {
    for (let i = 0; i < segments.length; i++) {
      const [y, x] = extractCoords(segments[i])
      const [top, bottom] = [
        document.querySelector(`[data-y='${y - 1}'][data-x='${x}']`),
        document.querySelector(`[data-y='${y + 1}'][data-x='${x}']`)
      ]
        .filter((el) => Boolean(el))
        .map((el) => el.classList.contains('ship'))
      if (top || bottom) {
        return true
      }
    }
    return false
  },

  diagonal (segments) {
    const [head, tail] = [segments[0], segments[segments.length - 1]]
    for (const end of [head, tail]) {
      const [y, x] = extractCoords(end)
      const [topLeft, topRight, bottomLeft, bottomRight] = [
        document.querySelector(`[data-y='${y - 1}'][data-x='${x - 1}']`),
        document.querySelector(`[data-y='${y - 1}'][data-x='${x + 1}']`),
        document.querySelector(`[data-y='${y + 1}'][data-x='${x - 1}']`),
        document.querySelector(`[data-y='${y + 1}'][data-x='${x + 1}']`)
      ]
        .filter((el) => Boolean(el))
        .map((el) => el.classList.contains('ship'))
      if (topLeft || topRight || bottomLeft || bottomRight) {
        return true
      }
    }
    return false
  }
}


export const boardHandler = (() => {
  const shipsToPlace = [5, 4, 3, 2, 1]
  let plane = 'horizontally'

  const renderBoard = (isHidden, board) => {
    for (let y = 1; y < 11; y++) {
      for (let x = 1; x < 11; x++) {
        board.append(_createCell(isHidden, y, x))
      }
    }
  }

  const clearHighlights = () => document.querySelectorAll('.cell')
    .forEach((el) => el.classList.remove('future-ship', 'wrong-placement'))

  const highlightFutureShip = (y, x, size, isValid) => {
    const className = (isValid) ? 'future-ship' : 'wrong-placement'
    const segments = _cellsFinder[plane](y, x, size)
    clearHighlights()
    pipe(
      filter((el) => Boolean(el)),
      forEach((el) => el.classList.add(className))
    )(segments)
  }

  const place = (y, x, size) => {
    const shipSegments = _cellsFinder[plane](y, x, size)
    shipSegments.forEach((el) => el.classList.add('ship'))
  }

  const setPlane = (newPlane) => { plane = newPlane }

  return {
    renderBoard,
    setPlane,
    extractCoords,
    highlightFutureShip,
    clearHighlights,
    place
  }
})()
