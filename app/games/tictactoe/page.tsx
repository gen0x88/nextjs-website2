"use client";

import CustomBackground from "@/components/background";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TicTacToe() {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  useEffect(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
  }, [board]);
  return (
    <CustomBackground>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Tic Tac Toe
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            A fun 2 player Tic-Tac-Toe game built with React Hooks.
          </p>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Player {player}'s turn.
          </p>
          <div className="mt-16 space-y-8">
            <div className="grid grid-cols-3 gap-4 justify-center mx-auto w-max">
              {board.map((cell, index) => (
                <div
                  key={index}
                  className="w-24 h-24 flex items-center justify-center bg-gray-800 text-white text-2xl font-bold cursor-pointer"
                  onClick={() => {
                    if (!board[index] && !winner) {
                      const newBoard = [...board];
                      newBoard[index] = player;
                      setBoard(newBoard);
                      setPlayer(player === "X" ? "O" : "X");
                    }
                  }}
                >
                  {cell}
                </div>
              ))}
            </div>
            {winner && (
              <div className="mt-4 text-green-400 text-xl font-bold">
                Player {winner} wins!
              </div>
            )}
          </div>
          {(winner || board.every((cell) => cell !== null)) && (
            <div className="mt-8 flex justify-center">
              <button
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={() => {
                  setBoard(Array(9).fill(null));
                  setWinner(null);
                  setPlayer("X");
                }}
              >
                Restart Game
              </button>
            </div>
          )}
        </div>
      </div>
    </CustomBackground>
  );
}
