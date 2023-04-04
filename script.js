(function () {
  let t = document.getElementById("mv-client-messenger-widget");
  if (t) {
    let e = t.innerText.split(",");
    if (e) {
      const host = e[0];
      const merchantId = e[1];
      const appId = e[2];
      const mindId = e[3];
      if (host && merchantId && appId && mindId) {
        var isExpand = false;
        var ifrmSrc = `https://containershelll-1ggubuwee5576817-1309544882.ap-shanghai.app.tcloudbase.com?host=${host}&merchantId=${merchantId}&appId=${appId}&mindId=${mindId}`;
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
        });

        window.addEventListener("message", function (e) {
          console.log("iframe message0", data);
          if (e.origin === ifrmSrc) {
            var data = e.data;
            if (data.startsWith("MV_CONTAINER_EVENT_IS_EXPAND.")) {
              console.log("iframe message1", data);
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
      }
    }
  }
})();
