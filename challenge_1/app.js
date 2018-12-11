// MODEL

// Constants

class TicTacToe {
  constructor() {
    this.X = 'X';
    this.O = 'O';
    this.TIE = 'TIE';
    this.NONE = '';
    this.BOARD_SIZE = 3;
    
    this._initialize();
  }
  
  _initialize() {
    this.currentPlayer = this.X;
    this.gameEnded = false;
    this.winner = this.NONE;
    this.board = [
      [this.NONE, this.NONE, this.NONE, ], 
      [this.NONE, this.NONE, this.NONE, ], 
      [this.NONE, this.NONE, this.NONE, ],
    ];
  }
  
  _prettyPrintBoard() {
    this.board.forEach(row => console.log(row));
  }
  
  updateCurrentPlayer(player) {
    this.currentPlayer = player;
  }
  
  updateBoard(row, col) {
    this.board[row][col] = this.currentPlayer;
    renderBoard(this.board);
  }
  
  _isAnyRowComplete() {  
    return this.board.some(row => {
      return row.every(square => square === this.currentPlayer);
    });
  }
  
  _isAnyColumnComplete() {
    let complete;
    for (let col = 0; col < this.BOARD_SIZE; col++) {
      complete = true;
      for (let row = 0; row < this.BOARD_SIZE; row++) {
        this.board[row][col];
        complete = complete && this.board[row][col] === this.currentPlayer;
      }
      if (complete) {
        return true;
      }
    }
    
    return false;
  }
  
  _isAnyDiagonalComplete() {
    
    let majorDiagonalComplete = true;
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      majorDiagonalComplete = majorDiagonalComplete && this.board[i][i] === this.currentPlayer;
    }
    
    let minorDiagonalComplete = true;
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      minorDiagonalComplete = minorDiagonalComplete && this.board[i][(this.BOARD_SIZE - 1) - i] === this.currentPlayer;
    }
    
    return majorDiagonalComplete || minorDiagonalComplete;
  }
  
  _isBoardFull() {
    return this.board.every(row => row.every(value => value !== this.NONE));
  }
  
  checkForWinner() {
    if (this._isAnyRowComplete() || this._isAnyColumnComplete() || this._isAnyDiagonalComplete()) {
      this.winner = this.currentPlayer;
      this.gameEnded = true;
      return;
    }
    
    if (this._isBoardFull()) {
      this.winner = this.TIE;
      this.gameEnded = true;
      return;
    }
  }
  
  resetGame() {
    this._initialize();
    clearBoard();
  }
  
  move(row, col) {
    if (!this.gameEnded) {
      this.updateBoard(row, col);
      this.checkForWinner();
      if (!this.gameEnded) {
        this.currentPlayer = (this.currentPlayer === this.X) ? this.O : this.X;
      }
    }
  }
  
}

// TEST MODEL
// var ticTacToe = new TicTacToe();
// ticTacToe._prettyPrintBoard();
// console.log(ticTacToe.currentPlayer);
// ticTacToe.updateCurrentPlayer(ticTacToe.O);
// console.log(ticTacToe.currentPlayer);
// ticTacToe.updateBoard(1, 1);
// ticTacToe._prettyPrintBoard();

// ticTacToe.board = [
//   ['', '', '',],
//   ['', '', '',],
//   ['X', 'X', 'X',],
// ];
// console.log(ticTacToe._isAnyRowComplete());

// ticTacToe.updateCurrentPlayer(ticTacToe.O);
// ticTacToe.board = [
//   ['', 'X', 'O',],
//   ['', 'X', 'O',],
//   ['', 'O', 'O',],
// ];
// console.log(ticTacToe._isAnyColumnComplete());

// ticTacToe.updateCurrentPlayer(ticTacToe.X);
// ticTacToe.board = [
//   ['X', '', '',],
//   ['', 'X', '',],
//   ['', '', 'X',],
// ];
// console.log(ticTacToe._isAnyDiagonalComplete());

// ticTacToe.board = [
//   ['X', 'X', 'X',],
//   ['X', 'X', 'X',],
//   ['X', 'X', 'X',],
// ];
// console.log(ticTacToe._isBoardFull());

// ticTacToe.board = [
//   ['X', '', '',],
//   ['', 'X', '',],
//   ['', '', 'X',],
// ];
// ticTacToe.checkForWinner();
// console.log(ticTacToe.winner);

// ticTacToe.updateCurrentPlayer(ticTacToe.O);
// ticTacToe.board = [
//   ['', 'O', '',],
//   ['', 'O', '',],
//   ['', 'O', '',],
// ];
// ticTacToe.checkForWinner();
// console.log(ticTacToe.winner);
// console.log(ticTacToe.gameEnded);

// ticTacToe.board = [
//   ['X', 'X', 'X',],
//   ['', '', '',],
//   ['', '', '',],
// ];
// ticTacToe.checkForWinner();
// console.log(ticTacToe.winner);
// console.log(ticTacToe.gameEnded);

// ticTacToe.board = [
//   ['X', 'O', 'X',],
//   ['O', 'X', 'X',],
//   ['O', 'X', 'O',],
// ];
// ticTacToe.checkForWinner();
// console.log(ticTacToe.winner);
// console.log(ticTacToe.gameEnded);

// ticTacToe.board = [
//   ['X', 'O', 'X',],
//   ['O', '', 'X',],
//   ['O', 'X', 'O',],
// ];
// ticTacToe.checkForWinner();
// console.log(ticTacToe.winner);
// console.log(ticTacToe.gameEnded);



// VIEW
const renderBoard = (board) => {
  const rows = document.getElementById('board').children;
  const length = rows.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      rows[i].children[j].innerText = board[i][j];
    }
  }
};

const clearBoard = () => {
  const rows = document.getElementById('board').children;
  const length = rows.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      rows[i].children[j].innerText = '';
    }
  }
};

const renderWinner = (winner) => {
  const winnerDisplay = document.getElementById('winnerDisplay');
  winnerDisplay.innerText = `The winner is: ${winner}!`;
  winnerDisplay.classList.remove('hidden');
};



const renderTie = () => {
  const winnerDisplay = document.getElementById('winnerDisplay');
  winnerDisplay.innerText = `There is a tie!`;
  winnerDisplay.classList.remove('hidden');
};

// TEST VIEW
// ====== Test renderBoard ======
// const rows = document.getElementById('board').children;
// const board = [
//   [X, O, X, ], 
//   [O, X, X, ], 
//   [X, O, NONE, ],
// ];

// renderBoard(board, rows);
// ====== Test clearBoard ======
// setTimeout(() => {clearBoard(rows)}, 1000);
// ====== Test renderWinner ======
// setTimeout(() => {renderWinner('X')}, 1500)
// ====== Test renderTie ======
// setTimeout(() => {renderTie('X')}, 3000)

// CONTROLLER
const boardClickHandler = (event, ticTacToe, row, col) => {
  // if (!ticTacToe.gameEnded) {
  //   ticTacToe.updateBoard(row, col);
  //   ticTacToe.checkForWinner();
  //   if (!ticTacToe.gameEnded) {
  //     ticTacToe.currentPlayer = (ticTacToe.currentPlayer === ticTacToe.X) ? ticTacToe.O : ticTacToe.X;
  //   }
  // }
  ticTacToe.move(row, col);
};

const resetClickHandler = (event, ticTacToe) => {
  ticTacToe.resetGame();
};

// INIT
const addBoardClickHandlers = (ticTacToe) => {
  const rows = document.getElementById('board').children;
  const length = rows.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      let square = rows[i].children[j];
      square.addEventListener('click', event => boardClickHandler(event, ticTacToe, i, j));
    }
  }
};
const addResetClickHandler = (ticTacToe) => {
  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', event => resetClickHandler(event, ticTacToe));
}

// Test
const rows = document.getElementById('board').children;
const ticTacToe = new TicTacToe();
console.log(ticTacToe.board);
addBoardClickHandlers(ticTacToe);
addResetClickHandler(ticTacToe);




