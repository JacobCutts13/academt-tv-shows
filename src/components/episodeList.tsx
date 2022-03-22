import Select from "react-select";
import { useState ,useEffect } from "react";
import simpsons from "../data/simpsons.json";
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

function EpisodeList(props: EpisodeListProps): JSX.Element {

  const [dropDown, setDropDown] = useState<string>("");

  const [episodes, setEpisodes] = useState<IEpisode[]>([])
  useEffect(() => {
    fetch("https://api.tvmaze.com/shows/527/episodes")
      .then(response => response.json())
      .then((jsonBody: IEpisode[]) => setEpisodes(jsonBody));
  }, [])
  console.log(episodes[0])

  const safeSimpsons: IEpisode[] = episodes.filter(
    (obj): obj is IEpisode => obj.image != null && obj.rating.average != null
  );

  const episodeListFiltered: IEpisode[] = safeSimpsons.filter(
    (episode): episode is IEpisode => searchFilter(episode, props.navSearch)
  );

  const dropDownList: dropDownProps[] = safeSimpsons.map(
    (episode: IEpisode): dropDownProps => (
      {value: episode.name,
      label: episode.name}
    )
  );

  const handleSetDropDown = (selected: string) => {
    setDropDown(selected);
  }

  const episodeList = episodeListFiltered.map((episode: IEpisode) => (
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
        {/* <Select options={dropDownList} isClearable onChange={(e): e is dropDownProps => handleSetDropDown(e.value)} /> */}
        {episodeList.length} out of {safeSimpsons.length} episodes
      </p>
      <div className="episodeList">{episodeList}</div>
    </>
  );
}

export default EpisodeList;
