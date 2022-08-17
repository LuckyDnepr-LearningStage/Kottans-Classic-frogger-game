"use strict";

class Enemy {
    constructor(coordX, coordY, startSpeed) {
        const cellX = 101,
        cellY = 83,
        width = cellY * 5;
        this.x = coordX,
        this.y = coordY,
        this.speed = startSpeed,
        this.sprite = "images/enemy-bug.png",
        this.render = function () {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        },
        this.update = function (dt) {
            this.x += this.speed * dt;
            if (this.x > width + cellY) {
                this.x = Math.random() * -300;
                this.speed = Math.random() * 150 + Math.random() * 150;
            }
            if (this.x > player.x - cellX + 20 &&
                this.x < player.x + cellX - 15 &&
                this.y < player.y &&
                this.y + cellY > player.y) {
                endGame(false);
            }
        }
    }
}

class Player {
    constructor(coordX, coordY) {
        const cellX = 101,
            cellY = 83,
            height = cellX * 6,
            width = cellY * 5;
        this.x = coordX,
        this.y = coordY,
        this.sprite = "images/char-boy.png",
        this.freeze = true,
        this.render = function () {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        },
        this.freezing = function() {
            this.freeze = true;
        }
        this.unfreezing = function() {
            this.freeze = false;
        }
        this.update = function () {},
        this.handleInput = function (direction) {
            if (!this.freeze) {
                switch (direction) {
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
                if (this.y < 0) {
                    this.freeze = true;
                    endGame(true);
                }
            }
        }
    }
}

const enemyCountPerTrack = 2;

const allEnemies = generateEnemies(enemyCountPerTrack);

function endGame (win) {
    if (win) {
        setTimeout(() => restartGame(true), 400);
    } else {
        setTimeout(() => restartGame(false), 0);
    }
}

function restartGame (winLose) {
    window.cancelAnimationFrame(requestID);
    (winLose) ?
        document.querySelector(".win").classList.add("show") :
        document.querySelector(".lose").classList.add("show");
    player.x = 200;
    player.y = 405;
    player.freezing();
    setTimeout(() => {
        document.querySelector('.restart-btn').click();
    }, 750);
}

function generateEnemies(n) {
    const enemyTracksY = [62, 145, 228];
    let enemies = [];
    for (let i = 1; i <= n; i++) {
        enemies = [
            ...enemies,
            ...enemyTracksY.map((trackY) => {
                const startEnemySpeed = Math.random() * 150 + Math.random() * 150,
                    startEnemyX = Math.random() * -300;
                return new Enemy(startEnemyX, trackY, startEnemySpeed);
            }),
        ];
    }
    return enemies;
}

let player = new Player(200, 405);


document.addEventListener("keyup", function (e) {
    const allowedKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (allowedKeys.includes(e.code)) {
        player.handleInput(e.code);
    }
});
