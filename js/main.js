"use strict";

import {
    Engine
} from "./engine.js";

const doc = window.document,
    avatars = [
        "images/chibi-1.png",
        "images/chibi-2.png",
        "images/chibi-3.png",
        "images/chibi-4.png",
        "images/chibi-5.png",
        "images/chibi-6.png",
        "images/chibi-7.png",
        "images/chibi-8.png",
    ];

let difficulty = 2;

(function main() {
    renderWelcomeInterface();
    addWelcomeButtonsLiteners();
    addUserControlsListeners();
})();

function renderWelcomeInterface() {
    const mainDiv = doc.createElement("div");
    mainDiv.classList.add("main");
    mainDiv.innerHTML = `
      <div class="player-change">
        <h1 class="title">Classic Frogger Game</h1>
        <div class="avatar-diff">
          <div class="difficulty">
              <label id="diff-label" for="difficulty">Difficulty</label>
              <input id="diff-input" type="range" min="1" max="4" step="1" value="${difficulty}">
          </div>
              <img class="avatar" src="images/chibi-1.png" alt="game-avatar" data-avatar="0">
        </div>
            <div class="prev-next-buttons">
              <button class="btn" id="btn-prev">Previous</button>
              <button class="btn" id="btn-next">Next</button>
            </div>
            <button class="btn" id="btn-start">Play game STANDART</button>
        </div>
      </div>
      `;

    doc.body.appendChild(mainDiv);
}

function addWelcomeButtonsLiteners() {
    doc
        .querySelector("#btn-next")
        .addEventListener("click", (e) => nextAvatar(e));

    doc
        .querySelector("#btn-prev")
        .addEventListener("click", (e) => prevAvatar(e));

    doc
        .querySelector("#diff-input")
        .addEventListener("input", (e) => changeDifficulty(e));

    doc
        .querySelector("#btn-start")
        .addEventListener("click", (e) => startGame(e));
}


function addUserControlsListeners() {
    doc.addEventListener("keyup", function (e) { //keyboard handler for move player
        const allowedKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
        if (allowedKeys.includes(e.code)) {
            player.handleInput(e.code);
        }
    });

    doc.addEventListener("touchstart", handleTouchStart, false); //swipes handler for move player
    doc.addEventListener("touchmove", handleTouchMove, false); //swipes handler for move player

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

function nextAvatar(e) {
    e.preventDefault();
    const avatarPicture = doc.querySelector(".avatar"),
        n = avatarPicture.dataset.avatar;
    if (n == avatars.length - 1) {
        avatarPicture.src = avatars[0];
        avatarPicture.dataset.avatar = 0;
    } else {
        avatarPicture.src = avatars[+n + 1];
        avatarPicture.dataset.avatar = +n + 1;
    }
}

function prevAvatar(e) {
    e.preventDefault();
    const avatarPicture = doc.querySelector(".avatar"),
        n = avatarPicture.dataset.avatar;
    if (n == 0) {
        avatarPicture.src = avatars[avatars.length - 1];
        avatarPicture.dataset.avatar = avatars.length - 1;
    } else {
        avatarPicture.src = avatars[+n - 1];
        avatarPicture.dataset.avatar = +n - 1;
    }
}

function changeDifficulty (e) {
    const btnStart = doc.querySelector("#btn-start");
    switch (e.target.value) {
        case "1":
            difficulty = 1;
            btnStart.innerHTML = "Play game EASY";
            break;
        case "2":
            difficulty = 2;
            btnStart.innerHTML = "Play game NORMAL";
            break;
        case "3":
            difficulty = 3;
            btnStart.innerHTML = "Play game HARD";
            break;
        case "4":
            difficulty = 4;
            btnStart.innerHTML = "Play game HARDEST";
            break;
        default:
            break;
    }
}

function startGame(e) {
    e.preventDefault();
    allEnemies.length = difficulty * 3;
    player.sprite = avatars[+doc.querySelector(".avatar").dataset.avatar];
    doc.querySelector(".player-change").remove();
    renderGamePlayDOM(window);
    Engine(window);
    player.unfreezing();
}

function renderGamePlayDOM() {
    const mainDiv = doc.createElement("div");
    mainDiv.classList.add("main");
    mainDiv.innerHTML = `
          <div class="container" id="game-container">
            <div class="points">
              <p class="wins">Wins: <span id="win-points">${winPoints}</span></p>
              <p class="fails">Fails: <span id="fail-points">${failPoints}</span></p>
            </div>
            <img class="win" src="images/win-banner.png" alt="You win!">
            <img class="lose" src="images/lose-banner.png" alt="You lose!">
            <canvas class="game-field" width="505" height="606">
          </div>
          `;
    doc.querySelector(".main").replaceWith(mainDiv);
}
