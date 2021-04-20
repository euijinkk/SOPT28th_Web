'user strict'


const API_KEY = "f280970da513f11db619fb89747584e2";

const weatherTemperature = document.querySelector(".weather_temperature");
const weatherMain = document.querySelector(".weather_main");
// const weatherTemps = document.querySelector(".weather_temps");
const weatherOthers = document.querySelector(".weather_others");
// const weatherIcon = document.querySelector('.weather_icon');


function drawIcon(id) {
    const skycons = new Skycons({ color: "white", resizeClear: true });
    skycons.add("weather_icon", Skycons.CLOUDY);
  
    const code = parseInt(id / 100); // id 번호에 따라 날씨가 분류됨
    const hour = new Date().getHours();
  
    switch (code) {
      case 2:
        skycons.set("weather_icon", Skycons.WIND);
        break;
      case 3:
      case 5:
        skycons.set("weather_icon", Skycons.RAIN);
        break;
      case 6:
        skycons.set("weather_icon", Skycons.SNOW);
        break;
      case 7:
        skycons.set("weather_icon", Skycons.FOG);
        break;
      case 8:
        switch (id) {
          case 800:
            if (hour >= 6 && hour <= 17)
              skycons.set("weather_icon", Skycons.CLEAR_DAY);
            else skycons.set("weather_icon", Skycons.CLEAR_NIGHT);
            break;
          case 801:
          case 802:
            if (hour >= 6 && hour <= 17)
              skycons.set("weather_icon", Skycons.PARTLY_CLOUDY_DAY);
            else skycons.set("weather_icon", Skycons.PARTLY_CLOUDY_NIGHT);
            break;
          case 803:
          case 804:
            skycons.set("weather_icon", Skycons.CLOUDY);
            break;
        }
        break;
      default:
        skycons.set("weather_icon", Skycons.SLEET);
        break;
    }
    skycons.play();
  };

function drawWeather(weather) {
    weatherTemperature.innerHTML = `${weather.temp} °C`;
    weatherMain.innerHTML = `${weather.main}`;
    // weatherTemps.innerHTML = `<span>Feels:</span> ${weather.tempFeel} °C &nbsp;&nbsp;
    //   <span>Min:</span> ${weather.tempMin} °C &nbsp;&nbsp;
    //   <span>Max:</span> ${weather.tempMax} °C`;
    // weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="icon" />`;
    if (weather.rain) {
      weatherOthers.innerHTML = `
      <div><span>Feels:</span> ${weather.tempFeel} °C</div>
      <div><span>Min:</span> ${weather.tempMin} °C</div>
      <div><span>Max:</span> ${weather.tempMax} °C</div>
      <div><span>Humidity:</span> ${weather.hum} %</div>
      <div><span>Rain:</span> ${weather.rain} mm/h</div>
      <div><span>Wind:</span> ${weather.wind} m/s</div>`;
    } else {
      weatherOthers.innerHTML = `
      <div><span>Feels:</span> ${weather.tempFeel} °C </div>
      <div><span>Min:</span> ${weather.tempMin} °C </div>
      <div><span>Max:</span> ${weather.tempMax} °C </div>
      <div><span>Humidity:</span> ${weather.hum} % </div>
      <div><span>Wind:</span> ${weather.wind} m/s</div>`;
    }
    drawIcon(weather.id);
  }
  
  async function getWeatherData(lat, lon) {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const weatherData = await data.json();
    const ABS_ZERO = 273.15; // 이 API에서는 온도에 절대영도를 사용함
    // console.log(weatherData);
    const weather = {
      temp: (weatherData.main.temp - ABS_ZERO).toFixed(2),
      tempFeel: (weatherData.main.feels_like - ABS_ZERO).toFixed(2),
      tempMin: (weatherData.main.temp_min - ABS_ZERO).toFixed(2),
      tempMax: (weatherData.main.temp_max - ABS_ZERO).toFixed(2),
      hum: weatherData.main.humidity,
      main: weatherData.weather[0].main,
      wind: weatherData.wind.speed,
      id: weatherData.weather[0].id, // for skycons
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
    // console.log(latitude, longitude);
    getWeatherData(latitude, longitude);
  };
  
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  };
  
  getLocation();


export default 'weather.js';