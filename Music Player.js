//Does what it says, put in a url of an mp3 and it will play said mp3.
//I have a repo of mp3s and the songs can be played with this url,
//https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/mp3s/main/Name of song.mp3

javascript: var bgmusic = document.createElement("audio");
bgmusic.id = "music";
bgmusic.loop = "loop";
bgmusic.src = prompt("Song,\n example: site.com/song.mp3.\n If the song isn't looped it will just replay,\nthe default song is nyan cat, but it can be changed to whatever you want.\n\n The preset url contains other songs as well, just change the name before the .mp3", "https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/mp3s/main/Nyan.mp3");
bgmusic.volume = prompt("Volume for the music,\n .009 is default. The max is 1", ".009");
bgmusic.play();
