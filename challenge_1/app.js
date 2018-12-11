// MODEL
class TicTacToe {
  constructor() {
    // Constants
    this.X = 'X';
    this.O = 'O';
    this.TIE = 'TIE';
    this.NONE = '';
    this.BOARD_SIZE = 3;
    
    this._initialize();
    this.winCount = {
      [this.X]: 0,
      [this.O]: 0,
    };
    this.playerName = {
      [this.X]: this.NONE,
      [this.O]: this.NONE,
    };
  }
  
  _initialize(firstPlayer = this.X) {
    this.currentPlayer = firstPlayer;
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
    renderBoard(this);
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
    this._initialize(this.winner);
    resetView();
  }
  
  _declareWinner() {
    if (this.winner === this.X || this.winner === this.O) {
      renderWinner(this.winner);
      this.winCount[this.winner] += 1;
      renderWinTally(this.winCount[this.X], this.winCount[this.O]);
    } else if (this.winner === this.TIE) {
      renderTie();
    }
  }
  
  move(row, col) {
    if (!this.gameEnded) {
      this.updateBoard(row, col);
      this.checkForWinner();
      if (!this.gameEnded) {
        this.currentPlayer = (this.currentPlayer === this.X) ? this.O : this.X;
      } else {
        this._declareWinner();
      }
    }
  }
  
  changePlayerName(xPlayerName = this.NONE, oPlayerName = this.NONE) {
    this.playerName[this.X] = (xPlayerName !== this.NONE) ? xPlayerName : this.NONE;
    this.playerName[this.O] = (oPlayerName !== this.NONE) ? oPlayerName : this.NONE;
  }
}

// VIEW
const renderBoard = (ticTacToe) => {
  const rows = document.getElementById('board').children;
  const length = rows.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      let playerName = ticTacToe.NONE;
      if (ticTacToe.board[i][j] === ticTacToe.X) {
        playerName = ticTacToe.playerName[ticTacToe.X];
      } else if (ticTacToe.board[i][j] === ticTacToe.O) {
        playerName = ticTacToe.playerName[ticTacToe.O];
      }
      if (playerName !== ticTacToe.NONE) {
        rows[i].children[j].innerText = `${ticTacToe.board[i][j]} | ${playerName}`;
      } else {
        rows[i].children[j].innerText = `${ticTacToe.board[i][j]}`;
      }
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

const renderWinTally = (xWins, oWins) => {
  const winnerTally = document.getElementById('winnerTally');
  winnerTally.innerText = `X: ${xWins} | O: ${oWins}`;
}

const resetView = () => {
  clearBoard();
  const winnerDisplay = document.getElementById('winnerDisplay');
  winnerDisplay.innerText = '';
  winnerDisplay.classList.add('hidden');
};

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
};

const addPlayerNameSubmitHandler = (ticTacToe) => {
  playerNameSubmitButton = document.getElementById('playerNameSubmit');
  playerNameSubmitButton.addEventListener('click', event => {
    event.preventDefault();
    playerNameSubmitHandler(ticTacToe);
  });
}

// CONTROLLER
const boardClickHandler = (event, ticTacToe, row, col) => {
  ticTacToe.move(row, col);
};

const resetClickHandler = (event, ticTacToe) => {
  ticTacToe.resetGame();
};

const playerNameSubmitHandler = (ticTacToe) => {
  const xPlayerName = document.getElementById('playerXName').value.trim();
  const oPlayerName = document.getElementById('playerOName').value.trim();
  ticTacToe.changePlayerName(xPlayerName, oPlayerName);
}

// INITIALIZE
const ticTacToe = new TicTacToe();
addBoardClickHandlers(ticTacToe);
addResetClickHandler(ticTacToe);
addPlayerNameSubmitHandler(ticTacToe);