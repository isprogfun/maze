import React, { useState } from "react";
import { createMaze } from "../../api";
import { PONY_NAMES } from "../../components/App/types";

export default function InitialState(props: InitialStateProps) {
  const ponyNames = Object.values(PONY_NAMES);

  const [ponyName, setPonyName] = useState<PONY_NAMES>(ponyNames[0]);
  const [isLoading, setIsLoading] = useState(false);

  const onButtonClick = async () => {
    setIsLoading(true);

    const data = await createMaze(ponyName);

    setIsLoading(false);

    if (data?.maze_id) {
      props.onStartGame(data?.maze_id, ponyName);
    } else {
      alert("Error creating maze, try again");
    }
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPonyName(event.target.value as PONY_NAMES);
  };

  return (
    <div className="cy-initial-state flex flex-col items-center justify-center h-full">
      <h2 className="mb-4">
        Choose a pony name and press a button to begin a game
      </h2>
      <div className="relative">
        <select
          onChange={onSelectChange}
          className="cy-initial-state-select-name mr-8"
        >
          {ponyNames.map((name) => {
            return <option key={name}>{name}</option>;
          })}
        </select>
        <button
          className="cy-initial-state-button-start"
          onClick={onButtonClick}
        >
          Start game
        </button>
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
  );
}

interface InitialStateProps {
  onStartGame: (maze_id: string, ponyName: PONY_NAMES) => void;
}
