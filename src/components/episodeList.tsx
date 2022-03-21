import got from "../data/got.json";
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
  summary: string;
  _links: { self: { href: string } };
}
interface EpisodeListProps {
  navSearch: string;
}

function EpisodeList(props: EpisodeListProps): JSX.Element {
  const episodeListFiltered = got.filter((episode) =>
    searchFilter(episode, props.navSearch)
  );

  const episodeList = episodeListFiltered.map((episode: IEpisode) => (
    <div className="episodeBox" key={episode.id}>
      <h3>
        {episode.name} - {seasonNum(episode.season, episode.number)}
      </h3>
      <br></br>
      <img src={episode.image.medium} alt={episode.name + " image"} />
      <br></br>
      {episode.summary.replace(/<\/?p[^>]*>/g, "").replace(/<\/?br[^>]*>/g, "")}
    </div>
  ));

  return (
    <>
      <p>
        {episodeList.length} out of {got.length} episodes
      </p>
      <div className="episodeList">{episodeList}</div>
    </>
  );
}

export default EpisodeList;
