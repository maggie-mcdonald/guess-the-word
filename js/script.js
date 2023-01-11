const guessedLetters = document.querySelector(".guessed-letters"); //ul guessed letters
const guessButton = document.querySelector(".guess"); // button w./guess text
const letterInput = document.querySelector(".letter"); //text input
const wordInProgress = document.querySelector(".word-in-progress"); // display word in progress
const remainingGuesses = document.querySelector(".remaining"); //remaining guesses display
const remainingSpan = document.querySelector(".remaining span"); // span selector
const message = document.querySelector(".message"); //where messages appear after guessed letter
const playAgainButton = document.querySelector(".play-again"); //hidden button appears to prompt another round 
const word = "magnolia";

const placeholder = function (word){
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText= placeholderLetters.join("");
};

placeholder(word); 

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
    });