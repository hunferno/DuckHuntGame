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
const description = document.querySelector("#huntingSquare .description");

//------------- Create HTML elements
const spanElOne = document.createElement("span");
const spanElTwo = document.createElement("span");
const spanElThree = document.createElement("span");
spanElOne.classList.add("fas", "fa-meteor", "fa-2x");
spanElTwo.classList.add("fas", "fa-meteor", "fa-2x");
spanElThree.classList.add("fas", "fa-meteor", "fa-2x");
const duckOne = document.createElement("div");
const duckTwo = document.createElement("div");
duckOne.classList.add("duck");
duckTwo.classList.add("duck");
duckOne.id = "duckShapeOne";
duckTwo.id = "duckShapeTwo";

//-------------------------Initialize variables---------------------------
let animationDuck;
let refreshRound;
let mySound;
let displayScore = 0;
let time = 19;
let duckAlive = 2;
let bulletRemaining = 3;
let intervalID;
let difficulty = 0;
//------------------------Create 2 ducks------------------
function addingDucks() {
  huntingSquare.appendChild(duckOne);
  huntingSquare.appendChild(duckTwo);
}

// ------------------------- Initialize ducks position--------------------
function initDuckPos() {
  duckShapeOne.style.bottom = "-100px";
  duckShapeOne.style.left = `${generatePositionX(huntingField)}px`;
  duckShapeTwo.style.bottom = "-100px";
  duckShapeTwo.style.left = `${generatePositionX(huntingField)}px`;
}
initDuckPos();

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

//-----------------ADDING BULLET------------------
function addingBullets() {
  bulletIcons.appendChild(spanElOne);
  bulletIcons.appendChild(spanElTwo);
  bulletIcons.appendChild(spanElThree);
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
function kill(duck) {
  huntingField.removeChild(duck);
}

//--------------- Uptade Counter Timer --------------
function looseTime() {
  console.trace();
  if (time < 10) {
    time = "0" + time;
  } else {
    time = time;
  }
  chrono.innerHTML = `00:${time}`;
  time--;
}

//-------------RESET ELEMENTS---------------
function resetElements() {
  bulletRemaining = 3;
  duckAlive = 2;
  time = 19;
}

//-------------Condition for loose------------------
function conditionForLoose() {
  if ((bulletRemaining == 0 && duckAlive >= 1) || time < 0) {
    clearInterval(intervalID);
    difficulty = 0;
    console.log("loose");
    chrono.innerHTML = ``;
    playSoundLoose();
    mySound.pause();
    looseGame();
  } else if (time > 0 && duckAlive == 0) {
    clearInterval(intervalID);
    chrono.innerHTML = ``;
    console.log("win");
    difficulty += 3;
    winGame();
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
  translateDuck(duckShapeOne);
  translateDuck(duckShapeTwo);
  //   translateDuck(duckOne);
  //   translateDuck(duckTwo);
}

//-------------------When we Win--------------------
function winGame() {
  title.innerHTML = "NEXT ROUND";
  title.style.visibility = "visible";
  resetElements();
  refreshRound = setTimeout(function () {
    title.style.visibility = "hidden";
    initDuckPos();
    addingBullets();
    addingDucks();
    animation("#duckShapeOne");
    animation("#duckShapeTwo");
    gameAreaOnclick();
    if (difficulty > 15) {
      time = time - 15;
    } else {
      time = time - difficulty;
    }
    clearInterval(intervalID);
    intervalID = setInterval(looping, 1000);
  }, 3000);
}

function translateDuck(duck) {
  duck.style.transform = `translateX(${huntingField.clientWidth + 150}px)`;
  duck.style.transition = `2s ease-out`;
}

duckShapeOne.onclick = () => duckTouch(duckShapeOne);
duckShapeTwo.onclick = () => duckTouch(duckShapeTwo);
duckOne.onclick = () => duckTouch(duckOne);
duckTwo.onclick = () => duckTouch(duckTwo);

//-------------For loosing bullet----------------
function looseBullet() {
  bulletIcons.removeChild(bulletIcons.firstElementChild);
  bulletRemaining--;
}

//-------------Duck touch----------------
function duckTouch(duck) {
  duckAlive--;
  playSoundShoot();
  looseBullet();
  setScore();
  kill(duck);
  displayScoreContent(score);
  conditionForLoose();
  console.log(duckAlive);
}

function looping(params) {
  looseTime();
  conditionForLoose();
}

//-------------When click on playing area-----------------
function gameAreaOnclick() {
  huntingField.onclick = (evt) => {
    if (!evt.target.classList.contains("duck")) looseBullet();
    playSoundShoot();
    conditionForLoose();
  };
}

//-------------When click on START btn------------
startBtn.addEventListener("click", function () {
  displayScore = 0;
  score.textContent = "0";
  startBtn.style.visibility = "hidden";
  chrono.style.visibility = "visible";
  title.style.visibility = "hidden";
  description.style.visibility = "hidden";
  initDuckPos();
  addingBullets();
  animation("#duckShapeOne");
  animation("#duckShapeTwo");
  gameAreaOnclick();
  clearInterval(intervalID);
  intervalID = setInterval(looping, 1000);
  playSoundGame();
});

function playSoundGame() {
  mySound = new Audio("../sounds/gameMusic.mp3");
  mySound.play();
  mySound.loop = true;
}
function playSoundShoot() {
  const mySoundShoot = new Audio("../sounds/shoot.wav");
  mySoundShoot.play();
}
function playSoundLoose() {
  const mySoundLoose = new Audio("../sounds/looser.wav");
  mySoundLoose.play();
}
//------------When click on Restart btn-----------
restartBtn.addEventListener("click", function () {
  playSoundGame();
  //   document.location.reload();
  displayScore = 0;
  score.textContent = "0";
  restartBtn.style.visibility = "hidden";
  chrono.style.visibility = "visible";
  title.style.visibility = "hidden";
  resetElements();
  addingBullets();
  addingDucks();
  initDuckPos();
  animation("#duckShapeOne");
  animation("#duckShapeTwo");
  gameAreaOnclick();
  clearInterval(intervalID);
  intervalID = setInterval(looping, 1000);
});
