import expect from 'expect';
import Game from '../client/scripts/game.js';

const testGame = new Game();
testGame.initGame();

describe('GameInit test', () => {
  it('should be the correct length', () => {
    expect(testGame.pokemonLeft.length).toBe(150);
  });
  it('score should be 0', () => {
    expect(testGame.score).toBe(0);
  });
  it('currentPokemon should be a string', () => {
    expect(testGame.currentPokemon).toBeA('number');
  });
});

describe('getPokemon test', () => {
  it('should get new pokemon', () => {
    const oldPokemon = testGame.currentPokemon;
    const newPokemon = testGame.getPokemon(testGame.pokemonLeft);
    expect(newPokemon).toNotBe(oldPokemon);
  });
  it('pokemonLeft should be different length', () => {
    const oldLength = testGame.pokemonLeft.length;
    testGame.currentPokemon = testGame.getPokemon(testGame.pokemonLeft);
    expect(oldLength).toBeGreaterThan(testGame.pokemonLeft.length)
  });
});

describe('checkPokemon test', () => {
  it('score should go up', ()=>{
    const oldScore = testGame.score
    testGame.checkPokemon(1, 'BISASAM');
    expect(testGame.score).toBeGreaterThan(oldScore);
  });
  it('should call getPokemon', ()=>{
    const oldPokemon = testGame.currentPokemon;
    const newPokemon = testGame.getPokemon(testGame.pokemonLeft);
    expect(newPokemon).toNotBe(oldPokemon);
  });
});
