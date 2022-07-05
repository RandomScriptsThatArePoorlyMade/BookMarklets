//Creates fake errors accompanied by with the classic windows error sound

javascript: 
   var bgmusic = document.createElement("audio");
    bgmusic.id = "music";
    bgmusic.loop = "loop";
    bgmusic.src = "https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/mp3s/main/errorC.mp3";
    bgmusic.volume = 0.3;
     var bgmusic2 = document.createElement("audio");
      bgmusic2.id = "music2";
      bgmusic2.loop = "loop";
      bgmusic2.src = "https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/mp3s/main/error.mp3";
      bgmusic2.volume = 0.3;
      var bgmusic3 = document.createElement("audio");
       bgmusic3.id = "music3";
       bgmusic3.loop = "loop";
       bgmusic3.src = "https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/mp3s/main/errorC3.mp3";
       bgmusic3.volume = 0.3;
   setInterval(function alt() {
        bgmusic.play();
    }, 1);
    setInterval(function alt2() {
        bgmusic3.play();
        bgmusic2.play();
    }, 1);
    (function error() {
        setInterval(function() {
            bgmusic3.play();
            bgmusic2.play();
            bgmusic3.play();
            bgmusic.play();
            bgmusic2.play();
            bgmusic3.play();
            document.body.innerHTML += `<img src="https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/Favicons/main/error.png" style="position:fixed;top:` + Math.floor(Math.random() * 1500) + `px;left:` + Math.floor(Math.random() * 1500) + `px;width:200px;height:100px;">`;
            bgmusic.play();
            document.body.innerHTML += `<img src="https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/Favicons/main/error2.png" style="position:fixed;top:` + Math.floor(Math.random() * 1500) + `px;left:` + Math.floor(Math.random() * 1500) + `px;width:150px;height:100px;">`;
            bgmusic3.play();
        }, 1);
    }())
