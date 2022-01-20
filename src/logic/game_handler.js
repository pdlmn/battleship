import { eventTypes } from './event_types'
import { eventsHandler } from '../utils/events_handler'
import { menuController } from '../ui/menu'
import { Player } from '../factories/player'
import { Gameboard } from '../factories/gameboard'
import { renderBoard } from '../ui/board'

;(function menuLogic() {
  const startGame = document.querySelector('#start-game') 
  const playerName = document.querySelector('#player-name')
  const rotate = document.querySelector('#rotate')

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
  const playerDomBoard = document.querySelector('#player-board')
  const computerDomBoard = document.querySelector('#computer-board') 

  const playerBoard = Gameboard()
  const computerBoard = Gameboard()

  let size = 2
  playerBoard.place(size)
  size++

  eventsHandler.on(eventTypes.GAME_STARTED, (name) => {
    const humanPlayer = Player(name, true)
    const computerPlayer = Player('Computer', false)
    eventsHandler.trigger(
      eventTypes.PLAYERS_CREATED, 
      [{humanPlayer, playerBoard}, {computerPlayer, computerBoard}]
    )
    renderBoard(false, playerBoard)
    renderBoard(true, computerBoard)
  })
})()

