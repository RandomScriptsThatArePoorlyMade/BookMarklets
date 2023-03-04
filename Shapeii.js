(function noScroll() {
    document.body.style.overflow = 'hidden';
}());
var startScreen = document.createElement("div");
startScreen.style.position = "fixed";
startScreen.style.top = "50%";
startScreen.style.left = "50%";
startScreen.style.transform = "translate(-50%, -50%)";
startScreen.style.textAlign = "center";
var title = document.createElement("h1");
title.style.color = "white";
title.style.textShadow = "3px 3px black";
title.style.fontSize = "100px";
title.style.marginBottom = "10px";
title.innerHTML = "Shapes";
startScreen.appendChild(title);
var subtext = document.createElement("p");
subtext.style.color = "white";
subtext.style.textShadow = "3px 3px black";
subtext.style.fontSize = "30px";
title.style.marginTop = "0px";
title.style.marginBottom = "20px";
subtext.innerHTML = "Circles rule, triangles drool!";
startScreen.appendChild(subtext);
var playButton = document.createElement("button");
playButton.style.backgroundColor = "white";
playButton.style.color = "black";
playButton.style.fontSize = "50px";
playButton.innerHTML = "Play";
playButton.addEventListener("click", function() {
document.body.removeChild(startScreen);
(function game() {
    var player = document.createElement("div");
    player.style.width = "50px";
    player.style.height = "50px";
    player.style.background = "#1E90FF";
    player.style.border = "3px solid black";
    player.style.position = "fixed";
    player.style.top = "50%";
    player.style.left = "50%";
    player.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(player);
    var playerX = window.innerWidth / 2 - player.offsetWidth / 2;
    var playerY = window.innerHeight / 2 - player.offsetHeight / 2;

    function updatePlayerPosition() {
        player.style.left = `${playerX}px`;
        player.style.top = `${playerY}px`;
        var circles = document.querySelectorAll(".circle");
        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];
            if (isColliding(player, circle)) {
                incrementScore();
                document.body.removeChild(circle);
                return;
            }
        }
        var triangles = document.querySelectorAll(".triangle");
        for (var i = 0; i < triangles.length; i++) {
            var triangle = triangles[i];
            if (isColliding(player, triangle)) {
                endGame();
                return;
            }
        }
    }
    document.addEventListener("keydown", function(event) {
        switch (event.keyCode) {
            case 65:
                playerX -= 15;
                break;
            case 87:
                playerY -= 15;
                break;
            case 68:
                playerX += 15;
                break;
            case 83:
                playerY += 15;
                break;
        }
    });

    function handleMovement() {
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;
        var {
            top,
            left,
            right,
            bottom,
            width,
            height
        } = player.getBoundingClientRect();

        if (right > viewportWidth) {
            playerX = 80 - width;
            setTimeout(() => {
                player.style.left = `${playerX}px`;
                player.style.top = `${playerY}px`;
            }, 200);
        }

        if (bottom > viewportHeight) {
            playerY = 80 - height;
            setTimeout(() => {
                player.style.left = `${playerX}px`;
                player.style.top = `${playerY}px`;
            }, 200);
        }

        if (left < 0) {
            playerX = -30 + viewportWidth;
            setTimeout(() => {
                player.style.left = `${playerX}px`;
                player.style.top = `${playerY}px`;
            }, 200);
        }

        if (top < 0) {
            playerY = -30 + viewportHeight;
            setTimeout(() => {
                player.style.left = `${playerX}px`;
                player.style.top = `${playerY}px`;
            }, 200);
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        handleMovement();
        updatePlayerPosition();
    }
    animate();
    var score = 0;
    var scoreElement = document.createElement("div");
    scoreElement.style.position = "fixed";
    scoreElement.style.top = "15px";
    scoreElement.style.color = "black";
    scoreElement.style.border = "2px solid #404040";
    scoreElement.style.right = "5px";
    scoreElement.style.fontSize = "35px";
    scoreElement.innerHTML = "Score: " + score;
    document.body.appendChild(scoreElement);

    function incrementScore() {
        score++;
        scoreElement.innerHTML = "Score: " + score;
    }

    function isColliding(element1, element2) {
        var rect1 = element1.getBoundingClientRect();
        var rect2 = element2.getBoundingClientRect();
        return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
    }

    function endGame() {
        var gameover = document.createElement("div");
        gameover.style.position = "fixed";
        gameover.style.top = "50%";
        gameover.style.left = "50%";
        gameover.style.transform = "translate(-50%, -50%)";
        gameover.style.fontSize = "100px";
        gameover.style.textAlign = "center";
        gameover.innerHTML = "<span style='color: white; text-shadow: -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000;'>Game over!</span><br><span style='color: white; text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000; font-size: 60px;'>Score: " + score + "</span><br><button style='background-color: white; color: black; font-size: 50px;' onclick='location.reload();'>Restart</button>";
        document.body.appendChild(gameover);
        setInterval(function() {
            document.body.removeChild(player);
            var circles = document.querySelectorAll(".circle");
            for (var i = 0; i < circles.length; i++) {
                document.body.removeChild(circles[i]);
            }
            var triangles = document.querySelectorAll(".triangle");
            var borderElement1 = document.querySelectorAll(".borderElement1");
            var borderElement2 = document.querySelectorAll(".borderElement2");
            var borderElement3 = document.querySelectorAll(".borderElement3");
            for (var i = 0; i < triangles.length; i++) {
                document.body.removeChild(triangles[i]);
                document.body.removeChild(borderElement1[i]);
                document.body.removeChild(borderElement2[i]);
                document.body.removeChild(borderElement3[i]);
            }
        }), 0.1;
    }

    function distanceBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }

    function getRandomCoordinates() {
        var minDistance = 30 + 20;
        let x, y;
        do {
            x = Math.floor(Math.random() * window.innerWidth);
            y = Math.floor(Math.random() * window.innerHeight);
        } while (distanceBetweenPoints(x, y, player.offsetLeft, player.offsetTop) < minDistance);
        return {
            x,
            y
        };
    }

    function doShapesOverlap(shape1, shape2) {
        var distance = Math.sqrt((shape1.x - shape2.x) ** 2 + (shape1.y - shape2.y) ** 2);
        return distance < shape1.radius + shape2.radius;
    }

    function spawnCircle() {
        let circle;
        do {
            var coordinates = getRandomCoordinates();
            circle = {
                x: coordinates.x,
                y: coordinates.y,
                radius: 20
            };
        } while (doShapesOverlap(circle, player));
        var circleElement = document.createElement("div");
        circleElement.style.width = "50px";
        circleElement.style.height = "50px";
        circleElement.style.borderRadius = "50%";
        circleElement.style.backgroundColor = "#7FFF00";
        circleElement.style.border = "3px solid black";
        circleElement.style.position = "absolute";
        circleElement.style.left = circle.x + "px";
        circleElement.style.top = circle.y + "px";
        circleElement.classList.add("circle");
        document.body.appendChild(circleElement);
    }

    function spawnTriangle() {
        let triangle;
        do {
            var coordinates = getRandomCoordinates();
            triangle = {
                x: coordinates.x,
                y: coordinates.y,
                radius: 20
            };
        } while (doShapesOverlap(triangle, player));
        var triangleElement = document.createElement("div");
        triangleElement.style.width = "0px";
        triangleElement.style.height = "0px";
        triangleElement.style.borderBottom = "40px solid #FF0000";
        triangleElement.style.borderLeft = "20px solid transparent";
        triangleElement.style.borderRight = "20px solid transparent";
        triangleElement.style.position = "absolute";
        triangleElement.style.left = triangle.x + "px";
        triangleElement.style.top = triangle.y + "px";
        triangleElement.classList.add("triangle");
        document.body.appendChild(triangleElement);
      
        var borderElement1 = document.createElement("div");
        borderElement1.style.position = "absolute";
        borderElement1.style.width = "46px";
        borderElement1.style.height = "3px";
        borderElement1.style.backgroundColor = "black";
        borderElement1.style.left = triangle.x - 3 + "px";
        borderElement1.style.top = triangle.y + 40 + "px";
        borderElement1.classList.add("borderElement1");
        document.body.appendChild(borderElement1);
      
        var borderElement2 = document.createElement("div");
        borderElement2.style.position = "absolute";
        borderElement2.style.width = "49px";
        borderElement2.style.height = "3px";
        borderElement2.style.backgroundColor = "black";
        borderElement2.style.transform = "rotate(63deg)";
        borderElement2.style.left = triangle.x + 7 + "px";
        borderElement2.style.top = triangle.y + 19 + "px";
        borderElement2.classList.add("borderElement2");
        document.body.appendChild(borderElement2);
      
        var borderElement3 = document.createElement("div");
        borderElement3.style.position = "absolute";
        borderElement3.style.width = "49px";
        borderElement3.style.height = "3px";
        borderElement3.style.backgroundColor = "black";
        borderElement3.style.transform = "rotate(117deg)";
        borderElement3.style.left = triangle.x - 16 + "px";
        borderElement3.style.top = triangle.y + 19 + "px";
        borderElement3.classList.add("borderElement3");
        document.body.appendChild(borderElement3);
    }
setInterval(spawnCircle, 2000);
setInterval(spawnTriangle, 500);
     })();
});
startScreen.appendChild(playButton);
document.body.appendChild(startScreen);
