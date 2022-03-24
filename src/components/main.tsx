import { useState } from "react";
import Header from "./header";
import EpisodeList from "./episodeList";
import shows from "../data/shows.json";
import Select from "react-select";
import { showDropDownProps } from "./interfaces";
import ShowList from "./showList";

export default function Main(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [showState, setShowState] = useState<showDropDownProps>({
    value: "",
    label: "",
  });

  const showData: showDropDownProps[] = shows.map(
    (show): showDropDownProps => ({
      value: show._links.self.href,
      label: show.name,
    })
  );

  const handleSetSearch = (inputSearch: string) => {
    setSearch(inputSearch);
  };

  function handleSetShow(show: showDropDownProps | null): boolean {
    const showTmp = show ? show : { value: "", label: "" };
    setShowState(showTmp);
    return true;
  }

  function conditionalRendering(show: showDropDownProps): JSX.Element {
    return (
      <>
        {!show.value && <ShowList navSearch={search} />}
        {show.value !== "" && (
          <EpisodeList navSearch={search} url={showState.value} />
        )}
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="navbar">
        <Select
          options={showData}
          isClearable
          onChange={(e) => handleSetShow(e)}
        />

        <input
          placeholder="Search"
          value={search}
          onChange={(e) => handleSetSearch(e.target.value)}
        />
      </div>

      {conditionalRendering(showState)}
    </>
  );
}
