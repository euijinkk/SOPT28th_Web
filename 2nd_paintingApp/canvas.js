

// function drawRect(){
//     ctx.fillStyle = "red";
//     ctx.fillRect(100,100,200,200);
//     ctx.strokeStyle = "black";
//     ctx.strokeRect(50,50,200,200);
//     // ctx.    
//     ctx.clearRect(200,200,50,50);
// }

// drawRect();

// function drawPath(){

//     ctx.fillStyle="green";
//     ctx.beginPath();
//     ctx.moveTo(300,300);
//     ctx.lineTo(300,400);
//     ctx.lineTo(400,400);
//     ctx.lineTo(300,300);
//     ctx.closePath();
//     ctx.fill();
// }

// drawPath();

// function drawArc() {
//     const radians = (Math.PI/180)*360;
//     ctx.strokeStyle = "purple";
//     ctx.beginPath();
//     ctx.arc(400,400,60,0,radians,true);
//     ctx.closePath();
//     ctx.stroke();

// }
// drawArc();

// 마우스로 그리기
const canvas = document.querySelector("#canvas");

const ctx = canvas.getContext("2d");

const colors = document.querySelector('.colorPicker');

const weightContoller = document.querySelector('#weightController');

canvas.width = "700";
canvas.height = "700";

let painting = null;

if (canvas) {
    canvas.addEventListener("mousemove",handleMouseMove);
    canvas.addEventListener("mousedown",() => (painting = true));
    canvas.addEventListener("mouseup",() => (painting = false));
    canvas.addEventListener("mouseleave",() => (painting = false));
}

console.log(Array.from(colors.children));
Array.from(colors.children).map(color => console.log(color.dataset.color));
Array.from(colors.children).map(color => color.style.backgroundColor = color.dataset.color);


colors.addEventListener('click', e => {
    console.log(e.target.style.backgroundColor);

    ctx.strokeStyle=e.target.style.backgroundColor;
})

weightContoller.addEventListener('input', (event) => {
    ctx.lineWidth = weightContoller.value;
})


function handleMouseMove(event) {
    const x=event.offsetX;
    const y=event.offsetY;
    // console.log(x)
    // console.log(y)
    if(painting) {
        ctx.lineTo(x,y);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(x,y);
    }

}
