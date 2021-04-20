'use strict'

const textCalandar = document.querySelector('.top');
const dateSpan = document.querySelector('.date');
const monthSpan = document.querySelector('.month');
const yearSpan = document.querySelector('.year');

const MONTH_NAME = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let now = new Date()
console.log(now);
let year = now.getFullYear();
let month = now.getMonth();
let date = now.getDate();
let day = now.getDay();


const calandarMonth = document.querySelector('.calandar__month');
const calandarYear = document.querySelector('.calandar__year');


const beforeMonthBtn = document.querySelector('.beforeMonth');
const afterMonthBtn = document.querySelector('.afterMonth');


const dateContainer = document.querySelectorAll('.dateContainer');
let firstDay;


let tempNow = new Date();
// let tempNow = now;
// 아,,, Date 는 객체구나. 참조값에 의해 계속해서 변경된다..!!
let tempMonth = month;
let tempYear = year;

let redDate;


// Top - text 로 날짜 보여주기
dateSpan.innerText = date;
monthSpan.innerText =  MONTH_NAME[month];
yearSpan.innerText = year;

// Bottom - calandar로 날짜 보여주기

onCalandar(month, year);

beforeMonthBtn.addEventListener('click', () => {
    tempNow = new Date(tempNow.setMonth(tempMonth-1));
    tempMonth = tempNow.getMonth();
    tempYear = tempNow.getFullYear();
    Array.from(dateContainer, date => date.innerText = "");
    // NodeList에 map을 적용하는 방법 
    // dateContainer.map(date => data.innerText = "");
    onCalandar(tempMonth, tempYear);
})

afterMonthBtn.addEventListener('click', () => {
    tempNow = new Date(tempNow.setMonth(tempMonth+1));
    tempMonth = tempNow.getMonth();
    tempYear = tempNow.getFullYear();
    Array.from(dateContainer, date => date.innerText = "");
    // NodeList에 map을 적용하는 방법 
    // dateContainer.map(date => data.innerText = "");
    onCalandar(tempMonth, tempYear);
})

function onCalandar(month, year) {
    calandarMonth.innerText = MONTH_NAME[month];
    calandarYear.innerText = `, ${year}`;

    // 1일의 요일을 찾자.
    let firstDate = new Date(tempNow.setDate(tempNow.getDate()-tempNow.getDate()+1))
    firstDay = firstDate.getDay();
    
    // 말일 
    let lastDate;
    if (month+1 ===1 || 
        month+1 ===3 || 
        month+1 ===5 || 
        month+1 ===7 || 
        month+1 ===8 || 
        month+1 ===10 || 
        month+1 ===12) {
        lastDate = 31;
    } else if (month+1 ===4 || 
                month+1 ===6 || 
                month+1 ===9 || 
                month+1 ===11) {
        lastDate= 30;
    } else  {
        if (year%4 !==0) {
            lastDate=28;
        } else {
            lastDate=29;
        }
    }
    
    for (let i=1; i<=lastDate; i++) {
        dateContainer[firstDay+i-1].innerText = i;
    }
    console.log(now);
    console.log(`month: ${now.getMonth()}`);
    console.log(`tempMonth: ${tempMonth}`);
    if (now.getMonth() === month && now.getFullYear() === year) {
        // makeTodayRed ()
        redDate = firstDay+date-1;
        dateContainer[redDate].style.color = "red";
    } else {
        dateContainer[redDate].style.color = "white";
    }
}

export default 'calandar.js';