function addCSS(mycss){
  var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = mycss;
    document.getElementsByTagName("head")[0].appendChild(link);


}