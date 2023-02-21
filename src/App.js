import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef } from "react";

function App() {
  const ifmLoaded = useRef(false);

  useEffect(() => {
    if (!ifmLoaded.current) {
      ifmLoaded.current = true;
      console.log("useEffect", window.innerWidth, window.innerHeight);
      // <iframe
      //   width="100%"
      //   height="100%"
      //   src="https://containershelll-1ggubuwee5576817-1309544882.ap-shanghai.app.tcloudbase.com/"
      //   defer
      // ></iframe>;

      // script start
      var ifrm = document.createElement("iframe");
      ifrm.setAttribute(
        "src",
        "https://containershelll-1ggubuwee5576817-1309544882.ap-shanghai.app.tcloudbase.com/"
      );
      ifrm.style.width = `${window.innerWidth}px`;
      ifrm.style.height = `${window.innerHeight}px`;
      ifrm.style.zIndex = 99999;
      ifrm.style.position = "fixed";
      document.body.appendChild(ifrm);
    }
  }, []);
  return <div></div>;
}

export default App;
