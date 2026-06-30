javascript: 

var v = 0;

var z = 0;

var n = 1000;

(function() {
    var script = document.createElement("script");
    script.src =
        "//cdn.jsdelivr.net/gh/RandomScriptsThatArePoorlyMade/BookMarklets@Scripts/Music Player V2.6.4.js";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
})();

function spin() {

    ['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function(prefix) {
        Array.prototype.slice.call(
            document.querySelectorAll('div,p,span,img,a,body')
        ).map(function(el) {
            el.style[prefix + 'transform'] =
                'rotate(' +
                (Math.floor(Math.random() * v) - z) +
                'deg)';
        });
    });
};

const intervalId = setInterval(spin, n);
