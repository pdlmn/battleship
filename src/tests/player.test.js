import { Player } from '../factories/player'
import { Gameboard } from '../factories/gameboard'

describe('Player factory & methods work correctly', () => {
  test('player factory correctly determines turn precedence of players', () => {
    const player1 = Player('player1', true)
    const player2 = Player('player2', false)
    expect(player1.turn).toBe(true)
    expect(player2.turn).toBe(false)
  })
})
