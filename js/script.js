const guessedLettersElement = document.querySelector(".guessed-letters"); //ul guessed letters
const guessButton = document.querySelector(".guess"); // button w/guess text
const letterInput = document.querySelector(".letter"); //text input
const wordInProgress = document.querySelector(".word-in-progress"); // display word in progress
const remainingGuesses = document.querySelector(".remaining"); //remaining guesses display
const remainingSpan = document.querySelector(".remaining span"); // span selector
const message = document.querySelector(".message"); //where messages appear after guessed letter
const playAgainButton = document.querySelector(".play-again"); //hidden button appears to prompt another round 
const word = "magnolia";
const guessedLetters = [];


const placeholder = function(word) {
   const placeholderLetters = [];
   for ( const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
   }
   wordInProgress.innerText = placeholderLetters.join ("");
};

placeholder(word);

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
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A-Z";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText= "You have already guesssed that letter, silly! Try again."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordinProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.classList.innerHTML= ""; //clears the list
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText= letter;
        guessedLettersElement.append(li);
    }
};

const updateWordinProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    //console.log(wordArray);
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

const checkIfWin = function (){
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add ("win"); 
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};
