import { useState, useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";
import EpisodeList from "./episodeList";
import shows from "../data/shows.json";
import Select from "react-select";
import {
  showDropDownProps,
  IEpisode,
  ShowListDataProps,
  ShowListProps,
} from "./interfaces";
import showJSON from "../data/shows.json";
import showSearchFilter from "../utils/showSearchFilter";

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
  const handleSetSearch = (inputSearch: string) => {
    setSearch(inputSearch);
  };

  //Filtering show data and creating show buttons
  function ShowList(props: ShowListProps): JSX.Element {
    const showsTrimmed: ShowListDataProps[] = showJSON.map(
      (show): ShowListDataProps => ({
        id: show.id,
        name: show.name,
        image: show.image.medium,
        summary: show.summary,
        links: show._links.self.href,
        genres: show.genres,
      })
    );
    //filter nulls (MAYBE OTHERS NULL)
    const safeShows: ShowListDataProps[] = showsTrimmed.filter(
      (obj): obj is ShowListDataProps => obj.image != null
    );

    //filter search matches
    const showListFiltered: ShowListDataProps[] = safeShows.filter(
      (show): show is ShowListDataProps =>
        showSearchFilter(show, props.navSearch)
    );

    //Create show box element
    const showList = showListFiltered.map((show: ShowListDataProps) => (
      <button
        className="showBox"
        key={show.id}
        onClick={() => handleSetShow({ value: show.links, label: show.name })}
      >
        <div className="showTitle">
          <h3>{show.name}</h3>
        </div>
        <br></br>
        <img src={show.image} alt={show.name + " image"} />
        <hr></hr>
        {show.genres.map((e): string => "|" + e + "|")}
        <br></br>
        <br></br>
        {show.summary
          .replace(/<\/?p[^>]*>/g, "")
          .replace(/<\/?br[^>]*>/g, "")
          .replace(/<\/?b[^>]*>/g, "")
          .replace(/<\/?i[^>]*>/g, "")}
      </button>
    ));

    return (
      <>
        <div className="showList">{showList}</div>
      </>
    );
  }

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
        {!show.value && (
          <>
            <ScrollToTop smooth />
            <ShowList navSearch={search} />
          </>
        )}
        {show.value !== "" && (
          <>
            <ScrollToTop smooth />
            <EpisodeList
              navSearch={search}
              url={showState.value}
              showAPI={showAPI}
              showName={showState.label}
            />
          </>
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
      <div className="navbar">
        <button onClick={() => handleSetShow({ value: "", label: "" })}>
          Home
        </button>
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
