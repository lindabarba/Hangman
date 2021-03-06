/*--- Executioner - Project 1 - WDI-DT-44-LB ---*/

/*--- variables ---*/
var secretWord;
var guessWord;
var badLetters;
var message;
var letter;

var words = [
  ['f', 'r', 'e', 'd', 'd', 'y', ' ', 'k', 'r', 'u', 'g', 'e', 'r'],
  ['j', 'a', 's', 'o', 'n', ' ', 'v', 'o', 'o', 'r', 'h', 'e', 'e', 's'],
  ['t', 'h', 'e', ' ', 'c', 'a', 'n', 'd', 'y', 'm', 'a', 'n'],
  ['m', 'i', 'c', 'h', 'a', 'e', 'l', ' ', 'm', 'y', 'e', 'r', 's'],
  ['l', 'e', 'a', 't', 'h', 'e', 'r', 'f', 'a', 'c', 'e'],
  ['p', 'e', 'n', 'n', 'y', 'w', 'i', 's', 'e'],
  ['p', 'i', 'n', 'h', 'e', 'a', 'd'],
  ['h', 'a', 'n', 'n', 'i', 'b', 'a', 'l', ' ', 'l', 'e', 'c', 't', 'e', 'r'],
  ['n', 'o', 'r', 'm', 'a', 'n', ' ', 'b', 'a', 't', 'e', 's'],
  ['g', 'h', 'o', 's', 't', 'f', 'a', 'c', 'e'],
  ['l', 'a', 'u', 'r', 'i', 'e', ' ', 's', 't', 'r', 'o', 'd', 'e'],
  ['s', 'i', 'd', 'n', 'e', 'y', ' ', 'p', 'r', 'e', 's', 'c', 'o', 't', 't'],
  ['c', 'l', 'a', 'r', 'i', 'c', 'e', ' ', 's', 't', 'a', 'r', 'l', 'i', 'n', 'g'],
  ['e', 'l', 'l', 'e', 'n', ' ', 'r', 'i', 'p', 'l', 'e', 'y'],
  ['n', 'a', 'n', 'c', 'y', ' ', 't', 'h', 'o', 'm', 'p', 's', 'o', 'n'],
  ['k', 'r', 'i', 's', 't', 'y', ' ', 'c', 'o', 't', 't', 'o', 'n'],
  ['s', 'a', 'l', 'l', 'y', ' ', 'h', 'a', 'r', 'd', 'e', 's', 't', 'y'],
  ['h', 'e', 'l', 'e', 'n', ' ', 'l', 'y', 'l', 'e']
];

var messageEl = document.getElementById('message');
var guessWordEl = document.getElementById('guess-word');

/*--- event listeners ---*/
document.querySelector('button').addEventListener('click', initialize);
document.getElementById('keyboard-table').addEventListener('click', handleLetterChoice);

/*--- functions ---*/
function initialize() {
  message = 'pick a letter below';
  secretWord = words[Math.floor(Math.random() * words.length)];
  guessWord = [];
  secretWord.forEach(function(char, idx) {
    guessWord.push(char === ' ' ?  ' ' : '*');
  });
  $('#keyboard-row td').removeClass('disabled');
  badLetters = [];
  render();
  console.log(secretWord);
}

function handleLetterChoice(event) {
  letter = event.target.textContent.toLowerCase();
  event.target.className = 'disabled';
  if (secretWord.includes(letter)) {
    replaceStars();
    message = 'Yes! Very good!';
  } else {
    badLetters.push(letter);
    message = 'Afraid not. Try again.';
  }
  if (secretWord.join('') === guessWord.join('')) {
    message = 'You have escaped! Will you be right back?';
  } else if (badLetters.length === 7) {
    message = 'You are dead. Will you come back to life?';
  }
  render();
}

function replaceStars() {
  secretWord.forEach(function(char, idx) {
    if (char === letter) guessWord[idx] = char;
  });
}

function render() {
  messageEl.textContent = message;
  renderGallows();
  guessWordEl.textContent = badLetters.length === 7 ? secretWord.join('') : guessWord.join('');
  document.getElementById('keyboard-row').style.display = (badLetters.length === 7) ||
    (secretWord.join('') === guessWord.join('')) ? 'none' : '';
}

function renderGallows() {
  var l = badLetters.length;
  if (secretWord.join('') === guessWord.join('') && l < 7) {
    var imagePath = ("<img src='images/Win.png' />");
    document.getElementById('image').innerHTML=imagePath;
    return;
  } if (l > 0 && l < 7 && secretWord.join('') !== guessWord.join('')) {
    var imagePath = ("<img src='images/" + l + ".png' />");
    document.getElementById('image').innerHTML=imagePath;
    return;
  } else if (l === 0) {
    var imagePath = ("<img src='images/Start.jpg' />");
    document.getElementById('image').innerHTML=imagePath;
    return;
  } else if (l === 7) {
    var imagePath = ("<img src='images/Lose.png' />");
    document.getElementById('image').innerHTML=imagePath;
  }
}

initialize();
