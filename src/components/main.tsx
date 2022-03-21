import { useState } from "react";
import Header from "./header";
import EpisodeList from "./episodeList";

export default function Main(): JSX.Element {
  const [search, setSearch] = useState<string>("");

  const handleSetSearch = (inputSearch: string) => {
    setSearch(inputSearch);
  };
  return (
    <>
      <Header />
      <input
        placeholder="Search"
        value={search}
        onChange={(e) => handleSetSearch(e.target.value)}
      />
      <EpisodeList navSearch={search} />
    </>
  );
}
