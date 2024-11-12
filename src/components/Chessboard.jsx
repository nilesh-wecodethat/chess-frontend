import React, { useState } from 'react';
import { Chessboard as Chess } from 'react-chessboard';
import { getBoardState, getGameStatus, getMoveHistory, getValidMoves, makeMove, resetGame, undoLastMove } from '../chessLogic.js';

const Chessboard = () => {
    const [board, setBoard] = useState(getBoardState());
    const [moveHistory, setMoveHistory] = useState(getMoveHistory())
    const [gameStatus, setGameStatus] = useState(getGameStatus())
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [highlightedSquares, setHighlightedSquares] = useState({});

    const onMove = (sourceSquare, targetSquare, promotion) => {
        const newBoard = makeMove(sourceSquare, targetSquare, promotion);

        if(newBoard){
            setBoard(newBoard);
            setMoveHistory(getMoveHistory())
            setGameStatus(getGameStatus())
            setHighlightedSquares({});
        }
        setSelectedSquare(null);
    }

    const handleSquareClick = (square) => {
        if (selectedSquare) {
            const validMoves = getValidMoves(selectedSquare);
            if (validMoves.includes(square)) {
                onMove(selectedSquare, square)
            } else {
                selectSquare(square);
            }
        } else {
            selectSquare(square);
        }
    };


    const selectSquare = (square) => {
        setSelectedSquare(square);
        const validMoves = getValidMoves(square);
        const highlights = validMoves.reduce((acc, move) => {
            acc[move] = { backgroundColor: 'rgba(0, 255, 0, 0.4)' };
            return acc;
        }, {});
        setHighlightedSquares(highlights);
    };


    const handleReset = () => {
        setBoard(resetGame())
        setMoveHistory(getMoveHistory())
        setGameStatus(getGameStatus())
        setHighlightedSquares({});
    }

    const handleUndo = () => {
        setBoard(undoLastMove())
        setMoveHistory(getMoveHistory())
        setGameStatus(getGameStatus())
        setHighlightedSquares({});
    }


    return (
        <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
          <h2 className="text-4xl font-bold underline mb-6 text-gray-800">Chess Game</h2>
          
          <div className="flex gap-12">
            
            <div className="bg-white rounded-lg shadow-lg p-4">
                <Chess 
                position={board} 
                onPieceDrop={onMove}
                boardWidth={600} 
                animationDuration={200}
                onSquareClick={handleSquareClick}
                customSquareStyles={highlightedSquares}
                />
                <div className="mt-4 flex justify-center space-x-4">
                <button 
                    onClick={handleUndo} 
                    disabled={moveHistory.length === 0} 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300"
                >
                    Undo Move
                </button>
                <button 
                    onClick={handleReset} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Reset Game
                </button>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-start">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Game Status: <span className="font-normal">{gameStatus}</span></h3>
                <h3 className="text-lg font-medium text-gray-600 mb-2">Move History:</h3>
                <div className="bg-gray-50 w-full h-64 overflow-y-auto p-4 rounded-lg border border-gray-200">
                {moveHistory.length > 0 ? (
                    moveHistory.map((move, index) => (
                    <p key={index} className="text-gray-700">{index + 1}. {move}</p>
                    ))
                ) : (
                    <p className="text-gray-400 italic">No moves yet</p>
                )}
                </div>
            </div>
          </div>
      </div>      
    )
};

export default Chessboard;
