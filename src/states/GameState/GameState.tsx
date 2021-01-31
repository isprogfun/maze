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

  const onKeyDown = (event: KeyboardEvent) => {
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

    setMazeView(data);
  };

  const makeMove = async (direction: DIRECTION) => {
    if (blockedDirections.includes(direction)) {
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
    }
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
        <button onClick={() => makeMove(DIRECTION.north)}>↑</button>
        <div>
          <button onClick={() => makeMove(DIRECTION.west)}>←</button>
          <button onClick={() => makeMove(DIRECTION.east)}>→</button>
        </div>
        <button onClick={() => makeMove(DIRECTION.south)}>↓</button>
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
