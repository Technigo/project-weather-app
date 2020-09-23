
const todaysWeatherId = document.getElementById("todaysWeatherId");
const monday = document.getElementById("monday");
const tuesday = document.getElementById("tuesday");
const wednesday = document.getElementById("wednesday");
const thursday = document.getElementById("thursday");
const friday = document.getElementById("friday");

// Vi ska göra en funktion som tar UNIX-tiden, och omvandlar den till "riktig" tid.


const fetchWeatherToday = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f2f9f8b681a8d2ef3cd9a12ebdc8c363';
fetch(fetchWeatherToday)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
        todaysWeatherTemp.innerText = json.main.temp;
        todaysWeatherCity.innerText = json.name;
        todaysWeatherType.innerText = json.weather[0].description;
        todaysWeatherSunrise.innerText = formatTime(json.sys.sunrise);
        todaysWeatherSunset.innerText = formatTime(json.sys.sunset);



    });

const formatTime = (unixtime) => {
    console.log(unixtime);
    const date = new Date(unixtime * 1000)
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();

    const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}


// step 4 
const nextWeeksWeatherId = document.getElementById("nextWeeksWeatherId");
const fetchWeatherWeek = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY';
fetch(fetchWeatherWeek)
    .then((response) => {
        return response.json();
    })

filteredForecast.forEach((day) => {
    const date = new Date(day.dt * 1000)

    // Make a Date object for right now
    const now = new Date();

    // Compare the forecast's day with the day right now
    const isTodaysForecast = date.getDay() === now.getDay();

    let dayName = week[date.getDay()]

    // We don't want to include this forecast if it is for today
    if (!isTodaysForecast) {
        fiveDayForecast.innerHTML += `<p>${dayName}: ${day.main.temp} °C</p>`
    }
})