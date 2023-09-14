//Function that gets all the weather data that we need.
const getWeatherData = async () => {
    // Function that returns an API Url for the openweather API.
    const getData = async (endpoint) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/${endpoint}?q=Stockholm,Sweden&units=metric&APPID=966881349119fc14f6f3831c44ff9b53`)
        const data = await response.json()
        return data
    }

    const weatherData = await getData("weather")

    const forecastData = await getData("forecast")

    return {
        city: weatherData.name,
        weatherDescription: weatherData.weather[0].description,
        sunrise: forecastData.city.sunrise,
        sunset: forecastData.city.sunset,
        temperature: weatherData.main.temp,
        forecast: []
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