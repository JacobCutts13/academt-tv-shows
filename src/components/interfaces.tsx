export interface ShowListDataProps {
  id: number;
  //url: string;
  name: string;
  //type: string;
  //language: string;
  genres: string[];
  //status: string;
  //runtime: number;
  // averageRuntime: number;
  // premiered: string;
  // ended: string;
  // officialSite: string;
  // schedule: {
  //     time: string;
  //     days: string[];
  // }
  // rating: {
  //     average:number;
  // }
  // weight: number;
  // network: {
  //     id: number;
  //     name: string;
  //     country: {
  //         name: string;
  //         code: string;
  //         timezone: string;
  //     }
  // }
  // webChannel: {
  //     id: number;
  //     name: string;
  //     country: {
  //         name: string;
  //         code: string;
  //         timezone: string;
  //     }
  // }
  // dvdCountry: string;
  // externals:{
  //     tvrage: number;
  //     thetvdb: number;
  //     imdb: string;
  // }
  image: string;
  summary: string;
  //updated: number;
  links: string;
}

export interface ShowListProps {
  navSearch: string;
}

export interface showDropDownProps {
  value: string;
  label: string;
}

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

export interface EpisodeListProps {
  navSearch: string;
  url: string;
  showAPI: IEpisode[];
  showName: string;
}

export interface dropDownProps {
  value: string;
  label: string;
}

export interface memeProps {
  title: string;
  url: string;
  full_link: string;
  post_hint: string;
}

export interface memesProps {
  memeArray: memeProps[];
}

export interface episodeDataProps {
  date: string;
  title: string;
}
