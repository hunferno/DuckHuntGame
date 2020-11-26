// -------------------------Getting HTML Elements-------------------------
const startPart = document.getElementById("#startPart");
const chrono = document.querySelector("#startPart .far.fa-clock.fa-3x");
const startBtn = document.querySelector("#startPart .btn-start");
const restartBtn = document.querySelector("#startPart .btn-restart");
const huntingField = document.getElementById("huntingSquare");
const duckShapeOne = document.getElementById("duckShapeOne");
const duckShapeTwo = document.getElementById("duckShapeTwo");
const score = document.querySelector("#scorePart .score");
const title = document.querySelector("#huntingSquare .title");
const bulletIcons = document.querySelector("#bulletPart .bullet");
const ducksTogether = document.querySelectorAll("#huntingSquare .duck");

//------------- Create HTML elements
const spanElOne = document.createElement("span");
const spanElTwo = document.createElement("span");
const spanElThree = document.createElement("span");
spanElOne.classList.add("fas", "fa-meteor", "fa-2x");
spanElTwo.classList.add("fas", "fa-meteor", "fa-2x");
spanElThree.classList.add("fas", "fa-meteor", "fa-2x");

// ------------------------- Initialize ducks position--------------------
function initDuckPos() {
  duckShapeOne.style.bottom = "-100px";
  duckShapeOne.style.left = `${generatePositionX(huntingField)}px`;
  duckShapeTwo.style.bottom = "-100px";
  duckShapeTwo.style.left = `${generatePositionX(huntingField)}px`;
}
initDuckPos();

//-------------------------Initialize variables---------------------------
let animationDuck = {};
let refreshTimer = 0;
let displayScore = 0;
let time = 19;
let duckAlive = 2;
let bulletRemaining = 3;

//--------------------Animation with animeJS-------------------
function animation(element) {
  animationDuck = anime({
    targets: element,
    keyframes: [
      {
        top: generatePositionY(huntingField),
        left: generatePositionX(huntingField),
      },
      {
        top: generatePositionY(huntingField),
        left: generatePositionX(huntingField),
      },
      {
        top: generatePositionY(huntingField),
        left: generatePositionX(huntingField),
      },
      {
        top: generatePositionY(huntingField),
        left: generatePositionX(huntingField),
      },
      {
        top: generatePositionY(huntingField),
        left: generatePositionX(huntingField),
      },
      {
        top: generatePositionY(huntingField),
        left: generatePositionX(huntingField),
      },
      {
        top: generatePositionY(huntingField),
        left: generatePositionX(huntingField),
      },
      {
        top: generatePositionY(huntingField),
        left: generatePositionX(huntingField),
      },
      {
        top: generatePositionY(huntingField),
        left: generatePositionX(huntingField),
      },
      { top: generatePositionY(huntingField), left: huntingField.clientWidth },
    ],
    duration: 20000,
    easing: "linear",
    autoplay: true,
  });
}

// ------------------------Generate random positions--------------------
function generatePositionX(random) {
  let x = Math.floor(Math.random() * random.clientWidth);
  return x;
}
function generatePositionY(random) {
  let y = Math.floor(Math.random() * random.clientHeight);
  return y;
}

// ---------------Set Score function------------
function setScore() {
  displayScore += 1000;
  return displayScore;
}

//-----------------Display score content-------------
function displayScoreContent(container) {
  container.textContent = displayScore;
}

//-----------------Killing ducks-----------------
// kill
function kill(duck) {
  duck.style.transform = `translateY(1000px)`;
  duck.style.transition = `2s ease-out`;
}

//--------------- Uptade Counter Timer --------------
function looseTime() {
  if (time < 10) {
    time = "0" + time;
  } else {
    time = time;
  }
  chrono.innerHTML = `00:${time}`;
  time--;
}

//-------------------Condition for Win--------------------
function conditionForWin() {
  // if ((bulletRemaining === 0 && duckAlive >= 1) || time === -1) {
  //   looseGame();
  //   clearInterval(refreshTimer);
  //   chrono.innerHTML = `00:20`;
  // } else {
  //   console.log(`Il reste encore ${bulletRemaining} coups`);
  // }
}

//-------------------When we Win--------------------
function winGame() {
  //   title.innerHTML = "YOU LOOOOOSE";
  //   title.style.visibility = "visible";
  //   chrono.style.visibility = "hidden";
  //   restartBtn.style.visibility = "visible";
  //   duckShapeOne.style.transform = `translateX(${
  //     huntingField.clientWidth + 150
  //   }px)`;
  //   duckShapeOne.style.transition = `2s ease-out`;
  //   duckShapeTwo.style.transform = `translateX(-${
  //     huntingField.clientWidth + 150
  //   }px)`;
  //   duckShapeTwo.style.transition = `2s ease-out`;
}

//-------------Condition for loose------------------
function conditionForLoose() {
  if ((bulletRemaining === 0 && duckAlive >= 1) || time === -1) {
    looseGame();
    clearInterval(refreshTimer);
    chrono.innerHTML = `00:20`;
  } else {
    console.log(`Il reste encore ${bulletRemaining} coups`);
  }
}

//---------------------When we Loose----------------
function looseGame() {
  title.innerHTML = "YOU LOOOOOSE";
  title.style.visibility = "visible";
  chrono.style.visibility = "hidden";
  restartBtn.style.visibility = "visible";

  duckShapeOne.style.transform = `translateX(${
    huntingField.clientWidth + 150
  }px)`;
  duckShapeOne.style.transition = `2s ease-out`;
  duckShapeTwo.style.transform = `translateX(-${
    huntingField.clientWidth + 150
  }px)`;
  duckShapeTwo.style.transition = `2s ease-out`;
}

function looseBullet() {
  bulletIcons.removeChild(bulletIcons.firstElementChild);
  bulletRemaining--;
}

[duckShapeOne, duckShapeTwo].forEach((duck) => {
  duck.onclick = () => {
    looseBullet();
    setScore();
    kill(duck);
    displayScoreContent(score);
    conditionForLoose();
  };
});

//-------------When click on playing area-----------------
function gameAreaOnclick() {
  huntingField.onclick = (evt) => {
    if (!evt.target.classList.contains("duck")) looseBullet();
    conditionForLoose();
  };
}

//-------------When click on START btn------------
startBtn.addEventListener("click", function startGame() {
  displayScore = 0;
  score.textContent = "0";
  startBtn.style.visibility = "hidden";
  chrono.style.visibility = "visible";
  title.style.visibility = "hidden";
  animation("#duckShapeOne");
  animation("#duckShapeTwo");
  gameAreaOnclick();
  refreshTimer = setInterval(looseTime, 1000);
  setInterval(conditionForLoose, 500);
});

//------------When click on Restart btn-----------
restartBtn.addEventListener("click", function restartGame() {
  initDuckPos();
  bulletRemaining = 3;
  duckAlive = 2;
  time = 19;
  displayScore = 0;
  score.textContent = "0";
  bulletIcons.appendChild(spanElOne);
  bulletIcons.appendChild(spanElTwo);
  bulletIcons.appendChild(spanElThree);
  restartBtn.style.visibility = "hidden";
  chrono.style.visibility = "visible";
  title.style.visibility = "hidden";
  animation("#duckShapeOne");
  animation("#duckShapeTwo");
  gameAreaOnclick();
  refreshTimer = setInterval(looseTime, 1000);
  setInterval(conditionForLoose, 500);
});
