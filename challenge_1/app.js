// MODEL

// Constants
const X = 'X';
const O = 'O';
const TIE = 'TIE';
const EMPTY = '';
const BOARD_SIZE = 3;

const initializeGame = () => ({
  currentPlayer: X,
  gameEnded: false,
  winner: EMPTY,
  board: [[EMPTY, EMPTY, EMPTY, ], [EMPTY, EMPTY, EMPTY, ], [EMPTY, EMPTY, EMPTY, ], ],
});

const updateCurrentPlayer = (game, player) => {
  return Object.assign({}, game, { currentPlayer:  player });
};

const generateUpdatedBoard = (board, currentPlayer, placedRow, placedCol) => {
  const newBoard = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    newBoard.push([]);
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (row === placedRow && col === placedCol) {
        newBoard[row].push(currentPlayer);
      } else {
        newBoard[row].push(board[row][col]);
      }
    }
  }
  
  return newBoard;
};

const updateBoard = (game, placedRow, placedCol) => {
  return Object.assign({}, game, { board:  generateUpdatedBoard(game.board, game.currentPlayer, placedRow, placedCol) });
};

const checkForWinner = () => {};
const resetGame = () => {};

// VIEW
const renderBoard = () => {};
const renderWinnerDisplay = () => {};
const renderResetButton = () => {};

// CONTROLLER
const boardClickHandler = () => {};
const resetClickHandler = () => {};

// TESTING
const test = () => {
  // ======== Test initializeGame ==========
  // let game = initializeGame();
  // console.log('intial game:', game);
  
  // ======== Test updateCurrentPlayer ==========
  // let game = initializeGame();
  // game = updateCurrentPlayer(game, O);
  // console.log('updated player:', game);
  
  // ======== Test generateUpdatedBoard ==========
  // let game = initializeGame();
  // let updatedBoard = generateUpdatedBoard(game.board, game.currentPlayer, 1, 1);
  // console.log('updated board 1:', updatedBoard);
  // updatedBoard = generateUpdatedBoard(updatedBoard, X, 1, 3);
  // console.log('updated board 2:', updatedBoard);
  // updatedBoard = generateUpdatedBoard(updatedBoard, O, 0, 0);
  // console.log('updated board 3:', updatedBoard);
  
  // // ======== Test updateBoard ==========
  let game = initializeGame();
  game = updateBoard(game, 1, 1);
  console.log('placed X on (1, 1):\n', game);
};

test();