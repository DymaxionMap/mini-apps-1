// MODEL

// Constants
const X = 'X';
const O = 'O';
const TIE = 'TIE';
const EMPTY = '';

const initializeGame = () => ({
  currentPlayer: X,
  gameEnded: false,
  winner: EMPTY,
  board: [[EMPTY, EMPTY, EMPTY, ], [EMPTY, EMPTY, EMPTY, ], [EMPTY, EMPTY, EMPTY, ], ],
});

const updateCurrentPlayer = (game, player) => (
  Object.assign({}, game, { currentPlayer:  player })
);

const updateBoard = () => {};
const checkForWinner = () => {};
const resetGame = () => {};

// VIEW
const renderBoard = () => {};
const renderWinnerDisplay = () => {};
const renderResetButton = () => {};

// CONTROLLER
const boardClickHandler = () => {};
const resetClickHandler = () => {};

// TESTING
const test = () => {
  const game = initializeGame();
  console.log(game);
  console.log(updateCurrentPlayer(game, O));
};

test();