"use client";
import React, { useState } from "react";
import Cell from "./Cell";
import useTicTacToe from "@/hooks/useTicTacToe";
import io, { Socket } from "socket.io-client";
import NameModal from "./NameModal";

const Game = () => {
  const {
    grid,
    resetGame,
    isGameOver,
    handleCellClick,
    message,
    highlightedCells,
    isP1Turn,
    setIsP1Turn,
    setGrid,
  } = useTicTacToe();

  const [userName, setUserName] = useState<null | string>(null);
  const [opponentName, setOpponentName] = useState<string>("");
  const [socket, setSocket] = useState<typeof Socket | null>(null);
  const [currUser, setCurrUser] = useState<string>("");

  socket?.on("connect", () => {
    console.log("id ", socket.id);
  });

  socket?.on("opponent_found", (opponent: any) => {
    setOpponentName(opponent.name);
    setCurrUser(() => {
      if (opponent.isP1) return "p2";
      return "p1";
    });
    console.log("opponent is ", opponent);
  });

  socket?.on("moveFromServer", (data: any) => {
    setGrid(data.grid);
    setIsP1Turn(data.isP1Turn);
  });

  const handlePlayOnline = (name: string) => {
    console.log("name is ", name);
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    setUserName(name);
    newSocket.emit("join_room", name);
  };

  if (!userName) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <NameModal handlePlayOnline={handlePlayOnline} />
      </div>
    );
  }
  if (!opponentName) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        Waiting for Opponenet ...
      </div>
    );
  }
  return (
    <div className="text-center p-[40px] bg-black h-screen">
      <h1 className="text-3xl">Tic Tac Toe</h1>
      <div className="game w-[25%] m-auto mt-[40px]">
        <div className="flex justify-between">
          <div className="bg-slate-300 font-bold text-black px-6 py-3 rounded-bl-[50%] rounded-tr-[50%]">
            {userName}
          </div>
          <div className="bg-slate-300 font-bold text-black px-6 py-3 rounded-bl-[50%] rounded-tr-[50%]">
            {opponentName}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {grid.map((arr, index) => (
            <Cell
              socket={socket}
              isHighlighted={highlightedCells.includes(index)}
              key={index}
              index={index}
              disabled={
                isGameOver ||
                arr !== null ||
                (isP1Turn && currUser === "p2") ||
                (!isP1Turn && currUser === "p1")
              }
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
