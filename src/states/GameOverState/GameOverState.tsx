import { GAME_STATE } from "../../components/App/types";

export default function GameOverState(props: GameOverStateProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-4">
        You've been eaten by Domokun. Do you want to try again?
      </h2>
      <button onClick={() => props.onSetGameState(GAME_STATE.Initial)}>
        Start again
      </button>
    </div>
  );
}

interface GameOverStateProps {
  onSetGameState: (gameState: GAME_STATE) => void;
}
