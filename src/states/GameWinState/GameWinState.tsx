import { GAME_STATE } from "../../components/App/types";

export default function GameWinState(props: GameWinStateProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-4">You have won. Do you want to play another game?</h2>
      <button onClick={() => props.onSetGameState(GAME_STATE.Initial)}>
        Start again
      </button>
    </div>
  );
}

interface GameWinStateProps {
  onSetGameState: (gameState: GAME_STATE) => void;
}
