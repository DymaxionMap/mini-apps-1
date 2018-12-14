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
    this.setState({
      board: this.generateUpdatedBoard(rowIndex, colIndex, player)
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