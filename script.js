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
        return `${date.getHours()}:${date.getMinutes()}`;
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
            temperature: element.main.temp,
            day: weekdays[new Date(element.dt * 1000).getDay()],
        }));

    // Returning an object with all the data we need.
    return {
        city: weatherData.name,
        weatherDescription: weatherData.weather[0].description,
        sunrise: getTimeOfDay(new Date(forecastData.city.sunrise * 1000)),
        sunset: getTimeOfDay(new Date(forecastData.city.sunset * 1000)),
        temperature: weatherData.main.temp,
        forecast: forecast,
    };
};

// Fetching weather data and converted to json.
const getWeather = async () => {
    try {
        const data = await getWeatherData();
        console.log(data)
    } catch (error) {
        console.error(error);
    }
}

getWeather();