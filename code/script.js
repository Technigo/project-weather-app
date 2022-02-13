// fetch current and daily forecast for Stockholm, linke to documentation: https://openweathermap.org/api/one-call-api
fetch("https://api.openweathermap.org/data/2.5/onecall?lat=59.33&lon=18.06&units=metric&exclude=minutely,hourly,alerts&appid=99271fdaf78d63e5bf35004e02e4e29d")
    .then((result) => {
        return result.json(); // returns a promise that something will happen
    })
    .then((data) => {
        setCurrentWeather(data); // calls function with the data the promise delivers
        setForecast(data); // calls function with the data the promise delivers
    })
    .catch((error) => {
        console.log(error); // shows if something went wrong (ex. API key, json formatted incorrectly, etc)
    });

// populate currentWeather object with data from the current weather API
const setCurrentWeather = (data) => {

    // create a template of current weather object which updates with data fetched from the api
    let currentWeather = {
        // this is the strucutre that the object will have once populated:
        condition: 'string',
        temp: '0° C',
        sunrise: '00:00',
        sunset: '00:00',
    }

    currentWeather.condition = data.current.weather[0].main;
    currentWeather.temp = Math.round(data.current.temp) + "° C"; // rounds to nearest integer

    let sunrise = new Date(data.current.sunrise * 1000); // converts unix timestamp
    let sunset = new Date(data.current.sunset * 1000); // converts unix timestamp
    currentWeather.sunrise = sunrise.getHours() + ":" + sunrise.getMinutes(); // displays format 00:00
    currentWeather.sunset = sunset.getHours() + ":" + sunset.getMinutes(); // displays format 00:00

    //more values can be added here

    console.log(currentWeather); // checks to see what it looks like

    updateCurrentWeatherDisplay(currentWeather); // updates display when data is ready
};

// populate forecast array with data from the current weather API
const setForecast = (data) => {

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

    let numberToDay = { // api data returns weekday as number starting with 0, we'll want to convert
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

    updateForecastDisplay(forecast); // updates display when data is ready
};


/* ------------------------ START FROM HERE ------------------------*/

// this function is already called when the data is available 
const updateCurrentWeatherDisplay = () => {
    // use currentWeather object to update values in the html elements
}

// this function is already called when the data is available 
const updateForecastDisplay = () => {
    // loop through forecast array and update values in the html elements
}