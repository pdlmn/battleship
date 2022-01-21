import { eventTypes } from './event_types'
import { eventsHandler } from '../utils/events_handler'
import { menuController } from '../ui/menu'
import { Player } from '../factories/player'
import { Gameboard } from '../factories/gameboard'
import { boardHandler, renderBoard } from '../ui/dom_board'

;(function menuLogic() {
  const startGame = document.querySelector('#start-game') 
  const playerName = document.querySelector('#player-name')
  const rotate = document.querySelector('#rotate')
  let nameInputed = false
  let allShipsPlaced = false

  startGame.addEventListener('click', () => {
    eventsHandler.trigger(eventTypes.GAME_STARTED, playerName.value)
    menuController.disableElement(startGame)
    menuController.disableElement(playerName)
  })

  rotate.addEventListener('click', () => {
    if (rotate.dataset.plane === 'vertically') {
      rotate.dataset.plane = 'horizontally'
      rotate.innerText = 'Horizontal'
    }
    else if (rotate.dataset.plane === 'horizontally') {
      rotate.dataset.plane = 'vertically'
      rotate.innerText = 'Vertical'
    }
    eventsHandler.trigger(eventTypes.SHIP_ROTATED, rotate.dataset.plane)
  })
})()

;(function boardLogic() {
  const playerBoard = document.querySelector('#player-board')
  const computerBoard = document.querySelector('#computer-board') 
  const cells = document.querySelectorAll('.cell:not(.fog-of-war)')

  playerBoard.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('cell')) {
      console.log(e.target)
      boardHandler.highlightFutureShip(e.target)
    }
  })

  boardHandler.renderBoard(false, playerBoard)
  boardHandler.renderBoard(true, computerBoard)

  eventsHandler.on(eventTypes.SHIP_ROTATED, boardHandler.setPlane)
})()

