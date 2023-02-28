import { useEffect, useRef } from "react";

let fired = false;

function App() {

  
  (function () {
    if(!fired){
      fired = true
    }else {
      return 
    }
    var isExpand = false;
  var ifrmSrc =
    "https://containershelll-1ggubuwee5576817-1309544882.ap-shanghai.app.tcloudbase.com";
  var ifrm;
  window.addEventListener("load", function () {
    ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", ifrmSrc);
    ifrm.style.width = `${window.innerWidth}px`;
    ifrm.style.height = `${window.innerHeight}px`;
    ifrm.style.zIndex = 9999999999;
    ifrm.style.position = "fixed";
    ifrm.style.bottom = "0px";
    ifrm.style.right = "0px";
    ifrm.style.border = "none";
    document.body.appendChild(ifrm);
  });

  window.addEventListener("message", function (e) {
    if (e.origin === ifrmSrc) {
      console.log("Francis, message", e, e.origin, e.data);
      var data = e.data;
      if (data.startsWith("MV_CONTAINER_EVENT_IS_EXPAND.")) {
        var isExpandStr = data.split(".")[1];
        if (isExpandStr === "false") {
          isExpand = false;
        } else if (isExpandStr === "true") {
          isExpand = true;
        }
        resizeIframe();
        this.setTimeout(() => {
          // error
          // ifrm.postMessage("MV_CONTAINER_EVENT_RESIZE_IFRAME", "*");
        }, 5000);
      }
    }
  });

  function resizeIframe() {
    var isMobile = window.innerWidth <= 768;
    if (!isExpand) {
      ifrm.style.width = `117px`;
      ifrm.style.height = `140px`;
    } else {
      if (isMobile) {
        ifrm.style.width = `${window.innerWidth}px`;
        ifrm.style.height = `${window.innerHeight}px`;
      } else {
        ifrm.style.width = `${400}px`;
        ifrm.style.height = `${600}px`;
      }
    }
  }
  window.addEventListener("resize", (event) => {
    resizeIframe();
  });
  })();

  
  return <div></div>;
}

export default App;
