require('../styles/main.css');
const pokedex = require('json!./pokedex.json');
let pokemonLeft = [];
const imageContainer = document.querySelector('.shape-wrapper');
const image = document.querySelector('.shape');
const guess = document.querySelector('#guess');
const score = document.querySelector('.score');

function initGame(){
    score.innerHTML = 0;
    for(let it = 1; it<=151; it++ ){
        pokemonLeft.push(it+'');
    }
    renderImage(getPokemon());
}

function getPokemon() {
    if(pokemonLeft) {
    const pokemonNr = Math.floor(Math.random() * (pokemonLeft.length - 1));
    console.log(pokemonLeft[pokemonNr])
    const pokemon = pokemonLeft[pokemonNr];
    pokemonLeft = [...pokemonLeft.slice(0, pokemonNr), ...pokemonLeft.slice(pokemonNr + 1, pokemonLeft.length)];
    console.log(pokemonLeft);
    return pokemon;
    }
}

function renderImage(pokemonId) {
  image.style = 'transform: rotate('+ Math.random() * 360 + 'deg);'
  image.src = `../assets/${pokemonId}.png`;
}

initGame();

guess.addEventListener('keypress', (event)=>{
   if(event.which === 13) {
       if(pokedex[image.src.split("/").pop().split(".").shift()] === event.target.value.toUpperCase()){
           image.classList.toggle('darken');
           score.innerHTML = parseInt(score.innerHTML) + 1;
           setTimeout(()=>{
           image.classList.toggle('darken');
           renderImage(getPokemon()); 
           }, 3000);
           event.target.value = "";
       }
   } 
});