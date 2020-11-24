
// -------------------------Getting HTML Elements-------------------------
const huntingField = document.getElementById('huntingSquare');
const duckShape = document.getElementById('duckShape');
const duckOne = document.querySelector('.duckOne');
const duckTwo = document.querySelector('.duckTwo');



// ------------------------Generate random positions--------------------
function generatePositionX(random){
    let x = Math.floor(Math.random()*random.clientWidth);
    console.log(x);
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


// // --------------------------Random Translate coordonate (transition)------------------
// let translate3dValue = `translate3d(${generatePositionX(huntingField)}px, -${generatePositionY(huntingField)}px, 0)`;


// // ----------------------------assign moving coordonate (transition)-----------------
// function moving(){
//     let width = 90;
//     let id = setInterval(frame, 1000);
//     function frame(){
//         if (width==100){
//             clearInterval(id);
//         }else{
//             console.log('yo');
//             duckShape.style.transform = translate3dValue;
//             width++;
//         }
//     }
// }


// ---------------Animate duck movment----------------
let animationDuckOne = anime({
    targets : '.duckOne',
    keyframes : [
        {top:generatePositionY(huntingField), left:generatePositionX(huntingField), transform: 'scaleX(-1)'},
        {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
        {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
        {top:generatePositionY(huntingField), left:generatePositionX(huntingField), transform: 'scaleX(-1)'},
        {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
        {top:generatePositionY(huntingField), left:generatePositionX(huntingField), transform: 'scaleX(-1)'},
        {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
        {top:generatePositionY(huntingField), left:generatePositionX(huntingField)},
        {top:generatePositionY(huntingField), left:generatePositionX(huntingField), transform: 'scaleX(-1)'},
        {top:generatePositionY(huntingField), left:huntingField.clientWidth+150},
    ],
    duration: 30000,
    easing: 'linear',
    autoplay : false
});
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
    autoplay : false
});

duckShape.onclick = ()=> alert("Je t'ai eu");


