import { useState } from "react";
import Header from "./header";
import EpisodeList from "./episodeList";
import showsList from "../data/shows.json"

export interface IShows {
  id: number;
  name: string;
  genres: string[];
}

export default function Main(): JSX.Element {
  const [search, setSearch] = useState<string>("");

  const handleSetSearch = (inputSearch: string) => {
    setSearch(inputSearch);
  };

  const show: IShows = showsList[0];

  return (
    <>
      <Header />
      <input
        placeholder="Search"
        value={search}
        onChange={(e) => handleSetSearch(e.target.value)}
      />
      <EpisodeList navSearch={search} showID={show.id}/>
    </>
  );
}
