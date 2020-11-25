
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
let spanEl = document.createElement('span');
// console.log(startPart.children);

// ------------------------- Initialize ducks position--------------------
duckShapeOne.style.bottom = "-100px";
duckShapeOne.style.left = `${generatePositionX(huntingField)}px`;
duckShapeTwo.style.bottom = "-100px";
duckShapeTwo.style.left = `${generatePositionX(huntingField)}px`;

//-------------------------Initialize variables---------------------------
let displayScore = 0;
let time = 19;
let duckAlive = 2;
let bulletRemaining = 3;

//--------------------Animation with animeJS-------------------
function animation(element){
    let animationDuckOne = anime({
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
            {top:generatePositionY(huntingField), left:huntingField.clientWidth+150},
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
    title.innerHTML = "YOU LOOOOOOOSE";
    title.style.visibility = "visible";
    chrono.style.visibility = "hidden";
    restartBtn.style.visibility = "visible";
}

//-------------------When we Win--------------------

//-------------When click on playing area-----------------
// function gameArea (){
//     huntingField.addEventListener("click", function(eachClick){
//         let counter = 0;
//         if (let i =0; i<bulletIcons.length; i++)
//     });
// }


//---------------When click on Duck1-------------
duckShapeOne.addEventListener("click", function clickOnDucks (){
    bulletIcons.removeChild(bulletIcons.firstElementChild);
    setScore();
    killDuckOne();
    displayScoreContent(score);
});
// //---------------When click on Duck2-------------
duckShapeTwo.addEventListener("click", function clickOnDucks (){
    bulletIcons.removeChild(bulletIcons.firstElementChild);
    setScore();
    killDuckTwo();
    displayScoreContent(score);
    // bulletIcons.children.classList.remove("fas", "fa-meteor", "fa-2x");
});


//-------------When click on START------------
startBtn.addEventListener("click", function startGame(){
    displayScore = 0;
    score.textContent = "0";
    startBtn.style.visibility = "hidden";
    chrono.style.visibility = "visible";
    title.style.visibility = "hidden";
    animation("#duckShapeOne");
    animation("#duckShapeTwo");
    const countingDown = setInterval(updateTimer,1000);
});

if(1+2==3){
    console.log("You Loose");
}



