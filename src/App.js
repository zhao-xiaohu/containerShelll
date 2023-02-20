import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "40%",
          height: "60%",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src="https://containershelll-1ggubuwee5576817-1309544882.ap-shanghai.app.tcloudbase.com/"
          defer
        ></iframe>
      </div>
    </div>
  );
}

export default App;
