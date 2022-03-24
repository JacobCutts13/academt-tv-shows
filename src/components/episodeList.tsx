import Select from "react-select";
import { useState } from "react";
import { seasonNum } from "../utils/seasonNum";
import searchFilter from "../utils/searchFilter";
import { IEpisode, EpisodeListProps, dropDownProps } from "./interfaces";

export default function EpisodeList(props: EpisodeListProps): JSX.Element {
  const [dropDown, setDropDown] = useState<string>("");

  //filter nulls

  const safeEpisodes: IEpisode[] = props.showAPI.filter(
    (obj): obj is IEpisode => obj.image != null
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
    <div className="episodeBox" key={episode.id}>
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
    </div>
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
