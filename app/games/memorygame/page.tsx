"use client";

import CustomBackground from "@/components/background";
import Link from "next/link";
import { use, useEffect, useState } from "react";
const BootstrapIcon =
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg";
const ReactIcon =
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg";
const ReduxIcon =
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg";
const TypeScriptIcon =
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg";
const JavaScriptIcon =
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg";
const htmlIcon =
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg";
const cssIcon =
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg";

const cardvalues2x4 = [
  BootstrapIcon,
  BootstrapIcon,
  ReactIcon,
  ReactIcon,
  ReduxIcon,
  ReduxIcon,
  TypeScriptIcon,
  TypeScriptIcon,
];

const cardvalues2x6 = [
  BootstrapIcon,
  BootstrapIcon,
  ReactIcon,
  ReactIcon,
  ReduxIcon,
  ReduxIcon,
  TypeScriptIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  JavaScriptIcon,
  htmlIcon,
  htmlIcon,
];

const funFact = [
  "Did you know? The Memory game was first created in the 1950s as a simple card game to help improve memory skills!",
  "Fun Fact: The Memory game is also known as Concentration, Pelmanism, Shinkei-suijaku (in Japan), and Pexeso (in Czech Republic and Slovakia)!",
  "Interesting Tidbit: Studies have shown that playing memory games can help enhance cognitive functions and improve memory retention!",
  "Memory Game Trivia: The game has been adapted into various digital formats, including mobile apps and online games, making it accessible to players worldwide!",
  "Did you know? The Memory game is often used in educational settings to help children develop concentration and memory skills while having fun!",
  "Fun Fact: The Memory game has been a popular pastime for generations, with countless variations and themes created over the years to keep players engaged!",
  "Interesting Tidbit: The Memory game is not only entertaining but also serves as a great exercise for the brain, promoting mental agility and sharpness!",
];

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [shuffled, setShuffled] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [startTimer, setStartTimer] = useState(false);

  // Make useEffect to shuffle cards on component mount
  useEffect(() => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    if (cards.length === 0) {
      setShuffled(false);
    } else {
      setShuffled(true);
    }
  }, [shuffled]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matchedCards, cards]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTimer) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTimer]);

  useEffect(() => {
    if (gameWon) {
      setStartTimer(false);
    }
  }, [gameWon]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      if (cards[flippedCards[0]] === cards[flippedCards[1]]) {
        // Match found
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, ...flippedCards]);
          setFlippedCards([]);
        }, 500); // short delay for user to see the match
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleReset = () => {
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setShuffled(false);
    setGameWon(false);
    setTimer(0);
    setStartTimer(false);
  };

  return (
    <CustomBackground>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Memory Game
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            A fun Memory game built with React Hooks.
          </p>

          {/* Grid selection buttons - only show before game starts */}
          {!shuffled && (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => {
                  setCards(cardvalues2x4);
                  setShuffled(true);
                }}
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                2x4 Grid
              </button>
              <button
                onClick={() => {
                  setCards(cardvalues2x6);
                  setShuffled(true);
                }}
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                2x6 Grid
              </button>
            </div>
          )}

          {/* Start Game button - show after grid is selected but before game starts */}
          {shuffled && !startTimer && !gameWon && (
            <div className="mt-4">
              {/* Back button to select grid again */}

              <button
                onClick={() => {
                  setCards([]);
                  setShuffled(false);
                }}
                className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 mr-4"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setStartTimer(true);
                }}
                className="rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Start Game
              </button>
            </div>
          )}

          {/* Timer - show only during game */}
          {startTimer && !gameWon && (
            <p className="mt-4 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
              Timer: {timer}s
            </p>
          )}

          <div className="mt-16 space-y-8">
            {/* Makes the grid display 2 rows of 4 when 2x4 and 2 rows of 6 when 2x6 */}
            <div
              className={`grid gap-4 w-full mx-auto place-items-center grid-cols-${Math.floor(cards.length / 2)}`}
            >
              {/* When 2 cards are flipped, do not allow the player to flip more cards */}
              {cards.map((card, index) => {
                const isFlipped =
                  flippedCards.includes(index) || matchedCards.includes(index);
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (
                        flippedCards.length < 2 &&
                        !flippedCards.includes(index) &&
                        !matchedCards.includes(index) &&
                        startTimer &&
                        !gameWon
                      ) {
                        setFlippedCards([...flippedCards, index]);
                      }
                    }}
                    className={`w-20 h-20 text-3xl rounded-lg shadow-md focus:outline-none ${
                      isFlipped
                        ? "bg-white text-black flex items-center justify-center"
                        : "bg-gray-800 text-gray-800"
                    }`}
                  >
                    {isFlipped ? (
                      <img src={`${card}`} alt="card" width="40" height="40" />
                    ) : (
                      "❓"
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Game won message and reset button */}
          {gameWon && (
            <div className="mt-8">
              <div className="text-green-400 text-xl font-bold mb-4">
                Congratulations! You've matched all cards in {timer} seconds!
                <br />
                {funFact[Math.floor(Math.random() * funFact.length)]}
              </div>
              <button
                onClick={handleReset}
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        <div className="mt-20">
          <div className="bg-white/10 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">
              About this Game
            </h2>
            <p className="text-gray-300">
              This Memory game is built using React Hooks, showcasing state
              management and side effects with useState and useEffect. Try to
              match all pairs of cards as quickly as possible!
            </p>
          </div>
        </div>
      </div>
    </CustomBackground>
  );
}
