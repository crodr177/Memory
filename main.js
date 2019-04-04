let card = document.getElementsByClassName("card");
let cards = [];
console.log(cards);
let deck = document.getElementById("card-deck");
let counter = document.querySelector(".moves");
let matchedCard = document.getElementsByClassName("match");
let openedCards = [];

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

document.body.onload = startGame();

function startGame(){
  cards = shuffle(cards);

  // Render shuffled cards on to Viewport
  for (let i = 0; i < cards.length; i++){
    deck.innerHTML = "";
    [].forEach.call(cards, function(item) {
        deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
}

// toggles open and show class to display cards
let displayCard = function (){
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

// add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
  openedCards.push(this);
  let len = openedCards.length;
  if(len === 2){
    moveCounter();
    if(openedCards[0].type === openedCards[1].type){
        matched();
    } else {
        unmatched();
    }
  }
};

// when cards match
function matched(){
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}

// when cards don't match
function unmatched(){
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function(){
    openedCards[0].classList.remove("show", "open", "no-event","unmatched");
    openedCards[1].classList.remove("show", "open", "no-event","unmatched");
    enable();
    openedCards = [];
  },1000);
}

// disable cards
function disable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.add('disabled');
  });
}

// enable cards and disable matched cards
function enable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.remove('disabled');
    for(var i = 0; i < matchedCard.length; i++){
      matchedCard[i].classList.add("disabled");
    }
  });
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click",congratulations);
};