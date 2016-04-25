require('../styles/main.css');
import Game from './game.js';

// get reference to DOM nodes
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
    // on correct guess, display green text
    if (guessed) {
      guessResult.classList.add('right');
    }
  }
  if (guessed) {
    // after delay update image and reset guess
    setTimeout(() => {
      image.classList.toggle('darken');
      image.src = newimage;
      guessResult.innerHTML = '';
      guessResult.classList.remove('right');
    }, 2000);
  } else {
    // on wrong guess display endscreen
    endResult.innerHTML = `Congratulations you got ${newscore} points`;
    resultScreen.classList.remove('hidden');
  }
  guess.value = '';
}

function initUI(newscore, newimage) {
  image.classList.toggle('darken');
  resultScreen.classList.add('hidden');
  guessResult.classList.remove('right');
  guessResult.innerHTML = '';
  score.innerHTML = newscore;
  image.src = newimage;
}

const pokemonGame = new Game();

pokemonGame.initGame(initUI);

guess.addEventListener('keypress', (event) => {
  if (event.which === 13) {
    const currentNumber = image.src.split('/').pop().split('.').shift();
    pokemonGame.checkPokemon(currentNumber, guess.value.toUpperCase(), updateUI);
  }
});


retryButton.addEventListener('click', () => {
  pokemonGame.initGame(initUI);
});
