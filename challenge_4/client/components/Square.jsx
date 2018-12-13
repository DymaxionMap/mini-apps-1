import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <td className='square' >({this.props.rowIndex}, {this.props.colIndex})</td>;
  }
}

export default Square;