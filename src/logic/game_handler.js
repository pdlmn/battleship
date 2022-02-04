import { events } from '../constants/event_types'
import { eventsHandler } from '../utils/events_handler'
import { Player } from '../factories/player'
import { AiPlayer } from '../factories/ai_player'
import { Gameboard } from '../factories/gameboard'
import { AiGameboard } from '../factories/ai_gameboard'
import { boardHandler } from '../ui/dom_board'
import { delay } from '../utils/helper_funcs'
import { wrapInDiv, queryDocument, addClass, removeClass, replaceEl, cloneEl, addClasses } from '../ui/dom_funcs'

;(function uiLogic () {
  const startBtn = queryDocument('#start-game')
  const restartBtn = queryDocument('#restart-game')
  const nameInp = queryDocument('#player-name')
  const rotateBtn = queryDocument('#rotate')
  const logDiv = queryDocument('#log')
  let hintsDiv = queryDocument('#hints')

  let nameInputed = Boolean(nameInp.value)
  let shipsPlaced = false
  let msgCount = 0

  startBtn.disabled = true

  const _hide = (el) => addClass('display-none', el)

  const _show = (el) => removeClass('display-none', el)

  const handleStart = () => {
    ;[startBtn, rotateBtn].forEach(_hide)
    _show(restartBtn)
    nameInp.disabled = true
    hintsDiv.innerText = 'Good luck, Admiral!'
    eventsHandler.trigger(events.GAME_STARTED, nameInp.value)
  }

  const rotate = () => {
    if (rotateBtn.dataset.plane === 'vertically') {
      rotateBtn.dataset.plane = 'horizontally'
      rotateBtn.innerText = 'Horizontal'
    } else if (rotateBtn.dataset.plane === 'horizontally') {
      rotateBtn.dataset.plane = 'vertically'
      rotateBtn.innerText = 'Vertical'
    }
    eventsHandler.trigger(events.SHIP_ROTATED, rotateBtn.dataset.plane)
  }

  const _checkStartConditions = () => {
    ;(nameInputed && shipsPlaced)
      ? startBtn.disabled = false
      : startBtn.disabled = true
  }

  const checkName = (e) => {
    (e.currentTarget.value.length > 0)
      ? nameInputed = true
      : nameInputed = false
    _checkStartConditions()
  }

  const checkShipsReadiness = ({ areShipsPlaced, shipType }) => {
    (areShipsPlaced)
      ? shipsPlaced = true
      : shipsPlaced = false
    _checkStartConditions()
    hintsDiv.innerText = `${shipType} has been placed.`
  }

  const _createLogMessage = (status, player) => {
    const logClass = `log-${player.type}-${status.shipStatus || status.value}`
    let msg = `Turn ${++msgCount}. y${status.y} y${status.x}`
    if (status.value === 'missed') {
      msg += ` ${player.name} missed...`
    }
    if (status.value === 'hit') {
      msg += ` ${player.name} ${status.shipStatus} ${status.ship}!`
    }
    return wrapInDiv(msg, [logClass])
  }

  const displayLogMessage = ({ status, player }) => {
    const log = _createLogMessage(status, player)
    const hint = cloneEl(log)
    hint.id = 'hints'
    logDiv.prepend(log)
    hintsDiv = replaceEl(hintsDiv, hint)
  }

  const handleEnd = (name) => {
    hintsDiv.innerText = `${name} won!`
    removeClass('hidden', restartBtn)
  }

  const initMenu = () => {
    startBtn.addEventListener('click', handleStart)
    rotateBtn.addEventListener('click', rotate)
    nameInp.addEventListener('input', checkName)
    eventsHandler.on(events.SHIP_PLACED, checkShipsReadiness)
    eventsHandler.onEach([events.COMPUTER_BOARD_ATTACKED, events.COMPUTER_FINISHED_TURN], displayLogMessage)
    eventsHandler.on(events.GAME_ENDED, handleEnd)
  }

  initMenu()

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
