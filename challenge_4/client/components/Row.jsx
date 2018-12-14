import React from 'react';
import Square from './Square.jsx';

const Row = (props) => (
  <tr>{props.row.map((square, colIndex) => {
    return <Square rowIndex={props.rowIndex} colIndex={colIndex} squareClick={props.squareClick}/>
  })}</tr>
);

export default Row;