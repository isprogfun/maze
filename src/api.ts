import axios from "axios";
import { PONY_NAMES } from "./components/App/types";

const api = axios.create({
  baseURL: "https://ponychallenge.trustpilot.com/pony-challenge/maze",
});

export async function createMaze(ponyName: PONY_NAMES) {
  try {
    const { data } = await api.post<CreateMazeResponseInterface>("", {
      // TOOD: Let player choose width, height and difficulty
      "maze-width": 15,
      "maze-height": 15,
      "maze-player-name": ponyName,
      difficulty: 5,
    });

    return data;
  } catch (error) {
    console.log(`Error creating maze: ${error}`);
  }
}

export async function getCurrentMazeState(mazeId: string) {
  try {
    const { data } = await api.get(`/${mazeId}`);

    return data;
  } catch (error) {
    console.log(`Error getting maze state: ${error}`);
  }
}

export async function makeMoveInCurrentMaze(
  mazeId: string,
  direction: DIRECTION
) {
  try {
    const { data } = await api.post<makeMoveInCurrentMazeResponseInterface>(
      `/${mazeId}`,
      {
        direction,
      }
    );

    return data;
  } catch (error) {
    console.log(`Error making move in the maze: ${error}`);
  }
}

export async function getCurrentMazeView(mazeId: string) {
  try {
    const { data } = await api.get(`/${mazeId}/print`);

    return data;
  } catch (error) {
    console.log(`Error getting current maze view: ${error}`);
  }
}

interface CreateMazeResponseInterface {
  maze_id: string;
}

export enum DIRECTION {
  north = "north",
  west = "west",
  east = "east",
  south = "south",
}

interface makeMoveInCurrentMazeResponseInterface {
  state: "active" | "over" | "won";
  "state-result":
    | MOVE_RESULTS.MoveAccepted
    | MOVE_RESULTS.CantWalk
    | MOVE_RESULTS.YouWon
    | MOVE_RESULTS.YouLost;
}

export enum MOVE_RESULTS {
  MoveAccepted = "Move accepted",
  CantWalk = "Can't walk in there",
  YouWon = "You won. Game ended",
  YouLost = "You lost. Killed by monster",
}

// interface CurrrentMazeStateInterface {}
