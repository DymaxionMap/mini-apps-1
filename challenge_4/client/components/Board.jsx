import React from 'react';
import Row from './Row.jsx';
// import Square from './Square.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  generateRows(board) {
    return board.map(row => <Row />);
  }

  render() {
    return (
      <table>
        <tbody>
          {this.generateRows(this.props.board)}
        </tbody>
      </table>
    );
  }
}

export default Board;