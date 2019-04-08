let card = document.getElementsByClassName("card");
let score = document.querySelector("#score");
let cards = [];
let deck = document.getElementById("card-deck");
let counter = document.querySelector(".moves");
let openCardClass1 = '';
let openCardClass2 = '';
let cardholder = '';
let openedCards1 = [];
let openedCards2 = [];
let cardholderarr = [];
let stoparr = [];
let lives = 10;

//shuffles the cards everytime the browser is loaded
function shuffle(array) {    
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

// makes a new array that is pushed to cards so we know how many cards are being played
for (var i = 0; i < card.length; i++){
  cards.push(card[i]);
};

// when cards match
function matched(){
  openCardClass1.addClass("show").addClass("disabled");
  openCardClass2.addClass("show").addClass("disabled");
  openCardClass1 = cardholder.addClass("show").addClass("disabled");
  openedCards1 = cardholderarr;
  openedCards2 = [];
  cardholderarr = [];
  openCardClass2 = '';
  cardholder = '';
  stoparr.push("matched");
}

// when cards don't match
function unmatched(){
 openCardClass1.removeClass("show").removeClass("disabled");
 openCardClass2.removeClass("show").removeClass("disabled");
 cardholder.removeClass("show");
  openedCards1 = [];
  openedCards2 = [];
  cardholderarr = [];
  openCardClass1 = '';
  openCardClass2 = '';
  cardholder = '';
}


//compares the two cards opened
function cardOpen(){
    if(openedCards1[0] === openedCards2[0]){
        matched();
    } else {
      unmatched();
    }
}

//click function to assign each click a variable to compare
$(".card").on("click", function(){
  
  if(openCardClass1 === ''){
  openCardClass1 = $(this).addClass("show").addClass("disabled");
  console.log(openCardClass1);
  }
  else if(openCardClass2 === '') {
    openCardClass2 = $(this).addClass("show").addClass("disabled");
    console.log(openCardClass2);
  }
  else {
    cardholder = $(this).addClass("show");
    console.log(cardholder);
  }

  if (openedCards1.length === 0) {
    var classname = this.className;
    openedCards1.push(classname);
    console.log(openedCards1);
  }
  else if(openedCards2.length === 0){
    var classname = this.className;
    openedCards2.push(classname);
    console.log(openedCards2);
  }
  else {
    var classname = this.className;
    cardholderarr.push(classname);
    console.log(cardholderarr);
  }

  if(stoparr.length === 8) {
    alert("you won");
    location.reload();
  }

  if(cardholderarr.length === 1) {
    cardOpen();
    lives--;
    score.innerHTML = `Turns: ${lives}`;
    if(lives === 0) {
      alert("You ran out of turns");
      location.reload();
    }
  }
})

document.body.onload = startGame();

function startGame(){
  cards = shuffle(cards);
  score.innerHTML = `Turns: ${lives}`;

  // Render shuffled cards on to Viewport
  for (let i = 0; i < cards.length; i++){
    deck.innerHTML = "";
    [].forEach.call(cards, function(item) {
        deck.appendChild(item);
    });
  }
}