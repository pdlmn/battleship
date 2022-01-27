import { eventTypes } from './event_types'
import { eventsHandler } from '../utils/events_handler'
import { menuController } from '../ui/menu'
import { Player } from '../factories/player'
import { Gameboard } from '../factories/gameboard'
import { boardHandler } from '../ui/dom_board'

;(function menuLogic () {
  const startGame = document.querySelector('#start-game')
  const playerName = document.querySelector('#player-name')
  const rotate = document.querySelector('#rotate')
  const nameInputed = false

  startGame.addEventListener('click', () => {
    eventsHandler.trigger(eventTypes.GAME_STARTED, playerName.value)
    menuController.disableElement(startGame)
    menuController.disableElement(playerName)
  })

  rotate.addEventListener('click', () => {
    if (rotate.dataset.plane === 'vertically') {
      rotate.dataset.plane = 'horizontally'
      rotate.innerText = 'Horizontal'
    } else if (rotate.dataset.plane === 'horizontally') {
      rotate.dataset.plane = 'vertically'
      rotate.innerText = 'Vertical'
    }
    eventsHandler.trigger(eventTypes.SHIP_ROTATED, rotate.dataset.plane)
  })
})()

;(function boardViewLogic () {
  const playerBoard = document.querySelector('#player-board')
  const computerBoard = document.querySelector('#computer-board')

  playerBoard.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = boardHandler.extractCoords(e.target)
      eventsHandler.trigger(eventTypes.BOARD_HOVERED, coords)
    }
  })

  eventsHandler.on(eventTypes.SHIP_VALIDATED, (data) => {
    boardHandler.highlightFutureShip(...data)
  })

  playerBoard.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = boardHandler.extractCoords(e.target)
      eventsHandler.trigger(eventTypes.BOARD_CLICKED, coords)
    }
  })

  eventsHandler.on(eventTypes.SHIP_PLACED, (data) => {
    boardHandler.place(...data)
  })

  playerBoard.addEventListener('mouseleave', boardHandler.clearHighlights)

  boardHandler.renderBoard(false, playerBoard)
  boardHandler.renderBoard(true, computerBoard)

  eventsHandler.on(eventTypes.SHIP_ROTATED, boardHandler.setPlane)
})()

;(function gameLogic () {
  const shipsToPlace = [5, 4, 3, 2, 1]
  const playerBoard = Gameboard()
  let gameStarted = false

  eventsHandler.on(eventTypes.BOARD_HOVERED, (coords) => {
    if (gameStarted) return
    const [y, x] = coords
    const nextShipSize = shipsToPlace[0]
    const isValid = playerBoard.isValid(y, x, nextShipSize)
    eventsHandler.trigger(eventTypes.SHIP_VALIDATED, [y, x, nextShipSize, isValid])
  })

  eventsHandler.on(eventTypes.BOARD_CLICKED, (coords) => {
    if (gameStarted) return
    const [y, x] = coords
    const nextShipSize = shipsToPlace[0]
    const isValid = playerBoard.isValid(y, x, nextShipSize)
    if (!isValid) return
    playerBoard.place(y, x, nextShipSize)
    shipsToPlace.shift()
    eventsHandler.trigger(eventTypes.SHIP_PLACED, [y, x, nextShipSize])
  })

  eventsHandler.on(eventTypes.SHIP_ROTATED, playerBoard.setPlane)
})()
