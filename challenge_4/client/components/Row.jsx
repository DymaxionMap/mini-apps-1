import React from 'react';
import Square from './Square.jsx';

const Row = (props) => (
  <tr>{props.row.map((square, colIndex) => <Square rowIndex={props.rowIndex} colIndex={colIndex} />)}</tr>
);

export default Row;