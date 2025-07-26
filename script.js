const gameBoard = (function () {
    const board = [];
    const createBoard = () => {
        for (let i = 0; i < 3; i++) {
            const temp = [];
            for (let j = 0; j < 3; j++) {
                temp.push("");
            }
            board.push(temp);
        }
    }

    const clearBoard = () => {
        for (let i=0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = "";
            }
        }
    }
    const getBoard = () => board;

    const changeBoard = (x, y, marker) => {
        if (board[x][y] === "") 
            board[x][y] = marker;
    }

    const isBoardFull = () => {
        return board.every(row => row.every(cell => cell !== ""));
    }

    return { createBoard, getBoard, changeBoard, isBoardFull, clearBoard }
}) ();

const Player = (name, marker) => ({ name, marker });

const gameController = (function () {
    gameBoard.createBoard();
    // console.log(gameBoard.getBoard());
    let player1, player2, playerTurn;
    const createPlayers = (name1, name2) => {
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");
        playerTurn = player1;
    }
    
    const getPlayerTurn = () => playerTurn;

    const switchPlayerTurn = () => {
        playerTurn = (playerTurn === player1) ? player2 : player1;
    }

    const makeMove = (x, y) => {
        const board = gameBoard.getBoard();
        if (board[x][y] === "") {
            gameBoard.changeBoard(x, y, getPlayerTurn().marker);
            switchPlayerTurn();
            return true;
        }
        else {
            return false;
        }
    }

    const checkTie = () => {
        return gameBoard.isBoardFull();
    }

    const checkWin = () => {
        const board = gameBoard.getBoard();
        if ((board[0][0] != "" && board[0][0] == board[1][1] && board[1][1] == board[2][2]) || (board[0][2] != "" && board[0][2] == board[1][1] && board[1][1] == board[2][0])) {
            if (board[1][1] == "X") return player1;
            else return player2;
        }
        for (let i = 0; i < 3; i++) {
            if (board[i][0] != "" && board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                if (board[i][0] == "X") return player1;
                else return player2;
            } 
            else if (board[0][i] != "" && board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
                if (board[0][i] == "X") return player1;
                else return player2;
            }
        }
        return "";
    }
    return { makeMove, checkTie, checkWin, createPlayers, getPlayerTurn }
}) ();

const displayController = (function() {
    const gameBoardContainer = document.querySelector(".board-container");

    let start = false;
    let win = false;
    const startButton = document.querySelector(".start");
    const resultDiv = document.querySelector(".result-display");
    resultDiv.textContent = "Please enter player names";
    const resetButton = document.querySelector(".reset");

    resetButton.addEventListener("click", () => {
        resultDiv.textContent = "Please enter player names";
        gameBoard.clearBoard();
        renderBoard();
        // document.querySelector("#player-1").value = "";
        // document.querySelector("#player-2").value = "";
        win = false;
        start = false;
    });

    startButton.addEventListener("click", () => {
        if (win) return;
        const player1 = document.querySelector("#player-1").value.trim();
        const player2 = document.querySelector("#player-2").value.trim();
        if (!player1 || !player2) {
            alert("Please enter the player names");
            return;
        }
        gameController.createPlayers(player1, player2);
        resultDiv.textContent = `${player1}'s turn!`
        start = true;
    });

    gameBoardContainer.addEventListener("click", (e) => {
        if (!e.target.classList.contains("cell")) return;
        if (!start) {
            alert("Please enter the player names");
            return;
        }
        if (win) {
            return;
        }
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        gameController.makeMove(row, col, "");
        renderBoard();

        const winner = gameController.checkWin();
        if (winner == "") {
            if (gameController.checkTie() === true) {
                alert("Game Over");
            }
            else {
                const player = gameController.getPlayerTurn();
                resultDiv.textContent = `${player.name}'s turn!`
            }
            return;
        }
       
        resultDiv.textContent = `${winner.name} has won! Click Reset to play again`;
        win = true;
    });

    const renderBoard = () => {
        const board = gameBoard.getBoard();
        const gameBoardContainer = document.querySelector(".board-container");
        gameBoardContainer.innerHTML = "";
        
        for (let i = 0; i < 3; i++) {
            // const parentDiv = document.createElement("div"); // const here works as it is scoped only in the single iteration of the loop
            for (let j = 0; j < 3; j++) {
                const div = document.createElement("div");
                div.textContent = board[i][j];
                div.classList.add("cell");
                div.dataset.row = i;
                div.dataset.col = j;
                // parentDiv.appendChild(div);
                gameBoardContainer.appendChild(div);
            }
        }
    }
    renderBoard();
}) ();