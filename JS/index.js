
// -------------------------Getting HTML Elements-------------------------
const startPart = document.getElementById('#startPart');
const chrono = document.querySelector('#startPart .far.fa-clock.fa-3x')
const startBtn = document.querySelector('#startPart .btn-start');
const huntingField = document.getElementById('huntingSquare');
const duckShapeOne = document.getElementById('duckShapeOne');
const duckShapeTwo = document.getElementById('duckShapeTwo');
const score = document.querySelector('#scorePart .score');
const bulletIcons = document.querySelector("#bulletPart .bullet");
let displayScore = 0;

//------------- Create HTML elements
let spanEl = document.createElement('span');
// console.log(startPart.children);

// ------------------------- Initialize ducks position--------------------
duckShapeOne.style.bottom = "-100px";
duckShapeOne.style.left = `${generatePositionX(huntingField)}px`;
duckShapeTwo.style.bottom = "-100px";
duckShapeTwo.style.left = `${generatePositionX(huntingField)}px`;

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
    const timerKill = setTimeout(() => {
        duckShapeOne.style.transform = `translateY(1000px)`;
        duckShapeOne.style.transition = `2s ease-out`;
    }, 100);
}
//Duck 2
function killDuckTwo(){
    const timerKill = setTimeout(() => {
        duckShapeTwo.style.transform = `translateY(1000px)`;
        duckShapeTwo.style.transition = `2s ease-out`;
    }, 100);
}

//--------------- Display Timer --------------
function addTimer (){
    startPart.appendChild(spanEl);
    spanEl.classList.add("far", "fa-clock", "fa-3x");
}

//---------------When click on Duck1-------------
duckShapeOne.addEventListener("click", function clickOnDucks (){
    let count =0;
    if(count < 3){
        bulletIcons.children[count] == "";
        count++
    }else{};
    setScore();
    killDuckOne();
    displayScoreContent(score);
});
// //---------------When click on Duck2-------------
duckShapeTwo.addEventListener("click", function clickOnDucks (){
    setScore();
    killDuckTwo();
    displayScoreContent(score);
    bulletIcons.classList.remove("fas", "fa-meteor", "fa-2x");
});


//-------------When click on START------------
startBtn.addEventListener("click", function startGame(){
    displayScore = 0;
    score.textContent = "0";
    startBtn.style.visibility = "hidden";
    chrono.style.visibility = "visible";
    animation("#duckShapeOne");
    animation("#duckShapeTwo");
    setTimeout(() => {
        anime.pause;
    }, 10000);
});

