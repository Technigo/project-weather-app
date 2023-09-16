// Function that gets all the weather data that we need.
const getWeatherData = async () => {
    // Function that returns an API Url for the openweather API.
    const getData = async (endpoint) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/${endpoint}?q=Stockholm,Sweden&units=metric&APPID=966881349119fc14f6f3831c44ff9b53`);
        const data = await response.json();
        return data;
    }

    // Function that returns the time in hours and minutes.
    const getTimeOfDay = (date) => {
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }

    // Variables that returns weather and forecast data.
    const weatherData = await getData("weather");
    const forecastData = await getData("forecast");

    const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    // Gets all the elements in list where the time of day is 2.PM.
    // Map only the fields we need instead of getting the whole object.
    // Convert the js day using the index to get the weekday. 
    const forecast = forecastData.list
        .filter((element) => new Date(element.dt * 1000).getHours() === 14)
        .map((element) => ({
            temperature: element.main.temp.toFixed(1),
            day: weekdays[new Date(element.dt * 1000).getDay()],
        }));

    // Returning an object with all the data we need.
    return {
        city: weatherData.name,
        weatherDescription: weatherData.weather[0].main,
        sunrise: getTimeOfDay(new Date(forecastData.city.sunrise * 1000)),
        sunset: getTimeOfDay(new Date(forecastData.city.sunset * 1000)),
        temperature: weatherData.main.temp.toFixed(1),
        forecast: forecast,
    };
};

// Fetching weather data and converted to json.
const getWeather = async () => {
    try {
        const data = await getWeatherData();

        // Fill upper section with data.
        document.getElementById("current-weather").innerText = `${data.weatherDescription} | ${data.temperature}°`;
        document.getElementById("sunrise").innerText = `Sunrise ${data.sunrise}`;
        document.getElementById("sunset").innerText = `Sunset ${data.sunset}`;

        // Declare variables needed for middle section.
        let bodyClassName;
        let iconSource;
        let greeting;

        // Changing greeting, icon and background color based on current weather.
        if (data.weatherDescription.includes("Clouds")) {
            bodyClassName = "cloudy";
            iconSource = "/icons/cloud.svg";
            greeting = `Light a fire and get cozy. ${data.city} is looking grey today.`;
        } else if (data.weatherDescription.includes("Rain")) {
            bodyClassName = "rainy";
            iconSource = "/icons/umbrella.svg";
            greeting = `Don´t forget your umbrella. It´s wet in ${data.city} today.`;
        } else {
            bodyClassName = "sunny";
            iconSource = "/icons/sunglasses.svg";
            greeting = `Get your sunnies on! ${data.city} is looking pretty awesome today.`;
        }

        // Updating the DOM elements based on weather data.
        document.getElementById("weather-icon").src = iconSource;
        document.getElementById("greeting").innerText = greeting;
        document.body.className = bodyClassName;

        //Fill bottom section with forecast data.
        const forecastWrapper = document.getElementById("forecast-wrapper");
        data.forecast.forEach(element => {
            forecastWrapper.innerHTML += `
            <div class="forecast">
                <p>${element.day}</p>
                <p>${element.temperature}°</p>
            </div>
            `;
        });

        // Hiding loading sceen and show the weather.
        document.getElementById("loading-symbol").style.display = "none";
        document.getElementById("weather-information").style.display = "block";
    } catch {
        // Hide the spinner and display an error message.
        document.getElementById("loading-spinner").style.display = "none";
        document.getElementById("loading-text").innerText = "I´m sorry, but I can´t get the weather right now ... 😭";
    }
}

// Delay invocation of the getWeather function with 700ms.
setTimeout(getWeather, 700);