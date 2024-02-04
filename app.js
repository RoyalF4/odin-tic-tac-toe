function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const makeMove = (row, column, player) => {
        const isValid = board[row][column].getValue() == '';

        if(!isValid) {
            return;
        }
        else {
            board[row][column].addMove(player);
        }
    };

    const printBoard = () => {
        const boardWithCellVales = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellVales);
    };

    return {getBoard, makeMove, printBoard};
}

function Cell() {
    let value = '';

    const addMove = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addMove, getValue};
}

function GameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const board = GameBoard();
    let moves = 0;
    let winner = 'none';

    const getMoves = () => {
        return moves;
    }

    const increaseMoves = () => {
        moves++;
    }

    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const getWinner = () => {
        return winner;
    }

    const setWinner = () => {
        winner = getActivePlayer().name;
    }

    const playRound = (row, column) => {
        console.log(`Placing ${getActivePlayer().name}'s move into ${row},${column}....`);
        board.makeMove(row, column, getActivePlayer().token);
        increaseMoves();

        const boardState = board.getBoard();
        const token = getActivePlayer().token;

        if(row == column || (row == 0 && column == 2) || (row == 2 && column == 0)) {
            if(boardState[0][0].getValue() == token && boardState[1][1].getValue() == token && boardState[2][2].getValue() == token) {
                setWinner();
            }
            else if(boardState[0][2].getValue() == token && boardState[1][1].getValue() == token && boardState[2][0].getValue() == token) {
                setWinner();
            }
        }

        if(row == 0) {
            if(boardState[0][0].getValue() == token && boardState[0][1].getValue() == token && boardState[0][2].getValue() == token) {
                setWinner();
            }
        }
        if(row == 1) {
            if(boardState[1][0].getValue() == token && boardState[1][1].getValue() == token && boardState[1][2].getValue() == token) {
                setWinner();
            }
        }
        if(row == 2) {
            if(boardState[2][0].getValue() == token && boardState[2][1].getValue() == token && boardState[2][2].getValue() == token) {
                setWinner();
            }
        }

        if(column == 0) {
            if(boardState[0][0].getValue() == token && boardState[1][0].getValue() == token && boardState[2][0].getValue() == token) {
                setWinner();
            }
        }
        if(column == 1) {
            if(boardState[0][1].getValue() == token && boardState[1][1].getValue() == token && boardState[2][1].getValue() == token) {
                setWinner();
            }
        }
        if(column == 2) {
            if(boardState[0][2].getValue() == token && boardState[1][2].getValue() == token && boardState[2][2].getValue() == token) {
                setWinner();
            }
        }

        console.log(moves)
        if(moves == 9 && winner == 'none') {
            winner = 'draw';
        }

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {playRound, getActivePlayer, getBoard: board.getBoard, getMoves, increaseMoves, getWinner};
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const winnerDisplay = document.querySelector('.result');

    const updateScreen = () => {
        boardDiv.textContent = '';

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        if(game.getWinner() != 'none' && game.getWinner() != 'draw') {
            winnerDisplay.textContent = `${game.getWinner()} wins!`;
        }
        else if(game.getWinner() == 'draw') {
            winnerDisplay.textContent = `It's a ${game.getWinner()}!`
        }

        board.forEach((row, indexRow) => {
            row.forEach((cell, indexColumn) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                cellButton.dataset.column = indexColumn;
                cellButton.dataset.row =indexRow;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })
    }

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;
        const currentValue = e.target.textContent;
        const movesMade = game.getMoves();

        if(!selectedColumn || currentValue != '') return;
        if(game.getWinner() == 'none') {
            game.playRound(selectedRow, selectedColumn);
            updateScreen();
        }
    }
    boardDiv.addEventListener('click', clickHandlerBoard);
    updateScreen();
}

ScreenController();