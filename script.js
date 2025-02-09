const API_KEY = "3f1d93be781264bd8cc85d29d3f67c32";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

const cityId = 2673730; // My city code - Stockholm 

// URL for current weather using city ID 
const weatherURL = `${BASE_URL}?id=${cityId}&units=metric&APPID=${API_KEY}`;

// Fetching current weather data
fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
        const cityName = data.name;
        const temp = data.main.temp.toFixed(1);
        const typeOfWeather = data.weather[0].description;

        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        document.getElementById("location").innerText = `${cityName}`;
        document.getElementById("temperature").innerText = `${temp}°`;
        document.getElementById("weather").innerText = `${typeOfWeather.charAt(0).toUpperCase() + typeOfWeather.slice(1)}`;
        document.getElementById("sunrise").innerText = `${sunriseTime}`;
        document.getElementById("sunset").innerText = `${sunsetTime}`;
    })
    .catch(error => {
        document.getElementById("error").innerText = "Something went wrong.";
        console.error("Error fetching weather data:", error);
    });

// URL for 4-day forecast using city ID
const forecastURL = `${FORECAST_BASE_URL}?id=${cityId}&units=metric&APPID=${API_KEY}`;

// Fetching 4-day forecast data
fetch(forecastURL)
    .then(response => response.json())
    .then(data => {
        const forecastList = document.getElementById("forecast-list");

        // Group forecast data by days and calculate average temperature
        const dailyTemps = {};

        data.list.forEach(forecast => {
            const dateObj = new Date(forecast.dt_txt);  // Create Date object
            const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' }); // Get day name
            const temp = forecast.main.temp;

            if (!dailyTemps[dayOfWeek]) {
                dailyTemps[dayOfWeek] = {
                    totalTemp: temp,
                    count: 1
                };
            } else {
                dailyTemps[dayOfWeek].totalTemp += temp;
                dailyTemps[dayOfWeek].count += 1;
            }
        });

        // Clear any existing forecast data
        forecastList.innerText = "";

        // Display 4-day forecast
        Object.keys(dailyTemps).slice(1, 5).forEach(dayOfWeek => {
            const averageTemp = (dailyTemps[dayOfWeek].totalTemp / dailyTemps[dayOfWeek].count).toFixed(1);

            const forecastItem = document.createElement("p");
            forecastItem.innerHTML = `${dayOfWeek}: ${averageTemp}°`;

            forecastList.appendChild(forecastItem);
        });
    })
    .catch(error => {
        document.getElementById("error").innerText = "Oops something went wrong!"; //This is the error message
        console.error("Error fetching forecast data:", error);
    });
