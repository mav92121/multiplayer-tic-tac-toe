"use client";
import React from "react";
import Cell from "./Cell";
import useTicTacToe from "@/hooks/useTicTacToe";

const Game = () => {
  const {
    grid,
    resetGame,
    isGameOver,
    handleCellClick,
    message,
    highlightedCells,
  } = useTicTacToe();
  return (
    <div className="text-center p-[40px]">
      <h1 className="text-3xl">Tic Tac Toe</h1>
      <div className="game w-[25%] m-auto mt-[40px]">
        <div className="flex justify-between">
          <div className="bg-slate-300 font-bold text-black px-6 py-3 rounded-bl-[50%] rounded-tr-[50%]">
            Player 1
          </div>
          <div className="bg-slate-300 font-bold text-black px-6 py-3 rounded-bl-[50%] rounded-tr-[50%]">
            Player 2
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {grid.map((arr, index) => (
            <Cell
              isHighlighted={highlightedCells.includes(index)}
              key={index}
              index={index}
              disabled={isGameOver || arr !== null}
              val={arr}
              handleCellClick={handleCellClick}
            />
          ))}
        </div>
        <div className="text-slate-300 mt-4">{message}</div>
        <button
          onClick={resetGame}
          className=" bg-slate-300 px-4 py-1 mt-3 text-black "
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Game;
