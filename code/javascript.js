//fetch weather for Stockholm
fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=81056f8102cf170efbadf6ea579c361c")
    .then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json)
        const jsonText = JSON.stringify(json);
        setHtmlData(json);
    }).catch((err) => {
        console.log("caught error", err)
    });

//Function to round the degrees
function round(degrees, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(degrees * multiplier) / multiplier;
}

function setHtmlData(data) {
    //today´s weather
    const cityName = data.name;
    document.getElementById("city-name").innerText = cityName;

    // degrees & state of the sky
    const degrees = data.main.temp;
    document.getElementById("temp-degrees").innerText = round(degrees) + " ° ";
    const stateOfTheSky = data.weather[0].main;
    document.getElementById("sky-display").innerText = stateOfTheSky;
    const iconOfState = data.weather[0].icon;
    document.getElementById("icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${iconOfState}@2x.png" alt="" />`;

    // defining background color 
    var color;
    if (stateOfTheSky == "Clear") {
        color = "#d9f9ff";
    } else if (stateOfTheSky == "Snow") {
        color = "#FFFFFF";
    } else {
        color = "#c2baba";
    }
    document.getElementById("background").style = `background-color: ${color};`;

    // sunset & sunrise
    //Declare variable for the time of sunrise/sunset
    const unixTimestampSunrise = data.sys.sunrise
    const unixTimestampSunset = data.sys.sunset

    //To get sunrise/sunset time in hours:minutes:seconds
    const sunrise = new Date(unixTimestampSunrise * 1000)
    const sunset = new Date(unixTimestampSunset * 1000)

    //Declare new variable to show only hh:mm
    const sunriseTime = sunrise.toLocaleTimeString([], { timeStyle: 'short' })
    const sunsetTime = sunset.toLocaleTimeString([], { timeStyle: 'short' })
    document.getElementById("sunset").innerText = "Sunset: " + sunsetTime;
    document.getElementById("sunrise").innerText = "Sunrise: " + sunriseTime;
}
//fetch forecast for 7 days of the week in Stockholm 
fetch("http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=81056f8102cf170efbadf6ea579c361c")
    .then((response) => {
        return response.json()
    }).then((response2) => {
        console.log(response2)
        daysOfWeekData(response2)
    }).catch((err1) => {
        console.log("caught error", err1)
    });

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function daysOfWeekData(json) {
    //days of the week and temperature
    for (var i = 0; i < 40; i += 8) {
        let theDate = new Date(json.list[i].dt * 1000)
        console.log(weekDays[theDate.getDay()] + " " + json.list[i].main.temp);
        console.log("day" + ((i / 8) + 1));
        document.getElementById("day" + ((i / 8) + 1)).innerText = weekDays[theDate.getDay()];
        document.getElementById("temp" + ((i / 8) + 1)).innerText = round(json.list[i].main.temp, 0) + " ° ";
    };
}




