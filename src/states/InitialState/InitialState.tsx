import React, { useState } from "react";
import { createMaze } from "../../api";
import { PONY_NAMES } from "../../components/App/types";

export default function InitialState(props: InitialStateProps) {
  const ponyNames = Object.values(PONY_NAMES);

  const [ponyName, setPonyName] = useState<PONY_NAMES>(ponyNames[0]);

  const onButtonClick = async () => {
    const data = await createMaze(ponyName);

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
      <div>
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
      </div>
    </div>
  );
}

interface InitialStateProps {
  onStartGame: (maze_id: string, ponyName: PONY_NAMES) => void;
}
