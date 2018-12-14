import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const i = this.props.rowIndex;
    const j = this.props.colIndex;
    return (
      <td onClick={event => this.props.squareClick(i, j)} className='square' >
        {this.props.square}
      </td>
    );
  }
}

export default Square;