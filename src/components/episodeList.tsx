import got from "../data/got.json";
import {seasonNum} from "../utils/seasonNum"

interface IEpisode {
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

function EpisodeList () : JSX.Element {
    const episodeList = got.map((episode: IEpisode) => <div className="episodeBox" key={episode.id}>
    <h3>{episode.name} - {seasonNum(episode.season, episode.number)}</h3>
    <br></br>
    <img src={episode.image.medium} alt={episode.name + " image"}/>
    <br></br>
    {episode.summary.replace(/<\/?p[^>]*>/g, "").replace(/<\/?br[^>]*>/g, "")}
    </div>)
    return <div className="episodeList">
        {episodeList}
    </div>
}

export default EpisodeList;