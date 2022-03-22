import Select from "react-select";
import { useState } from "react";
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

  const [dropDown, setDropDown] = useState<string>("")

  const safeSimpsons: IEpisode[] = simpsons.filter(
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
    console.log(selected);
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
        <Select options={dropDownList} isClearable onChange={(e): e is dropDownProps => handleSetDropDown(e.value)} />
        {episodeList.length} out of {safeSimpsons.length} episodes
      </p>
      <div className="episodeList">{episodeList}</div>
    </>
  );
}

export default EpisodeList;
