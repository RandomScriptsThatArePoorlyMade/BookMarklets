(function() {
    var r = 50;
    var g = 50;
    var b = 50;
    var lineSizeIncrement = 1;
    var lifted = false;
    var pressnumber = 0;
    var pressnumber2 = 0;
    var lineSize = 50;
    var infobar = document.createElement("div");
    infobar.style.position = "fixed";
    infobar.style.background = "black";
    infobar.style.opacity = '0.8';
    infobar.style.height = "375px";
    infobar.style.width = "775px";
    infobar.style.left = "0%";
    infobar.style.top = "0%";
    infobar.style.border = "5px solid black";
    infobar.style.borderBottomRightRadius = "75px";
    infobar.style.zIndex = '9999999999999';
    document.body.appendChild(infobar);
    var info = document.createElement("div");
    info.style.position = "fixed";
    info.style.right = "51%";
    info.style.left = "1%";
    info.style.top = "2%";
    info.style.fontSize = "18px";
    info.style.color = "white";
    info.style.textShadow = "1px 1px black";
    info.style.zIndex = '9999999999999';

    function updateInfo() {
        info.innerHTML = "Press the 'P' key to start painting.<br><br> If you want to clear the canvas use 'C'<br> To 'lift' or break a line use 'L' <br>To modify RGB values use 'Z'<br>To decrease line size use '['  To increase line size use ']'  To modify line size increment use '/'<br> To enter a specific size use 'S'<br><br><br> Current RBG values are R: " + r + "  G: " + g + "  B: " + b + "<br> Current line size is: " + lineSize + "px<br> Current line size increment is: " + lineSizeIncrement + "px <br><br><br><br>To hide this information press 'i'";
    }
    updateInfo();
    document.body.appendChild(info);
    var dot = document.createElement("div");

    function updateLineSize() {
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
                pressnumber++;
                if (pressnumber == 1) {
                    lifted = true;
                }
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
                lineSize -= lineSizeIncrement;
                updateLineSize();
                updateInfo();
                break;
            case 221:
                lineSize = +lineSize + +lineSizeIncrement;
                updateLineSize();
                updateInfo();
                break;
            case 73:
                pressnumber2++;
                if (pressnumber2 == 1) {
                    document.body.removeChild(info);
                    document.body.removeChild(infobar);
                }
                if (pressnumber2 == 2) {
                    document.body.appendChild(infobar);
                    document.body.appendChild(info);
                    pressnumber2 = 0;
                }
                break;
            case 191:
                lineSizeIncrement = prompt("Enter desired line size increment");
                updateLineSize();
                updateInfo();
                break;
            case 83:
                lineSize = prompt("Enter desired line size");
                updateLineSize();
                updateInfo();
                break;
        }
    });
})();
