'use strict';

const winImage = new Image();
winImage.src = '/images/win-banner.png';

class Enemy {
    constructor (coordX, coordY, startSpeed) {
        this.x = coordX,
        this.y = coordY,
        this.speed = startSpeed,
        this.sprite = 'images/enemy-bug.png',

        this.render = function () {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        },

        this.update = function (dt) {
            this.x += this.speed * dt;
            if (this.x > 500) {
                this.x = Math.random() * (-200);
                this.speed = Math.random()*150 + 200;
            }
        };
    }
}

class Player {
    constructor (coordX, coordY) {
        this.x = coordX,
        this.y = coordY,
        this.sprite = 'images/char-boy.png',

        this.render = function () {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        },

        this.update = function () {},

        this.restart = function () {
            dt = 0;
            setTimeout(() => {
            ctx.drawImage(winImage, 200, 300);
            this.x = 200;
            this.y = 405;
            }, 1000);
        },

        this.handleInput = function (direction) {
            switch (direction) {
                case "left":
                    if (this.x > 0) {
                        this.x -= 100;
                    }
                    break;
                case "right":
                    if (this.x < 400) {
                        this.x += 100;
                    }
                    break;
                case "up":
                    if (this.y > -10) {
                        this.y -= 83;
                    }
                    this.update();
                    break;
                case "down":
                    if (this.y < 400) {
                        this.y += 83;
                    }
                    break;
                default:
                    break;
            }
            if (this.y < 70) {
                restartGame(this.x, this.y);
                //this.restart();
            }
        };
    }
};

const enemyCountPerTrack = 1;

const allEnemies = generateEnemies(enemyCountPerTrack);

function restartGame (finishX, finishY) {
    const enemiesSpeeds = [];
    allEnemies.forEach(enemy => {
            enemiesSpeeds.push(enemy.speed);
            enemy.speed = 0;
            }
        );
    setTimeout(() => {
        player.x = 200;
        player.y = 405;
        allEnemies.forEach((enemy, i) => enemy.speed = enemiesSpeeds[i]);
        }, 1000);
    movePlayerToStart();
}

function generateEnemies (n) {
    const enemyTracksY = [62, 145, 228];
    let enemies = [];
    for (let i = 1; i <= n; i++) {
        enemies = [...enemies,...enemyTracksY
                        .map(trackY => {
                        const startEnemySpeed = Math.random() * 150 + 100,
                            startEnemyX = Math.random() * (-300);
                            return new Enemy(startEnemyX, trackY, startEnemySpeed);
                            }
                        )
                    ];
    }
    return enemies;
}

const player = new Player(200, 405);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
