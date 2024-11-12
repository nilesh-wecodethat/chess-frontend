import { Chess } from 'chess.js';

const game = new Chess();

export const getGameStatus = () => {
  if (game.isCheckmate()) {
    return "Checkmate!";
  } else if (game.isGameOver()) {
    return "Game Over!";
  } else if (game.isCheck()) {
    return "Check!";
  }
  return "In Progress";
};


export const getBoardState = () => game.fen();


export const getMoveHistory = () => {
  return game.history({ verbose: true }).map((move) => move.san);
};


export const undoLastMove = () => {
   game.undo();
   return getBoardState();
}

export const resetGame = () => {
  game.reset()
  return getBoardState()
}

export const makeMove = (sourceSquare, targetSquare) => {
    const move = game.move({
       from : sourceSquare,
       to : targetSquare,
    })
    return move ? getBoardState() : null;
}


export const getValidMoves = (square) => {
  return game.moves({ square, verbose: true }).map((move) => move.to);
};
