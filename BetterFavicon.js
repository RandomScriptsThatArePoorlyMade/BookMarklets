 window.addEventListener("beforeunload", function() {
     sessionStorage.clear("phrase"); 
 });
 var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
 link.type = 'image/png';
 link.href = "";
document.getElementsByTagName('head')[0].appendChild(link);
var phrase = sessionStorage.getItem("phrase");
if (!phrase) {
    phrase = prompt("Enter something\n\n No special characters work, just letters A-Z");
    sessionStorage.setItem("phrase", phrase);
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function loopy() {
    var text = sessionStorage.getItem("phrase");
    var iconMapping = {
        'a': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/a.ico',
        'b': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/b.ico',
        'c': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/c.ico',
        'd': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/d.ico',
        'e': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/e.ico',
        'f': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/f.ico',
        'g': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/g.ico',
        'h': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/h.ico',
        'i': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/i.ico',
        'j': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/j.ico',
        'k': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/k.webp',
        'l': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/l.png',
        'm': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/m.ico',
        'n': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/n.ico',
        'o': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/o.ico',
        'p': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/p.ico',
        'q': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/q.ico',
        'r': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/r.ico',
        's': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/s.ico',
        't': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/t.ico',
        'u': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/u.ico',
        'v': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/v.ico',
        'w': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/w.ico',
        'x': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/x.ico',
        'y': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/y.ico',
        'z': 'https://raw.githubusercontent.com/RandomScriptsThatArePoorlyMade/abc/main/z.ico',
    };

    link = document.querySelector("link[rel~='icon']");
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);

  var currentIndex = 0;

    while (true) {
        var letter = text[currentIndex % text.length].toLowerCase();
        if (iconMapping.hasOwnProperty(letter)) {
            link.href = iconMapping[letter];
            await delay(1000);
        }
        currentIndex++;
    }
}

loopy();
