import { eventTypes } from './event_types'
import { eventsHandler } from '../utils/events_handler'
import { Player } from '../factories/player'
import { AiPlayer } from '../factories/ai_player'
import { Gameboard } from '../factories/gameboard'
import { AiGameboard } from '../factories/ai_gameboard'
import { boardHandler } from '../ui/dom_board'
import { wrapInDiv } from '../ui/dom_funcs'
import { delay } from '../utils/helper_funcs'

;(function uiLogic () {
  const startBtn = document.querySelector('#start-game')
  const nameInp = document.querySelector('#player-name')
  const rotateBtn = document.querySelector('#rotate')
  const logDiv = document.querySelector('#log')
  const hintsDiv = document.querySelector('#hints')

  let nameInputed = Boolean(nameInp.value)
  let shipsPlaced = false

  startBtn.addEventListener('click', () => {
    [startBtn, nameInp, rotateBtn].forEach((el) => { el.disabled = true })
    eventsHandler.trigger(eventTypes.GAME_STARTED, nameInp.value)
    hintsDiv.innerText = 'Good luck, Admiral!'
  })

  rotateBtn.addEventListener('click', () => {
    if (rotateBtn.dataset.plane === 'vertically') {
      rotateBtn.dataset.plane = 'horizontally'
      rotateBtn.innerText = 'Horizontal'
    } else if (rotateBtn.dataset.plane === 'horizontally') {
      rotateBtn.dataset.plane = 'vertically'
      rotateBtn.innerText = 'Vertical'
    }
    eventsHandler.trigger(eventTypes.SHIP_ROTATED, rotateBtn.dataset.plane)
  })

  nameInp.addEventListener('input', (e) => {
    (e.currentTarget.value.length > 0)
      ? nameInputed = true
      : nameInputed = false
    ;(nameInputed && shipsPlaced)
      ? startBtn.disabled = false
      : startBtn.disabled = true
  })

  eventsHandler.on(eventTypes.SHIP_PLACED, ({ areShipsPlaced, shipType }) => {
    ;(areShipsPlaced())
      ? shipsPlaced = true
      : shipsPlaced = false
    ;(nameInputed && shipsPlaced)
      ? startBtn.disabled = false
      : startBtn.disabled = true
    hintsDiv.innerText = `${shipType} has been placed.`
  })

  eventsHandler.onEach([
    eventTypes.COMPUTER_BOARD_ATTACKED,
    eventTypes.COMPUTER_FINISHED_TURN
  ], ({ status, player }) => {
    const logClass = `log-${player.type}-${status.shipStatus || status.value}`
    let msg
    if (status.value === 'missed') {
      msg = `${status.y} ${status.x}. ${player.name} missed...`
    }
    if (status.value === 'hit') {
      msg = `${status.y} ${status.x}. ${player.name} ${status.shipStatus} ${status.ship}!`
    }
    const div = wrapInDiv(msg, logClass)
    logDiv.prepend(div)
  })

  eventsHandler.on(eventTypes.GAME_ENDED, (name) => {
    hintsDiv.innerText = `${name} won!`
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

  eventsHandler.on(eventTypes.SHIP_PLACED, ({ ship }) => {
    boardHandler.place(...ship)
  })

  eventsHandler.on(eventTypes.GAME_STARTED, () => {

  })

  playerBoard.addEventListener('mouseleave', boardHandler.clearHighlights)

  eventsHandler.onEach([
    eventTypes.COMPUTER_PLACED_SHIPS,
    eventTypes.COMPUTER_BOARD_ATTACKED
  ], ({ state }) => {
    renderComputer(state)
  })

  computerBoard.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = boardHandler.extractCoords(e.target)
      eventsHandler.trigger(eventTypes.COMPUTER_BOARD_CLICKED, coords)
    }
  })

  eventsHandler.on(eventTypes.COMPUTER_FINISHED_TURN, ({ state }) => {
    renderPlayer(state)
  })

  eventsHandler.on(eventTypes.SHIP_ROTATED, boardHandler.setPlane)
})()

;(function gameLogic () {
  const shipsToPlace = [5, 4, 3, 2, 1]
  const playerBoard = Gameboard()
  const computerBoard = AiGameboard()
  // temporary
  let player
  let computer
  let gameStarted = false

  eventsHandler.on(eventTypes.BOARD_HOVERED, (coords) => {
    if (gameStarted) return
    const [y, x] = coords
    const nextShipSize = shipsToPlace[0]
    const isValid = playerBoard.isValidForPlace(y, x, nextShipSize)
    eventsHandler.trigger(eventTypes.SHIP_VALIDATED, [y, x, nextShipSize, isValid])
  })

  eventsHandler.on(eventTypes.BOARD_CLICKED, (coords) => {
    if (gameStarted) return
    const [y, x] = coords
    const nextShipSize = shipsToPlace[0]
    const isValid = playerBoard.isValidForPlace(y, x, nextShipSize)
    if (!isValid) return
    const ship = playerBoard.place(y, x, nextShipSize)
    shipsToPlace.shift()
    eventsHandler.trigger(
      eventTypes.SHIP_PLACED,
      {
        ship: [y, x, nextShipSize],
        shipType: ship.type,
        areShipsPlaced () { return shipsToPlace.length === 0 }
      })
  })

  eventsHandler.on(eventTypes.SHIP_ROTATED, playerBoard.setPlane)

  eventsHandler.on(eventTypes.GAME_STARTED, (name) => {
    gameStarted = true
    player = Player(name, true)
    computer = AiPlayer()
    computerBoard.placeFleet(5)
    eventsHandler.trigger(
      eventTypes.COMPUTER_PLACED_SHIPS,
      { state: computerBoard.state }
    )
  })

  eventsHandler.on(eventTypes.COMPUTER_BOARD_CLICKED, (coords) => {
    if (!gameStarted || !player.turn || !computerBoard.isValidAttackTarget(...coords)) return
    player.attack(computerBoard, ...coords)
    const status = computerBoard.getAttackStatus(...coords)
    eventsHandler.trigger(
      eventTypes.COMPUTER_BOARD_ATTACKED,
      { state: computerBoard.state, status, player }
    )
    if (!player.turn) {
      eventsHandler.trigger(eventTypes.PLAYER_FINISHED_TURN, null)
    }
    if (computerBoard.isFleetSunk()) {
      eventsHandler.trigger(eventTypes.GAME_ENDED, player.name)
    }
  })

  eventsHandler.on(eventTypes.PLAYER_FINISHED_TURN, async () => {
    await delay(450)
    const status = computer.attackPlayer(playerBoard)
    eventsHandler.trigger(
      eventTypes.COMPUTER_FINISHED_TURN,
      { state: playerBoard.state, status, player: computer }
    )
    if (status.value === 'hit') {
      eventsHandler.trigger(eventTypes.PLAYER_FINISHED_TURN, null)
      return
    }
    player.changeTurn()

    if (playerBoard.isFleetSunk()) {
      eventsHandler.trigger(eventTypes.GAME_ENDED, computer.name)
    }
  })
})()
