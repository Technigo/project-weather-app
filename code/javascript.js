//fetch weather for Stockholm
fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=81056f8102cf170efbadf6ea579c361c")
    .then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json)
        const jsonText = JSON.stringify(json);
        // document.getElementById("i").innerText = jsonText;
        setHtmlData(json);
    }).catch((err) => {
        console.log("caught error", err)
    });
// fetch("http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=81056f8102cf170efbadf6ea579c361c")
//     .then(response => response.json())
//     .then(response2 => console.log(response2))
function setHtmlData(data) {
    //today´s weather
    const cityName = data.name;
    document.getElementById("city-name").innerText = cityName;
    // degrees & state of the sky
    const degrees = data.main.temp;
    function round(degrees, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(degrees * multiplier) / multiplier;
    }
    document.getElementById("temp-degrees").innerText = round(degrees) + " ° ";
    const stateOfTheSky = data.weather[0].main;
    document.getElementById("sky-display").innerText = stateOfTheSky;
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

function daysOfWeekData(json) {
    //days of the week and temperature
    json.list.forEach(element => {
        let theDate = new Date(element.dt * 1000)
        console.log(theDate.toString());
    });
}




