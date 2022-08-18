'use strict';

import { Engine } from "./engine.js";

prepareInterfaceAndRun (window);

function prepareInterfaceAndRun (global) {
  var doc = global.document,
    canvas = doc.createElement("canvas");

  canvas.classList.add("game-field");
  canvas.width = 505;
  canvas.height = 606;
  const mainDiv = doc.createElement("div"),
    divContainer = doc.createElement("div");

  mainDiv.classList.add("main");
  divContainer.classList.add("container");
  divContainer.setAttribute("id", "game-container");

  const restartButton = doc.createElement("button");
  restartButton.classList.add("restart-btn");
  restartButton.innerText = "Start Game";

  const winText = doc.createElement("img");
  winText.classList.add("win");
  winText.src = "../images/win-banner.png";
  const loseText = doc.createElement("img");
  loseText.classList.add("lose");
  loseText.src = "../images/lose-banner.png";

  divContainer.appendChild(winText);
  divContainer.appendChild(loseText);

  divContainer.appendChild(canvas);
  divContainer.appendChild(restartButton);
  mainDiv.appendChild(divContainer);

  doc.body.appendChild(mainDiv);

  restartButton.addEventListener("click", (e) => {
    if (e.target.innerText == "Start Game") {
      e.target.classList.add("hide");
    }
    winText.classList.remove("show");
    loseText.classList.remove("show");
    player.unfreezing();
  });

  Engine(global);
};
