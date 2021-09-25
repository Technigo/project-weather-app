const API_URL_STOCKHOLM =
    "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";
const API_URL_BERLIN =
    "https://api.openweathermap.org/data/2.5/weather?q=Berlin,Germany&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";
const API_URL_COPENHAGEN =
    "https://api.openweathermap.org/data/2.5/weather?q=Copenhagen,Germany&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";
const API_URL_FORECAST_STOCKHOLM =
    "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";
const API_URL_FORECAST_BERLIN =
    "https://api.openweathermap.org/data/2.5/forecast?q=Berlin,Germany&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";
const API_URL_FORECAST_COPENHAGEN =
    "https://api.openweathermap.org/data/2.5/forecast?q=Copenhagen,Sweden&units=metric&APPID=7678391e67f390dcfc1cc2681209fd22";

const body = document.getElementById("body");
const weatherContainer = document.getElementById("weather-container");
const currentWeather = document.getElementById("currentWeatherSunrise");
const cityName = document.getElementById("cityName");
const weatherForecast = document.getElementById("weatherForecast");
const buttonCity = document.getElementById("button");
const image = document.getElementById("imageButton");

const getWeather = (data) => {
    const temperature = Math.round(data.main.temp * 10) / 10;
    // Sunrise
    const sunriseHours = new Date(data.sys.sunrise * 1000)
        .getHours();
    const sunriseMinutes = new Date(data.sys.sunrise * 1000)
        .getMinutes();
    // Sunset
    const sunsetHours = new Date(data.sys.sunset * 1000)
        .getHours();
    const sunsetMinutes = new Date(data.sys.sunset * 1000)
        .getMinutes();

    currentWeather.innerHTML += `<h3 class="current-statements">${data.weather[0].main} | ${temperature}°</h3>`;
    currentWeather.innerHTML += `<h3 class="current-statements">sunrise 0${sunriseHours}.${sunriseMinutes}</h3>`;
    currentWeather.innerHTML += `<h3 class="current-statements">sunset ${sunsetHours}.${sunsetMinutes}</h3>`;
    currentWeather.innerHTML += `<h3 class="current-statements">wind ${Math.round(data.wind.speed)} m/s</h3>`
    const changeRecomendation = () => {
        if (data.weather[0].main === "Clear") {
            cityName.innerHTML += /*html*/ `
                <img src="/Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="Sunglasses icon">
                <h1>Get your sunnies on.</h1>
                <h1>${data.name} is looking rather great today.</h1>
                `;
            document.body.style.backgroundColor = "#f7e9b9";
            document.body.style.color = "#2a5510";
            buttonCity.style.background =
                'url("/Designs/buttons_weatherapp/button_sunny.svg")';
        } else if (data.weather[0].main === "Rain") {
            cityName.innerHTML += /*html*/ `
                <img src="/Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="Rain icon"/>
                <h1>Don't forget your umbrella. </h1>
                <h1>It's wet in ${data.name} today.</h1>
                `;
            document.body.style.backgroundColor = "#A3DEF7";
            document.body.style.color = "#164A68";
            buttonCity.style.background =
                'url("/Designs/buttons_weatherapp/button_rain.svg")';
        } else if (data.weather[0].main === "Clouds") {
            cityName.innerHTML += /*html*/ `
                <img src="/Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="Clound icon"/>
                <h1>Light a fire and get cosy. </h1>
                <h1>${data.name} is looking grey today.</h1>
                `;
            document.body.style.backgroundColor = "#F4F7F8";
            document.body.style.color = "#F47775";
            buttonCity.style.background =
                'url("/Designs/buttons_weatherapp/button_clouds.svg")';
        } else {
            cityName.innerHTML += /*html*/ `
                <img src="/Designs/Design-2/icons/noun_Other_862C4D.svg" alt="Unpredictable weather icon"/>
                <h1>Prepare for everything! </h1>
                <h1>${data.name} is unpredictable today.</h1>
                `;
            document.body.style.backgroundColor = "#BFE2E0";
            document.body.style.color = "#862C4D";
            buttonCity.style.background =
                'url("/Designs/buttons_weatherapp/button_other.svg")';
        }
    };
    changeRecomendation();
};

const getForecast = (data) => {
    const tempForecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00")
    ); // array

    const tempForecastFiveDays = tempForecast.map((listItem) => {
        console.log(listItem.main.temp);
        const dateVariable = new Date(listItem.dt * 1000).getDay(); // gives us 2 as today is tuesday
        const now = new Date().getDay()
        const isToday = dateVariable === now
        const arrayOfWeekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        const weekdayName = arrayOfWeekdays[dateVariable]; //arrayofWeekdays[2]
        if (!isToday) {
            return (weatherForecast.innerHTML += `<div class="week-wrap"><div class="week-day"><h1> ${weekdayName} </h1></div> 
      <div class="week-temp"><h1>${Math.round(
                listItem.main.temp
            )}°</h1></div></div>
        `)
        };
    });
};

// const testWeatherStockholm = fetch(API_URL_STOCKHOLM);
// const testForecastStockholm = fetch(API_URL_FORECAST_STOCKHOLM);
// we tried to implement Promise.all, but then the fetch distroyed the button flow
// const fetchWeatherStockholm = () => {
//   // we tried but it did not work
//   Promise.all([testWeatherStockholm, testForecastStockholm])
//     .then((responses) => {
//       console.log(responses);
//       const arrayOfResponses = responses.map((responses) => responses.json());
//       console.log(arrayOfResponses);
//       return Promise.all(arrayOfResponses);
//     })
//     .then((data) => {
//       console.log(data);
//       getWeather(data[0]);
//       getForecast(data[1]);
//     });
// };

const fetchWeatherStockholm = () => {
    fetch(API_URL_STOCKHOLM)
        .then((response) => response.json())
        .then((data) => {
            getWeather(data)
            console.log(data)
        })
        .catch((error) => console.error("error", error));
    fetch(API_URL_FORECAST_STOCKHOLM)
        .then((response) => response.json())
        .then((data) => {
            getForecast(data)
            console.log(data)
        });
};

const fetchWeatherBerlin = () => {
    fetch(API_URL_BERLIN)
        .then((response) => response.json())
        .then((data) => getWeather(data));
    fetch(API_URL_FORECAST_BERLIN)
        .then((response) => response.json())
        .then((data) => getForecast(data));
};

const fetchWeatherCopenhagen = () => {
    fetch(API_URL_COPENHAGEN)
        .then((response) => response.json())
        .then((data) => getWeather(data));
    fetch(API_URL_FORECAST_COPENHAGEN)
        .then((response) => response.json())
        .then((data) => getForecast(data));
};

let click = 1;

buttonCity.addEventListener("click", () => {
    if (click === 1) {
        fetchWeatherBerlin();
        click = 2;
        currentWeather.innerHTML = "";
        cityName.innerHTML = "";
        weatherForecast.innerHTML = "";
    } else if (click === 2) {
        fetchWeatherCopenhagen();
        click = 3;
        currentWeather.innerHTML = "";
        cityName.innerHTML = "";
        weatherForecast.innerHTML = "";
    } else {
        fetchWeatherStockholm();
        currentWeather.innerHTML = "";
        cityName.innerHTML = "";
        weatherForecast.innerHTML = "";
        click = 1;
    }
});

// invoke the function when it starts
fetchWeatherStockholm();
