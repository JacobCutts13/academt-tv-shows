import { IEpisode } from "../components/episodeList";

export default function searchFilter(
  episode: IEpisode,
  search: string
): episode is IEpisode {
  return (
    episode.name.toLowerCase().includes(search.toLowerCase()) ||
    episode.summary.toLowerCase().includes(search.toLowerCase())
  );
}