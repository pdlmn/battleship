export const cachedElements = (() => {
  const playerBoard = document.querySelector('#player-board')
  const computerBoard = document.querySelector('#computer-board') 
  
  const startGame = document.querySelector('#start-game') 

  return {
    get playerBoard() { return playerBoard },
    get computerBoard() { return computerBoard },
    get startGame() { return startGame }
  }
})()
