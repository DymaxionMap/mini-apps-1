import React from 'react';
import Board from './Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.SIZE = props.SIZE;
    this.RED = 'RED';
    this.BLACK = 'BLACK';

    const rows = [...Array(props.SIZE)].fill(null);
    const board = rows.map(() => [...Array(props.SIZE)].fill(null));

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

  dropPiece(clickedRowIndex, clickedColIndex) {
    let droppedRowIndex = clickedRowIndex;
    for (let i = clickedRowIndex; i < this.SIZE - 1; i++) {
      if (!this.state.board[i + 1][clickedColIndex]) {
        droppedRowIndex += 1;
      }
    }

    return droppedRowIndex;
  }

  updateBoard(rowIndex, colIndex, player) {
    const updatedBoard = this.generateUpdatedBoard(rowIndex, colIndex, player);
    this.setState({
      board: updatedBoard
    });
    return updatedBoard;
  }

  isRowComplete(updatedBoard, currentPlayer, rowIndex, colIndex) {
    return updatedBoard[rowIndex].every(piece => piece === currentPlayer);
  }

  isColComplete(updatedBoard, currentPlayer, rowIndex, colIndex) {  
    if (rowIndex !== 0) {
      return false;
    }

    return updatedBoard.reduce((complete, row) => complete && (row[colIndex] === currentPlayer), true);
  }

  squareClick(rowIndex, colIndex, piece) {
    if (!piece) {
      const currentPlayer = this.state.currentPlayer;
      const droppedRowIndex = this.dropPiece(rowIndex, colIndex);
      const updatedBoard = this.updateBoard(droppedRowIndex, colIndex, currentPlayer);
      const rowComplete = this.isRowComplete(updatedBoard, currentPlayer, droppedRowIndex, colIndex);
      const colComplete = this.isColComplete(updatedBoard, currentPlayer, droppedRowIndex, colIndex);
      this.updateCurrentPlayer();
    }
  }

  render() {
    return (
      <div>
        <h1>Connect Four</h1>
        <Board board={this.state.board} SIZE={this.SIZE} squareClick={this.squareClick}/>
      </div>
    );
  }
}

export default App;