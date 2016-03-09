import { pokedexDE, pokedexEN } from './pokedex.js';

export default class Game {
  constructor() {
    this.pokemonLeft = [];
    this.score = 0;
    this.currentPokemon = '';
  }
  renderImage(pokemonId) {
    return `../assets/${pokemonId}.png`;
  }
  getPokemon(pokemonLeft) {
    if (pokemonLeft) {
      const pokemonNr = Math.floor(Math.random() * (pokemonLeft.length - 1));
      const pokemon = pokemonLeft[pokemonNr];
      this.pokemonLeft = [...pokemonLeft.slice(0, pokemonNr),
        ...pokemonLeft.slice(pokemonNr + 1, pokemonLeft.length)];
      return pokemon;
    }
    return false;
  }
  initGame(cb) {
    this.score = 0;
    this.pokemonLeft = [];
    for (let it = 1; it <= 151; it++) {
      this.pokemonLeft.push(it);
    }
    this.currentPokemon = this.getPokemon(this.pokemonLeft);

    if (cb) {
      cb(this.score, this.renderImage(this.currentPokemon));
    }
  }
  checkPokemon(pokemonNr, guess, cb) {
    let guessedCorrect = false;
    const guessedPokemon =
     `${pokedexEN[this.currentPokemon - 1]} / ${pokedexDE[this.currentPokemon - 1]}`;
    if (pokedexDE[pokemonNr - 1] === guess || pokedexEN[pokemonNr - 1] === guess) {
      this.score += 1;
      guessedCorrect = true;
    }
    this.currentPokemon = this.getPokemon(this.pokemonLeft);
    if (cb) {
      cb(this.score, this.renderImage(this.currentPokemon), guessedPokemon, guessedCorrect);
    }
  }
}
