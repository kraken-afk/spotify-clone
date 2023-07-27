import { createContext } from "react";
import SpotifyDatasManager from "~/libs/SpotifyDatasManager";

const spotifyManager = new SpotifyDatasManager();
const SpotifyManagerContext = createContext<SpotifyDatasManager>(spotifyManager);

export default SpotifyManagerContext;
