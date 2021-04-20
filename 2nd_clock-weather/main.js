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
let hour = addZero(now.getHours());
let minute = addZero(now.getMinutes());
let second = addZero(now.getSeconds());

const analogHour = document.querySelector('.analog__hour');
const analogMinute = document.querySelector('.analog__minute');
const analogSecond = document.querySelector('.analog__second');

const dateContainer = document.querySelectorAll('.dateContainer');
let firstDay;
const API_KEY = "f280970da513f11db619fb89747584e2";

const weatherTemperature = document.querySelector(".weather_temperature");
const weatherMain = document.querySelector(".weather_main");
const weatherTemps = document.querySelector(".weather_temps");
const weatherOthers = document.querySelector(".weather_others");
const weatherIcon = document.querySelector('.weather_icon');
callBack();

setInterval(callBack, 1000);

PMor24HBtn.addEventListener(('click'), () => {
    onPMor24BtnClick()
})


function drawWeather(weather) {
    weatherTemperature.innerHTML = `${weather.temp} °C`;
    weatherMain.innerHTML = `${weather.main}`;
    weatherTemps.innerHTML = `<span>Feels:</span> ${weather.tempFeel} °C &nbsp;&nbsp;
      <span>Min:</span> ${weather.tempMin} °C &nbsp;&nbsp;
      <span>Max:</span> ${weather.tempMax} °C`;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="icon" />`;
    if (weather.rain) {
      weatherOthers.innerHTML = `<span>Humidity:</span> ${weather.hum} % &nbsp;&nbsp;
      <span>Rain:</span> ${weather.rain} mm/h &nbsp;&nbsp;
      <span>Wind:</span> ${weather.wind} m/s`;
    } else {
      weatherOthers.innerHTML = `<span>Humidity:</span> ${weather.hum} % &nbsp;&nbsp;
      <span>Wind:</span> ${weather.wind} m/s`;
    }
  }
  
  const getWeatherData = async (lat, lon) => {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const weatherData = await data.json();
    const ABS_ZERO = 273.15; // 이 API에서는 온도에 절대영도를 사용함
    console.log(weatherData);
    const weather = {
      temp: (weatherData.main.temp - ABS_ZERO).toFixed(2),
      tempFeel: (weatherData.main.feels_like - ABS_ZERO).toFixed(2),
      tempMin: (weatherData.main.temp_min - ABS_ZERO).toFixed(2),
      tempMax: (weatherData.main.temp_max - ABS_ZERO).toFixed(2),
      hum: weatherData.main.humidity,
      main: weatherData.weather[0].main,
      wind: weatherData.wind.speed,
      id: weatherData.weather[0].id, // 나중에 아이콘 사용하기 위한 용도
      rain: weatherData.rain ? weatherData.rain["1h"] : null, // 비가 올 때만 데이터가 들어있음
      icon: weatherData.weather[0].icon, // API에서 제공하는 아이콘 번호를 가져옵니다
    };
  
    drawWeather(weather);
  };
  
  const handleError = () => {
    console.log("Failed to get current position");
  };
  
  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
    getWeatherData(latitude, longitude);
  };
  
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  };
  
  getLocation();





function onPMor24BtnClick(){
    if (PMor24H === "PM"){
        PMor24HBtn.innerText = "24H"
        digitalClock.innerText= `${hour} : ${minute} : ${second}`;    
        return;
    } else {
        if (hour > 12) {
            digitalClock.innerText = `${addZero(hour-12)} : ${minute} : ${second}`;
        } else if (hour > 0 ){
            digitalClock.innerText = `${hour} : ${minute} : ${second}`
        } else {
            digitalClock.innerText = `12 : ${minute} : ${second}`
        }
        PMor24HBtn.innerText = "PM";
    }
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

    workAnalogClock()
    workDigitalClock()
    onCalandar()

}

function onCalandar() {
    let firstDate = new Date(now.setDate(now.getDate()-now.getDate()+1))
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
    makeTodayRed()
}

function makeTodayRed () {
    dateContainer[firstDay+date-1].style.color = "red";
    
}

function workDigitalClock() {
    PMor24H = PMor24HBtn.innerText;
    if (PMor24H === "PM"){
        digitalClock.innerText = (hour > 12 ? `${addZero(hour-12)} : ${minute} : ${second}` : `${hour} : ${minute} : ${second}`);
        if (hour > 12) {
            digitalClock.innerText = `${addZero(hour-12)} : ${minute} : ${second}`;
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

function workAnalogClock() {
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
}


function addZero(num) {
    return (num >= 10 ? num : `0${num}`);
}