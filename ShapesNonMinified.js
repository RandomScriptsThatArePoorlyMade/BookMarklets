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
        player.style.position = "absolute";
        player.style.top = "50%";
        player.style.left = "50%";
        player.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(player);
        var playerX = parseInt(player.style.left);
        var playerY = parseInt(player.style.top);

        function updatePlayerPosition() {
            player.style.left = playerX + "px";
            player.style.top = playerY + "px";
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

        function animate() {
            requestAnimationFrame(animate);
            updatePlayerPosition();
        }
        animate();
        var score = 0;
        var scoreElement = document.createElement("div");
        scoreElement.style.position = "fixed";
        scoreElement.style.top = "10px";
        scoreElement.style.right = "-5px";
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
            document.body.removeChild(player);
            var circles = document.querySelectorAll(".circle");
            for (var i = 0; i < circles.length; i++) {
                document.body.removeChild(circles[i]);
            }
            var triangles = document.querySelectorAll(".triangle");
            for (var i = 0; i < triangles.length; i++) {
                document.body.removeChild(triangles[i]);
            }
        }
        setInterval(function addCircle() {
            var circle = document.createElement("div");
            circle.style.width = "50px";
            circle.style.height = "50px";
            circle.style.borderRadius = "50%";
            circle.style.backgroundColor = "#7FFF00";
            circle.style.position = "absolute";
            circle.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
            circle.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
            circle.classList.add("circle");
            document.body.appendChild(circle);
        }, 2000);
        setInterval(function createTriangle() {
            var triangle = document.createElement("div");
            triangle.style.fontSize = "0px";
            triangle.style.lineHeight = "0%"
            triangle.style.width = "0px";
            triangle.style.borderBottom = "40px solid #FF0000";
            triangle.style.borderLeft = "20px solid transparent";
            triangle.style.borderRight = "20px solid transparent";
            triangle.style.position = "absolute";
            triangle.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
            triangle.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
            triangle.classList.add("triangle");
            document.body.appendChild(triangle);
        }, 1000);
    })();
});
startScreen.appendChild(playButton);
document.body.appendChild(startScreen);
