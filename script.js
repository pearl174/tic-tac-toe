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

    
    const getBoard = () => board;

    const changeBoard = (x, y, marker) => {
        if (board[x][y] === "") 
            board[x][y] = marker;
    }

    const isBoardFull = () => {
        return board.every(row => row.every(cell => cell !== ""));
    }

    return { createBoard, getBoard, changeBoard, isBoardFull }
}) ();

const Player = (name, marker) => ({ name, marker });

const gameController = (function () {
    gameBoard.createBoard();
    // console.log(gameBoard.getBoard());
    const player1 = Player("A", "X");
    const player2 = Player("B", "O");

    let playerTurn = player1;

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
        if ((board[0][0] == board[1][1] && board[1][1] == board[2][2]) || (board[0][2] == board[1][1] && board[1][1] == board[2][0])) {
            return board[1][1];
        }
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
                return board[i][0];
            } 
            else if (board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
                return board[0][i];
            }
        }
        return "";
    }
    return { makeMove, checkTie, checkWin }
}) ();

const displayController = (function() {
    const gameBoardContainer = document.querySelector(".board-container");

    gameBoardContainer.addEventListener("click", (e) => {
        if (!e.target.classList.contains("cell")) return;

        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        gameController.makeMove(row, col);
        renderBoard();
        const winner = gameController.checkWin();
        if (winner == "") {
            if (gameController.checkTie() === true) {
                alert("Game Over");
            }
            return;
        }
        alert(`${winner} has won!`);
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