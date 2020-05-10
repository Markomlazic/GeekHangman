function hangmanGame(words) {
  // Set the game up
  // Select a random word from words array and set it to lower case
  var word = words[Math.floor(Math.random() * words.length)];
  var wordLowerCase = word.toLowerCase().replace(/\s+/g, "");

  // Remove all characters with ____
  var word__ = word.replace(/[a-zA-Z]/g, "-").replace(/[0-9]/g, "-");
  var newWord = word__;

  // Display the selected word to the player as _____
  var displayWord = document.getElementById("wordField");
  displayWord.innerHTML = word__;

  // Hangman photo
  var hangmanPhoto = document.getElementsByClassName("hangman-photo")[0];

  // Select the div with incorrect guesses
  // Create a string with all the missed and guessed letters
  var incorrectLetters = document.getElementById("incorrect-letters");
  var missedLetters = "";
  var guessedLetter = "";
  var incorrectCount = 0;

  // Select all keyboard keys
  var keys = document.querySelectorAll("#key-letter");
  var pressedKey = "";

  // Function to get all indices of a guessed letter in a string
  function getAllIndexes(arr, val) {
    var indexes = [],
      i;
    for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
  }

  // Function to replace the ___ with the correcctly guessed letter
  function replaceAt(str, index, replacement) {
    return (
      str.substr(0, index) +
      replacement +
      str.substr(index + replacement.length)
    );
  }

  // Function to capitalize first letters of words
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }

  // Change hangman photo
  function changePhoto(count) {
    hangmanPhoto.setAttribute("src", `../img/${count}.png`);
  }

  // Check if the player reached the number of allowed misses
  function endGame(count, word) {
    if (count === 6) {
      alert(`Game Over! You lost! The word was: ${word}`);
      setUp();
    }
  }

  // Check if the player guessed the word
  function gameWon(word, guess) {
    if (word.toLowerCase() === guess.toLowerCase()) {
      alert(`Great! You Won! The word was ${word}`);
      setUp();
    }
  }

  //Check if the letter is in the word
  function letterCheck(key) {
    //check if the word contains the letter
    // display the correct letter
    if (wordLowerCase.includes(key)) {
      // get all indices of a letter
      guessedLetter += key;
      var indices = getAllIndexes(word.toLowerCase(), key);
      // reveal the letter
      indices.map(i => {
        newWord = replaceAt(newWord, i, key);
        displayWord.innerHTML = titleCase(newWord);
        /// see if game is won
        gameWon(word, newWord);
      });
    } else if (!wordLowerCase.includes(key) && !missedLetters.includes(key)) {
      // save all incorrect letters in a separate string so that a letter is not displayed more than once
      // display the incorrect letter
      missedLetters += key;
      incorrectLetters.innerHTML += key.toUpperCase() + "  ";
      // increase false count number
      incorrectCount++;
      // change hangman photo
      changePhoto(incorrectCount);
      endGame(incorrectCount, word);
    }
  }

  function setUp() {
    word = words[Math.floor(Math.random() * words.length)];
    wordLowerCase = word.toLowerCase().replace(/\s+/g, "");
    // Remove all characters with ____
    word__ = word.replace(/[a-zA-Z]/g, "-").replace(/[0-9]/g, "-");
    newWord = word__;

    // Display the selected word to the player as _____
    displayWord = document.getElementById("wordField");
    displayWord.innerHTML = word__;

    // Select the div with incorrect guesses
    // Create a string with all the missed letters
    incorrectLetters = document.getElementById("incorrect-letters");
    hangmanPhoto = document.getElementsByClassName("hangman-photo")[0];
    pressedKey = "";
    missedLetters = "";
    guessedLetter = "";
    incorrectCount = 0;
    incorrectLetters.innerHTML = "";
    hangmanPhoto.setAttribute("src", `../img/0.png`);
  }

  function runGame() {
    // Add event listeners to all the keys
    keys.forEach(element => {
      element.addEventListener("click", () => {
        pressedKey = element.getAttribute("data-char").toLowerCase();
        letterCheck(pressedKey);
      });
    });
  }

  setUp();
  runGame();
}
