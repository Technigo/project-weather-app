const urlWeatherForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=d17c2f3ed50a4604c02f6184b3cf4de6";
const urlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=d17c2f3ed50a4604c02f6184b3cf4de6";

const currentWeatherInfo = document.getElementById("currentWeatherContainer");
const todaysWeatherContainer = document.getElementById("todaysWeatherContainer");
const forecastContainer = document.getElementById("forecastContainer");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const body = document.querySelector("body");

//fetch for current weather
fetch(urlCurrentWeather)
    .then((response) => {
    return response.json();
    })
    .then((weatherArray) => {
    
    const currentTemperature = weatherArray.main.temp;
    const currentTemperatureRounded = Math.round(currentTemperature);
    const weatherDescription = weatherArray.weather[0].description;
    const mainWeather = weatherArray.weather[0].main;

    const timeOfSunrise = new Date (weatherArray.sys.sunrise * 1000);
    const timeOfSunriseString = timeOfSunrise.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    const timeOfSunset = new Date(weatherArray.sys.sunset * 1000);
    const timeOfSunsetString = timeOfSunset.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    
    sunrise.innerHTML = `${timeOfSunriseString}`;
    sunset.innerHTML = `${timeOfSunsetString}`;
    currentWeatherInfo.innerHTML += `<div class="current-weather">`;
    currentWeatherInfo.innerHTML += `<p>${weatherDescription} | ${currentTemperatureRounded}°</p>`;
    currentWeatherInfo.innerHTML += `</div>`;
    
    //invoking function to change background image, text and img depending on main weather
    changeWeatherDesign(mainWeather, weatherArray);

    });

//fetch for 5 days forecast
fetch(urlWeatherForecast)
    .then((response) => {
    return response.json();
    })
    .then((forecastArray) => {
         //filter out the forecasts for 12.00 
        const filteredForecast = forecastArray.list.filter(item => item.dt_txt.includes("12:00:00"));
        
        filteredForecast.forEach((forecastDay) => {
            forecastContainer.innerHTML += generateHTMLForForecast(forecastDay);
        });
    });

const generateHTMLForForecast = (day) => {
    const weekday = day.dt;
    const weekdayShortFormat = new Date (weekday * 1000);
    const weekdayDateString = weekdayShortFormat.toLocaleDateString([],{weekday: "short"});
    const temperature = day.main.temp;
    const temperatureRounded = Math.round(temperature);

    let forecastHTML = " ";
    forecastHTML += `<div class="forecast-information">
                        <p>${weekdayDateString}</p>
                        <p>${temperatureRounded}°</p>
                    </div>`;
   
    return forecastHTML;
}

//function to change background image, text and img depending on main weather
const changeWeatherDesign = ((mainWeather, weatherArray) => {
    if (mainWeather === "Clouds"){
        //adding text and image
        todaysWeatherContainer.innerHTML += `<div>`;
        todaysWeatherContainer.innerHTML += `<h1>Light a fire and get cosy. ${weatherArray.name} is looking grey today.</h1>`;
        todaysWeatherContainer.innerHTML += `<img src="icons/nounCloud.png">`; 
        todaysWeatherContainer.innerHTML += `</div>`;
        //color styling
    
        body.style.background = "#F4F7F8";
        body.style.color = "#F47775";
    }
    else if (mainWeather === "Rain"){
        todaysWeatherContainer.innerHTML += `<div>`;
        todaysWeatherContainer.innerHTML += `<h1>Don't forget your umbrella. It's wet in ${weatherArray.name} today.</h1>`;
        todaysWeatherContainer.innerHTML += `<img src="icons/nounUmbrella.png">`; 
        todaysWeatherContainer.innerHTML += `</div>`;

        body.style.background = "#A3DEF7";
        body.style.color = "#164A68";
    }
    else if (mainWeather === "Clear"){
        todaysWeatherContainer.innerHTML += `<div>`;
        todaysWeatherContainer.innerHTML += `<h1>Get your sunnies on. ${weatherArray.name} is looking rather great today.</h1>`;
        todaysWeatherContainer.innerHTML += `<img src="icons/nounSunglasses.png">`; 
        todaysWeatherContainer.innerHTML += `</div>`;

        body.style.background = "#F7E9B9";
        body.style.color = "#2A5510";
    }
    else if (mainWeather === "Snow"){
        todaysWeatherContainer.innerHTML += `<div>`;
        todaysWeatherContainer.innerHTML += `<h1>Snow in ${weatherArray.name} today!</h1>`;
        todaysWeatherContainer.innerHTML += `<img src="icons/snow.png">`; 
        todaysWeatherContainer.innerHTML += `</div>`;

        body.style.background = "#46afcf";
        body.style.color = "#fafafa";
    }
    else if (mainWeather === "Drizzle"){
        todaysWeatherContainer.innerHTML += `<div>`;
        todaysWeatherContainer.innerHTML += 
        `<h1>It is drizzling today in ${weatherArray.name}</h1>`;
        todaysWeatherContainer.innerHTML += `<img src="icons/nounUmbrella.png">`; 
        todaysWeatherContainer.innerHTML += `</div>`;

        body.style.background = "#A3DEF7";
        body.style.color = "#164A68";
    }
    else if (mainWeather === "Thunderstorm"){
        todaysWeatherContainer.innerHTML += `<div>`;
        todaysWeatherContainer.innerHTML += `<h1>Watch out ${weatherArray.name}! Thunderstorm today!</h1>`;
        todaysWeatherContainer.innerHTML += `<img src="icons/storm.png">`; 
        todaysWeatherContainer.innerHTML += `</div>`;

        body.style.background = "#c9aed1";
        body.style.color = "#5c4f5e";
    }
    else {
        todaysWeatherContainer.innerHTML += `<div>`;
        todaysWeatherContainer.innerHTML += `<h1>I ${weatherArray.name} finns det inget dåligt väder - bara dåliga kläder!</h1>`;
        todaysWeatherContainer.innerHTML += `<img src="icons/rainbow.png">`; 
        todaysWeatherContainer.innerHTML += `</div>`;

        body.style.background = "#c9af9e";
        body.style.color = "#fafafa";
    } 
})