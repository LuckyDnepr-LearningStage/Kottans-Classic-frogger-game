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

  const testP = doc.createElement("p");
  testP.classList.add("testP");
  testP.innerHTML = "test";
  doc.body.appendChild(testP);

  restartButton.addEventListener("click", (e) => {
    if (e.target.innerText == "Start Game") {
      e.target.classList.add("hide");
    }
    winText.classList.remove("show");
    loseText.classList.remove("show");
    player.unfreezing();
  });
  
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches;             // browser API
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;      
    console.log("xDown " + xDown);
    yDown = firstTouch.clientY;   
    console.log("yDown " + yDown);                                   
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    console.log("xUp " + xUp);
    var yUp = evt.touches[0].clientY;
    console.log("yUp " + xUp);

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0) {
            /* left swipe */ 
            player.handleInput("ArrowLeft");
            testP.innerHTML = "Left swipe";
        } else {
            /* right swipe */
            player.handleInput("ArrowRight");
            testP.innerHTML = "Right swipe";
        }       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            player.handleInput("ArrowUp");
            testP.innerHTML = "Up swipe";
        } else { 
            /* down swipe */
            player.handleInput("ArrowDown");
            testP.innerHTML = "Down swipe";
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

  Engine(global);
};
