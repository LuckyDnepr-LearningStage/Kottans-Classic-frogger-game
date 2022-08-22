"use strict";

import {
  Engine
} from "./engine.js";

main();

function main() {
  welcomeInterface(window);
  addSwipesEventListener();
}

function gamePlayDOM(global) {
  const doc = global.document,
    canvas = doc.createElement("canvas");

  canvas.classList.add("game-field");
  canvas.width = 505;
  canvas.height = 606;
  const divContainer = doc.createElement("div");

  const mainDiv = doc.querySelector(".main");
  divContainer.classList.add("container");
  divContainer.setAttribute("id", "game-container");


  const winText = doc.createElement("img");
  winText.classList.add("win");
  winText.src = "images/win-banner.png";
  const loseText = doc.createElement("img");
  loseText.classList.add("lose");
  loseText.src = "images/lose-banner.png";

  divContainer.appendChild(winText);
  divContainer.appendChild(loseText);

  divContainer.appendChild(canvas);
  mainDiv.appendChild(divContainer);

  doc.body.appendChild(mainDiv);

}


function welcomeInterface(global) {
  const doc = global.document;
  let difficulty = 2;

  const mainDiv = doc.createElement("div");
  mainDiv.classList.add("main");
  mainDiv.innerHTML = `
      <div class="player-change">
        <h1 class="title">Classic Frogger Game</h1>
        <div class="avatar-diff">
              <input id="difficulty" type="range" min="1" max="4" step="1" value="2">
              <img class="avatar" src="images/chibi-1.png" alt="game-avatar" navatar="0">
        </div>
            <div class="prev-next-buttons">
              <button class="btn" id="btn-prev">Previous</button>
              <button class="btn" id="btn-next">Next</button>
            </div>
            <button class="btn" id="btn-start">Play game STANDART</button>
        </div>
      </div>
      `;

  const avatars = [
    "images/chibi-1.png",
    "images/chibi-2.png",
    "images/chibi-3.png",
    "images/chibi-4.png",
    "images/chibi-5.png",
    "images/chibi-6.png",
    "images/chibi-7.png",
    "images/chibi-8.png",
  ];


  doc.body.appendChild(mainDiv);

  const btnStart = doc.querySelector("#btn-start");

  doc
    .querySelector("#btn-next")
    .addEventListener("click", (e) => nextAvatar(e));

  doc
    .querySelector("#btn-prev")
    .addEventListener("click", (e) => prevAvatar(e));

  doc
    .querySelector("#difficulty")
    .addEventListener("input", (e) => {
      console.log(e.target.value);
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
    }) 

  
  
  btnStart.addEventListener("click", (e) => startGame(e));


  function nextAvatar(e) {
    e.preventDefault();
    const avatarPicture = document.querySelector(".avatar"),
      n = avatarPicture.getAttribute("nAvatar");

    if (n == avatars.length - 1) {
      avatarPicture.src = avatars[0];
      avatarPicture.setAttribute("navatar", 0);
    } else {
      avatarPicture.src = avatars[+n + 1];
      avatarPicture.setAttribute("navatar", +n + 1);
    }
  }

  function prevAvatar(e) {
    e.preventDefault();
    const avatarPicture = doc.querySelector(".avatar"),
      n = avatarPicture.getAttribute("navatar");
    if (n == 0) {
      avatarPicture.src = avatars[avatars.length - 1];
      avatarPicture.setAttribute("navatar", avatars.length - 1);
    } else {
      avatarPicture.src = avatars[+n - 1];
      avatarPicture.setAttribute("navatar", +n - 1);
    }
  }

  function startGame(e) {
    e.preventDefault();
    allEnemies.length = difficulty * 3;
    player.sprite = avatars[+doc.querySelector(".avatar").getAttribute("navatar")];
    doc.querySelector(".player-change").remove();
    gamePlayDOM(window);
    Engine(window);
    doc.querySelector(".win").classList.remove("show");
    doc.querySelector(".lose").classList.remove("show");
    player.unfreezing();
    
  }
  
}

