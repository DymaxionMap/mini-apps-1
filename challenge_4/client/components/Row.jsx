import React from 'react';
import Square from './Square.jsx';

const Row = (props) => (
  <tr>{props.row.map(square => <Square />)}</tr>
);

export default Row;