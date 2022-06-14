var allTiles = document.querySelectorAll(".tile");
var errorText = document.querySelector("#error-text")
var playerTurn = document.querySelector("#player-turn")
var newGameButton = document.querySelector("#new-game")

var turn = 0;
playerTurn.innerHTML = "X, it is your turn";

newGameButton.onclick = function () {
    turn = 0;
    playerTurn.innerHTML = "X, it is your turn";
    errorText.innerHTML = "";
    allTiles.forEach(function (tile) {
        tile.innerHTML = "";
        tile.classList.remove("o");
        tile.classList.remove("x");
    })
}

function checkWinner(player) {
    var sets = ["row1", "row2", "row3", "col1", "col2", "col3", "diag1", "diag2"]
    var winner = false;

    sets.forEach(function (set) {
        var selector = "." + set + "." + player;
        var tiles = document.querySelectorAll(selector);
        console.log("selector:", selector, "count:", tiles.length);
        if (tiles.length == 3) {
            winner = true;
        }
    })
    return winner;
}

allTiles.forEach(function (tile) {
    tile.onclick = function () {
        if (tile.innerHTML == 0 && !checkWinner("x") && !checkWinner("o")) {
            if (turn == 0) {
                tile.innerHTML = "X";
                turn = 1;
                playerTurn.innerHTML = "O, it is your turn";
                tile.classList.add("x");
                errorText.innerHTML = "";
                if (checkWinner("x")) {
                    playerTurn.innerHTML = "X is the winner!"
                }
            } else {
                tile.innerHTML = "O";
                turn = 0;
                playerTurn.innerHTML = "X, it is your turn";
                tile.classList.add("o");
                errorText.innerHTML = "";
                if (checkWinner("o")) {
                    playerTurn.innerHTML = "O is the winner!"
                }
            }
        } else {
            if (checkWinner("x") || checkWinner("o")) {
                errorText.innerHTML = "";
            } else {
                errorText.innerHTML = "You must choose an empty square";
            }
        }
    }
})