"use strict";

const digitalClock = document.querySelector(".digital__clock");

const PMor24HBtn = document.querySelector(".PMor24Btn");
let PMor24H = PMor24HBtn.innerText;

const analogHour = document.querySelector(".analog__hour");
const analogMinute = document.querySelector(".analog__minute");
const analogSecond = document.querySelector(".analog__second");

let now = new Date();
let hour = addZero(now.getHours());
let minute = addZero(now.getMinutes());
let second = addZero(now.getSeconds());
setInterval(callBack, 1000);

callBack();

PMor24HBtn.addEventListener("click", () => {
  onPMor24BtnClick();
});

function onPMor24BtnClick() {
  if (PMor24H === "PM") {
    PMor24HBtn.innerText = "24H";
    digitalClock.innerText = `${hour} : ${minute} : ${second}`;
    return;
  } else {
    if (hour > 12) {
      digitalClock.innerText = `${addZero(hour - 12)} : ${minute} : ${second}`;
    } else if (hour > 0) {
      digitalClock.innerText = `${hour} : ${minute} : ${second}`;
    } else {
      digitalClock.innerText = `12 : ${minute} : ${second}`;
    }
    PMor24HBtn.innerText = "PM";
  }
}

function callBack() {
  hour = addZero(now.getHours());
  minute = addZero(now.getMinutes());
  second = addZero(now.getSeconds());

  // Top

  // Bottom
  workAnalogClock();
  workDigitalClock();
}

function workDigitalClock() {
  PMor24H = PMor24HBtn.innerText;
  if (PMor24H === "PM") {
    digitalClock.innerText =
      hour > 12
        ? `${addZero(hour - 12)} : ${minute} : ${second}`
        : `${hour} : ${minute} : ${second}`;
    if (hour > 12) {
      digitalClock.innerText = `${addZero(hour - 12)} : ${minute} : ${second}`;
    } else if (hour > 0) {
      digitalClock.innerText = `${hour} : ${minute} : ${second}`;
    } else {
      digitalClock.innerText = `12 : ${minute} : ${second}`;
    }
    // 3가지 케이스로 나누는 것이 잘한건 아닌거같군..!
  } else {
    digitalClock.innerText = `${hour} : ${minute} : ${second}`;
  }
}

function workAnalogClock() {
  const hourToSecond =
    parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second);
  const minuteToSecond = parseInt(minute) * 60 + parseInt(second);

  analogHour.style.webkitTransform = `rotate(${
    (360 * hourToSecond) / 43200
  }deg)`;
  analogHour.style.mozTransform = `rotate(${(360 * hourToSecond) / 43200}deg)`;
  analogHour.style.msTransform = `rotate(${(360 * hourToSecond) / 43200}deg)`;
  analogHour.style.oTransform = `rotate(${(360 * hourToSecond) / 43200}deg)`;
  analogHour.style.transform = `rotate(${(360 * hourToSecond) / 43200}deg)`;

  analogMinute.style.webkitTransform = `rotate(${
    (360 * minuteToSecond) / 3600
  }deg)`;
  analogMinute.style.mozTransform = `rotate(${
    (360 * minuteToSecond) / 3600
  }deg)`;
  analogMinute.style.msTransform = `rotate(${
    (360 * minuteToSecond) / 3600
  }deg)`;
  analogMinute.style.oTransform = `rotate(${(360 * minuteToSecond) / 3600}deg)`;
  analogMinute.style.transform = `rotate(${(360 * minuteToSecond) / 3600}deg)`;

  analogSecond.style.mozTransform = `rotate(${(360 * second) / 60}deg)`;
  analogSecond.style.webkitTransform = `rotate(${(360 * second) / 60}deg)`;
  analogSecond.style.msTransform = `rotate(${(360 * second) / 60}deg)`;
  analogSecond.style.oTransform = `rotate(${(360 * second) / 60}deg)`;
  analogSecond.style.transform = `rotate(${(360 * second) / 60}deg)`;
}

function addZero(num) {
  return num >= 10 ? num : `0${num}`;
}

export default "clock.js";
