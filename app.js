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
        const isValid = board[row][column].getValue() == 0;

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
    let value = 0;

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

    const playRound = (row, column) => {
        console.log(`Placing ${getActivePlayer().name}'s move into ${row},${column}....`);
        board.makeMove(row, column, getActivePlayer().token);

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {playRound, getActivePlayer};
}

const game = GameController();