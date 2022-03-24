import { useState, useEffect } from "react";
import Header from "./header";
import EpisodeList from "./episodeList";
import shows from "../data/shows.json";
import Select from "react-select";
import { showDropDownProps, IEpisode } from "./interfaces";
import ShowList from "./showList";

export default function Main(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [showState, setShowState] = useState<showDropDownProps>({
    value: "",
    label: "",
  });
  const [showAPI, setShowAPI] = useState<IEpisode[]>([]);

  const showData: showDropDownProps[] = shows.map(
    (show): showDropDownProps => ({
      value: show._links.self.href,
      label: show.name,
    })
  );
  // making new nav state to hold both search info and dropdown info, then pass this into our conditional rendering so it rerenders everytime one of them changes
  const handleSetSearch = (inputSearch: string) => {
    setSearch(inputSearch);
  };

  function handleSetShow(show: showDropDownProps | null): boolean {
    const showTmp = show ? show : { value: "", label: "" };
    setShowState(showTmp);
    setSearch("");
    return true;
  }

  function conditionalRendering(
    show: showDropDownProps,
    search: string
  ): JSX.Element {
    return (
      <>
        {!show.value && <ShowList navSearch={search} />}
        {show.value !== "" && (
          <EpisodeList
            navSearch={search}
            url={showState.value}
            showAPI={showAPI}
          />
        )}
      </>
    );
  }

  useEffect(() => {
    const string = showState.value + "/episodes";
    const url = new Request(string);
    fetch(url.url)
      .then((response) => response.json())
      .then((jsonBody: IEpisode[]) => setShowAPI(jsonBody));
  }, [showState.value]);

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

      {conditionalRendering(showState, search)}
    </>
  );
}
