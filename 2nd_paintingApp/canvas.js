

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

const canvas = document.querySelector(".canvas");


const colors = document.querySelector('.colorPicker');

const weightController = document.querySelector('#weightController');

const darkModeToggle = document.querySelector('.checkbox');

const plusBtn = document.querySelector('.plusBtn');

const canvases = document.querySelector('.canvases');

const leftBtn = document.querySelector('.leftBtn');
const rightBtn = document.querySelector('.rightBtn');
// leftBtn.style.visibility = "hidden";
canvas.width = "300";
canvas.height = "300";

let painting = null;
let ctx = canvas.getContext("2d");
let currentPage = canvas;
onCanvas(canvas);

function onCanvas (canvas) {
    
    if (canvas) {
        canvas.addEventListener("mousemove",handleMouseMove);
        canvas.addEventListener("mousedown",() => (painting = true));
        canvas.addEventListener("mouseup",() => (painting = false));
        canvas.addEventListener("mouseleave",() => (painting = false));
    }
}

let num = 1;
plusBtn.addEventListener('click', () => {
    const newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('class',`canvas canvas${num}`);
    newCanvas.width = "300";
    newCanvas.height = "300";
    canvases.appendChild(newCanvas);
    // 현재 페이지에 그려주도록
    ablePaintCurrentPage(newCanvas);
    num++;

    onCanvas(newCanvas);
    currentPage = newCanvas;
})

leftBtn.addEventListener('click', () => {
    console.log(currentPage.className.slice(-1));
    currentPage.style.visibility = "hidden";
    
})

function ablePaintCurrentPage(canvas) {
    ctx = canvas.getContext("2d");
}


Array.from(colors.children).map(color => color.style.backgroundColor = color.dataset.color);


colors.addEventListener('click', e => {
    console.log(e.target);
    ctx.strokeStyle=e.target.style.backgroundColor;
})

weightController.addEventListener('input', (event) => {
    ctx.lineWidth = weightController.value;
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

const body = document.querySelector('body');
darkModeToggle.addEventListener('click', ()=> {
    console.log(darkModeToggle.checked);
    darkModeToggle.checked ? body.style.backgroundPosition = "left" : body.style.backgroundPosition = "right";
})