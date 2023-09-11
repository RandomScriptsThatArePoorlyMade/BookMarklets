(function noScroll() {
    document.body.style.overflow = 'hidden';
}());

(function game() {
    var player = document.createElement("div");
    player.style.height = "50px";
    player.style.width = "50px";
    player.style.background = "#ff1e80";
    player.style.border = "2px solid red";
    player.style.position = "fixed";
    player.style.bottom = "0";
    player.style.left = "0";
    player.style.zIndex = '999999999';
    document.body.appendChild(player);

    var score = 0;
    var bestScore = localStorage.getItem("bestScore");
    if (!bestScore) {
        bestScore = 0;
    }

    function updateBest() {
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore);
        }
    }
    var scorecard = document.createElement("div");
    scorecard.style.background = "#8f8f8f";
    scorecard.style.border = " 2px solid black";
    scorecard.style.position = "fixed";
    scorecard.style.top = "0";
    scorecard.style.right = "0";
    scorecard.style.zIndex = '999999999';
    scorecard.style.fontSize = "35px";
    scorecard.innerHTML = "Score: " + score;
    document.body.appendChild(scorecard);
  
    var bestscorecard = document.createElement("div");
    bestscorecard.style.background = "#8f8f8f";
    bestscorecard.style.border = "2px solid black";
    bestscorecard.style.position = "fixed";
    bestscorecard.style.top = "8.2%";
    bestscorecard.style.right = "0";
    bestscorecard.style.zIndex = '999999999';
    bestscorecard.style.fontSize = "18px";
    updateBest();
    bestscorecard.innerHTML = "Best Score: " + bestScore;
    document.body.appendChild(bestscorecard);

    var triangles = [];

  var playerStartX = 0;
    function createRandomTriangle() {
        var triangle = document.createElement("div");
        triangle.style.width = "0";
        triangle.style.height = "0";
        triangle.style.borderStyle = "solid";
        triangle.style.borderWidth = "0 20px 30px 20px";
        triangle.style.borderColor = "transparent transparent #ffa600 transparent";
        triangle.style.zIndex = '999999999';
        triangle.style.position = "fixed";

        var randomX = getRandomX();

        triangle.style.left = `${randomX}px`;
        triangle.style.bottom = "0";

        document.body.appendChild(triangle);

        triangles.push({
            element: triangle,
            x: randomX
        });
    }
    for (var i = 0; i < 4; i++) {
        createRandomTriangle();
    }

    function getRandomX() {
        var randomX;
        var overlap = true;
        while (overlap) {
            overlap = false;
            randomX = Math.floor(Math.random() * (window.innerWidth - 40));
          
          if (Math.abs(randomX - playerStartX) < 200) {
            overlap = true;
        }
            for (var i = 0; i < triangles.length; i++) {
                if (Math.abs(randomX - triangles[i].x) < 40) {
                    overlap = true;
                    break;
                }
            }
        }
        return randomX;
    }

    function removeAllTriangles() {
        for (var i = 0; i < triangles.length; i++) {
            document.body.removeChild(triangles[i].element);
        }
        triangles = [];
    }

    var playerX = -55;
    var playerY = window.innerHeight - player.offsetHeight;
    var isJumping = false;
    var jumpCooldown = false;
    var onGround = true;

    function updatePlayerPosition() {
        player.style.left = `${playerX}px`;
        player.style.top = `${playerY}px`;
    }

    function handleMovement() {
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;
        var speed = 5;
        var {
            right,
            width
        } = player.getBoundingClientRect();

        if (right < 0 && playerX < viewportWidth) {
            playerX = viewportWidth;
        } else {
            playerX += speed;
        }

        if (playerY >= window.innerHeight - player.offsetHeight) {
            onGround = true;
        } else {
            onGround = false;
        }

        if (playerX >= viewportWidth) {
            score++;
            updateBest();
            bestscorecard.innerHTML = "Best Score: " + bestScore;
            scorecard.innerHTML = "Score: " + score;
            removeAllTriangles();
            for (var i = 0; i < 4; i++) {
                createRandomTriangle();
            }
            playerX = -width;
        }
    }

    function jump() {
        if (isJumping || jumpCooldown || !onGround) return;

        var jumpHeight = 125;
        var jumpDuration = 600;

        isJumping = true;
        onGround = false;

        var originalY = playerY;
        var jumpStart = null;

        function animateJump(timestamp) {
            if (!jumpStart) jumpStart = timestamp;
            var progress = timestamp - jumpStart;

            playerY = originalY - Math.sin((progress / jumpDuration) * Math.PI) * jumpHeight;

            if (progress < jumpDuration) {
                requestAnimationFrame(animateJump);
            } else {
                playerY = originalY;
                isJumping = false;
            }
        }

        requestAnimationFrame(animateJump);
    }

    document.addEventListener("keydown", function(event) {
        switch (event.keyCode) {
            case 32:
                jump();
                break;
        }
    });

    var gameActive = true;
    var score = 0;
    function animate() {
        if (!gameActive) return;
        requestAnimationFrame(animate);
        handleMovement();
        updatePlayerPosition();
        checkCollision();
    }

    animate();

    function endGame() {
        if (!gameActive) return;
        gameActive = false;
        updateBest();
        document.body.removeChild(player);
        document.body.removeChild(scorecard);
        document.body.removeChild(bestscorecard);
        removeAllTriangles();
        var gameover = document.createElement("div");
        gameover.style.position = "fixed";
        gameover.style.top = "50%";
        gameover.style.left = "50%";
        gameover.style.transform = "translate(-50%, -50%)";
        gameover.style.fontSize = "75px";
        gameover.style.textAlign = "center";
        gameover.style.zIndex = '999999999';
        gameover.innerHTML = "<span style='color: white; text-shadow: -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000;'>Game over</span><br><span style='color: white; text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000; font-size: 60px;'>Score: " + score + "</span><br><span style='color: white; text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000; font-size: 25px;'>Best Score: " + bestScore + "</span><br><button style='background-color: white; color: black; font-size: 50px;'>Restart</button>";
        document.body.appendChild(gameover);

        var restartButton = gameover.querySelector('button');
        restartButton.addEventListener('click', function() {
            document.body.removeChild(gameover);
            document.body.appendChild(bestscorecard);
            document.body.appendChild(scorecard);
            document.body.appendChild(player);
            for (var i = 0; i < 4; i++) {
                createRandomTriangle();
            }
            gameActive = true;
            playerX = -55;
            playerY = window.innerHeight - player.offsetHeight;
            score = 0;
            scorecard.innerHTML = "Score: " + score;
            animate();
        });
    }

    function checkCollision() {
        var playerRect = player.getBoundingClientRect();

        for (var i = 0; i < triangles.length; i++) {
            var triangleRect = triangles[i].element.getBoundingClientRect();

            if (
                playerRect.left < triangleRect.right &&
                playerRect.right > triangleRect.left &&
                playerRect.top < triangleRect.bottom &&
                playerRect.bottom > triangleRect.top
            ) {
                endGame();
            }
        }
    }
})();
