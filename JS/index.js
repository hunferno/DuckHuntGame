
// -------------------------Getting HTML Elements-------------------------
const startPart = document.getElementById('#startPart');
const startBtn = document.querySelector('#startPart .btn-start');
const huntingField = document.getElementById('huntingSquare');
const duckShapeOne = document.getElementById('duckShapeOne');
const duckShapeTwo = document.getElementById('duckShapeTwo');
const duckOne = document.querySelector('.duckOne');
const duckTwo = document.querySelector('.duckTwo');
const score = document.querySelector('#scorePart .score');
const bulletIcons = document.querySelector("#bulletPart .bullet");
let animationDuckOne = "";
let displayScore = 0;

//------------- Create HTML elements
let spanEl = document.createElement('span');
// console.log(startPart.children);

// ------------------------Generate random positions--------------------
function generatePositionX(random){
    let x = Math.floor(Math.random()*random.clientWidth);
    return x
}
function generatePositionY(random){
    let y = Math.floor(Math.random()*random.clientHeight);
    return y;
}


// ------------------------- Initialize ducks position--------------------
duckOne.style.bottom = "-100px";
duckOne.style.left = `${generatePositionX(huntingField)}px`;
duckTwo.style.bottom = "-100px";
duckTwo.style.left = `${generatePositionX(huntingField)}px`;

// ---------------Animate duck movment----------------
function animateDuckOne(){
    animationDuckOne = anime({
        targets : '.duckOne',
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

function animateDuckTwo(){
    let animationDuckTwo = anime({
        targets : '.duckTwo',
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
            {top:generatePositionY(huntingField), left:-150},
        ],
        duration: 20000,
        easing: 'linear',
        autoplay : true
    });
}


// ---------------Set Score function------------
function setScore(){
    displayScore += 1000;
    return displayScore;
}
    
//---------------When click on Duck1-------------
duckShapeOne.addEventListener("click", function clickOnDucks (){
    let count =0;
    if(count < 3){
        bulletIcons.children[count] == "";
        count++
    }else{};
    setScore();
    duckShapeOne.style.transform = `translateY(${huntingField.clientHeight+150})`;
    score.textContent = displayScore;
});
// //---------------When click on Duck2-------------
duckShapeTwo.addEventListener("click", function clickOnDucks (){
    setScore();
    score.textContent = displayScore;
    bulletIcons.classList.remove("fas", "fa-meteor", "fa-2x");
});

//--------------- Display Timer --------------
function addTimer (){
    startPart.appendChild(spanEl);
    spanEl.classList.add("far", "fa-clock", "fa-3x");
}

//-------------When click on START------------
startBtn.addEventListener("click", function startGame(){
    displayScore = 0;
    score.textContent = "0";
    // startPart.removeChild(startPart.children[0]);
    animateDuckOne();
    animateDuckTwo();


});

