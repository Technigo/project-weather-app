const urlWeatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=d17c2f3ed50a4604c02f6184b3cf4de6";
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
    const currentTemperatureRounded = Math.round(currentTemperature);
    const weatherDescription = weatherArray.weather[0].description;

    const timeOfSunrise = new Date (weatherArray.sys.sunrise * 1000);
    const timeOfSunriseString = timeOfSunrise.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    const timeOfSunset = new Date(weatherArray.sys.sunset * 1000);
    const timeOfSunsetString = timeOfSunset.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

    currentWeatherInfo.innerHTML = `<p>${weatherDescription} |</p>`;
    currentWeatherInfo.innerHTML += `<p>${currentTemperatureRounded}°</p>`;
    currentWeatherInfo.innerHTML += `<p>sunrise ${timeOfSunriseString}</p>`;
    currentWeatherInfo.innerHTML += `<p>sunset ${timeOfSunsetString}</p>`;

    console.log(weatherArray)
    if (weatherArray.weather[0].main === "Clouds"){
        todaysWeatherText.innerHTML = `<h1>Light a fire and get cosy. ${weatherArray.name} is looking grey today.</h1>`
        console.log("funkarMoln")
    }
    else if (weatherArray.weather[0].main === "Rain"){
        todaysWeatherText.innerHTML = `<h1>Don't forget your umbrella. It's wet in ${weatherArray.name} today.</h1>`
        todaysWeatherText.style.background = "#F47775"; 
        console.log("funkarRegn")
    }
    else if (weatherArray.weather[0].main === "Sun"){
        todaysWeatherText.innerHTML = `<h1>Get your sunnies on. ${weatherArray.name} is looking rather great today.</h1>`
        console.log("funkarSol")
    }
    else {
        console.log("annat väder")
    } 
    })


fetch(urlWeatherForecast)
    .then((response) => {
    return response.json();
    })
    .then((forecastArray) => {
         //filter out the forecasts for 12.00 
        const filteredForecast = forecastArray.list.filter(item => item.dt_txt.includes("12:00:00"))
        
        filteredForecast.forEach((forecastDay) => {
            forecastInfo.innerHTML += generateHTMLForForecast(forecastDay);
        });
   
    });

const generateHTMLForForecast = (day) => {
    const weekday = day.dt
    const weekdayShortFormat = new Date (weekday * 1000);
    const weekdayDateString = weekdayShortFormat.toLocaleDateString([],{weekday: "short"})
    const temperature = day.main.temp;
    const temperatureRounded = Math.round(temperature)
    console.log(temperatureRounded)
    let forecastHTML = " ";
    forecastHTML += `${weekdayDateString} `
    forecastHTML += `${temperatureRounded}° `
   
    return forecastHTML;
    
}