import React from 'react';
import Row from './Row.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  generateRows(board) {
    return board.map((row, rowIndex) => {
      return <Row row={row} rowIndex={rowIndex} squareClick={this.props.squareClick} />
    });
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