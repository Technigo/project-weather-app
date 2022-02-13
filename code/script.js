// create current weather object
let currentWeather = {
    condition: 'string',
    temp: '0° C',
    sunrise: '00:00',
    sunset: '00:00',
};

// create forecast array of objects, will look like this for each day of the week
let forecast = [ 
    {
        dayOfWeek: 'string',
        lowTemp: '0° C',
        highTemp: '0° C',
    }];

// fetch current weather and daily forecast for Stockholm, Sweden
// link to documentation: https://openweathermap.org/api/one-call-api
fetch("https://api.openweathermap.org/data/2.5/onecall?lat=59.33&lon=18.06&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d")
    .then((result) => {
        return result.json(); // returns a promise that something will happen
    })
    .then((data) => {
        setCurrentWeather(data);
        setForecast(data); // calls setCurrentWEather with the data the promise delivers
    })
    .catch((error) => {
        console.log(error); // shows if something went wrong (ex. API key, json formatted incorrectly, etc)
    });

// populate currentWeather object with data from the current weather API
const setCurrentWeather = (data) => {

    currentWeather.condition = data.current.weather[0].main;
    currentWeather.temp = Math.round(data.current.temp) + "° C"; // rounds to nearest integer

    let sunrise = new Date(data.current.sunrise * 1000); // converts unix timestamp
    let sunset = new Date(data.current.sunset * 1000); // converts unix timestamp
    currentWeather.sunrise = sunrise.getHours() + ":" + sunrise.getMinutes(); // displays format 00:00
    currentWeather.sunset = sunset.getHours() + ":" + sunset.getMinutes(); // displays format 00:00

    //more values can be added here

    console.log(currentWeather); // check to see what it looks like
};

// populate forecast array with data from the current weather API
const setForecast = (data) => {

    forecast = []; // clear example object from when array was declared

    data.daily.forEach((day) => {
        let dailyForecast = {
            dayOfWeek: new Date(day.dt * 1000).getDay(), // sunday = 0, might need to be converted
            lowTemp: Math.round(day.temp.min) + "° C",
            highTemp: Math.round(day.temp.max) + "° C",
            // more values can be added here
        };
    forecast.push(dailyForecast)
    });
    console.log(forecast); // check to see what it looks like
};