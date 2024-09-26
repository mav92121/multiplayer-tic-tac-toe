import React from "react";
interface CellProps {
  val: string | null;
  index: number;
  disabled: boolean;
  handleCellClick: (index: number) => void;
  isHighlighted: boolean;
}

const Cell = ({
  isHighlighted,
  disabled,
  val,
  handleCellClick,
  index,
}: CellProps) => {
  return (
    <>
      <div
        onClick={() => {
          if (!disabled) handleCellClick(index);
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
