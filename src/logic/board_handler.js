import { events } from '../constants/event_types'
import { eventsHandler } from '../utils/events_handler'
import { domBoard } from '../ui/dom_board'
import { queryDocument  } from '../ui/dom_funcs'

/* boardsHandler controls the boards: highlights ships, send coords to
 * game handler for validation, attaches to boards event listeners,
 * renders the boards after player and computer attacks */

const boardsHandler = (() => {
  const playerBoard = queryDocument('#player-board')
  const computerBoard = queryDocument('#computer-board')

  const renderPlayer = domBoard.renderBoard(playerBoard, false)
  const renderComputer = domBoard.renderBoard(computerBoard, true)

  const createBoards = () => {
    domBoard.createBoard(false, playerBoard)
    domBoard.createBoard(true, computerBoard)
  }

  const resetBoards = (plane) => {
    domBoard.recreateBoard(false, playerBoard)
    domBoard.recreateBoard(true, computerBoard)
    domBoard.setPlane(plane)
  }

  const sendCoordsForValidation = (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = domBoard.extractCoords(e.target)
      eventsHandler.trigger(events.BOARD_HOVERED, coords)
    }
  }

  const hightlightValidatedCoords = (data) => {
    domBoard.highlightFutureShip(...data)
  }

  const sendShipForValidation = (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = domBoard.extractCoords(e.target)
      eventsHandler.trigger(events.BOARD_CLICKED, coords)
    }
  }

  const placeValidatedShip = ({ ship }) => {
    domBoard.place(...ship)
  }

  const renderComputerState = ({ state }) => {
    renderComputer(state)
  }

  const renderPlayerState = ({ state }) => {
    renderPlayer(state)
  }

  const sendAttackedCoords = (e) => {
    if (e.target.classList.contains('cell')) {
      const coords = domBoard.extractCoords(e.target)
      eventsHandler.trigger(events.COMPUTER_BOARD_CLICKED, coords)
    }
  }

  const changePlane = (plane) => {
    domBoard.setPlane(plane)
  }

  const initBoards = () => {
    createBoards()
    playerBoard.addEventListener('mouseover', sendCoordsForValidation)
    playerBoard.addEventListener('click', sendShipForValidation)
    playerBoard.addEventListener('mouseleave', domBoard.clearHighlights)
    computerBoard.addEventListener('click', sendAttackedCoords)
    eventsHandler.on(events.SHIP_VALIDATED, hightlightValidatedCoords)
    eventsHandler.on(events.SHIP_PLACED, placeValidatedShip)
    eventsHandler.on(events.SHIP_ROTATED, changePlane)
    eventsHandler.on(events.COMPUTER_FINISHED_TURN, renderPlayerState)
    eventsHandler.on(events.GAME_RESTARTED, resetBoards)
    eventsHandler.onEach([events.COMPUTER_PLACED_SHIPS, events.COMPUTER_BOARD_ATTACKED], renderComputerState)
  }

  return {
    initBoards
  }
})()

export { boardsHandler }
