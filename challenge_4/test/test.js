const expect = require('chai').expect;

const fakeApp = {

  NUM_ROWS: 6,
  NUM_COLS: 7,
  WINNING_COUNT: 4,
  RED: 'RED',
  BLACK: 'BLACK',

  winHorizontal: function (updatedBoard, currentPlayer, rowIndex, colIndex) {
    let count = 0;
    for (let j = 0; j < this.NUM_COLS; j++) {
      if (updatedBoard[rowIndex][j] === currentPlayer) {
        count += 1;
        if (count >= this.WINNING_COUNT) {
          return true;
        }
      } else {
        count = 0;
      }
    }

    return false;
  },

  winVertical: function (updatedBoard, currentPlayer, rowIndex, colIndex) {  
    let count = 0;
    for (let i = 0; i < this.NUM_ROWS; i++) {
      if (updatedBoard[i][colIndex] === currentPlayer) {
        count += 1;
        if (count >= this.WINNING_COUNT) {
          return true;
        }
      } else {
        count = 0;
      }
    }

    return false;
  },

  winMajorDiagonal: function (updatedBoard, currentPlayer, rowIndex, colIndex) {
    let count = 0;
    let i = rowIndex;
    let j = colIndex;
    while (i < this.NUM_ROWS && j < this.NUM_COLS) {
      count = (updatedBoard[i][j] === currentPlayer) ? count + 1 : 0;
      i += 1;
      j += 1;
    }

    return count >= this.WINNING_COUNT;
  },

  winMinorDiagonal: function (updatedBoard, currentPlayer, rowIndex, colIndex) {
    let count = 0;
    let i = rowIndex;
    let j = colIndex;
    while (i < this.NUM_ROWS && j >= 0) {
      count = (updatedBoard[i][j] === currentPlayer) ? count + 1 : 0;
      i += 1;
      j -= 1;
    }

    return count >= this.WINNING_COUNT;
  },

  winDiagonal: function (updatedBoard, currentPlayer, rowIndex, colIndex) {
    const winMajorDiagonal = this.winMajorDiagonal(updatedBoard, currentPlayer, rowIndex, colIndex);
    const winMinorDiagonal = this.winMinorDiagonal(updatedBoard, currentPlayer, rowIndex, colIndex);
    return winMajorDiagonal || winMinorDiagonal;
  },
};

describe('Connect Four', function() {
  let rows;
  let board;
  let currentPlayer;

  beforeEach(function() {
    rows = [...Array(fakeApp.NUM_ROWS)].fill(null);
    board = rows.map(() => [...Array(fakeApp.NUM_COLS)].fill(null));
    currentPlayer = fakeApp.RED;
  });

  it('should declare winner if four in a row horizontally', function() {
    let rowIndex = fakeApp.NUM_ROWS - 1;
    board[rowIndex][0] = currentPlayer;
    board[rowIndex][1] = currentPlayer;
    board[rowIndex][2] = currentPlayer;
    board[rowIndex][3] = currentPlayer;
    const winHorizontal = fakeApp.winHorizontal(board, currentPlayer, rowIndex, 3);
    expect(winHorizontal).to.be.true;
  });

  it('should declare winner if four in a column vertically', function() {
    let rowIndex = fakeApp.NUM_ROWS - 1;
    board[rowIndex - 3][0] = currentPlayer;
    board[rowIndex - 2][0] = currentPlayer;
    board[rowIndex - 1][0] = currentPlayer;
    board[rowIndex][0] = currentPlayer;
    const winVertical = fakeApp.winVertical(board, currentPlayer, rowIndex - 3, 0);
    expect(winVertical).to.be.true;
  });

  it('should declare winner if four in a diagonal', function() {
    let rowIndex = fakeApp.NUM_ROWS - 1;
    board[rowIndex - 3][3] = currentPlayer;
    board[rowIndex - 2][2] = currentPlayer;
    board[rowIndex - 1][1] = currentPlayer;
    board[rowIndex][0] = currentPlayer;
    const winDiagonal = fakeApp.winDiagonal(board, currentPlayer, rowIndex - 3, 3);
    expect(winDiagonal).to.be.true;
  });
});
