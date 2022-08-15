"use strict";

const winImage = new Image();
winImage.src = "/images/win-banner.png";

class Enemy {
    constructor(coordX, coordY, startSpeed) {
        this.x = coordX,
        this.y = coordY,
        this.speed = startSpeed,
        this.sprite = "images/enemy-bug.png",
        this.render = function () {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        },
        this.update = function (dt) {
            this.x += this.speed * dt;
            if (this.x > 500) {
                this.x = Math.random() * -200;
                this.speed = Math.random() * 150 + 200;
            }
        };
    }
}

class Player {
    constructor(coordX, coordY) {
        this.x = coordX,
        this.y = coordY,
        this.sprite = "images/char-boy.png",
        this.freeze = true,
        this.render = function () {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        },
        this.freezing = function() {
            this.freeze = true;
        },
        this.unfreezing = function() {
            this.freeze = false;
        }        
        this.update = function () {},
        this.handleInput = function (direction) {
            if (!this.freeze) {
                switch (direction) {
                    case "ArrowLeft":
                        if (this.x > 0) {
                            this.x -= 100;
                        }
                        break;
                    case "ArrowRight":
                        if (this.x < 400) {
                            this.x += 100;
                        }
                        break;
                    case "ArrowUp":
                        if (this.y > -10) {
                            this.y -= 83;
                        }
                        break;
                    case "ArrowDown":
                        if (this.y < 400) {
                            this.y += 83;
                        }
                        break;
                    default:
                        break;
                }
                if (this.y < 0) {
                    this.freeze = true;
                    winGame();
                }
            }
        }
    }
}

const enemyCountPerTrack = 2;

const allEnemies = generateEnemies(enemyCountPerTrack);

function winGame() {
    setTimeout(() => {
        window.cancelAnimationFrame(requestID);
        const startPositionsX = Math.floor(Math.random() * 5) * 100;
        const startPositionsY = 317 + Math.floor(Math.random() * 2) * 83;
        player = new Player(startPositionsX, startPositionsY);
        player.freezing();
        const winImage = new Image();
        winImage.src = '/images/win-banner.png';
        ctx.drawImage(winImage, 25, 100);
    }, 500);
}

function generateEnemies(n) {
    const enemyTracksY = [62, 145, 228];
    let enemies = [];
    for (let i = 1; i <= n; i++) {
        enemies = [
            ...enemies,
            ...enemyTracksY.map((trackY) => {
                const startEnemySpeed = Math.random() * 150 + 100,
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
