import { AiPlayer } from '../factories/ai_player'
import { Gameboard } from '../factories/gameboard'

describe('ai player works correctly', () => {
  test('attackAfterHit chooses valid random direction for attack (1)', () => {
    const gameboard = Gameboard()
    const computer = AiPlayer()
    gameboard.receiveAttack(2, 2)
    gameboard.receiveAttack(3, 1)
    computer.attackAfterHit(gameboard, 2, 1)
    expect(gameboard.state[0][0]).toBe('m')
  })

  test('attackAfterHit chooses valid random direction for attack (2)', () => {
    const gameboard = Gameboard()
    const computer = AiPlayer()
    gameboard.receiveAttack(1, 2)
    computer.attackAfterHit(gameboard, 1, 1)
    expect(gameboard.state[1][0]).toBe('m')
  })

  test('attackAfterHit chooses valid random direction for attack (3)', () => {
    const gameboard = Gameboard()
    const computer = AiPlayer()
    gameboard.receiveAttack(2, 3)
    gameboard.receiveAttack(3, 2)
    gameboard.receiveAttack(3, 4)
    computer.attackAfterHit(gameboard, 3, 3)
    expect(gameboard.state[3][2]).toBe('m')
  })

  test('attackPlayer chooses valid random direction for attack (1)', () => {
    const gameboard = Gameboard()
    const computer = AiPlayer()
    gameboard.setPlane('vertically')
    gameboard.place(3, 3, 2)
    gameboard.receiveAttack(2, 3)
    gameboard.receiveAttack(3, 2)
    gameboard.receiveAttack(3, 4)
    computer.attackPlayer(gameboard, 3, 3)
    computer.attackPlayer(gameboard)
    expect(gameboard.state[3][2]).toBe('h')
  })

  test('attackPlayer chooses valid random direction for attack (2)', () => {
    const gameboard = Gameboard()
    const computer = AiPlayer()
    gameboard.setPlane('vertically')
    gameboard.place(5, 5, 5)
    gameboard.receiveAttack(5, 6)
    gameboard.receiveAttack(4, 5)
    gameboard.receiveAttack(5, 4)
    computer.attackPlayer(gameboard, 5, 5)
    computer.attackPlayer(gameboard)
    computer.attackPlayer(gameboard)
    computer.attackPlayer(gameboard)
    expect(gameboard.state[4][4]).toBe('h')
    expect(gameboard.state[5][4]).toBe('h')
    expect(gameboard.state[6][4]).toBe('h')
    expect(gameboard.state[7][4]).toBe('h')
  })

  test('attackPlayer chooses valid random direction for attack (3)', () => {
    const gameboard = Gameboard()
    const computer = AiPlayer()
    gameboard.place(5, 5, 5)
    gameboard.receiveAttack(5, 4)
    gameboard.receiveAttack(4, 5)
    gameboard.receiveAttack(6, 5)
    computer.attackPlayer(gameboard, 5, 5)
    computer.attackPlayer(gameboard)
    computer.attackPlayer(gameboard)
    computer.attackPlayer(gameboard)
    computer.attackPlayer(gameboard)
    computer.attackPlayer(gameboard)
    expect(gameboard.state[4][4]).toBe('h')
    expect(gameboard.state[4][5]).toBe('h')
    expect(gameboard.state[4][6]).toBe('h')
    expect(gameboard.state[4][7]).toBe('h')
    expect(gameboard.state[4][8]).toBe('h')
    expect(gameboard.state[4][9]).not.toBe('h')
  })

  test('attackPlayer chooses valid random direction for attack (4)', () => {
    const gameboard = Gameboard()
    const computer = AiPlayer()
    const possibleResults = ['h', 'm']
    gameboard.place(1, 1, 2)
    computer.attackPlayer(gameboard, 1, 1)
    computer.attackPlayer(gameboard)
    expect(
      possibleResults.includes(gameboard.state[0][1]) || 
      possibleResults.includes(gameboard.state[1][0])
    ).toBeTruthy()
  })

  test('attackPlayer chooses valid random direction for attack (5)', () => {
    const gameboard = Gameboard()
    const computer = AiPlayer()
    const possibleResults = ['h', 'm']
    gameboard.place(3, 3, 2)
    computer.attackPlayer(gameboard, 3, 3)
    computer.attackPlayer(gameboard)
    expect(
      possibleResults.includes(gameboard.state[1][2]) || 
      possibleResults.includes(gameboard.state[3][2]) || 
      possibleResults.includes(gameboard.state[2][3]) || 
      possibleResults.includes(gameboard.state[2][1])
    ).toBeTruthy()
  })
})
