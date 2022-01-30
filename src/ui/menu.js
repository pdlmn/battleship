export const menuController = (() => {
  const startBtn = document.querySelector('#start-game')
  const nameInp = document.querySelector('#player-name')
  const rotateBtn = document.querySelector('#rotate')
  let nameInputed = false
  let shipsPlaced = false

  return {
    set nameInputed (val) { nameInputed = val },
    set shipsPlaced (val) { shipsPlaced = val },
    set disabled (val) { [startBtn, nameInp, rotateBtn].forEach((el) => { el.disabled = val }) },
    set startDisabled (val) { startBtn.disabled = val },
    get canStart () { return nameInputed && shipsPlaced },
    startBtn,
    nameInp,
    rotateBtn
  }
})()
