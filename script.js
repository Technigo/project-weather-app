// APP ID FOR OPEN WEATHER MAP
const appId = "38d8ead396b75510c605134ba40b95f7";
// CHOICE OF UNITS
const units = "metric";
// TO SEARCH FOR A CITY
const searchMethod = "q";

const base_url = `https://api.openweathermap.org/data/2.5/`;

const createSearchString = (type, searchTerm) => {
    return (
        base_url +
        `${type}?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
    );
};

// FETCH API
const searchWeather = (searchTerm) => {
    fetch(createSearchString("weather", searchTerm))
        .then((result) => {
            return result.json();
        })
        .then((result) => {
            findWeather(result);
        });

};

const searchForecast = (searchTerm) => {
    fetch(createSearchString(`forecast`, searchTerm))
        .then((result) => {
            return result.json();
        })
        .then((result) => {
            readForecast(result);
        });
};

// SWITCH STATEMENTS FOR DYNAMIC BACKGROUND
const findWeather = (resultFromServer) => {
    switch (resultFromServer.weather[0].main) {
        case "Clear":
            document.body.style.backgroundImage = 'url("./images/clear.jpg")';
            break;

        case "Clouds":
            document.body.style.backgroundImage = 'url("./images/cloud.jpg")';
            break;

        case "Rain":
            document.body.style.backgroundImage = 'url("./images/rain.jpg")';
            break;

        case "drizzle":
            document.body.style.backgroundImage = 'url("./images/drizzle.jpg")';
            break;

        case "mist":
            document.body.style.backgroundImage = 'url("./images/mist.jpg")';
            break;

        case "Thunderstorm":
            document.body.style.backgroundImage = 'url("./images/storm.jpg")';
            break;

        case "Snow":
            document.body.style.backgroundImage = 'url("./images/snow.jpg")';
            break;

        case "Haze":
            document.body.style.backgroundImage = 'url("./images/haze.jpg")';
            break;

        case "smoke":
            document.body.style.backgroundImage = 'url("./images/smoke.jpg")';
            break;

        case "tornado":
            document.body.style.backgroundImage = 'url("./images/tornado.jpg")';
            break;

        case "fog":
            document.body.style.backgroundImage = 'url("./images/fog.jpg")';
            break;

        default:
            document.body.style.backgroundImage = 'url("./images/default.jpg")';
            break;
    }

    // GET ALL ELEMENTS
    const weatherDescriptionHeader = document.getElementById(
        "weatherDescriptionHeader"
    );
    const temperatureElement = document.getElementById("temperature");

    const windSpeedElement = document.getElementById("windSpeed");

    const humidityElement = document.getElementById("humidity");

    const sunriseTimeElement = document.getElementById("sunrise");

    const sunsetTimeElement = document.getElementById("sunset");

    const CityHeader = document.getElementById("cityHeader");

    const weatherIcon = document.getElementById("documentIconImg");

    //   GET ICONS FROM OPENWEATHER MAP
    weatherIcon.src =
        "https://openweathermap.org/img/w/" +
        resultFromServer.weather[0].icon +
        ".png";

    // WEATHER DESCRIPTION FROM OPENWEATHER MAP
    const resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText =
        resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML =
        Math.floor(resultFromServer.main.temp) + "&#176c";

    windSpeedElement.innerHTML =
        "Winds at " + Math.floor(resultFromServer.wind.speed) + " m/s";

    cityHeader.innerHTML = resultFromServer.name;

    humidityElement.innerHTML =
        "Humidity " + resultFromServer.main.humidity + " %";

    const sunriseTime = new Date(
        resultFromServer.sys.sunrise * 1000
    ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    sunriseTimeElement.innerHTML = "Sunrise: " + sunriseTime;

    const sunsetTime = new Date(
        resultFromServer.sys.sunset * 1000
    ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    sunsetTimeElement.innerHTML = "Sunset: " + sunsetTime;
    setPositionForWeatherInfo();
    input.value = "";
};

// FORECAST FOR 5 DAYS
const readForecast = (json) => {
    const forecastContainer = document.getElementById("forecast");
    const forecastContainer2 = document.getElementById("forecast2");

    // AT 00.00
    const filteredForecast = json.list.filter((item) =>
        item.dt_txt.includes("00:00:00")
    );
    filteredForecast.forEach((forecast) => {
        let forecastElement = document.createElement("div");
        let day = new Date(forecast.dt * 1000).getDay();
        const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        forecastElement.innerHTML = `
            <div id="forecastDays" class="forecastDays">${days[day]}</div>`;
        forecastElement.classList.add(`forecast1`);
        forecastContainer.appendChild(forecastElement);
    });

    const objectDate = {};

    json.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (objectDate[date]) {
            objectDate[date].push(item);
        } else {
            objectDate[date] = [item];
        }
    });

    // AT 12.00
    const filteredForecastNoon = json.list.filter((item) =>
        item.dt_txt.includes("12:00:00"));
    filteredForecastNoon.forEach((forecast) => {
        let forecastElement = document.createElement("div");

        const date = forecast.dt_txt.split(" ")[0];
        const weatherData = objectDate[date];

        const temps = weatherData.map((value) => value.main.temp);

        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);

        forecastElement.innerHTML = `
            <div id="forecastTemp" class="forecastTemp">${minTemp.toFixed(
              0
            )}&#176c  /  ${maxTemp.toFixed(0)}&#176c</div>`;
        forecastElement.classList.add(`forecast2`);
        forecastContainer2.appendChild(forecastElement);
    });
}


// SET POSITION FOR WEATHERINFO CONTAINER
const setPositionForWeatherInfo = () => {
    let weatherContainer = document.getElementById("weatherContainer");
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.5}px)`;
    weatherContainer.style.visibility = "visible";
};

console.log("setPositionForWeatherInfo");

document.getElementById("searchBtn").addEventListener("click", () => {
    let searchTerm = document.getElementById("searchInput").value;
    if (searchTerm) {
        searchWeather(searchTerm);
        searchForecast(searchTerm);
    }
    searchInput.value = "";
});