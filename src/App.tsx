import Main from "./components/main";
import Footer from "./components/footer";
import "./style.css";
//import Meme from "./components/meme"

function App(): JSX.Element {
  return (
    <div className="app">
      <Main />
      <Footer />
     {/* <Meme /> */}
    </div>
  );
}

export default App;
