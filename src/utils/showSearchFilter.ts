import { ShowListDataProps } from "../components/interfaces";

export default function showSearchFilter(
  show: ShowListDataProps,
  search: string
): show is ShowListDataProps {
  return (
    show.name.toLowerCase().includes(search.toLowerCase()) ||
    show.summary.toLowerCase().includes(search.toLowerCase())||
    show.genres.map((e):string => e.toLowerCase()).includes(search.toLowerCase())
  );
}
