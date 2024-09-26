"use client";
import React, { useState } from "react";
import Cell from "./Cell";

const Game = () => {
  const [isP1Turn, setIsP1Turn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const initialGrid = [null, null, null, null, null, null, null, null, null];
  const [message, setMessage] = useState<string | null>("Player 1 turn");
  const [grid, setGrid] = useState<(string | null)[]>(initialGrid);
  const resetGame = () => {
    setGrid(initialGrid);
    setMessage("Player 1 turn");
    setIsP1Turn(true);
    setIsGameOver(false);
  };
  const checkWinner = (grid: (string | null)[]): string | boolean => {
    if (grid[0] !== null && grid[0] == grid[1] && grid[1] == grid[2]) {
      if (grid[0] == "o") return "p1";
      else return "p2";
    }
    if (grid[3] !== null && grid[3] == grid[4] && grid[4] == grid[5]) {
      if (grid[3] == "o") return "p1";
      else return "p2";
    }
    if (grid[6] !== null && grid[6] == grid[7] && grid[7] == grid[8]) {
      if (grid[6] == "o") return "p1";
      else return "p2";
    }
    if (grid[0] !== null && grid[0] == grid[3] && grid[3] == grid[6]) {
      if (grid[0] == "o") return "p1";
      else return "p2";
    }
    if (grid[1] !== null && grid[1] == grid[4] && grid[4] == grid[7]) {
      if (grid[1] == "o") return "p1";
      else return "p2";
    }
    if (grid[2] !== null && grid[2] == grid[5] && grid[8] == grid[2]) {
      if (grid[2] == "o") return "p1";
      else return "p2";
    }
    if (grid[0] !== null && grid[4] == grid[0] && grid[4] == grid[8]) {
      if (grid[0] == "o") return "p1";
      else return "p2";
    }
    if (grid[2] !== null && grid[2] == grid[4] && grid[2] == grid[6]) {
      if (grid[6] == "o") return "p1";
      else return "p2";
    }
    let hasNull = false;
    grid.map((ele: string | null) => {
      if (ele === null) {
        hasNull = true;
      }
    });
    if (!hasNull) return "tie";
    return false;
  };
  const handleCellClick = (index: number) => {
    const newGrid = [...grid];
    const value = isP1Turn ? "o" : "x";
    newGrid[index] = value;
    setGrid(() => newGrid);

    setIsP1Turn((prev) => !prev);
    const messageValue = checkWinner(newGrid);
    if (messageValue) {
      setIsGameOver(true);
      if (messageValue === "tie") setMessage(() => "Match Tie");
      if (messageValue === "p1") setMessage(() => "Player 1 win");
      if (messageValue === "p2") setMessage(() => "Player 2 win");
    } else {
      setMessage(() => (isP1Turn ? "Player 2 turn" : "Player 1 turn"));
    }
  };
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
