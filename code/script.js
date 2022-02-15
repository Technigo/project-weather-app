// this will be removed if to-do idea is implemented
const stockholmUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=59.33&lon=18.06&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d'

// TO-DO IDEA: select city to be displayed from a drop down menu
// Create a select city options menu
// Give each option (city) a value equal to its coordinates in the exact format the api url needs
    // ex. for Stockholm value = "lat=59.33&lon=18.06"
    // ex. for Seattle value = "lat=47.60&lon=-122.33"
// Declare a function that is called with a select menu event listener (ie with "change")
    // use the selected city's value to populate the url with its coordinates
    // ex. let url =  `https://api.openweathermap.org/data/2.5/onecall?${value}&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d`
    // call a function that includes fetch which takes url as an argument
        // requires moving everything fetch is doing into a function
        // everything else continues per usual after that

// fetch current and daily forecast for Stockholm, link to documentation: https://openweathermap.org/api/one-call-api
fetch(stockholmUrl)
.then((result) => {
    return result.json(); // returns a promise that something will happen
})
.then((data) => {

    let currentWeather = formatCurrentWeather(data); // calls function with the data the promise delivers
    updateCurrentWeatherDisplay(currentWeather); // updates display when data is ready

    let forecast = formatForecast(data); // calls function with the data the promise delivers
    updateForecastDisplay(forecast); // updates display when data is ready

    })
    .catch((error) => {
        console.log(error); // shows if something went wrong (ex. API key, json formatted incorrectly, etc)
    });

// populate currentWeather object with data from the current weather API
const formatCurrentWeather = (data) => {

    // create a template of current weather object which updates with data fetched from the api
    let currentWeather = {
        // this is the structure that the object will have once populated:
        condition: 'string',
        temp: '0° C',
        sunrise: '00:00',
        sunset: '00:00',
    }

    currentWeather.condition = data.current.weather[0].main;
    currentWeather.temp = Math.round(data.current.temp) + "° C"; // rounds to nearest integer

    let sunrise = new Date(data.current.sunrise * 1000); // converts unix timestamp to milliseconds
    let sunset = new Date(data.current.sunset * 1000); // converts unix timestamp to milliseconds
    currentWeather.sunrise = sunrise.toLocaleString("en-SE", {hour: "numeric", minute: "numeric", timeZone: data.timezone}) // displays HH:MM in the correct timezone
    currentWeather.sunset = sunset.toLocaleString("en-SE", {hour: "numeric", minute: "numeric", timeZone: data.timezone}) // displays HH:MM in the correct timezone

    // more values can be added here

    console.log(currentWeather); // checks to see what it looks like
    return currentWeather;
};

// populate forecast array with data from the current weather API
const formatForecast = (data) => {

    // template of forecast array of objects, will look like this for each day of the week
    // will get updated when data is fetched from api
    let forecast = [ 
        //{
        // start with empty array of objects, will look something like this
        // dayOfWeek: 'string',
        // lowTemp: '0° C',
        // highTemp: '0° C',
        //}
    ];

    let numberToDay = { // getDay() will return integer between 0-6, we'll want english names to replace with
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
    };

    data.daily.forEach((day) => {
        let dailyForecast = {
            dayOfWeek: numberToDay[new Date(day.dt * 1000).getDay()], // converts number to english name
            lowTemp: Math.round(day.temp.min) + "° C", // rounds to nearest integer
            highTemp: Math.round(day.temp.max) + "° C", // rounds to nearest integer
            // more values can be added here
        };
    forecast.push(dailyForecast) // adds object for each day to the forecast array
    });

    console.log(forecast); // checks to see what it looks like
    return forecast;
};


/* ------------------------ START FROM HERE ------------------------*/

// this function is already called when the data is available 
const updateCurrentWeatherDisplay = () => {
    // TO-DO use currentWeather object to update values in the html elements
}

// this function is already called when the data is available 
const updateForecastDisplay = () => {
    // TO-DO loop through forecast array and update values in the html elements
}