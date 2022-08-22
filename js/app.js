"use strict";

const cellX = 101, //gamefield sizes
    cellY = 83,
    height = cellX * 6,
    width = cellY * 5;

class Enemy {
    constructor(coordX, coordY, startSpeed) {
        this.x = coordX,
            this.y = coordY,
            this.speed = startSpeed,
            this.sprite = "images/enemy-bug.png"
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update(dt) {
        this.x += this.speed * dt;
        if (this.x > width + cellY) { //change enemy start point before new appearance
            this.x = Math.random() * -300;
            this.speed = Math.random() * 150 + Math.random() * 150; //change enemy speed before new appearance
        }
        if (this.x > player.x - cellX + 20 && //+20 - correction for avatar, for clearer collision
            this.x < player.x + cellX - 15 && //-15 - correction for avatar, for clearer collision
            this.y < player.y &&
            this.y + cellY > player.y) {
            endGame(false); //false - you lose the game
        }
    }
}

class Player {
    constructor(coordX, coordY) {
        this.x = coordX,
            this.y = coordY,
            this.freeze = true,
            this.sprite = "images/chibi-1.png";
    }
    update() {}
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    freezing() {
        this.freeze = true; //player freezed until the win/lose banner showing
    }
    unfreezing() {
        this.freeze = false; //player unfreezed when gameplay start
    }
    goToStart() { //randomize player start position after win/lose
        this.x = Math.floor(Math.random() * 4) * cellX;
        this.y = (Math.random() > 0.5) ? (cellY * 5 - 10) : (cellY * 4 - 10);
    }
    handleInput(direction) {
        if (!this.freeze) {
            switch (direction) { //move player
                case "ArrowLeft":
                    if (this.x > 0) {
                        this.x -= cellX;
                    }
                    break;
                case "ArrowRight":
                    if (this.x < width - cellX) {
                        this.x += cellX;
                    }
                    break;
                case "ArrowUp":
                    if (this.y > 0) {
                        this.y -= cellY;
                    }
                    break;
                case "ArrowDown":
                    if (this.y < height - 3 * cellY) {
                        this.y += cellY;
                    }
                    break;
                default:
                    break;
            }
            if (this.y < 0) { //player on the water => you win
                this.freeze = true;
                endGame(true); //win the game
            }
        }
    }
}

var allEnemies = generateEnemies(4); //"4" - the hardest level (12 enemies)

function endGame(win) {
    if (win) {
        setTimeout(() => restartGame(true), 400);
    } else {
        setTimeout(() => restartGame(false), 0);
    }
}

function restartGame(winLose) {
    (winLose)
    ? document.querySelector(".win").classList.add("show")
    : document.querySelector(".lose").classList.add("show");
    player.freezing();
    player.goToStart();
    setTimeout(() => {
        document.querySelector(".win").classList.remove("show");
        document.querySelector(".lose").classList.remove("show");
        player.unfreezing();
    }, 750);
}

function generateEnemies(n) { //n - enemies per track
    const enemyTracksY = [62, 145, 228]; //coordinates of enemy tracks
    let enemies = [];
    for (let i = 1; i <= n; i++) {
        enemies = [
            ...enemies,
            ...enemyTracksY.map((trackY) => {
                const startEnemySpeed = Math.random() * 350, //randomize start enemy speed for first appearance
                    startEnemyX = Math.random() * -300; //randomize start enemy point for first appearance
                return new Enemy(startEnemyX, trackY, startEnemySpeed);
            }),
        ];
    }
    return enemies;
} 

const player = new Player(200, 405); //create player

document.addEventListener("keyup", function (e) { //keyboard handler for move player
    const allowedKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (allowedKeys.includes(e.code)) {
        player.handleInput(e.code);
    }
});


function addSwipesEventListener() { //swipe handler for move player

    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
  
    var xDown = null;
    var yDown = null;
  
    function handleTouchStart(evt) {
      const firstTouch = evt.touches[0];
      xDown = firstTouch.clientX; //finger down
      yDown = firstTouch.clientY; //finger down
    }
  
    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }
  
      var xUp = evt.touches[0].clientX; //finger up
      var yUp = evt.touches[0].clientY; //finger up
  
      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;
  
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
          /* left swipe */
          player.handleInput("ArrowLeft");
        } else {
          /* right swipe */
          player.handleInput("ArrowRight");
        }
      } else {
        if (yDiff > 0) {
          /* up swipe */
          player.handleInput("ArrowUp");
        } else {
          /* down swipe */
          player.handleInput("ArrowDown");
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
  }
