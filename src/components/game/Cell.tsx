import useTicTacToe from "@/hooks/useTicTacToe";
import React from "react";
import { Socket } from "socket.io-client";
interface CellProps {
  val: string | null;
  index: number;
  disabled: boolean;
  handleCellClick: (index: number) => void;
  isHighlighted: boolean;
  socket: typeof Socket | null;
}

const Cell = ({
  isHighlighted,
  disabled,
  val,
  handleCellClick,
  index,
  socket,
}: CellProps) => {
  const { grid, isP1Turn } = useTicTacToe();
  return (
    <>
      <div
        onClick={() => {
          if (!disabled) {
            handleCellClick(index);
            const newGrid = grid.map((cell, i) =>
              i === index ? (isP1Turn ? "o" : "x") : cell
            );
            socket?.emit("moveFromClient", newGrid);
          }
        }}
        className={`bg-slate-300 cursor-pointer w-[100px] h-[100px] text-black flex justify-center  items-center rounded-md font-bold text-3xl m-3 ${
          isHighlighted ? "bg-green-500" : ""
        }`}
      >
        <div className="relative">
          {val === null ? "" : val === "x" ? "X" : "O"}
        </div>
      </div>
    </>
  );
};

export default Cell;
