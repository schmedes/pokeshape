require('../styles/main.css');
import Game from './game.js';
const image = document.querySelector('.shape');
const guess = document.querySelector('#guess');
const score = document.querySelector('.score');

function updateUI(newscore, newimage) {
  image.classList.toggle('darken');
  score.innerHTML = newscore;
  setTimeout(() => {
    image.classList.toggle('darken');
    image.src = newimage;
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
