import { memeProps, memesProps } from "./interfaces";

export default function Memes(props: memesProps): JSX.Element {
  const length = props.memeArray.length;
  props.memeArray.splice(10, length - 1); //show top 10 memes
  return (
    <div className="memes">
      <h1>Top Reddit Memes</h1>

      {props.memeArray.map((meme: memeProps) => (
        <div className="memeBox" key={meme.title}>
          <h2>{meme.title}</h2>
          <a href={meme.full_link}>Original Post</a>
          <br></br>
          <br></br>
          <img src={meme.url} alt={"meme image title " + meme.url} />
        </div>
      ))}
    </div>
  );
}
