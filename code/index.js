// Dom Section
const tempElement = document.getElementById("temp");
const daysForecast = document.querySelectorAll(".day");
const iconsForecast = document.querySelectorAll(".icon");
const tempsForecast = document.querySelectorAll(".temp-forecast");
const windForecast = document.querySelectorAll(".wind-forecast")
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const cityName = document.getElementById("city");
const descriptionEl = document.getElementById("desc");
const windMain = document.getElementById("wind");
const iconMain = document.getElementById("icon-main");
const dateNameToday = document.getElementById("date");
const timeToday = document.getElementById("time");
const mainSection = document.getElementById("main")


const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "64dc0a4bc655c3566178e4cae018559e";
let cityQuery = "Stockholm, Sweden";
const URL = `${baseUrl}q=${cityQuery}&units=metric&APPID=${apiKey}`

// images

const imagesDescriptionMain = {
  "Clear": {
    dayImage: "/code/Images/sun-rays-cloudy-sky.jpg",
    nightImage: "/code/Images/pexels-sanat-anghan-6785277.jpg"
  },
  "Clouds": {
    dayImage: "/code/Images/beautiful-mountains.jpg",
    nightImage: "/code/Images/storm-clouds.jpg"
  },
  "Tornado": {
    dayImage: "/code/Images/pexels-diana-vorobevaattyakova-9305185.jpg",
    nightImage: "/code/Images/pexels-lucas-pezeta-3772353.jpg"
  },
  "Squall": {
    dayImage: "/code/Images/pexels-diana-vorobevaattyakova-9305185.jpg",
    nightImage: "/code/Images/pexels-lucas-pezeta-3772353.jpg"
  },
  "Ash": {
    dayImage: "/code/Images/pexels-diana-vorobevaattyakova-9305185.jpg",
    nightImage: "/code/Images/pexels-lucas-pezeta-3772353.jpg"
  },
  "Dust": {
    dayImage: "/code/Images/pexels-diana-vorobevaattyakova-9305185.jpg",
    nightImage: "/code/Images/pexels-lucas-pezeta-3772353.jpg"
  },
  "Sand": {
    dayImage: "/code/Images/pexels-diana-vorobevaattyakova-9305185.jpg",
    nightImage: "/code/Images/pexels-lucas-pezeta-3772353.jpg"
  },
  "Fog": {
    dayImage: "/code/Images/pexels-diana-vorobevaattyakova-9305185.jpg",
    nightImage: "/code/Images/pexels-lucas-pezeta-3772353.jpg"
  },
  "Haze": {
    dayImage: "/code/Images/pexels-diana-vorobevaattyakova-9305185.jpg",
    nightImage: "/code/Images/pexels-lucas-pezeta-3772353.jpg"
  },
  "Smoke": {
    dayImage: "/code/Images/pexels-diana-vorobevaattyakova-9305185.jpg",
    nightImage: "/code/Images/pexels-lucas-pezeta-3772353.jpg"
  },
  "Mist": {
    dayImage: "/code/Images/pexels-diana-vorobevaattyakova-9305185.jpg",
    nightImage: "/code/Images/pexels-lucas-pezeta-3772353.jpg"
  },
  "Snow": {
    dayImage: "/code/Images/pexels-pixabay-326015.jpg",
    nightImage: "/code/Images/pexels-cameron-casey-2007138.jpg"
  },
  "Rain": {
    dayImage: "/code/Images/pexels-lumn-1410224.jpg",
    nightImage: "/code/Images/blurred-nightlights-city.jpg"
  },
  "Drizzle": {
    dayImage: "/code/Images/pexels-lumn-1410224.jpg",
    nightImage: "/code/Images/blurred-nightlights-city.jpg"
  },
  "Thunderstorm": {
    dayImage: "/code/Images/pexels-ralph-w-lambrecht-1446076.jpg",
    nightImage: "/code/Images/pexels-greg-2418664.jpg"
  }

};



const fetchWeatherAsync = async () => {
  const response = await fetch(URL).catch((err) => console.log("my ERROR", err));
  const data = await response.json()
  console.log(data)
  updateHTML(data)
  
}
fetchWeatherAsync()

// forecast API

const baseAPIForecast = "https://api.openweathermap.org/data/2.5/forecast?";
const URLForecast = `${baseAPIForecast}q=${cityQuery}&units=metric&APPID=${apiKey}`

// dates forecast and today date
const daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date();

const todayWeekDay = daysName[today.getDay()];

date.innerText = todayWeekDay

const nextFiveDAys = [];

for (let index = 1; index < 6; index++) {
  const date = new Date(today);
  
  date.setDate(today.getDate() + index);
  const dayName = daysName[date.getDay()];
  nextFiveDAys.push(dayName)
  
}

daysForecast.forEach((dayForc , index)=>{
  dayForc.innerText = (nextFiveDAys[index]).substr(0,3)
});

// fetch forecast

const fetchForecastAsync = async () =>{
  const responseForecast = await fetch(URLForecast).catch((err)=> console.log("ERROR" , err));
  const data = await responseForecast.json();

  const filteredForecast = data.list.filter((forecast) => {
    return new Date(forecast.dt_txt).getHours() === 12
  })
  console.log(filteredForecast)
  iconsForecast.forEach((icon , index)=>{
    const iconNum = filteredForecast[index].weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconNum}@2x.png`
    
  });
  tempsForecast.forEach((temp , index)=>{
    const temperture = filteredForecast[index].main.temp;
    temp.innerText =`${Math.floor(temperture)} °C` 
  });

  windForecast.forEach((wind , index)=>{
    const windSpeed = filteredForecast[index].wind.speed;
    wind.innerText = `${Math.floor(windSpeed)} m/s`
  })
  
  
 
}
fetchForecastAsync()


const updateHTML = (data) => {

  console.log(data)
  const sunriseMilli = data.sys.sunrise;
  const sunsetMilli = data.sys.sunset;
  const timeZone = data.timezone;
  
  // sunrise and sunset time
  let newSunrise = new Date((sunriseMilli + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], { timeStyle: 'short' ,  hour12: false });

  let newSunset = new Date((sunsetMilli + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], { timeStyle: 'short' ,hour12: false});

  // console.log(newSunrise);
  console.log(newSunset);

  sunrise.innerText = `Sunrise: ${newSunrise}`
  sunset.innerText = `Sunset: ${newSunset}`

  tempElement.innerText =`${Math.floor(data.main.temp)} °C` ;
  windMain.innerText = `${Math.floor(data.wind.speed)} m/s`;
  cityName.innerText = data.name;
  descriptionEl.innerText = data.weather[0].description;
  iconMain.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // time now
  let newTime = new Date((data.dt + timeZone + (new Date().getTimezoneOffset() * 60)) * 1000).toLocaleTimeString([], { timeStyle: 'short', hour12: false });
  console.log(newTime)



timeToday.innerText = newTime;

// images 

const weatherInfo = data.weather[0].main;
const isDaytime = newTime >= newSunrise && newTime < newSunset;
let backgroundImage;


if(weatherInfo === "Clear"){
  backgroundImage = isDaytime ? imagesDescriptionMain.Clear.dayImage : imagesDescriptionMain.Clear.nightImage;

}else if(weatherInfo == "Clouds"){
  backgroundImage = isDaytime ? imagesDescriptionMain.Clouds.dayImage : imagesDescriptionMain.Clouds.nightImage;

}else if (weatherInfo === "Tornado" || weatherInfo === "Squall" || weatherInfo === "Ash" || weatherInfo === "Dust" || weatherInfo === "Sand" || weatherInfo === "Fog" || weatherInfo === "Haze" || weatherInfo === "Smoke" || weatherInfo === "Mist") {
  backgroundImage = isDaytime ? imagesDescriptionMain[weatherInfo].dayImage : imagesDescriptionMain[weatherInfo].nightImage;

} else if (weatherInfo === "Snow") {
  backgroundImage = isDaytime ? imagesDescriptionMain.Snow.dayImage : imagesDescriptionMain.Snow.nightImage;

} else if (weatherInfo === "Rain") {
  backgroundImage = isDaytime ? imagesDescriptionMain.Rain.dayImage : imagesDescriptionMain.Rain.nightImage;

} else if (weatherInfo === "Drizzle") {
  backgroundImage = isDaytime ? imagesDescriptionMain.Drizzle.dayImage : imagesDescriptionMain.Drizzle.nightImage;

} else if (weatherInfo === "Thunderstorm") {
  backgroundImage = isDaytime ? imagesDescriptionMain.Thunderstorm.dayImage : imagesDescriptionMain.Thunderstorm.nightImage;
}
mainSection.style.backgroundImage = `url(${backgroundImage})`

}



