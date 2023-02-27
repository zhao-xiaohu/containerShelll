import { useEffect, useRef } from "react";

let fired = false;

function App() {

  
  (function () {
    if(!fired){
      fired = true
    }else {
      return 
    }
    var ifrm;
    window.addEventListener("load", function () {
      console.log("Francis window load");
      ifrm = document.createElement("iframe");
      ifrm.setAttribute(
        "src",
        "https://containershelll-1ggubuwee5576817-1309544882.ap-shanghai.app.tcloudbase.com/"
      );
      ifrm.style.width = `${window.innerWidth}px`;
      ifrm.style.height = `${window.innerHeight}px`;
      ifrm.style.zIndex = 9999999999;
      ifrm.style.position = "fixed";
      ifrm.style.bottom = "0px";
      ifrm.style.right = "0px";
      ifrm.style.border = "none";
      document.body.appendChild(ifrm);
  
      console.log("Francis ifrm.contentWindow", ifrm.contentWindow)
      ifrm.contentWindow.addEventListener(
        "MV_CONTAINER_EVENT_IS_EXPAND",
        function (e) {
          console.log("Francis");
          if (e.detail === true) {
            // 展开
            console.log("Francis open");
          } else if (e.detail === false) {
            // 收缩
            console.log("Francis close");
          }
        }
      );
    });
  
    window.addEventListener("resize", (event) => {
      var isMobile = window.innerWidth <= 768;
      if (isMobile) {
        ifrm.style.width = `${window.innerWidth}px`;
        ifrm.style.height = `${window.innerHeight}px`;
      } else {
        ifrm.style.width = `${400}px`;
        ifrm.style.height = `${600}px`;
      }
    });
  })();

  
  return <div></div>;
}

export default App;
