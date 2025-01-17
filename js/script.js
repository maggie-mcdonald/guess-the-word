const guessedLettersElement = document.querySelector(".guessed-letters"); //ul guessed letters
const guessButton = document.querySelector(".guess"); // button w/guess text
const letterInput = document.querySelector(".letter"); //text input
const wordInProgress = document.querySelector(".word-in-progress"); // display word in progress
const remainingGuessesElement = document.querySelector(".remaining"); //remaining guesses display
const remainingSpan = document.querySelector(".remaining span"); // span selector
const message = document.querySelector(".message"); //where messages appear after guessed letter
const playAgainButton = document.querySelector(".play-again"); //hidden button appears to prompt another round 
const guessForm = document.querySelector(".guess-form"); //the box you type in

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

const placeholder = function(word) {
   const placeholderLetters = [];
   for ( const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
   }
   wordInProgress.innerText = placeholderLetters.join ("");
};

guessButton.addEventListener("click" , function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A-Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText= "You have already guesssed that letter, silly! Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML= ""; //clears the list
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for ( const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText =`Good guess! the word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesElement.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesElement.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win"); 
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    //hide previous game elements
    guessButton.classList.add("hide");
    wordInProgress.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
    remainingGuessesElement.classList.add("hide");
};

playAgainButton.addEventListener("click" , function() {
//reset values and get new word
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesElement.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerHTML = "";
    getWord();
//get the right look
    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    wordInProgress.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    
});