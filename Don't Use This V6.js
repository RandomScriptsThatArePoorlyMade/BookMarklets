javascript: (function() {
    var script = document.createElement("script");
    script.src =
        "//cdn.jsdelivr.net/gh/RandomScriptsThatArePoorlyMade/BookMarklets@Scripts/Music Player V2.5.js";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
})();

var v = 3;

var z = 1;

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
var n = 500;
const intervalId = setInterval(spin, n);
