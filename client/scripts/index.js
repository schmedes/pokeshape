require('../styles/main.css');
const pokedex = require('json!./pokedex.json');

const lastGuessed = [];
const imageContainer = document.querySelector('.shape-wrapper');
const image = document.querySelector('.shape');
const guess = document.querySelector('#guess');


function getPokemon() {
    const pokemon = Math.floor(Math.random() * (151 - 1 +1)) + 1;
    let guessedAlready = false;
    lastGuessed.forEach((el)=>{
       if(el == pokemon) {
           guessedAlready = true;
       } 
    });
    if(guessedAlready) {
        console.log('oldpokemon');
        return getPokemon();
    } else {
  return Math.floor(Math.random() * (151 - 1 +1)) + 1;
    }
}

function renderImage(pokemonId) {
  image.src = `../assets/${pokemonId}.png`;
}

renderImage(getPokemon());

guess.addEventListener('keypress', (event)=>{
   if(event.which === 13) {
       if(pokedex[image.src.split("/").pop().split(".").shift()] === event.target.value.toUpperCase()){
           image.classList.toggle('darken');
           setTimeout(()=>{
           console.log('Congratz');
           image.classList.toggle('darken');
           renderImage(getPokemon()); 
           }, 3000);
           lastGuessed.push(image.src.split("/").pop().split(".").shift());
           event.target.value = "";
       }
   } 
});