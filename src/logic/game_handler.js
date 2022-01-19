import './event_types'
import { renderBoard } from '../ui/board'
import { eventsHander } from '../utils/events_handler'
import { cachedElements } from '../ui/cached_elements'

const gameHandler = (() => {
  

})()

renderBoard(false, cachedElements.playerBoard)
renderBoard(true, cachedElements.computerBoard)
