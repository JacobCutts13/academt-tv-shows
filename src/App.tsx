import { greet } from "./utils/greet";
import got from './data/got.json'


function App(): JSX.Element {
  return <h1>{greet("World")}</h1>;
}

export default App;
