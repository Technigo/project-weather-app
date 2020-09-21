const urlWheaterForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=d17c2f3ed50a4604c02f6184b3cf4de6";
const urlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=d17c2f3ed50a4604c02f6184b3cf4de6";

const currentWeatherInfo = document.getElementById("currentWeatherContainer");
const todaysWeatherText = document.getElementById("todaysWeatherContainer");
const forecastInfo = document.getElementById("forecastContainer");

fetch(urlCurrentWeather)
    .then((response) => {
    return response.json();
    })
    .then((weatherArray) => {

        const currentTemperature = weatherArray.main.temp;
        const weatherDescription = weatherArray.weather[0].description;

        const timeOfSunrise = weatherArray.sys.sunrise ;

        const timeOfSunset = new Date(weatherArray.sys.sunset*1000); //varför funkar det med *1000?


        currentWeatherInfo.innerHTML = `<p>${weatherDescription} |</p>`;
        currentWeatherInfo.innerHTML += `<p>${currentTemperature}</p>`;
        currentWeatherInfo.innerHTML += `<p>${timeOfSunrise}</p>`;
        currentWeatherInfo.innerHTML += `<p>${timeOfSunset}</p>`;



    if (weatherArray.weather[0].main === "Clouds"){
    todaysWeatherText.innerHTML = `<h1>Light a fire and get cosy. ${weatherArray.name} is looking grey today.</h1>`
    console.log("funkar")
    }
    else if (weatherArray.weather[0].main === "Rain"){
    todaysWeatherText.innerHTML = `<h1>Don't forget your umbrella. It's wet in ${weatherArray.name} today.</h1>`
    console.log("funkar")
    }
    else {
        console.log("nope")
    }
    })



fetch(urlWheaterForecast)
    .then((response) => {
    return response.json();
    })
    .then((json) => {
        //console.log(json)
    })
    

