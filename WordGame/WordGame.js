//To update left:
//1 - push placeholders before 1st guess on new game & play again
//2 - Add some images to the pages sides if time

const message = document.querySelector(".message"); //message paragraph section under h1
const wordInProgress = document.querySelector(".word-in-progress"); // selected word
const remainingGuessesElement = document.querySelector(".remaining"); // remaining guesses section
const remainingGuessesSpan = document.querySelector(".remaining span"); // remaining guesses #
const lettersGuessedElement = document.querySelector(".letters-guessed"); // letters guessed so far
const lettersGuessedButton = document.querySelector(".guess"); //button to submit guess
const letterInput = document.querySelector(".letter"); //letter the user has guessed-input field
const playAgainButton = document.querySelector(".play-again"); //play again button - hidden

let lettersGuessed = [];
let remainingGuesses; /// CHECK
let word; // To put in global directory

function getWord() {
  //array of foods to chooose from for word
  let nuttysFoods = [
    "CARROTS",
    "CHEESE",
    "APPLES",
    "SALMON",
    "STEAK",
    "TREATS",
    "BANANA",
    "KIBBLE",
    "SAUSAGES",
    "HAM",
    "CHICKEN",
    "MCDONALDS",
    "CAKE",
  ];

  word = nuttysFoods[Math.floor(Math.random() * nuttysFoods.length)]; // generate random option from the list - floor to round
  remainingGuesses = word.length + 1; // Make remaining guesses 1 more than the word length to start off with
  // console.log(word); //working
  // console.log(remainingGuesses); //working
}

//Start game
getWord();

const wordArray = word.split("");
// console.log(wordArray); // working

// Display symbols as placeholders for the word's letters
const placeholder = function (word) {
  const placeholderLetters = [];
  wordArray.forEach(function (letter) {
    //for each letter show one emoji
    placeholderLetters.push("🐶");
  });
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(); // placeholder before selecting guess button

// console.log(typeof lettersGuessedButton); //object
//element.addEventListener('click', myFunction);
lettersGuessedButton.addEventListener("click", lettersFunction); //working

// function myFunction() {
// document.getElementbyID('').innerHTML = "";
function lettersFunction() {
  message.innerText = ""; //clear message paragraph
  const guess = letterInput.value.toUpperCase(); // get what's in input and make Caps
  const validGuess = vaildateInput(guess); //run below function to check it's only 1 letter
  if (validGuess) {
    makeGuess(guess);
  }
  letterInput.value = ""; //working
}
//Validating it's only 1 letter:
const vaildateInput = function (input) {
  const acceptedLetter = /[A-Z]/;
  if (input.length === 0) {
    // if nothing is entered
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    //if more than 1 letter is entered
    message.innerText = "Please enter just a single letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "We need a letter from A-Z only."; //if its not a letter
  } else {
    return input; //if it's valid
  }
};

// showing the guessed letters
const showedLettersGuessed = function () {
  lettersGuessedElement.innerHTML = ""; // clear
  for (const letter of lettersGuessed) {
    const li = document.createElement("li"); //creating a list of teh guessed letters
    li.innerText = letter;
    lettersGuessedElement.append(li); //append text to the element
  }
};

const makeGuess = function (guess) {
  if (lettersGuessed.includes(guess)) {
    message.innerText = "You already guessed this letter. Try again!"; //working
  } else {
    lettersGuessed.push(guess); //add the letter guessed
    updateRemainingGuesses(guess); //update the remaining guesses
    showedLettersGuessed();
    updateWordInProgress(lettersGuessed);
  }
};

const updateRemainingGuesses = function (guess) {
  const letterArray = word.toUpperCase().split("");
  if (!letterArray.includes(guess)) {
    message.innerText = `Sorry, this food does not contain the letter ${guess}.`; //working
    remainingGuesses -= 1; // update remaining guesses to be minus 1 if incorrect guess
  } else {
    message.innerText = `Woohoo! this food does contain the letter ${guess}, nice work.`; //working - don't update guesses remaining
  }

  if (remainingGuesses === 0) {
    //if the user runs out of guesses
    message.innerHTML = `Game over! Unfortunately you have run out of guesses. The word was '<span class="highlight"> ${word}</span>'.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`; // to show if only one guess left
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`; // if more than 1 guess left
  }
};

const updateWordInProgress = function (lettersGuessed) {
  const wordArray = word.toUpperCase().split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (lettersGuessed.includes(letter)) {
      //if correct letter
      revealWord.push(letter.toUpperCase()); // push if correct and ensure caps
    } else {
      revealWord.push("🐶"); //placeholder emoji if wrong
    }
  }
  //   console.log(revealWord);
  wordInProgress.innerText = revealWord.join(""); //move from letter array to full word
  checkIfWin();
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight"> You guessed the word, Woohoo!</p>`; //winning message

    startOver(); // reset function
  }
};

const startOver = function () {
  //reset of elements:
  lettersGuessedButton.classList.add("hide");
  remainingGuessesElement.classList.add("hide");
  lettersGuessedElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
  playAgainButton.focus();
};

playAgainButton.addEventListener("click", function () {
  //activates play again when clicked
  //reset of elements:

  message.classList.remove("win");
  lettersGuessed = [];
  remainingGuesses = word.length + 1; //update remaining guesses for new game - working
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`; //update remaining guesses for new game - working
  lettersGuessedElement.innerHTML = ""; //clear text
  wordInProgress.innerText = ""; //clear text from prev word - PLACEHOLDER function needs to go after
  lettersGuessedButton.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remainingGuessesElement.classList.remove("hide");
  lettersGuessedElement.classList.remove("hide");
  getWord(); // re-random the word for the next game - working
  placeholder();
  updateRemainingGuesses();
  message.innerText = ""; //clear text
  // console.log("testing");
});
