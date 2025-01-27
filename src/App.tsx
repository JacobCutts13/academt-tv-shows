import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import "./style.css";

function App(): JSX.Element {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
