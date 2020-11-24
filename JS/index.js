const huntingField = document.getElementById('huntingSquare');
const duckShape = document.getElementById('duckShape');

// console.log(duckShape.);


// // Generate Random position
function generatePositionX(random){
    let x = Math.floor(Math.random()*random.clientWidth);
    return x
}
function generatePositionY(random){
    let y = Math.floor(Math.random()*random.clientHeight);
    return y;
}
// console.log (generatePositionX(huntingField));
console.log (huntingField.addEventListener("click", client));

duckShape.style.top = `${generatePositionY(huntingField)}px`;
duckShape.style.left = `${generatePositionX(huntingField)}px`;
// duckShape.style.top = `50`;

// console.log (duckShape.getBoundingClientRect().y);

// huntingField.addEventListener('click', (el)=>{
//     let duckDetection = duckShape.getBoundingClientRect();
//     if (duckShape.getBoundingClientRect)
// });