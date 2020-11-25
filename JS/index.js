
// -------------------------Getting HTML Elements-------------------------
const startPart = document.getElementById('#startPart');
const chrono = document.querySelector('#startPart .far.fa-clock.fa-3x')
const startBtn = document.querySelector('#startPart .btn-start');
const restartBtn = document.querySelector('#startPart .btn-restart');
const huntingField = document.getElementById('huntingSquare');
const duckShapeOne = document.getElementById('duckShapeOne');
const duckShapeTwo = document.getElementById('duckShapeTwo');
const score = document.querySelector('#scorePart .score');
const title = document.querySelector('#huntingSquare .title');
const bulletIcons = document.querySelector("#bulletPart .bullet");
const ducksTogether = document.querySelectorAll("#huntingSquare .duck");

//------------- Create HTML elements
const spanElOne = document.createElement('span');
const spanElTwo = document.createElement('span');
const spanElThree = document.createElement('span');
spanElOne.classList.add("fas", "fa-meteor", "fa-2x")
spanElTwo.classList.add("fas", "fa-meteor", "fa-2x")
spanElThree.classList.add("fas", "fa-meteor", "fa-2x")


// ------------------------- Initialize ducks position--------------------
function initDuckPos(){
    duckShapeOne.style.bottom = "-100px";
    duckShapeOne.style.left = `${generatePositionX(huntingField)}px`;
    duckShapeTwo.style.bottom = "-100px";
    duckShapeTwo.style.left = `${generatePositionX(huntingField)}px`;
}
initDuckPos();

//-------------------------Initialize variables---------------------------
let animationDuck = "";
let refreshTimer = 0;
let displayScore = 0;
let time = 19;
let duckAlive = 2;
let bulletRemaining = 3;

//--------------------Animation with animeJS-------------------
function animation(element){
    animationDuck = anime({
        targets : element,
        keyframes : [
            {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
            {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
            {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
            {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
            {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
            {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
            {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
            {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
            {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
            {top:generatePositionY(huntingField), left:huntingField.clientWidth},
        ],
        duration: 20000,
        easing: 'linear',
        autoplay : true
    });
}

// ------------------------Generate random positions--------------------
function generatePositionX(random){
    let x = Math.floor(Math.random()*random.clientWidth);
    return x
}
function generatePositionY(random){
    let y = Math.floor(Math.random()*random.clientHeight);
    return y;
}

// ---------------Set Score function------------
function setScore(){
    displayScore += 1000;
    return displayScore;
}

//-----------------Display score content-------------
function displayScoreContent (container){
    container.textContent = displayScore;
}

//-----------------Killing ducks-----------------
//Duck 1
function killDuckOne(){
    duckAlive --;
    bulletRemaining--;
    const timerKill = setTimeout(() => {
        duckShapeOne.style.transform = `translateY(1000px)`;
        duckShapeOne.style.transition = `2s ease-out`;
    }, 100);
}
//Duck 2
function killDuckTwo(){
    duckAlive--;
    bulletRemaining--;
    const timerKill = setTimeout(() => {
        duckShapeTwo.style.transform = `translateY(1000px)`;
        duckShapeTwo.style.transition = `2s ease-out`;
    }, 100);
    // if(!duckAlive){console.log("FINITO");}
}

//--------------- Counter Timer --------------
function updateTimer (){
    if(time<10){
        time = "0"+time;
    }else if(time<0){
         time == "0";
    }else{
        time=time;
    }
    chrono.innerHTML = `00:${time}`;
    time--;
}

//---------------------When we Loose----------------
function looseGame() {
    title.innerHTML = "YOU LOOOOOSE";
    title.style.visibility = "visible";
    chrono.style.visibility = "hidden";
    restartBtn.style.visibility = "visible";
    // huntingField.clientWidth+150
    duckShapeOne.style.transform = `translateX(${huntingField.clientWidth+150}px)`;
    duckShapeOne.style.transition = `2s ease-out`;
    duckShapeTwo.style.transform = `translateX(-${huntingField.clientWidth+150}px)`;
    duckShapeTwo.style.transition = `2s ease-out`;
}

//-------------------When we Win--------------------


//-------------When click on playing area-----------------
function gameAreaOnclick(){
    huntingField.addEventListener("click", function(){
        bulletRemaining--;
        bulletIcons.removeChild(bulletIcons.firstElementChild);
        conditionForLoose();
    });
}

//-------------Condition for loose------------------
function conditionForLoose(){
    if(bulletRemaining === 0 && duckAlive){
        looseGame();
        clearInterval(refreshTimer);
        chrono.innerHTML = `00:20`;
        animationDuck.restart;
    }else{
        console.log(`Encore ${bulletRemaining} coups restant`);
    } 
}

//---------------When click on Duck1-------------
duckShapeOne.addEventListener("click", function clickOnDucks (){
    bulletIcons.removeChild(bulletIcons.firstElementChild);
    setScore();
    killDuckOne();
    displayScoreContent(score);
    conditionForLoose();
});

//---------------When click on Duck2-------------
duckShapeTwo.addEventListener("click", function clickOnDucks (){
    bulletIcons.removeChild(bulletIcons.firstElementChild);
    setScore();
    killDuckTwo();
    displayScoreContent(score);
    conditionForLoose();
    // bulletIcons.children.classList.remove("fas", "fa-meteor", "fa-2x");
});

//-------------When click on START btn------------
startBtn.addEventListener("click", function startGame(){
    displayScore = 0;
    score.textContent = "0";
    startBtn.style.visibility = "hidden";
    chrono.style.visibility = "visible";
    title.style.visibility = "hidden";
    animation("#duckShapeOne");
    animation("#duckShapeTwo");
    gameAreaOnclick();
    refreshTimer = setInterval(updateTimer,1000);
});

//------------When click on Restart btn-----------
restartBtn.addEventListener("click", function restartGame(){
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
    setInterval(updateTimer,1000);
})
