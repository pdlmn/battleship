import { events } from '../constants/event_types'
import { eventsHandler } from '../utils/events_handler'
import { Player } from '../factories/player'
import { AiPlayer } from '../factories/ai_player'
import { Gameboard } from '../factories/gameboard'
import { AiGameboard } from '../factories/ai_gameboard'
import { boardHandler } from '../ui/dom_board'
import { delay } from '../utils/helper_funcs'
import { wrapInDiv, queryDocument, addClass, removeClass, replaceEl, cloneEl } from '../ui/dom_funcs'

;(function menuHandler () {
  const startBtn = queryDocument('#start-game')
  const restartBtn = queryDocument('#restart-game')
  const nameInp = queryDocument('#player-name')
  const rotateBtn = queryDocument('#rotate')
  const logDiv = queryDocument('#log')
  let hintsDiv = queryDocument('#hints')

  let shipsPlaced = false
  let msgCount = 0

  const _hide = (el) => addClass('display-none', el)

  const _show = (el) => removeClass('display-none', el)

  const handleStart = () => {
    ;[startBtn, rotateBtn].forEach(_hide)
    _show(restartBtn)
    nameInp.disabled = true
    hintsDiv.innerText = `Good luck, Admiral ${nameInp.value}!`
    eventsHandler.trigger(events.GAME_STARTED, nameInp.value)
  }

  const handleEnd = (name) => {
    hintsDiv.innerText = `${name} won!`
  }

  const handleRestart = () => {
    ;[startBtn, rotateBtn].forEach(_show)
    _hide(restartBtn)
    nameInp.disabled = false
    hintsDiv.innerText = `Welcome back, Admiral ${nameInp.value}!`
    eventsHandler.trigger(events.GAME_RESTARTED, rotateBtn.dataset.plane)
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

  const checkStartConditions = () => {
    startBtn.disabled = !(nameInp.value && shipsPlaced)
  }

  const checkShipsReadiness = ({ areShipsPlaced, shipType }) => {
    (areShipsPlaced)
      ? shipsPlaced = true
      : shipsPlaced = false
    checkStartConditions()
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

  const initMenu = () => {
    checkStartConditions()
    startBtn.addEventListener('click', handleStart)
    restartBtn.addEventListener('click', handleRestart)
    rotateBtn.addEventListener('click', rotate)
    nameInp.addEventListener('input', checkStartConditions)
    eventsHandler.on(events.SHIP_PLACED, checkShipsReadiness)
    eventsHandler.onEach([events.COMPUTER_BOARD_ATTACKED, events.COMPUTER_FINISHED_TURN], displayLogMessage)
    eventsHandler.on(events.GAME_ENDED, handleEnd)
  }

  initMenu()

  return {
    initMenu
  }
})()

;(function boardViewLogic () {
  const playerBoard = queryDocument('#player-board')
  const computerBoard = queryDocument('#computer-board')

  const renderPlayer = boardHandler.renderBoard(playerBoard, false)
  const renderComputer = boardHandler.renderBoard(computerBoard, true)

  const createBoards = () => {
    boardHandler.createBoard(false, playerBoard)
    boardHandler.createBoard(true, computerBoard)
  }

  const resetBoards = (plane) => {
    boardHandler.recreateBoard(false, playerBoard)
    boardHandler.recreateBoard(true, computerBoard)
    boardHandler.setPlane(plane)
  }

  const sendCoordsForValidation = (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = boardHandler.extractCoords(e.target)
      eventsHandler.trigger(events.BOARD_HOVERED, coords)
    }
  }

  const hightlightValidatedCoords = (data) => {
    boardHandler.highlightFutureShip(...data)
  }

  const sendShipForValidation = (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = boardHandler.extractCoords(e.target)
      eventsHandler.trigger(events.BOARD_CLICKED, coords)
    }
  }

  const placeValidatedShip = ({ ship }) => {
    boardHandler.place(...ship)
  }

  const renderComputerState = ({ state }) => {
    renderComputer(state)
  }

  const renderPlayerState = ({ state }) => {
    renderPlayer(state)
  }

  const sendAttackedCoords = (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = boardHandler.extractCoords(e.target)
      eventsHandler.trigger(events.COMPUTER_BOARD_CLICKED, coords)
    }
  }

  const changePlane = (plane) => {
    boardHandler.setPlane(plane)
  }

  const initBoards = () => {
    createBoards()
    playerBoard.addEventListener('mouseover', sendCoordsForValidation)
    playerBoard.addEventListener('click', sendShipForValidation)
    playerBoard.addEventListener('mouseleave', boardHandler.clearHighlights)
    computerBoard.addEventListener('click', sendAttackedCoords)
    eventsHandler.on(events.SHIP_VALIDATED, hightlightValidatedCoords)
    eventsHandler.on(events.SHIP_PLACED, placeValidatedShip)
    eventsHandler.on(events.SHIP_ROTATED, changePlane)
    eventsHandler.on(events.COMPUTER_FINISHED_TURN, renderPlayerState)
    eventsHandler.on(events.GAME_RESTARTED, resetBoards)
    eventsHandler.onEach([events.COMPUTER_PLACED_SHIPS, events.COMPUTER_BOARD_ATTACKED], renderComputerState)
  }

  initBoards()

  return {
    initBoards
  }
})()

;(function gameHandler () {
  let playerBoard = Gameboard()
  let computerBoard = AiGameboard()
  let shipsToPlace = [5, 4, 3, 2, 2]
  let player
  let computer
  let gameStarted = false
  let gameEnded = false

  const validateCoords = (coords) => {
    if (shipsToPlace.length === 0) return
    const [y, x] = coords
    const nextShipSize = shipsToPlace[0]
    const isValid = playerBoard.isValidForPlace(y, x, nextShipSize)
    eventsHandler.trigger(events.SHIP_VALIDATED, [y, x, nextShipSize, isValid])
  }

  const validatePlacement = (coords) => {
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
  }

  const startGame = (name) => {
    gameStarted = true
    player = Player(name, true)
    computer = AiPlayer()
    computerBoard.placeFleet(5)
    eventsHandler.trigger(events.COMPUTER_PLACED_SHIPS, { state: computerBoard.state })
  }

  const restartGame = (plane) => {
    shipsToPlace = [5, 4, 3, 2, 2]
    gameStarted = false
    gameEnded = false
    playerBoard = Gameboard()
    computerBoard = AiGameboard()
    playerBoard.setPlane(plane)
  }

  const handlePlayerAttack = (coords) => {
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
  }

  const handleComputerAttack = async () => {
    if (playerBoard.isFleetSunk()) {
      gameEnded = true
      eventsHandler.trigger(events.GAME_ENDED, computer.name)
      return
    }
    await delay(400)
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
  }

  const changePlane = (plane) => {
    playerBoard.setPlane(plane)
  }

  const initGame = () => {
    eventsHandler.on(events.BOARD_HOVERED, validateCoords)
    eventsHandler.on(events.BOARD_CLICKED, validatePlacement)
    eventsHandler.on(events.SHIP_ROTATED, changePlane)
    eventsHandler.on(events.GAME_STARTED, startGame)
    eventsHandler.on(events.GAME_RESTARTED, restartGame)
    eventsHandler.on(events.COMPUTER_BOARD_CLICKED, handlePlayerAttack)
    eventsHandler.on(events.PLAYER_FINISHED_TURN, handleComputerAttack)
  }

  initGame()

  return {
    initGame
  }
})()
