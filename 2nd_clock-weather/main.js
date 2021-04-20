'use strict'

const textCalandar = document.querySelector('.top');
const dateSpan = document.querySelector('.date');
const monthSpan = document.querySelector('.month');
const yearSpan = document.querySelector('.year');

const digitalClock = document.querySelector('.digital__clock');


const MONTH_NAME = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const PMor24HBtn = document.querySelector('.PMor24Btn');
let PMor24H = PMor24HBtn.innerText;

let now = new Date()

let year = now.getFullYear();
let month = now.getMonth();
let date = now.getDate();
let day = now.getDay();
let hour = now.getHours();
let minute = now.getMinutes();
let second = now.getSeconds();

const analogHour = document.querySelector('.analog__hour');
const analogMinute = document.querySelector('.analog__minute');
const analogSecond = document.querySelector('.analog__second');


callBack();

setInterval(callBack, 1000);

PMor24HBtn.addEventListener(('click'), (event) => {
    // PMor24H = event.target.innerText;
    if (PMor24H === "PM"){
        event.target.innerText = "24H"
        digitalClock.innerText= `${hour} : ${minute} : ${second}`;    
        return;
    } else {
        if (hour > 12) {
            digitalClock.innerText = `${hour-12} : ${minute} : ${second}`;
        } else if (hour > 0 ){
            digitalClock.innerText = `${hour} : ${minute} : ${second}`
        } else {
            digitalClock.innerText = `12 : ${minute} : ${second}`
        }
        event.target.innerText = "PM";
    }
})

// 60s , 3600s , 43200s
function rotate(hand, time) {
    if (time === 'hour') {
        let numerator = 43200;
    } else if (time ==='minute') {
        let numerator = 3600;
    } else if (time === 'second') {
        let numerator = 60;
    } else {
        return
    }
    // hand.style.transform = `rotate()`
}

function callBack() {

    now = new Date() 

    year = now.getFullYear();
    month = now.getMonth();
    date = now.getDate();
    day = now.getDay();
    hour = addZero(now.getHours());
    minute = addZero(now.getMinutes());
    second = addZero(now.getSeconds());

    // calandar
    dateSpan.innerText = `${date}`;
    monthSpan.innerText =  `${MONTH_NAME[month]},`;
    yearSpan.innerText = `${year}`;

    const hourToSecond = parseInt(hour)*3600+parseInt(minute)*60+parseInt(second)
    const minuteToSecond = parseInt(minute)*60+parseInt(second)
    
    analogHour.style.webkitTransform = `rotate(${360*hourToSecond/43200}deg)`; 
    analogHour.style.mozTransform    = `rotate(${360*hourToSecond/43200}deg)`;
    analogHour.style.msTransform     = `rotate(${360*hourToSecond/43200}deg)`;
    analogHour.style.oTransform      = `rotate(${360*hourToSecond/43200}deg)`;
    analogHour.style.transform       = `rotate(${360*hourToSecond/43200}deg)`;

    analogMinute.style.webkitTransform = `rotate(${360*minuteToSecond/3600}deg)`; 
    analogMinute.style.mozTransform    = `rotate(${360*minuteToSecond/3600}deg)`;
    analogMinute.style.msTransform     = `rotate(${360*minuteToSecond/3600}deg)`;
    analogMinute.style.oTransform      = `rotate(${360*minuteToSecond/3600}deg)`;
    analogMinute.style.transform       = `rotate(${360*minuteToSecond/3600}deg)`;

    analogSecond.style.mozTransform    = `rotate(${360*second/60}deg)`;
    analogSecond.style.webkitTransform = `rotate(${360*second/60}deg)`; 
    analogSecond.style.msTransform     = `rotate(${360*second/60}deg)`;
    analogSecond.style.oTransform      = `rotate(${360*second/60}deg)`;
    analogSecond.style.transform       = `rotate(${360*second/60}deg)`;

    // console.log(360*hourToSecond/43200);
    // console.log(analogHour.style);

    // digital - clock
    PMor24H = PMor24HBtn.innerText;
    if (PMor24H === "PM"){
        digitalClock.innerText = (hour > 12 ? `${hour-12} : ${minute} : ${second}` : `${hour} : ${minute} : ${second}`);
        if (hour > 12) {
            digitalClock.innerText = `${hour-12} : ${minute} : ${second}`;
        } else if (hour > 0 ){
            digitalClock.innerText = `${hour} : ${minute} : ${second}`
        } else {
            digitalClock.innerText = `12 : ${minute} : ${second}`
        }
        // 3가지 케이스로 나누는 것이 잘한건 아닌거같군..!
    } else {
        digitalClock.innerText= `${hour} : ${minute} : ${second}`;   
    }

    
}




function addZero(num) {
    return (num >= 10 ? num : `0${num}`);
}