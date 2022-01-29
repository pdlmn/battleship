import { eventTypes } from './event_types'
import { eventsHandler } from '../utils/events_handler'
import { menuController } from '../ui/menu'
import { Player } from '../factories/player'
import { AiPlayer } from '../factories/ai_player'
import { Gameboard } from '../factories/gameboard'
import { AiGameboard } from '../factories/ai_gameboard'
import { boardHandler } from '../ui/dom_board'

;import { curry } from '../utils/func_helpers'
(function menuLogic () {
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

  const renderPlayer = boardHandler.renderBoard(playerBoard)
  const renderComputer = boardHandler.renderBoard(computerBoard)

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

  eventsHandler.onEach([
    eventTypes.COMPUTER_PLACED_SHIPS,
    eventTypes.COMPUTER_BOARD_ATTACKED
  ], (state) => {
    renderComputer(state)
  })

  computerBoard.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = boardHandler.extractCoords(e.target)
      eventsHandler.trigger(eventTypes.COMPUTER_BOARD_CLICKED, coords)
    }
  })

  eventsHandler.on(eventTypes.COMPUTER_MADE_MOVE, (state) => {
    renderPlayer(state)
  })

  eventsHandler.on(eventTypes.SHIP_ROTATED, boardHandler.setPlane)
})()

;(function gameLogic () {
  const shipsToPlace = [5, 4, 3, 2, 1]
  const isGameStarted = () => shipsToPlace.length === 0
  const playerBoard = Gameboard()
  const computerBoard = AiGameboard()
  // temporary
  let player = Player('player 1', true)
  let computer = AiPlayer('computer', false)

  eventsHandler.on(eventTypes.BOARD_HOVERED, (coords) => {
    if (isGameStarted()) return
    const [y, x] = coords
    const nextShipSize = shipsToPlace[0]
    const isValid = playerBoard.isValid(y, x, nextShipSize)
    eventsHandler.trigger(eventTypes.SHIP_VALIDATED, [y, x, nextShipSize, isValid])
  })

  eventsHandler.on(eventTypes.BOARD_CLICKED, (coords) => {
    if (isGameStarted()) return
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
    computerBoard.placeFleet(5)
    eventsHandler.trigger(eventTypes.COMPUTER_PLACED_SHIPS, computerBoard.state)
  })

  eventsHandler.on(eventTypes.COMPUTER_BOARD_CLICKED, (coords) => {
    if (!isGameStarted() || !player.turn) return
    player.attack(computerBoard, ...coords)
    eventsHandler.trigger(eventTypes.COMPUTER_BOARD_ATTACKED, computerBoard.state)
    eventsHandler.trigger(eventTypes.PLAYER_MADE_MOVE, null)
  })

  eventsHandler.on(eventTypes.PLAYER_MADE_MOVE, () => {
    computer.attackRandomSpot(playerBoard)
    eventsHandler.trigger(eventTypes.COMPUTER_MADE_MOVE, playerBoard.state)
    player.changeTurn()
  })
})()
