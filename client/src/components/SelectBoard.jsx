import React from 'react';

export default function SelectBoard({ boards, selectedBoard, onBoardChange }) {
  return (
    <select
      className="w-auto p-2 border rounded mb-4 bg-white text-black"
      value={selectedBoard || ""}
      onChange={(e) => onBoardChange(e.target.value)}
    >
      <option value="" disabled>
        Seleccionar tablero
      </option>
      {boards.map((board) => (
        <option key={board.id} value={board.id}>
          {board.name}
        </option>
      ))}
    </select>
  );
}
