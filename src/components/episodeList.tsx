import Select from "react-select";
import { useEffect, useState } from "react";
import { seasonNum } from "../utils/seasonNum";
import searchFilter from "../utils/searchFilter";
import {
  IEpisode,
  EpisodeListProps,
  dropDownProps,
  episodeDataProps,
  memeProps,
} from "./interfaces";
import dateToEpochConverter from "../utils/dateToEpochConverter";
import Memes from "./meme";

export default function EpisodeList(props: EpisodeListProps): JSX.Element {
  const [dropDown, setDropDown] = useState<string>("");
  const [clickEpisode, setClickEpisode] = useState<episodeDataProps>({
    date: "",
    title: "",
  });
  const [episodeMemes, setEpisodeMemes] = useState<memeProps[]>([]);

  const noSpacesShowName = props.showName.replace(" ", "");
  //fetching memes
  useEffect(() => {
    if (clickEpisode.date !== "" && clickEpisode.title) {
      const startDate =
        clickEpisode.date === "0"
          ? ""
          : "&after" + dateToEpochConverter(clickEpisode.date);
      const endDate =
        clickEpisode.date === "0"
          ? ""
          : "&before" + (Number(startDate) + 1000000).toString();
      const memeURLToFetch: string =
        "https://api.pushshift.io/reddit/search/submission/?subreddit=" +
        noSpacesShowName +
        startDate +
        endDate +
        "&sort=desc&sort_type=score&aggs=author,link_id,subreddit,created_utc";
      const url = new Request(memeURLToFetch);
      console.log(url.url);
      fetch(url.url)
        .then((response) => response.json())
        .then((memejson) =>
          memejson.data.filter((e: memeProps) => e.post_hint === "image")
        )
        .then((memejson: memeProps[]) => {
          const mappedMemes: memeProps[] = memejson.map(
            (e): memeProps => ({
              title: e.title,
              url: e.url,
              post_hint: e.post_hint,
              full_link: e.full_link,
            })
          );
          setEpisodeMemes(mappedMemes);
        });
    }
  }, [clickEpisode, noSpacesShowName]);

  //filter nulls

  const safeEpisodes: IEpisode[] = props.showAPI.filter(
    (obj): obj is IEpisode => obj.image !== null && obj.summary !== null
  );
  //filter search matches
  const episodeListFiltered: IEpisode[] = safeEpisodes.filter(
    (episode): episode is IEpisode => searchFilter(episode, props.navSearch)
  );
  //filter select bar match
  const episodeListSelected: IEpisode[] = episodeListFiltered.filter(
    (episode): episode is IEpisode => episode.name.includes(dropDown)
  );

  //create elements insde dropdownlist
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

  function handleTopMemes(): void {
    setClickEpisode({ date: "0", title: "0" });
  }

  //Create episode box element
  const episodeList = episodeListSelected.map((episode: IEpisode) => (
    <button
      className="episodeBox"
      key={episode.id}
      onClick={() =>
        setClickEpisode({ date: episode.airdate, title: episode.name })
      }
    >
      <div className="episodeTitle">
        <h3>
          {episode.name} - {seasonNum(episode.season, episode.number)}
        </h3>
      </div>
      <br></br>
      <img src={episode.image.medium} alt={episode.name + " image"} />
      <br></br>
      {episode.summary
        .replace(/<\/?p[^>]*>/g, "")
        .replace(/<\/?br[^>]*>/g, "")
        .replace(/<\/?b[^>]*>/g, "")}
    </button>
  ));

  function conditionalRendering(episodeMemes: memeProps[]): JSX.Element {
    return (
      <>
        {episodeMemes.length <= 1 && (
          <>
            <div className="episodeSelect">
              <Select
                options={dropDownList}
                isClearable
                onChange={(e): e is dropDownProps =>
                  handleSetDropDownBoolean(e)
                }
              />

              <div className="episodeCount">
                {episodeList.length} out of {safeEpisodes.length} episodes
              </div>
            </div>
            <div className="topMemeButton">
              <button className="button buttonMeme" onClick={handleTopMemes}>
                Top Memes
              </button>
            </div>

            <div className="episodeList">{episodeList}</div>
          </>
        )}
        {episodeMemes.length > 1 && <Memes memeArray={episodeMemes} />}
      </>
    );
  }

  return <>{conditionalRendering(episodeMemes)}</>;
}
