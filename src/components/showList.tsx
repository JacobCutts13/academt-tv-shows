import showJSON from "../data/shows.json";
import showSearchFilter from "../utils/showSearchFilter";
import { ShowListDataProps, ShowListProps } from "./interfaces";

export default function ShowList(props: ShowListProps): JSX.Element {
  const showsPopulated: ShowListDataProps[] = showJSON.map(
    (show): ShowListDataProps => ({
      id: show.id,
      name: show.name,
      image: show.image.medium,
      summary: show.summary,
      links: show._links.self.href,
    })
  );
  //filter nulls (MAYBE OTHERS NULL)
  const safeShows: ShowListDataProps[] = showsPopulated.filter(
    (obj): obj is ShowListDataProps => obj.image != null
  );

  //filter search matches
  const showListFiltered: ShowListDataProps[] = safeShows.filter(
    (show): show is ShowListDataProps => showSearchFilter(show, props.navSearch)
  );

  //Create show box element
  const showList = showListFiltered.map((show: ShowListDataProps) => (
    <div className="showBox" key={show.id}>
      <div className="showTitle">
        <h3>{show.name}</h3>
      </div>
      <br></br>
      <img src={show.image} alt={show.name + " image"} />
      <br></br>
      {show.summary
        .replace(/<\/?p[^>]*>/g, "")
        .replace(/<\/?br[^>]*>/g, "")
        .replace(/<\/?b[^>]*>/g, "")
        .replace(/<\/?i[^>]*>/g, "")}
    </div>
  ));

  return (
    <>
      <div className="showList">{showList}</div>
    </>
  );
}
