import { eventTypes } from './event_types'
import { eventsHandler } from '../utils/events_handler'
import { menuController } from '../ui/menu'
import { Player } from '../factories/player'
import { AiPlayer } from '../factories/ai_player'
import { Gameboard } from '../factories/gameboard'
import { AiGameboard } from '../factories/ai_gameboard'
import { boardHandler } from '../ui/dom_board'

;(function menuLogic () {
  menuController.nameInputed = Boolean(menuController.nameInp.value)

  menuController.startBtn.addEventListener('click', () => {
    menuController.disabled = true
    eventsHandler.trigger(eventTypes.GAME_STARTED, menuController.nameInp.value)
  })

  menuController.rotateBtn.addEventListener('click', () => {
    if (menuController.rotateBtn.dataset.plane === 'vertically') {
      menuController.rotateBtn.dataset.plane = 'horizontally'
      menuController.rotateBtn.innerText = 'Horizontal'
    } else if (menuController.rotateBtn.dataset.plane === 'horizontally') {
      menuController.rotateBtn.dataset.plane = 'vertically'
      menuController.rotateBtn.innerText = 'Vertical'
    }
    eventsHandler.trigger(eventTypes.SHIP_ROTATED, menuController.rotateBtn.dataset.plane)
  })

  menuController.nameInp.addEventListener('input', (e) => {
    (e.currentTarget.value.length > 0)
      ? menuController.nameInputed = true
      : menuController.nameInputed = false
    ;(menuController.canStart)
      ? menuController.startDisabled = false
      : menuController.startDisabled = true
  })

  eventsHandler.on(eventTypes.SHIP_PLACED, (data) => {
    ;(data.areShipsPlaced())
      ? menuController.shipsPlaced = true
      : menuController.shipsPlaced = false
    ;(menuController.canStart)
      ? menuController.startDisabled = false
      : menuController.startDisabled = true
  })

  eventsHandler.on(eventTypes.GAME_ENDED, (name) => {
    alert(`${name} won!`)
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
    boardHandler.place(...data.ship)
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

  eventsHandler.on(eventTypes.COMPUTER_FINISHED_TURN, (state) => {
    renderPlayer(state)
  })

  eventsHandler.on(eventTypes.SHIP_ROTATED, boardHandler.setPlane)
})()

;(function gameLogic () {
  const shipsToPlace = [5, 4, 3, 2, 1]
  const playerBoard = Gameboard()
  const computerBoard = AiGameboard()
  // temporary
  const player = Player('player 1', true)
  const computer = AiPlayer('computer', false)
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
    eventsHandler.trigger(eventTypes.SHIP_PLACED, { ship: [y, x, nextShipSize], areShipsPlaced () { return shipsToPlace.length === 0 } })
  })

  eventsHandler.on(eventTypes.SHIP_ROTATED, playerBoard.setPlane)

  eventsHandler.on(eventTypes.GAME_STARTED, (bool) => {
    gameStarted = bool
    computerBoard.placeFleet(5)
    eventsHandler.trigger(eventTypes.COMPUTER_PLACED_SHIPS, computerBoard.state)
  })

  eventsHandler.on(eventTypes.COMPUTER_BOARD_CLICKED, (coords) => {
    if (!gameStarted || !player.turn || !player.isValidAttackTarget(computerBoard, ...coords)) return
    player.attack(computerBoard, ...coords)
    eventsHandler.trigger(eventTypes.COMPUTER_BOARD_ATTACKED, computerBoard.state)
    if (!player.turn) {
      eventsHandler.trigger(eventTypes.PLAYER_FINISHED_TURN, null)
    }
    if (computerBoard.isFleetSunk()) {
      eventsHandler.trigger(eventTypes.GAME_ENDED, player.name)
    }
  })

  eventsHandler.on(eventTypes.PLAYER_FINISHED_TURN, () => {
    const { y, x } = computer.findSpotToAttack(playerBoard)
    computer.attack(playerBoard, y, x)
    eventsHandler.trigger(eventTypes.COMPUTER_FINISHED_TURN, playerBoard.state)
    if (playerBoard.isAttackHit(y, x)) {
      eventsHandler.trigger(eventTypes.PLAYER_FINISHED_TURN, null)
      return
    }
    player.changeTurn()

    if (playerBoard.isFleetSunk()) {
      eventsHandler.trigger(eventTypes.GAME_ENDED, computer.name)
    }
  })
})()
