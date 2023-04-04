function App() {
  (function () {
    var { Readability } = require("@mozilla/readability");
    var isExpand = false;
    var ifrmSrc = `https://containershelll-1ggubuwee5576817-1309544882.ap-shanghai.app.tcloudbase.com`;
    var ifrm;
    window.addEventListener("load", function () {
      console.log("Francis load changed!", window.location.href);
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

      var documentClone = document.cloneNode(true);
      var article = new Readability(documentClone).parse();
      console.log("Readability：", article);
    });

    window.addEventListener("message", function (e) {
      if (e.origin === ifrmSrc) {
        var data = e.data;
        if (data.startsWith("MV_CONTAINER_EVENT_IS_EXPAND.")) {
          var isExpandStr = data.split(".")[1];
          if (isExpandStr === "false") {
            isExpand = false;
          } else if (isExpandStr === "true") {
            isExpand = true;
          }
          resizeIframe();
        }
      }
    });

    function resizeIframe() {
      if (ifrm) {
        var isMobile = window.innerWidth <= 768;
        if (!isExpand) {
          ifrm.style.width = `400px`;
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
    }
    window.addEventListener("resize", (event) => {
      resizeIframe();
    });
  })();

  return <div></div>;
}

export default App;
