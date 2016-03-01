require('../styles/main.css');
import Game from './game.js';
const image = document.querySelector('.shape');
const guess = document.querySelector('#guess');
const score = document.querySelector('.score');
const guessResult = document.querySelector('.guessed');

function updateUI(newscore, newimage, guessedPokemon, guessed) {
  image.classList.toggle('darken');
  score.innerHTML = newscore;
  if (guessedPokemon) {
    guessResult.innerHTML = guessedPokemon;
    if (guessed) {
      guessResult.classList.add('right');
    }
  }
  setTimeout(() => {
    image.classList.toggle('darken');
    image.src = newimage;
    guessResult.innerHTML = '';
    guessResult.classList.remove('right');
  }, 2000);
  guess.value = '';
}

const pokemonGame = new Game();

pokemonGame.initGame(updateUI);

guess.addEventListener('keypress', (event) => {
  if (event.which === 13) {
    const currentNumber = image.src.split('/').pop().split('.').shift();
    pokemonGame.checkPokemon(currentNumber, guess.value.toUpperCase(), updateUI);
  }
});
