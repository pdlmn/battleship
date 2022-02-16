import { events } from '../constants/event_types'
import { eventsHandler } from '../utils/events_handler'
import { pipe } from '@pdlmn/func-helpers'
import { wrapInDiv, queryDocument, addClass, removeClass, replaceEl, cloneEl, createEl, addId, addText } from '../ui/dom_funcs'

/* menuHandler controls the menu: disables, hides and shows menu elements,
 * attaches event listeners to them, controls logs, gives the user ability
 * to start, restart menu, to input their name */

const menuHandler = (() => {
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

  const _replaceHints = (msg) => pipe(
    createEl(['hints']),
    addId('hints'),
    addText(msg),
    replaceEl(hintsDiv)
  )('div')

  const handleStart = () => {
    const msg = `Good luck, Admiral ${nameInp.value}!`
    hintsDiv = _replaceHints(msg)
    ;[startBtn, rotateBtn].forEach(_hide)
    _show(restartBtn)
    nameInp.disabled = true
    eventsHandler.trigger(events.GAME_STARTED, nameInp.value)
  }

  const handleEnd = (name) => { hintsDiv.innerText = `${name} won!` }

  const requestRestart = () => eventsHandler.trigger(events.RESTART_REQUESTED)

  const handleRestart = ({ turn, ended }) => {
    if (!(turn || ended)) return
    const msg = `Welcome back, Admiral ${nameInp.value}!`
    hintsDiv = _replaceHints(msg)
    ;[startBtn, rotateBtn].forEach(_show)
    _hide(restartBtn)
    shipsPlaced = false
    nameInp.disabled = false
    msgCount = 0
    checkStartConditions()
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
    restartBtn.addEventListener('click', requestRestart)
    rotateBtn.addEventListener('click', rotate)
    nameInp.addEventListener('input', checkStartConditions)
    eventsHandler.on(events.SHIP_PLACED, checkShipsReadiness)
    eventsHandler.on(events.GAME_ENDED, handleEnd)
    eventsHandler.on(events.RESTART_VALIDATED, handleRestart)
    eventsHandler.onEach([events.COMPUTER_BOARD_ATTACKED, events.COMPUTER_FINISHED_TURN], displayLogMessage)
  }

  return {
    initMenu
  }
})()

export { menuHandler }
