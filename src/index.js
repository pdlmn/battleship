import './styles/style.css'
import './logic/menu_handler'
import './logic/board_handler'
import './logic/game_handler'
import { menuHandler } from './logic/menu_handler'
import { boardsHandler } from './logic/board_handler'
import { gameHandler } from './logic/game_handler'

/* this is where handlers initialize and the game is put together */

(function initGame () {
  menuHandler.initMenu()
  boardsHandler.initBoards()
  gameHandler.initGame()
})()
