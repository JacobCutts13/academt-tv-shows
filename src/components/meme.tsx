import { memeProps, memesProps } from "./interfaces";

export default function Memes(props: memesProps): JSX.Element {
  return (
    <div className="memes">
      <h1>Top meme for this episode</h1>
      {props.memeArray.map((meme: memeProps) => (
        <div className="memeBox" key={meme.title}>
          <h2>{meme.title}</h2>
          <img src={meme.url} alt={"meme image title " + meme.url} />
        </div>
      ))}
    </div>
  );
}
