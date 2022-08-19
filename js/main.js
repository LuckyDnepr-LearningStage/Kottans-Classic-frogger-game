"use strict";

import { Engine } from "./engine.js";

main();

function main() {
  welcomeInterface(window);
  addSwipesEventListener();
}

function prepareInterface(global) {
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

function addSwipesEventListener() {

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

function welcomeInterface(global) {
  const doc = global.document;
  const playerChange = doc.createElement("div"),
    avatarPicture = doc.createElement("img"),
    btns = doc.createElement("div"),
    buttonNext = doc.createElement("button"),
    buttonPrev = doc.createElement("button"),
    buttonStart = doc.createElement("button"),
    mainDiv = doc.createElement("div");

  mainDiv.classList.add("main");
  btns.classList.add("prev-next-buttons");
  playerChange.classList.add("player-change");
  avatarPicture.classList.add("avatar");
  buttonNext.classList.add("btn");
  buttonPrev.classList.add("btn");
  buttonStart.classList.add("btn");
  buttonNext.setAttribute("id", "btn-next");
  buttonPrev.setAttribute("id", "btn-prev");
  buttonStart.setAttribute("id", "btn-start");
  buttonNext.innerText = "Next";
  buttonPrev.innerText = "Previous";
  buttonStart.innerText = "Start";

  btns.appendChild(buttonPrev);
  btns.appendChild(buttonNext);

  playerChange.appendChild(avatarPicture);
  playerChange.appendChild(btns);
  playerChange.appendChild(buttonStart);

  mainDiv.appendChild(playerChange);

  const avatars = [
    "images/hero-1.png",
    "images/hero-2.png",
    "images/hero-3.png",
    "images/hero-4.png",
    "images/hero-5.png",
    "images/hero-6.png",
    "images/hero-7.png",
  ];

  avatarPicture.src = avatars[0];
  avatarPicture.setAttribute("navatar", 0);

  doc.body.appendChild(mainDiv);

  doc
    .querySelector("#btn-next")
    .addEventListener("click", (e) => nextAvatar(e));

  doc
    .querySelector("#btn-prev")
    .addEventListener("click", (e) => prevAvatar(e));

  doc
    .querySelector("#btn-start")
    .addEventListener("click", (e) => startGame(e));

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

  function startGame (e) {
    e.preventDefault();
    player.sprite = avatars[+doc.querySelector(".avatar").getAttribute("navatar")];
    doc.querySelector(".player-change").remove();
    prepareInterface(window);
    Engine (window);
    doc.querySelector(".win").classList.remove("show");
    doc.querySelector(".lose").classList.remove("show");
    player.unfreezing();

  }
}
