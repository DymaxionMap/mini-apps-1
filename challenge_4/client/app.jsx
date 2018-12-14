import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.SIZE = 4;
    this.state = {
      board: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
    };

    this.squareClick = this.squareClick.bind(this);
  }

  squareClick(rowIndex, colIndex) {
    console.log(`Square (${rowIndex}, ${colIndex}) was clicked`);
    // this.setState({
    //   board: this.state.board[rowIndex][colIndex]
    // });
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