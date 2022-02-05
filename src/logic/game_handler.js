import { events } from '../constants/event_types'
import { eventsHandler } from '../utils/events_handler'
import { Player } from '../factories/player'
import { AiPlayer } from '../factories/ai_player'
import { Gameboard } from '../factories/gameboard'
import { AiGameboard } from '../factories/ai_gameboard'
import { delay } from '../utils/helper_funcs'

const gameHandler = (() => {
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

  const validateRestart = () => eventsHandler.trigger(events.RESTART_VALIDATED, { turn: player.turn, ended: gameEnded })

  const initGame = () => {
    eventsHandler.on(events.BOARD_HOVERED, validateCoords)
    eventsHandler.on(events.BOARD_CLICKED, validatePlacement)
    eventsHandler.on(events.SHIP_ROTATED, changePlane)
    eventsHandler.on(events.GAME_STARTED, startGame)
    eventsHandler.on(events.RESTART_REQUESTED, validateRestart)
    eventsHandler.on(events.GAME_RESTARTED, restartGame)
    eventsHandler.on(events.COMPUTER_BOARD_CLICKED, handlePlayerAttack)
    eventsHandler.on(events.PLAYER_FINISHED_TURN, handleComputerAttack)
  }

  initGame()

  return {
    initGame
  }
})()

export { gameHandler }
