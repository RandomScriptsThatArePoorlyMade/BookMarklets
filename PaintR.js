(function() {
    var r = 50;
    var g = 50;
    var b = 50;
    var lifted = false;
    var pressnumber = 0;
    var lineSize = 50;
    var infobar = document.createElement("div");
    infobar.style.position = "fixed";
    infobar.style.background = "black";
    infobar.style.opacity = '0.8';
    infobar.style.height = "25px";
    infobar.style.width = window.innerWidth + 'px';
    infobar.style.right = "0%";
    infobar.style.bottom = "0%";
    infobar.style.zIndex = '9999999999';
    document.body.appendChild(infobar);
    var info = document.createElement("div");
    info.style.position = "fixed";
    info.style.left = "1%";
    info.style.bottom = "1%";
    info.style.fontSize = "10px";
    info.style.color = "white";
    info.style.textShadow = "1px 1px black";
    info.style.zIndex = '9999999999';

    function updateInfo() {
        info.innerHTML = "Press the 'P' key to start painting, if you want to clear use 'C', to 'lift' or break a line use 'L', to modify RGB values use 'Z', to decrease line size use '[', to increase line size use ']', current RBG values are R: " + r + ", G: " + g + ", B: " + b + ", current line size is: " + lineSize + "px";
    }
    updateInfo();
    document.body.appendChild(info);
    var dot = document.createElement("div");
    function updateLineSize () {
                    dot.style.width = lineSize + 'px';
                    dot.style.height = lineSize + 'px';
                    }
    function updateColor() {
      dot.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
    document.addEventListener("keydown", function(event) {
        switch (event.keyCode) {
            case 80:
                if (lifted == false) {
                    updateLineSize();
                    dot.style.borderRadius = "50%";
                    dot.style.position = "absolute";
                    dot.style.zIndex = '9999';
                    document.addEventListener("mousemove", function(e) {

                        var mouseX = e.clientX;
                        var mouseY = e.clientY;
                        dot.style.left = mouseX + "px";
                        dot.style.top = mouseY + "px";

                    });
                    dot.style.backgroundColor = `rgb(${r},${g},${b})`;
                    document.body.appendChild(dot);
                }

                function clone() {
                    var stopdot = document.createElement("div");
                    stopdot.classList.add("dot");
                    stopdot.style.width = dot.style.width;
                    stopdot.style.height = dot.style.height;
                    stopdot.style.borderRadius = "50%";
                    stopdot.style.zIndex = '9998';
                    stopdot.style.position = "absolute";
                    stopdot.style.backgroundColor = dot.style.backgroundColor;
                    stopdot.style.left = dot.style.left;
                    stopdot.style.top = dot.style.top;
                    setTimeout(function() {
                        stopdot.style.left = stopdot.style.left;
                        stopdot.style.top = stopdot.style.top;
                    }, 0.1);
                    document.body.appendChild(stopdot);
                }
                document.addEventListener("mousemove", function(e) {
                    if (lifted == false) {
                        clone();
                    }
                });
                break;
        }
    });
    

    function clearAllDots() {
        var dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.remove());
    }
    document.addEventListener("keydown", function(event) {
        switch (event.keyCode) {
            case 67:
                clearAllDots();
                break;
            case 76:
                lifted = true;
                pressnumber++;
                if (pressnumber == 2) {
                    lifted = false;
                    pressnumber = 0;
                }
                break;
            case 90:
                r = prompt("Enter red value");
                g = prompt("Enter green value");
                b = prompt("Enter blue value");
                updateColor();
                updateInfo();
                break;
            case 219:
                lineSize -= 0.5;
                updateLineSize();
                updateInfo();
                break;
            case 221:
                lineSize += 0.5;
                updateLineSize();
                updateInfo();
                break;
        }
    });
})();
