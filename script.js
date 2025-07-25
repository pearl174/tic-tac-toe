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

    const changeBoard = (x, marker) => {
        const i = Math.floor(x / 3);
        const j = x % 3;
        if (board[i][j] === "") 
            board[i][j] = marker;
    }

    return { createBoard, getBoard, changeBoard }
}) ();

const Player = (name, marker) => { name, marker }

const gameController = (function () {
    gameBoard.createBoard();

    const player1 = players("A", "X");
    const player2 = players("B", "O");

})();