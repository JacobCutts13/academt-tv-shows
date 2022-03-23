import Select from "react-select";
import { useState, useEffect } from "react";
import { seasonNum } from "../utils/seasonNum";
import searchFilter from "../utils/searchFilter";

export interface IEpisode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  image: {
    medium: string;
    original: string;
  };
  rating: {
    average: number;
  };
  summary: string;
  _links: { self: { href: string } };
}
interface EpisodeListProps {
  navSearch: string;
}
interface dropDownProps {
  value: string;
  label: string;
}

export default function EpisodeList(props: EpisodeListProps): JSX.Element {
  const [dropDown, setDropDown] = useState<string>("");

  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  //Fetch data from API
  useEffect(() => {
    fetch("https://api.tvmaze.com/shows/527/episodes")
      .then((response) => response.json())
      .then((jsonBody: IEpisode[]) => setEpisodes(jsonBody));
  }, []);

  //filter nulls
  const safeEpisodes: IEpisode[] = episodes.filter(
    (obj): obj is IEpisode => obj.image != null && obj.rating.average != null
  );
  //filter search matches
  const episodeListFiltered: IEpisode[] = safeEpisodes.filter(
    (episode): episode is IEpisode => searchFilter(episode, props.navSearch)
  );
  //filter select bar match
  const episodeListSelected: IEpisode[] = episodeListFiltered.filter(
    (episode): episode is IEpisode => episode.name.includes(dropDown)
  );

  const dropDownList: dropDownProps[] = safeEpisodes.map(
    (episode: IEpisode): dropDownProps => ({
      value: episode.name,
      label: episode.name,
    })
  );

  function handleSetDropDownBoolean(selected: dropDownProps | null): boolean {
    const dropDownTmp = selected ? selected.value : "";
    setDropDown(dropDownTmp);
    return true;
  }

  //Create episode box element
  const episodeList = episodeListSelected.map((episode: IEpisode) => (
    <div className="episodeBox" key={episode.id}>
      <h3>
        {episode.name} - {seasonNum(episode.season, episode.number)}
      </h3>
      <br></br>
      <img src={episode.image.medium} alt={episode.name + " image"} />
      <br></br>
      {episode.summary
        .replace(/<\/?p[^>]*>/g, "")
        .replace(/<\/?br[^>]*>/g, "")
        .replace(/<\/?b[^>]*>/g, "")}
    </div>
  ));

  return (
    <>
      <p>
        <Select
          options={dropDownList}
          isClearable
          onChange={(e): e is dropDownProps => handleSetDropDownBoolean(e)}
        />
        {episodeList.length} out of {safeEpisodes.length} episodes
      </p>
      <div className="episodeList">{episodeList}</div>
    </>
  );
}
