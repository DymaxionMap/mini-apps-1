import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx';

const App = () => (
  <div>
    <h1>Connect Four</h1>
    <Board />
  </div>
);

ReactDOM.render(<App/>, document.getElementById('root'));