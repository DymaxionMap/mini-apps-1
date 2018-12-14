import React from 'react';
import Board from './Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.SIZE = 4;
    this.RED = 'RED';
    this.BLACK = 'BLACK';

    this.state = {
      currentPlayer: this.RED,
      board: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
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
    const updatedBoard = [];
    for (let i = 0; i < this.SIZE; i++) {
      updatedBoard.push([]);
      for (let j = 0; j < this.SIZE; j++) {
        if (i === rowIndex && j === colIndex) {
          updatedBoard[i].push(player);
        } else {
          updatedBoard[i].push(this.state.board[i][j]);
        }
      }
    }

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
  }

  squareClick(rowIndex, colIndex, piece) {
    console.log(`Square (${rowIndex}, ${colIndex}) was clicked`);
    if (!piece) {
      console.log('Dropped Row Index', this.dropPiece(rowIndex, colIndex));
      const droppedRowIndex = this.dropPiece(rowIndex, colIndex);
      this.updateBoard(droppedRowIndex, colIndex, this.state.currentPlayer);
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