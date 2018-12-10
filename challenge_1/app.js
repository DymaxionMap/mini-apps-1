// MODEL

// Constants
const X = 'X';
const O = 'O';
const TIE = 'TIE';
const NONE = '';
const BOARD_SIZE = 3;

const initializeGame = () => ({
  currentPlayer: X,
  gameEnded: false,
  winner: NONE,
  board: [[NONE, NONE, NONE, ], [NONE, NONE, NONE, ], [NONE, NONE, NONE, ], ],
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

const isLineComplete = (line, currentPlayer) => {
  return line.every(value => value === currentPlayer);
}

const isAnyRowComplete = (board, currentPlayer) => {
  return board.reduce((complete, row) => complete || isLineComplete(row, currentPlayer), false);
};

const transpose = (rows) => {
  const cols = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    cols.push([]);
    for (let col = 0; col < BOARD_SIZE; col++) {
      cols[row].push(rows[col][row]);
    }
  }
  
  return cols;
};

const isAnyColComplete = (board, currentPlayer) => {
  const cols = transpose(board);
  return cols.reduce((complete, col) => complete || isLineComplete(col, currentPlayer), false);
};

const getDiagonals = (board) => {
  const diagonals = [[], []];
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (row === col) {
        diagonals[0].push(board[row][col]);
      }
    }
  }
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (row === (BOARD_SIZE - 1) - col) {
        diagonals[1].push(board[row][col]);
      }
    }
  }
  
  return diagonals;
}

const isAnyDiagonalComplete = (board, currentPlayer) => {
  const diagonals = getDiagonals(board);
  return diagonals.reduce((complete, diagonal) => complete || isLineComplete(diagonal, currentPlayer), false);
};

const isBoardFull = (board) => {
  return board.every(row => row.every(value => value !== NONE));
}

const checkForWinner = (board, currentPlayer) => {
  // for each row, check if row is completed
  // for each col, check if col is completed
  // for each diagonal, check if diagonal is completed
  // if any of the above is completed
  //   return currentPlayer
  if (isAnyRowComplete(board, currentPlayer) || 
    isAnyColComplete(board, currentPlayer) || 
    isAnyDiagonalComplete(board, currentPlayer)) {
    return currentPlayer;
  }
  // if board is full
  //   return tie
  if (isBoardFull(board)) {
    return TIE;
  }
  // return none
  return NONE;
};

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
  const prettyPrintBoard = (board) => {
    board.forEach(row => console.log(row));
  };
  
  let board;
  
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
  
  // ========== Test updateBoard ==========
  // let game = initializeGame();
  // game = updateBoard(game, 1, 1);
  // console.log('placed X on (1, 1):\n', game);
  
  // ======== Test isAnyRowComplete ==========
  // let game = initializeGame();
  // game = updateBoard(game, 1, 1);
  // game = updateCurrentPlayer(game, O);
  // game = updateBoard(game, 0, 0);
  // game = updateCurrentPlayer(game, X);
  // game = updateBoard(game, 1, 0);
  // game = updateCurrentPlayer(game, O);
  // game = updateBoard(game, 2, 1);
  // game = updateCurrentPlayer(game, X);
  // game = updateBoard(game, 1, 2);
  // console.log('before check winner:\n', game);
  // console.log('is any row complete:\n', isAnyRowComplete(game.board, game.currentPlayer));
  
  // ======== Test isAnyColComplete ==========
  // let game = initializeGame();
  // game = updateBoard(game, 1, 2);
  // game = updateCurrentPlayer(game, O);
  // game = updateBoard(game, 0, 0);
  // game = updateCurrentPlayer(game, X);
  // game = updateBoard(game, 2, 2);
  // game = updateCurrentPlayer(game, O);
  // game = updateBoard(game, 2, 1);
  // game = updateCurrentPlayer(game, X);
  // game = updateBoard(game, 0, 2);
  
  // // Test transpose
  // console.log('rows:');
  // prettyPrintBoard(game.board);
  // console.log('cols:');
  // prettyPrintBoard(transpose(game.board));
  
  // console.log('before check winner:\n', game);
  // console.log('is any col complete:\n', isAnyColComplete(game.board, game.currentPlayer));
  
  // ======== Test isAnyDiagonalComplete ==========
  // let game = initializeGame();
  // game = updateBoard(game, 0, 2);
  // game = updateCurrentPlayer(game, O);
  // game = updateBoard(game, 0, 0);
  // game = updateCurrentPlayer(game, X);
  // game = updateBoard(game, 1, 1);
  // game = updateCurrentPlayer(game, O);
  // game = updateBoard(game, 2, 1);
  // game = updateCurrentPlayer(game, X);
  // game = updateBoard(game, 2, 0);
  
  // // // Test getDiagonals
  // console.log('rows:');
  // prettyPrintBoard(game.board);
  // console.log('diagonals:');
  // prettyPrintBoard(getDiagonals(game.board));
  
  // console.log('before check winner:\n', game);
  // console.log('is any diagonal complete:\n', isAnyDiagonalComplete(game.board, game.currentPlayer));
  
  // ======== Test isBoardFull ==========
  // board = [[X, X, X, ], [X, X, X, ], [X, X, X, ],];
  // prettyPrintBoard(board);
  // console.log('is board full: ', isBoardFull(board)); // expect true
  
  // board = [[X, O, X, ], [X, X, X, ], [X, X, X, ],];
  // prettyPrintBoard(board);
  // console.log('is board full: ', isBoardFull(board)); // expect true
  
  // board = [[X, NONE, X, ], [X, X, X, ], [X, X, X, ],];
  // prettyPrintBoard(board);
  // console.log('is board full: ', isBoardFull(board)); // expect false
  
  // ======== Test checkForWinner ==========
  board = [
    [X, O, NONE, ], 
    [NONE, X, NONE, ], 
    [NONE, O, X, ],
  ];
  
  prettyPrintBoard(board);
  console.log('checkForWinner: ', checkForWinner(board, X)); // expect X
  
  board = [
    [X, O, NONE, ], 
    [NONE, O, NONE, ], 
    [X, O, X, ],
  ];
  
  prettyPrintBoard(board);
  console.log('checkForWinner: ', checkForWinner(board, O)); // expect O
  
  board = [
    [X, O, X, ], 
    [O, X, X, ], 
    [X, O, O, ],
  ];
  
  prettyPrintBoard(board);
  console.log('checkForWinner: ', checkForWinner(board, X)); // expect tie
  
  board = [
    [X, O, X, ], 
    [O, X, X, ], 
    [X, O, NONE, ],
  ];
  
  prettyPrintBoard(board);
  console.log('checkForWinner: ', checkForWinner(board, O)); // expect none
};

test();