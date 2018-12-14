import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

const NUM_ROWS = 6;
const NUM_COLS = 7;

ReactDOM.render(<App NUM_ROWS={NUM_ROWS} NUM_COLS={NUM_COLS} />, document.getElementById('root'));