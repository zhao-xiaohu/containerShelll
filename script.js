(function () {
  var ifrm;
  window.addEventListener("load", function () {
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
  });

  window.addEventListener("message", function (e) {
    console.log("Francis, messsage", e, e.origin);
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
