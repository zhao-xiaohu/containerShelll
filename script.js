(function () {
  var ifrm;
  window.addEventListener("load", function () {
    console.log("window load");
    ifrm = document.createElement("iframe");
    ifrm.setAttribute(
      "src",
      "https://containershelll-1ggubuwee5576817-1309544882.ap-shanghai.app.tcloudbase.com/"
    );
    ifrm.style.width = `${window.innerWidth}px`;
    ifrm.style.height = `${window.innerHeight}px`;
    ifrm.style.zIndex = 99999;
    ifrm.style.position = "fixed";
    ifrm.style.bottom = "0px";
    ifrm.style.left = "0px";
    document.body.appendChild(ifrm);
  });

  window.addEventListener("resize", (event) => {
    ifrm.style.width = `${window.innerWidth}px`;
    ifrm.style.height = `${window.innerHeight}px`;
  });
})();
