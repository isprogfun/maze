import React, { useState } from "react";
import InitialState from "../../states/InitialState/InitialState";
import GameState from "../../states/GameState/GameState";
import GameOverState from "../../states/GameOverState/GameOverState";
import GameWinState from "../../states/GameWinState/GameWinState";
import { GAME_STATE, PONY_NAMES } from "./types";

export default function App() {
  const [gameState, setGameState] = useState(GAME_STATE.Initial);
  const [ponyName, setPonyName] = useState("");
  const [mazeId, setMazeId] = useState("");

  function onSetGameState(gameState: GAME_STATE) {
    if (gameState === GAME_STATE.Initial) {
      setPonyName("");
    }
    setGameState(gameState);
  }

  function onStartGame(mazeId: string, ponyName: PONY_NAMES) {
    setMazeId(mazeId);
    setPonyName(ponyName);
    setGameState(GAME_STATE.Game);
  }

  function renderGameState() {
    switch (gameState) {
      case GAME_STATE.Initial:
        return <InitialState onStartGame={onStartGame} />;
      case GAME_STATE.Game:
        return <GameState onSetGameState={onSetGameState} mazeId={mazeId} />;
      case GAME_STATE.GameOver:
        return <GameOverState onSetGameState={onSetGameState} />;
      case GAME_STATE.GameWin:
        return <GameWinState onSetGameState={onSetGameState} />;
      default:
        return <InitialState onStartGame={onStartGame} />;
    }
  }

  return (
    <div className="min-h-screen bg-purple-200 flex flex-col">
      <div className="bg-gray-700">
        <header className="container flex justify-between items-center mx-auto px-4 py-4 h-20 text-white">
          <h1 className="text-xl">Pony escape</h1>
          {ponyName && <span>You play as a {ponyName}</span>}
          {gameState !== GAME_STATE.Initial && (
            <button
              type="button"
              onClick={() => onSetGameState(GAME_STATE.Initial)}
            >
              Start again
            </button>
          )}
        </header>
      </div>
      <div className="container mx-auto flex-grow px-4 py-4">
        {renderGameState()}
      </div>
    </div>
  );
}
