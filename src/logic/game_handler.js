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
    eventsHandler.trigger(eventTypes.SHIP_ROTATED, rotate.dataset.plane)
  })
})()

;(function boardLogic() {
  const playerBoard = document.querySelector('#player-board')
  const computerBoard = document.querySelector('#computer-board') 

  boardHandler.renderBoard(false, playerBoard)
  boardHandler.renderBoard(true, computerBoard)

  
})()

