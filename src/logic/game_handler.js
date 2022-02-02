import { events } from '../constants/event_types'
import { eventsHandler } from '../utils/events_handler'
import { Player } from '../factories/player'
import { AiPlayer } from '../factories/ai_player'
import { Gameboard } from '../factories/gameboard'
import { AiGameboard } from '../factories/ai_gameboard'
import { boardHandler } from '../ui/dom_board'
import { delay } from '../utils/helper_funcs'
import { wrapInDiv, queryDocument, addClass, removeClass, replaceClass, toggleClass, createEl, replaceEl, cloneEl } from '../ui/dom_funcs'

;(function uiLogic () {
  const startBtn = queryDocument('#start-game')
  const restartBtn = queryDocument('#restart-game')
  const nameInp = queryDocument('#player-name')
  const nameInpDiv = queryDocument('#input-area')
  const rotateBtn = queryDocument('#rotate')
  const logDiv = queryDocument('#log')
  const logWindow = queryDocument('#log-area')
  const logBtn = queryDocument('#log-button')
  let hintsDiv = queryDocument('#hints')

  let nameInputed = Boolean(nameInp.value)
  let shipsPlaced = false
  startBtn.disabled = true

  startBtn.addEventListener('click', () => {
    ;[nameInp, nameInpDiv].forEach((el) => addClass('hidden', el))
    ;[startBtn, rotateBtn].forEach((el) => addClass('display-none', el))
    removeClass('display-none', logBtn)
    eventsHandler.trigger(events.GAME_STARTED, nameInp.value)
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
    eventsHandler.trigger(events.SHIP_ROTATED, rotateBtn.dataset.plane)
  })

  logBtn.addEventListener('click', () => {
    toggleClass('display-none', logWindow)
  })

  nameInp.addEventListener('input', (e) => {
    (e.currentTarget.value.length > 0)
      ? nameInputed = true
      : nameInputed = false
    ;(nameInputed && shipsPlaced)
      ? startBtn.disabled = false
      : startBtn.disabled = true
  })

  eventsHandler.on(events.SHIP_PLACED, ({ areShipsPlaced, shipType }) => {
    ;(areShipsPlaced)
      ? shipsPlaced = true
      : shipsPlaced = false
    ;(nameInputed && shipsPlaced)
      ? startBtn.disabled = false
      : startBtn.disabled = true
    hintsDiv.innerText = `${shipType} has been placed.`
  })

  eventsHandler.onEach([
    events.COMPUTER_BOARD_ATTACKED,
    events.COMPUTER_FINISHED_TURN
  ], ({ status, player }) => {
    const logClass = `log-${player.type}-${status.shipStatus || status.value}`
    let msg
    if (status.value === 'missed') {
      msg = `${status.y} ${status.x}. ${player.name} missed...`
    }
    if (status.value === 'hit') {
      msg = `${status.y} ${status.x}. ${player.name} ${status.shipStatus} ${status.ship}!`
    }
    const log = wrapInDiv(msg, [logClass])
    const hint = cloneEl(log)
    hint.id = 'hints'
    logDiv.prepend(log)
    hintsDiv = replaceEl(hintsDiv, hint)
  })

  eventsHandler.on(events.GAME_ENDED, (name) => {
    hintsDiv.innerText = `${name} won!`
    removeClass('hidden', restartBtn)
  })
})()

;(function boardViewLogic () {
  const playerBoard = queryDocument('#player-board')
  const computerBoard = queryDocument('#computer-board')

  boardHandler.createBoard(false, playerBoard)
  boardHandler.createBoard(true, computerBoard)

  const renderPlayer = boardHandler.renderBoard(playerBoard)
  const renderComputer = boardHandler.renderBoard(computerBoard)

  playerBoard.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = boardHandler.extractCoords(e.target)
      eventsHandler.trigger(events.BOARD_HOVERED, coords)
    }
  })

  eventsHandler.on(events.SHIP_VALIDATED, (data) => {
    boardHandler.highlightFutureShip(...data)
  })

  playerBoard.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = boardHandler.extractCoords(e.target)
      eventsHandler.trigger(events.BOARD_CLICKED, coords)
    }
  })

  eventsHandler.on(events.SHIP_PLACED, ({ ship }) => {
    boardHandler.place(...ship)
  })

  eventsHandler.on(events.GAME_STARTED, () => {
    boardHandler.displayBoard(computerBoard)
  })

  playerBoard.addEventListener('mouseleave', boardHandler.clearHighlights)

  eventsHandler.onEach([
    events.COMPUTER_PLACED_SHIPS,
    events.COMPUTER_BOARD_ATTACKED
  ], ({ state }) => {
    renderComputer(state)
  })

  computerBoard.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = boardHandler.extractCoords(e.target)
      eventsHandler.trigger(events.COMPUTER_BOARD_CLICKED, coords)
    }
  })

  eventsHandler.on(events.COMPUTER_FINISHED_TURN, ({ state }) => {
    renderPlayer(state)
  })

  eventsHandler.on(events.SHIP_ROTATED, boardHandler.setPlane)
})()

;(function gameLogic () {
  const shipsToPlace = [5, 4, 3, 2, 1]
  const playerBoard = Gameboard()
  const computerBoard = AiGameboard()
  let player
  let computer
  let gameStarted = false
  let gameEnded = false

  eventsHandler.on(events.BOARD_HOVERED, (coords) => {
    if (shipsToPlace.length === 0) return
    const [y, x] = coords
    const nextShipSize = shipsToPlace[0]
    const isValid = playerBoard.isValidForPlace(y, x, nextShipSize)
    eventsHandler.trigger(events.SHIP_VALIDATED, [y, x, nextShipSize, isValid])
  })

  eventsHandler.on(events.BOARD_CLICKED, (coords) => {
    if (shipsToPlace.length === 0) return
    const [y, x] = coords
    const nextShipSize = shipsToPlace[0]
    const isValid = playerBoard.isValidForPlace(y, x, nextShipSize)
    if (!isValid) return
    const ship = playerBoard.place(y, x, nextShipSize)
    shipsToPlace.shift()
    eventsHandler.trigger(
      events.SHIP_PLACED,
      {
        ship: [y, x, nextShipSize],
        shipType: ship.type,
        areShipsPlaced: shipsToPlace.length === 0
      }
    )
  })

  eventsHandler.on(events.SHIP_ROTATED, playerBoard.setPlane)

  eventsHandler.on(events.GAME_STARTED, (name) => {
    gameStarted = true
    player = Player(name, true)
    computer = AiPlayer()
    computerBoard.placeFleet(5)
    eventsHandler.trigger(
      events.COMPUTER_PLACED_SHIPS,
      { state: computerBoard.state }
    )
  })

  eventsHandler.on(events.COMPUTER_BOARD_CLICKED, (coords) => {
    if (!gameStarted || gameEnded || !player.turn || !computerBoard.isValidTarget(...coords)) return
    player.attack(computerBoard, ...coords)
    const status = computerBoard.getAttackStatus(...coords)
    eventsHandler.trigger(
      events.COMPUTER_BOARD_ATTACKED,
      { state: computerBoard.state, status, player }
    )
    if (!player.turn) {
      eventsHandler.trigger(events.PLAYER_FINISHED_TURN, null)
    }
    if (computerBoard.isFleetSunk()) {
      gameEnded = true
      eventsHandler.trigger(events.GAME_ENDED, player.name)
    }
  })

  eventsHandler.on(events.PLAYER_FINISHED_TURN, async () => {
    if (playerBoard.isFleetSunk()) {
      gameEnded = true
      eventsHandler.trigger(events.GAME_ENDED, computer.name)
      return
    }
    await delay(250)
    const status = computer.attackPlayer(playerBoard)
    eventsHandler.trigger(
      events.COMPUTER_FINISHED_TURN,
      { state: playerBoard.state, status, player: computer }
    )
    if (status.value === 'hit') {
      eventsHandler.trigger(events.PLAYER_FINISHED_TURN, null)
      return
    }
    player.changeTurn()
  })
})()
