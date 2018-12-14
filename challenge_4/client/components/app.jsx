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
    const count = updatedBoard[rowIndex].reduce((count, piece) => {
      return (piece === currentPlayer) ? count + 1 : count;
    }, 0);
    return count >= this.WINNING_COUNT;
  }

  winVertical(updatedBoard, currentPlayer, rowIndex, colIndex) {  
    const count = updatedBoard.reduce((count, row) => {
      return (row[colIndex] === currentPlayer) ? count + 1 : count;
    }, 0);
    return count >= this.WINNING_COUNT;
  }

  squareClick(rowIndex, colIndex, piece) {
    if (!piece) {
      const currentPlayer = this.state.currentPlayer;
      const droppedRowIndex = this.dropPiece(rowIndex, colIndex);
      const updatedBoard = this.updateBoard(droppedRowIndex, colIndex, currentPlayer);
      const winHorizontal = this.winHorizontal(updatedBoard, currentPlayer, droppedRowIndex, colIndex);
      const winVertical = this.winVertical(updatedBoard, currentPlayer, droppedRowIndex, colIndex);
      console.log(winVertical);
      this.updateCurrentPlayer();
    }
  }

  render() {
    return (
      <div>
        <h1>Connect Four</h1>
        <Board board={this.state.board} squareClick={this.squareClick}/>
      </div>
    );
  }
}

export default App;