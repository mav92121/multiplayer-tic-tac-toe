"use client";
import { useState } from "react";

const useTicTacToe = () => {
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
    const winning_patterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winning_patterns.length; i++) {
      const [a, b, c] = winning_patterns[i];
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        return grid[a] === "o" ? "p1" : "p2";
      }
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
  return { handleCellClick, isP1Turn, isGameOver, resetGame, grid, message };
};
export default useTicTacToe;
