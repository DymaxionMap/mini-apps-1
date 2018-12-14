import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx';

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
    const nextPlayer = this.currentPlayer === this.RED ? this.BLACK : this.RED;
    this.setState({
      currentPlayer: nextPlayer
    });
  }

  makeUpdatedBoard(rowIndex, colIndex, player) {
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

  updateBoard(rowIndex, colIndex, player) {
    const updatedBoard = this.makeUpdatedBoard(rowIndex, colIndex, player);
    this.setState({
      board: updatedBoard
    });
  }

  squareClick(rowIndex, colIndex) {
    console.log(`Square (${rowIndex}, ${colIndex}) was clicked`);
    const updatedBoard = this.makeUpdatedBoard(rowIndex, colIndex, this.RED);
    this.setState({
      board: updatedBoard
    });
    // this.updateBoard(rowIndex, colIndex, this.currentPlayer);
    // this.updateCurrentPlayer();
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

ReactDOM.render(<App/>, document.getElementById('root'));