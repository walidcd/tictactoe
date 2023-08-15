let cells = document.getElementsByClassName("cell");
let gameTitle = document.getElementsByTagName("h1");

let game = new Object({
  player1: "player1",
  player2: "player2",
  round: 0,
  updateround: function () {
    round++;
  },
  player1score: 0,
  player2score: 0,
  tiescore: 0,
});

xscore = 0;
oscore = 0;

let a = 0;
let arr = [];
let gameEnded = false;
let winningpos = [];

function play() {
  Array.from(cells).forEach((ele) =>
    ele.addEventListener("click", function (e) {
      if (ele.classList.contains("occupied")) {
        e.preventDefault();
      } else {
        ele.classList.add("occupied");
        img = document.createElement("img");
        if (a % 2 === 0) {
          img.src = "./close.png";
          img.style.height = "50%";

          let mycellid = ele.id;
          let mycell = document.getElementById(mycellid);
          mycell.appendChild(img);
          a++;
          ele.classList.add("x");
          arr[mycellid - 1] = "x";
          if (iswinner(arr)) {
            winninganimation();
            setTimeout(() => {
              gameend(`${game.player1} WON`);
            }, 500);
            xscore++;
            console.log(winningpos);
          }
        } else {
          img.src = "./circle-ring.png";
          img.style.height = "50%";
          let mycellid = ele.id;
          let mycell = document.getElementById(mycellid);
          mycell.appendChild(img);
          a++;
          ele.classList.add("o");
          arr[mycellid - 1] = "o";
          if (iswinner(arr)) {
            winninganimation();
            setTimeout(() => {
              gameend(`${game.player1} WON`);
            }, 500);
            oscore++;
            console.log(winningpos);
          }
        }
      }
      console.log(isTie(arr));
      if (isTie(arr) && !gameEnded) {
        gameend("IT'S TIE");
        game.tiescore++;
        gameEnded = true; // Set the flag to true
      }
    })
  );
}

function newGame() {
  let gameGrid = document.getElementById("gamediv");
  Array.from(cells).forEach(function (ele) {
    ele.innerHTML = "";
    ele.classList.remove(...ele.classList);
    ele.classList.add("cell");
  });
}

function validcolumn(myarr) {
  for (let i = 0; i < 3; i++) {
    if (!(typeof arr[i] == "undefined")) {
      if (myarr[i] === myarr[i + 3] && myarr[i] === myarr[i + 6]) {
        winningpos.push(i, i + 3, i + 6);
        return true;
      }
    }
  }
}

function validline(myarr) {
  for (let i = 0; i < 3; i++) {
    if (!(typeof myarr[3 * i] === "undefined")) {
      if (
        myarr[3 * i] === myarr[3 * i + 1] &&
        myarr[3 * i] === myarr[3 * i + 2]
      ) {
        winningpos.push(3 * i, 3 * i + 1, 3 * i + 2);
        return true;
      }
    }
  }
}

function validdiagonal(myarr) {
  if (!(typeof myarr[2] === "undefined")) {
    if (myarr[2] === myarr[4] && myarr[2] === myarr[6]) {
      winningpos.push(2, 4, 6);
      return true;
    }
  }
  if (!(typeof myarr[0] === "undefined")) {
    if (myarr[0] === myarr[4] && myarr[0] === myarr[8]) {
      winningpos.push(0, 4, 8);
      return true;
    }
  }
}

function iswinner(myarr) {
  return validdiagonal(myarr) || validline(myarr) || validcolumn(myarr);
}

let endDisplay = document.createElement("div");

let endTextDiv = document.createElement("div");
let endText = document.createElement("h3");

let endContinueDiv = document.createElement("div");
let endContinue = document.createElement("button");

let endFinishDiv = document.createElement("div");
let endFinish = document.createElement("button");

function gameend(y) {
  endDisplay.classList.add("endDisplay");

  endText.textContent = y;
  endText.classList.add("endText");
  endTextDiv.classList.add("endTextDiv");

  endContinue.textContent = "CONTINUE";
  endContinue.classList.add("endContinue");
  endContinueDiv.classList.add("endContinueDiv");

  endFinish.textContent = "FINISH";
  endFinish.classList.add("endFinish");
  endFinishDiv.classList.add("endFinishDiv");

  endContinueDiv.appendChild(endContinue);
  endTextDiv.appendChild(endText);
  endFinishDiv.appendChild(endFinish);

  document.body.appendChild(endDisplay);

  endDisplay.appendChild(endTextDiv);
  endDisplay.appendChild(endContinueDiv);
  endDisplay.appendChild(endFinishDiv);
}

let loadScreen = document.createElement("div");

let loadTextDiv = document.createElement("div");
let loadText = document.createElement("h2");

let firstPlayerDiv = document.createElement("div");
let firstPlayer = document.createElement("input");

let secondPlayerDiv = document.createElement("div");
let secondPlayer = document.createElement("input");

let startBtnDiv = document.createElement("div");
let startbtn = document.createElement("button");

function loadscreen() {
  loadScreen.classList.add("loadScreen");

  loadText.textContent = "WELCOME !";
  loadText.classList.add("loadText");
  loadTextDiv.classList.add("loadTextDiv");

  firstPlayer.value = "PLAYER_1";
  firstPlayer.classList.add("firstPlayer");
  firstPlayerDiv.classList.add("firstPlayerDiv");
  firstPlayer.type = "text";

  secondPlayer.value = "PLAYER_2";
  secondPlayer.classList.add("secondPlayer");
  secondPlayerDiv.classList.add("secondPlayerDiv");
  secondPlayer.type = "text";

  startbtn.textContent = "START";
  startbtn.id = "startbtn";
  startBtnDiv.classList.add("startBtnDiv");

  firstPlayerDiv.appendChild(firstPlayer);
  loadTextDiv.appendChild(loadText);
  secondPlayerDiv.appendChild(secondPlayer);
  startBtnDiv.appendChild(startbtn);

  document.body.appendChild(loadScreen);

  loadScreen.appendChild(loadTextDiv);
  loadScreen.appendChild(firstPlayerDiv);
  loadScreen.appendChild(secondPlayerDiv);
  loadScreen.appendChild(startBtnDiv);
}

let xscorediv = document.getElementById("xscore");
let oscorediv = document.getElementById("oscore");
let tiediv = document.getElementById("tie");

function updatescore() {
  xscorediv.textContent = xscore;
  oscorediv.textContent = oscore;
  tiediv.textContent = game.tiescore;
}

endContinue.addEventListener("click", function () {
  game.round++;
  console.log(game.round);
  console.log(xscore);
  updatescore();
  a = game.round % 2 === 0 ? 0 : 1;
  arr = [];
  winningpos = [];
  endDisplay.remove();
  gameEnded = false; // Reset the flag

  newGame();
  play();
});

endFinish.addEventListener("click", gamefinish);

window.onload = function () {
  loadscreen();
};

startbtn.addEventListener("click", function () {
  loadScreen.remove();
  play();
  game.player1 = firstPlayer.value.toUpperCase();
  game.player2 = secondPlayer.value.toUpperCase();
  let player1name = document.getElementById("player1");
  let player2name = document.getElementById("player2");
  player1name.textContent = game.player1;
  player2name.textContent = game.player2;
});

function isTie(myarr) {
  return (
    myarr.filter((ele) => ele !== undefined).length === 9 && !iswinner(myarr)
  );
}

firstPlayer.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    firstPlayer.blur();
    secondPlayer.focus();
  }
});

firstPlayer.addEventListener("click", function () {
  firstPlayer.select();
});

secondPlayer.addEventListener("click", function () {
  secondPlayer.select();
});

let finishTextDiv = document.createElement("div");
let finishText = document.createElement("h2");

let finishDisplay = document.createElement("div");

function gamefinish() {
  updatescore();
  console.log("suziiiii");
  endDisplay.remove();
  finishDisplay.classList.add("finishDisplay");
  let winner;
  winner = xscore > oscore ? game.player1 : game.player2;
  let txt;
  txt =
    xscore === oscore
      ? `GAME END <br> <br> IT'S TIE <br> <br> ${game.player1} : ${xscore}           ${game.player2} : ${oscore}`
      : `GAME END <br> <br> ${winner} WON <br> <br> ${game.player1} : ${xscore}           ${game.player2} : ${oscore}`;
  console.log(xscore);
  console.log(oscore);

  finishText.innerHTML = txt;
  finishText.classList.add("finishText");
  finishTextDiv.classList.add("finishTextDiv");
  document.body.appendChild(finishDisplay);
  finishTextDiv.appendChild(finishText);
  finishDisplay.appendChild(finishTextDiv);
}

finishDisplay.addEventListener("click", function () {
  game.round = 0;
  xscore = 0;
  oscore = 0;
  game.tiescore = 0;
  console.log(game.round);
  console.log(xscore);
  a = 0;
  arr = [];
  winningpos = [];
  finishDisplay.remove();
  updatescore();
  newGame();
  play();
});

function winninganimation() {
  let win;
  winningpos
    .map((ele) => ele + 1)
    .forEach(function (o) {
      win = document.getElementById(o);
      win.firstElementChild.classList.add("winning");
    });

  // After a specific duration (e.g., 3000 milliseconds), remove the animation class
  setTimeout(() => {
    winningpos
      .map((ele) => ele + 1)
      .forEach(function (o) {
        win = document.getElementById(o);
        win.firstElementChild.classList.remove("winning");
      });
  }, 3000); // Adjust the duration as needed
}
