import React from 'react';
import Board from './Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.WINNING_COUNT = 4;
    this.NUM_ROWS = props.NUM_ROWS;
    this.NUM_COLS = props.NUM_COLS;
    this.RED = 'RED';
    this.BLACK = 'BLACK';

    const rows = [...Array(props.NUM_ROWS)].fill(null);
    const board = rows.map(() => [...Array(props.NUM_COLS)].fill(null));

    this.state = {
      board,
      currentPlayer: this.RED,
      winner: null,
      tied: null,
    };

    this.squareClick = this.squareClick.bind(this);
  }

  updateCurrentPlayer() {
    const nextPlayer = this.state.currentPlayer === this.RED ? this.BLACK : this.RED;
    this.setState({
      currentPlayer: nextPlayer
    });
  }

  generateUpdatedBoard(rowIndex, colIndex, player) {
    const updatedBoard = this.state.board.map(row => row.slice());
    updatedBoard[rowIndex][colIndex] = player;
    return updatedBoard;
  }

  updateBoard(rowIndex, colIndex, player) {
    const updatedBoard = this.generateUpdatedBoard(rowIndex, colIndex, player);
    this.setState({
      board: updatedBoard
    });
    return updatedBoard;
  }

  dropPiece(clickedRowIndex, clickedColIndex) {
    let droppedRowIndex = clickedRowIndex;
    for (let i = clickedRowIndex; i < this.NUM_ROWS - 1; i++) {
      if (!this.state.board[i + 1][clickedColIndex]) {
        droppedRowIndex += 1;
      }
    }

    return droppedRowIndex;
  }

  winHorizontal(updatedBoard, currentPlayer, rowIndex, colIndex) {
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
  }

  winVertical(updatedBoard, currentPlayer, rowIndex, colIndex) {  
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
  }

  winMajorDiagonal(updatedBoard, currentPlayer, rowIndex, colIndex) {
    let count = 0;
    let i = rowIndex;
    let j = colIndex;
    while (i < this.NUM_ROWS && j < this.NUM_COLS) {
      count = (updatedBoard[i][j] === currentPlayer) ? count + 1 : 0;
      i += 1;
      j += 1;
    }

    return count >= this.WINNING_COUNT;
  }

  winMinorDiagonal(updatedBoard, currentPlayer, rowIndex, colIndex) {
    let count = 0;
    let i = rowIndex;
    let j = colIndex;
    while (i < this.NUM_ROWS && j >= 0) {
      count = (updatedBoard[i][j] === currentPlayer) ? count + 1 : 0;
      i += 1;
      j -= 1;
    }

    return count >= this.WINNING_COUNT;
  }

  winDiagonal(updatedBoard, currentPlayer, rowIndex, colIndex) {
    const winMajorDiagonal = this.winMajorDiagonal(updatedBoard, currentPlayer, rowIndex, colIndex);
    const winMinorDiagonal = this.winMinorDiagonal(updatedBoard, currentPlayer, rowIndex, colIndex);
    return winMajorDiagonal || winMinorDiagonal;
  }

  declareWinner(currentPlayer) {
    this.setState({
      winner: currentPlayer
    });
  }

  isTied(updatedBoard) {
    return updatedBoard.every(row => row.every(Boolean));
  }

  declareTie() {
    this.setState({ 
      tied: true 
    });
  }

  squareClick(rowIndex, colIndex, piece) {
    if (!piece && !this.state.winner) {
      const currentPlayer = this.state.currentPlayer;
      const droppedRowIndex = this.dropPiece(rowIndex, colIndex);
      const updatedBoard = this.updateBoard(droppedRowIndex, colIndex, currentPlayer);
      const winHorizontal = this.winHorizontal(updatedBoard, currentPlayer, droppedRowIndex, colIndex);
      const winVertical = this.winVertical(updatedBoard, currentPlayer, droppedRowIndex, colIndex);
      const winDiagonal = this.winDiagonal(updatedBoard, currentPlayer, droppedRowIndex, colIndex);
      if (winHorizontal || winVertical || winDiagonal) {
        this.declareWinner(currentPlayer);
      } else if (this.isTied(updatedBoard)) {
        this.declareTie();
      }

      this.updateCurrentPlayer();
    }
  }

  render() {
    return (
      <div>
        <h1>Connect Four</h1>
        <h2>{this.state.winner ? `${this.state.winner} won!` : '' }</h2>
        <h2>{this.state.tied ? 'Tie game!' : ''}</h2>
        <Board board={this.state.board} squareClick={this.squareClick}/>
      </div>
    );
  }
}

export default App;