import { useEffect, useState } from "react";
import {
  DIRECTION,
  getCurrentMazeView,
  makeMoveInCurrentMaze,
  MOVE_RESULTS,
} from "../../api";
import { GAME_STATE } from "../../components/App/types";

export default function GameState(props: GameStateProps) {
  const [mazeView, setMazeView] = useState();
  const [blockedDirections, setBlockedDirections] = useState<DIRECTION[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onKeyDown = (event: KeyboardEvent) => {
    if (isLoading) {
      return;
    }

    switch (event.code) {
      case "ArrowUp":
        makeMove(DIRECTION.north);
        break;
      case "ArrowLeft":
        makeMove(DIRECTION.west);
        break;
      case "ArrowRight":
        makeMove(DIRECTION.east);
        break;
      case "ArrowDown":
        makeMove(DIRECTION.south);
        break;
    }
  };

  const updateMazeView = async () => {
    const data = await getCurrentMazeView(props.mazeId);

    if (data) {
      setMazeView(data);
    } else {
      alert("Error getting maze view, start again");
    }
  };

  const makeMove = async (direction: DIRECTION) => {
    setIsLoading(true);

    if (blockedDirections.includes(direction)) {
      setIsLoading(false);

      return;
    }

    const data = await makeMoveInCurrentMaze(props.mazeId, direction);

    if (data?.["state-result"] === MOVE_RESULTS.MoveAccepted) {
      setBlockedDirections([]);
      updateMazeView();
    } else if (data?.["state-result"] === MOVE_RESULTS.YouWon) {
      props.onSetGameState(GAME_STATE.GameWin);
    } else if (data?.["state-result"] === MOVE_RESULTS.YouLost) {
      props.onSetGameState(GAME_STATE.GameOver);
    } else if (data?.["state-result"] === MOVE_RESULTS.CantWalk) {
      setBlockedDirections(blockedDirections.concat([direction]));
    } else {
      alert("Error making a move, try again");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return function cleanup() {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  useEffect(() => {
    updateMazeView();
  }, []);

  return (
    <div className="cy-game-state">
      <div className="cy-game-state-actions flex flex-col items-center">
        <span>Use buttons or arrow keys to move your pony</span>
        <div className="relative flex flex-col items-center">
          <button onClick={() => makeMove(DIRECTION.north)}>↑</button>
          <div>
            <button onClick={() => makeMove(DIRECTION.west)}>←</button>
            <button onClick={() => makeMove(DIRECTION.east)}>→</button>
          </div>
          <button onClick={() => makeMove(DIRECTION.south)}>↓</button>
          {isLoading && (
            <div className="absolute w-full h-full flex justify-center items-center top-0 bg-purple-600 bg-opacity-25">
              <div
                className="w-8 h-8 border-8 border-purple-600 rounded-full loader animate-spin"
                style={{ borderRightColor: "transparent" }}
              ></div>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-auto">
        <pre className="text-xs lg:text-base">{mazeView}</pre>
      </div>
    </div>
  );
}

interface GameStateProps {
  onSetGameState: (gameState: GAME_STATE) => void;
  mazeId: string;
}
