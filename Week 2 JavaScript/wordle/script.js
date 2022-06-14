/* 
If the letter is correct and in the right spot it turns green
If the letter is not in the word it turns gray
If a letter is in the word but at the wrong spot it turns orange
IF there are duplicate letters it only shows one
If there are duplicate letters and one is correct, the other will turn orange then if it is also in the wrong spot


API LINK: https://api.jsonbin.io/b/629f9937402a5b38021f6b38

LOCAL STORAGE NOTES
localStorage.setItem(key, value)
localStorage.getItem(key)
JSON.stringify(list)
JSON.parse(list)
*/
var ATTEMPTS = 6;
var LENGTH = 5;
var guesses = []; //save this
var allowed = [];
var answers = [];
var correctWord = ""; //save this
var currentGuess = "";
var gameOver = false; // save this
var winCount = 0;
var gamesPlayed = 0;
var winPercent = gamesPlayed / winCount;
var guessedInOne = 0;
var guessedInTwo = 0;

var gamesPlayedSpan = document.querySelector("#games-played");
var gamesWonSpan = document.querySelector("#games-won");
var winPercentSpan = document.querySelector("#win-percent");
var guessedInOneSpan = document.querySelector("#guessed-in-one");
var guessedInTwoSpan = document.querySelector("#guessed-in-two");

function loadState () {
    correctWord = JSON.parse(localStorage.getItem("correcWord"));
    guesses = JSON.parse(localStorage.getItem("guesses"));
    gameOver = JSON.parse(localStorage.getItem("gameOver"));
    winCount = JSON.parse(localStorage.getItem("winCount"));
    gamesPlayed = JSON.parse(localStorage.getItem("gamesPlayed"));
    guessedInOne = JSON.parse(localStorage.getItem("guessedInOne"));
    guessedInTwo = JSON.parse(localStorage.getItem("guessedInTwo"));

    gamesPlayedSpan.innerHTML = "Games played: " + gamesPlayed;
    gamesWonSpan.innerHTML = "Games won: " + winCount;
    winPercentSpan.innerHTML = "Win percent: " + Math.round(winCount/gamesPlayed * 100) + "%";

    guessedInOneSpan.innerHTML = "Games won in one attempt: " + guessedInOne;
    guessedInTwoSpan.innerHTML = "Games won in two attempts: " + guessedInTwo;

    if (!guesses) {
        guesses = [];
    }

    if (!gameOver) {
        gameOver = false;
    }
}

function saveState () {
    localStorage.setItem("correcWord", JSON.stringify(correctWord));
    localStorage.setItem("guesses", JSON.stringify(guesses));
    localStorage.setItem("gameOver", JSON.stringify(gameOver));
    localStorage.setItem("winCount", JSON.stringify(winCount));
    localStorage.setItem("gamesPlayed", JSON.stringify(gamesPlayed));
    localStorage.setItem("guessedInOne", JSON.stringify(guessedInOne));
    localStorage.setItem("guessedInTwo", JSON.stringify(guessedInTwo));
}

function getWordOfTheMinute() {
    var dateString = moment().format('YYYYMMDDHHmm');
    var dateNumber = parseInt(dateString, 10);
    var word = answers[dateNumber % answers.length];
    return word
}

function fetchWordList() {
    //Step 1 - First to run, fetches the data
    fetch("https://api.jsonbin.io/b/629f9937402a5b38021f6b38").then(function (response) {
        //Step 2 - Third to run, delayed because it is in the fetch function
        response.json().then(function (data) {
            //Step 3 - Fourth to run, delayed because it is in the fetch function
            allowed = data.allowed.concat(data.answers);
            answers = data.answers;
            loadState();
            chooseNewWord();
            updateGuesses();
        });
    });
    //Step 4 - Second to run
}

function chooseNewWord () {
    var newWord = getWordOfTheMinute();
    if (!correctWord || correctWord != newWord) {
        resetGame();
        correctWord = newWord;
        console.log("The answer is: ", correctWord);
        saveState();
    } else {
        console.log("The answer is still: ", correctWord);
    }

}

function checkWord (correct, guess) {
    var result = [0,0,0,0,0];
    var splitCorrect = correct.split("");

    for (var i = 0; i < splitCorrect.length; i++) {
        if (splitCorrect[i] == guess[i]) {
            splitCorrect[i] = null;
            result[i] = 1;
        }
    }
    for (var i = 0; i < splitCorrect.length; i++) {
        var splitIndex = splitCorrect.indexOf(guess[i])
        if (splitIndex >= 0 && result[i] == 0) {
            splitCorrect[splitIndex] = null;
            result[i] = 2;
        }
    }
    return result;
}

function updateGuesses() {
    var guessesDiv = document.querySelector("#guesses");
    guessesDiv.innerHTML = "";
    for (var i = 0; i < ATTEMPTS; i++) {
        var guessDiv = document.createElement("div");
        guessDiv.classList.add("guess");
        guessesDiv.appendChild(guessDiv);

        for (var j = 0; j < LENGTH; j++) {
            var letterDiv = document.createElement("div");
            letterDiv.classList.add("letter");

            var result;
            if (i < guesses.length) {
                letterDiv.innerHTML = currentGuess;
                letterDiv.classList.add("guessed");
                result = checkWord(correctWord, guesses[i])
            
                letterDiv.innerHTML = guesses[i][j];
                letterDiv.classList.add("guessed");
            
            if (result[j] == 1) {
                letterDiv.classList.add("match");
            } else if (result[j] == 2) {
                letterDiv.classList.add("contains");
            }  
        }
        if (i == guesses.length && j < currentGuess.length) {
            letterDiv.innerHTML = currentGuess[j] || "";
        }
        guessDiv.appendChild(letterDiv);
        }
    }
}

function setupInputs() { 
    document.onkeydown = function (event) {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            if (currentGuess.length < 5) {
                currentGuess += event.key.toLowerCase();
            }
        } else if (event.keyCode == 8) {
            currentGuess = currentGuess.slice(0, -1)
        } else if (event.keyCode == 13) {
            submitGuess();
            currentGuess = "";
        }

        updateGuesses();
    }
}

function submitGuess () {
    var messageDiv = document.querySelector("#message");
    
    if (currentGuess.length != 5) {
        messageDiv.innerHTML = "Guess must be 5 letters long";
    } else if (!allowed.includes(currentGuess)) {
        messageDiv.innerHTML = "Word not valid";
    } else if (guesses.length == 5) {
        messageDiv.innerHTML = "You lose";;
        guesses.push(currentGuess);
        updateGuesses();
        document.onkeydown = function (event) {
            event.preventDefault();
        }
        gamesPlayed++;
        gameOver = true;
    } else if (currentGuess == correctWord) {
        messageDiv.innerHTML = "You win!";
        guesses.push(currentGuess);
        updateGuesses();
        document.onkeydown = function (event) {
            event.preventDefault();
        }
        gamesPlayed++;
        winCount++;
        gameOver = true;
    } else {
        guesses.push(currentGuess);
        messageDiv.innerHTML = "";
    }

    if (guesses.length == 1 && gameOver == true) {
        guessedInOne++;
    } else if (guesses.length == 2 && gameOver == true) {
        guessedInTwo++;
    }
    updateGuesses();
    saveState();
}

function resetGame() {
     guesses = []; //save this
     correctWord = ""; //save this
     currentGuess = "";
}

var keys = document.querySelectorAll('.keyboard-row button');
for (var i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
        var key = target.getAttribute("data-key");
        var delKey = document.getElementById("del");
        var enterKey = document.getElementById("enter");
        if (!gameOver){
            delKey.onclick = function () {
                currentGuess = currentGuess.slice(0, -1);
                updateGuesses();
            }
            enterKey.onclick = function () {
                submitGuess();
                currentGuess = "";
                updateGuesses();
            }
            currentGuess += key;
            updateGuesses();
        }
    }
}

fetchWordList();
setupInputs();