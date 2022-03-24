import Select from "react-select";
import { useEffect, useState } from "react";
import { seasonNum } from "../utils/seasonNum";
import searchFilter from "../utils/searchFilter";
import { IEpisode, EpisodeListProps, dropDownProps, episodeDataProps } from "./interfaces";
import dateToEpochConverter from "../utils/dateToEpochConverter";

export default function EpisodeList(props: EpisodeListProps): JSX.Element {
  const [dropDown, setDropDown] = useState<string>("");
  const [episodeData, setEpisodeData] = useState<episodeDataProps>({date: "", title: ""})
  //fetching memes
  const noSpacesShowName = props.showName.replace(" ", "")

  useEffect( () => {
  const startDate = dateToEpochConverter(episodeData.date)
  const endDate = (Number(startDate) + 604800).toString()
  const memeURLToFetch: string  = "https://api.pushshift.io/reddit/search/submission/?subreddit=" + noSpacesShowName +"&after=" + startDate + "&before=" + endDate + "&sort=desc&sort_type=score&aggs=author,link_id,subreddit,created_utc"
  console.log(memeURLToFetch)
  }, [episodeData])

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

  //Create episode box element
  const episodeList = episodeListSelected.map((episode: IEpisode) => (
    <button className="episodeBox" key={episode.id} onClick={ () => setEpisodeData({date: episode.airdate, title: episode.name})}>
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

  return (
    <>
      <div className="episodeSelect">
        <Select
          options={dropDownList}
          isClearable
          onChange={(e): e is dropDownProps => handleSetDropDownBoolean(e)}
        />

        <div className="episodeCount">
          {episodeList.length} out of {safeEpisodes.length} episodes
        </div>
      </div>

      <div className="episodeList">{episodeList}</div>
    </>
  );
}
