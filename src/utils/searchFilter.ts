import { IEpisode } from "../components/episodeList";

export default function searchFilter(
  episode: IEpisode,
  search: string
): boolean {
  return (
    episode.name.toLowerCase().includes(search.toLowerCase()) ||
    episode.summary.toLowerCase().includes(search.toLowerCase())
  );
}
