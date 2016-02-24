require('../styles/main.css');
import { pokedexDE, pokedexEN } from 'pokedex.js';
let pokemonLeft = [];
const image = document.querySelector('.shape');
const guess = document.querySelector('#guess');
const score = document.querySelector('.score');
let pokedex = pokedexDE;

function renderImage(pokemonId) {
  image.src = `../assets/${pokemonId}.png`;
}

function getPokemon() {
  if (pokemonLeft) {
    const pokemonNr = Math.floor(Math.random() * (pokemonLeft.length - 1));
    const pokemon = pokemonLeft[pokemonNr];
    pokemonLeft = [...pokemonLeft.slice(0, pokemonNr),
      ...pokemonLeft.slice(pokemonNr + 1, pokemonLeft.length)];
    return pokemon;
  }
  return false;
}

function initGame() {
  score.innerHTML = 0;
  for (let it = 1; it <= 151; it++) {
    pokemonLeft.push(it);
  }
  renderImage(getPokemon());
}
guess.addEventListener('keypress', (event) => {
  if (event.which === 13) {
    if (pokedex[image.src.split('/').pop().split('.').shift()] === guess.value.toUpperCase()) {
      image.classList.toggle('darken');
      score.innerHTML = parseInt(score.innerHTML, 10) + 1;
      setTimeout(() => {
        image.classList.toggle('darken');
        renderImage(getPokemon());
      }, 2000);
      guess.value = '';
    }
  }
});

initGame();
