require('../styles/main.css');
import Game from './game.js';
const image = document.querySelector('.shape');
const guess = document.querySelector('#guess');
const score = document.querySelector('.score');
const guessResult = document.querySelector('.guessed');
const endResult = document.querySelector('.result');
const retryButton = document.querySelector('.retry');
const resultScreen = document.querySelector('.resultscreen');

function updateUI(newscore, newimage, guessedPokemon, guessed) {
  image.classList.toggle('darken');
  score.innerHTML = newscore;
  if (guessedPokemon) {
    guessResult.innerHTML = guessedPokemon;
    if (guessed) {
      guessResult.classList.add('right');
    }
  }
  if (guessed) {
    setTimeout(() => {
      image.classList.toggle('darken');
      image.src = newimage;
      guessResult.innerHTML = '';
      guessResult.classList.remove('right');
    }, 2000);
    guess.value = '';
  } else {
    endResult.innerHTML = `Congratulations you got ${newscore} points`;
    resultScreen.classList.remove('hidden');
  }
}

const pokemonGame = new Game();

pokemonGame.initGame(updateUI);
resultScreen.classList.add('hidden');

guess.addEventListener('keypress', (event) => {
  if (event.which === 13) {
    const currentNumber = image.src.split('/').pop().split('.').shift();
    pokemonGame.checkPokemon(currentNumber, guess.value.toUpperCase(), updateUI);
  }
});

retryButton.addEventListener('click', () => {
  image.classList.toggle('darken');
  pokemonGame.initGame(updateUI);
  resultScreen.classList.add('hidden');
  guessResult.classList.remove('right');
});
