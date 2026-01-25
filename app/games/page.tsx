"use client";

import CustomBackground from "@/components/background";
import { useEffect, useState } from "react";

const games = [
  {
    title: "Tic-Tac-Toe",
    description: "A classic Tic-Tac-Toe game built with React Hooks.",
    link: "games/tictactoe",
  },
  {
    title: "Memory Game",
    description: "A simple Memory game implemented using React Hooks.",
    link: "games/memorygame",
  },
  // Add more games as needed
];

export default function Games() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <CustomBackground>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Games using React Hooks
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Here are some games I've built using React Hooks.
            <br />
            Current Time: {time.getHours().toString().padStart(2, "0")}:
            {time.getMinutes().toString().padStart(2, "0")}:
            {time.getSeconds().toString().padStart(2, "0")} on{" "}
            {time.getDate().toString().padStart(2, "0")}/
            {(time.getMonth() + 1).toString().padStart(2, "0")}/
            {time.getFullYear()} in GMT
            {time.getTimezoneOffset() / -60 >= 0
              ? `+${time.getTimezoneOffset() / -60}`
              : time.getTimezoneOffset() / -60}
          </p>
        </div>
        <div className="mt-16 space-y-8">
          {games.map((game) => (
            <div
              key={game.title}
              className="p-6 bg-gray-800 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold text-white">
                {game.title}
              </h2>
              <p className="mt-2 text-gray-400">{game.description}</p>
              <a
                href={game.link}
                className="mt-4 inline-block text-indigo-400 hover:underline"
              >
                Play Now
              </a>
            </div>
          ))}
          <div className="text-center text-xl text-gray-400">Work in progress</div>
        </div>
      </div>
    </CustomBackground>
  );
}
