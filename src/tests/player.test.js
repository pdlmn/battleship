import { Player } from '../factories/player'
import { Gameboard } from '../factories/gameboard'

describe('Player factory & methods work correctly', () => {
  test('player factory correctly determines turn precedence of players', () => {
    const player1 = Player('player1', true)
    const player2 = Player('player2', false)
    expect(player1.turn).toBe(true)
    expect(player2.turn).toBe(false)
  })

  test('isValidAttackTarget() correctly determines if the attack target is valid', () => {
    const player = Player('player1', true)
    const gameboard = Gameboard()
    player.attack(gameboard, 1, 1)
    expect(player.isValidAttackTarget(gameboard, 1, 1)).toBe(false)
    expect(player.isValidAttackTarget(gameboard, 1, 2)).toBe(true)
    expect(player.isValidAttackTarget(gameboard, 2, 2)).toBe(true)
    player.attack(gameboard, 2, 2)
    expect(player.isValidAttackTarget(gameboard, 2, 2)).toBe(false)
  })
})
