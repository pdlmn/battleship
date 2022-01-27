import { eventTypes } from './event_types'
import { eventsHandler } from '../utils/events_handler'
import { menuController } from '../ui/menu'
import { Player } from '../factories/player'
import { Gameboard } from '../factories/gameboard'
import { AiGameboard } from '../factories/ai_gameboard'
import { boardHandler } from '../ui/dom_board'

;(function menuLogic () {
  const startGame = document.querySelector('#start-game')
  const playerName = document.querySelector('#player-name')
  const rotate = document.querySelector('#rotate')
  const nameInputed = false

  startGame.addEventListener('click', () => {
    menuController.disableElement(startGame)
    menuController.disableElement(playerName)

    eventsHandler.trigger(eventTypes.GAME_STARTED, playerName.value)
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

  boardHandler.createBoard(false, playerBoard)
  boardHandler.createBoard(true, computerBoard)

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

  eventsHandler.on(eventTypes.COMPUTER_PLACED_SHIPS, (state) => {
    boardHandler.renderBoard(state, computerBoard)
  })

  eventsHandler.on(eventTypes.SHIP_ROTATED, boardHandler.setPlane)
})()

;(function gameLogic () {
  const shipsToPlace = [5, 4, 3, 2, 1]
  const playerBoard = Gameboard()
  const computerBoard = AiGameboard()

  eventsHandler.on(eventTypes.BOARD_HOVERED, (coords) => {
    if (shipsToPlace.length === 0) return
    const [y, x] = coords
    const nextShipSize = shipsToPlace[0]
    const isValid = playerBoard.isValid(y, x, nextShipSize)
    eventsHandler.trigger(eventTypes.SHIP_VALIDATED, [y, x, nextShipSize, isValid])
  })

  eventsHandler.on(eventTypes.BOARD_CLICKED, (coords) => {
    if (shipsToPlace.length === 0) return
    const [y, x] = coords
    const nextShipSize = shipsToPlace[0]
    const isValid = playerBoard.isValid(y, x, nextShipSize)
    if (!isValid) return
    playerBoard.place(y, x, nextShipSize)
    shipsToPlace.shift()
    eventsHandler.trigger(eventTypes.SHIP_PLACED, [y, x, nextShipSize])
  })

  eventsHandler.on(eventTypes.SHIP_ROTATED, playerBoard.setPlane)

  eventsHandler.on(eventTypes.GAME_STARTED, () => {
    computerBoard.placeShipAtRandom(5)
    eventsHandler.trigger(eventTypes.COMPUTER_PLACED_SHIPS, computerBoard.state)
  })
})()
