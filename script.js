const containerToday = document.getElementById("weatherToday");  
const containerForecast = document.getElementById("weatherForecast");
let citySearched = 'Kil';

//Fetch weather today API
const fetchWeatherToday = (citySearched) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=metric&APPID=a0a9672a941bc58ae811a05987143dd5`)
    .then((response) => {
        return response.json();
    }).then((weatherToday) => {
        containerToday.innerHTML += generatedHTMLForWeatherToday(weatherToday); 
    });
}
fetchWeatherToday(citySearched);

//Function to invoke already created functions and manipulate the DOM
const generatedHTMLForWeatherToday = (weatherToday) => {
    const temperature = calculatedTemperature(weatherToday.main.temp); 
    const timeInCity = calculatingTime(weatherToday.dt, weatherToday.timezone);
    const sunrise = calculatingTime(weatherToday.sys.sunrise, weatherToday.timezone); 
    const sunset = calculatingTime(weatherToday.sys.sunset, weatherToday.timezone);
    const iconToday = iconDependingOnWeather(weatherToday.weather[0].main);
    const description = descriptionUppercase(weatherToday.weather[0].description);
    weatherTodayBackgroundColor(weatherToday.main.temp);
    
     //separate and build up the HTML tree
     let weatherTodayHTML = ''
     weatherTodayHTML += `<div class="weather-information">`
     weatherTodayHTML += `<img src='${iconToday}'/>`  
     weatherTodayHTML += `<h1 class="temp"> ${temperature} \xB0c </h1>`
     weatherTodayHTML += `</div>`
     weatherTodayHTML += `<div class="location-information">`
     weatherTodayHTML += `<h2> ${weatherToday.name} </h2> ` 
     weatherTodayHTML += `<p> ${timeInCity} </p>` 
     weatherTodayHTML += `<p> ${description}</p>` 
     weatherTodayHTML += `</div>`
     weatherTodayHTML += `<div class="sun-information">`
     weatherTodayHTML += `<p> Sun &uarr; ${sunrise}</p>`
     weatherTodayHTML += `<p> Sun &darr; ${sunset}</p>`
     weatherTodayHTML += `</div>`
     return weatherTodayHTML; 
};

//Fetch weather forcast API
const fetchWeatherForcast = (citySearched) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${citySearched}&units=metric&APPID=a0a9672a941bc58ae811a05987143dd5`)
    .then((response) => {
        return response.json();
    }).then((weatherForcast) => {
        const filteredForcast = weatherForcast.list.filter((item) => 
        item.dt_txt.includes('12:00'));
       
        filteredForcast.forEach((forcast) => {
            containerForecast.innerHTML += generatedHTMLForWeatherForcast(forcast)
        });
    });
};
fetchWeatherForcast(citySearched);

//Functions to invoke already created functions and manipulate the DOM
const generatedHTMLForWeatherForcast = (filteredForcast) => {
    const weekday = printDay(filteredForcast.dt_txt); 
    const dailyTemp = calculatedTemperature(filteredForcast.main.temp);
    const humidity = calculatedTemperature(filteredForcast.main.humidity); 
    const iconForcast = iconDependingOnWeather(filteredForcast.weather[0].main);
    //separate and build up the HTML tree
    let weatherForcast = ''
    weatherForcast += `<div class="weather-forcast">`
    weatherForcast += `<div class="day">${weekday}</div>`
    weatherForcast += `<img src='${iconForcast}'/>`;
    weatherForcast += `<p>${dailyTemp} \xB0c/ ${humidity} %</p>`
    weatherForcast += `</div>`
    return weatherForcast; 
};

//function invoked when search button is clicked (enter)
const citySelected = () => {
    containerToday.innerHTML = ''; 
    containerForecast.innerHTML = ''; 
    citySearched = document.getElementById("cityNamePicked").value;
    fetchWeatherForcast(citySearched);
    fetchWeatherToday(citySearched);
    document.getElementById("cityNamePicked").value = ''; 
}

//Function for temp rounded to one decimal 
const calculatedTemperature = (number) => {
    return Math.round(number*10)/10;
};

//Function for local time, time for sunset and sunrise
const calculatingTime = (timestamp, timezone) => {
    const timeSetString = timeConvertedToLocal(timestamp, timezone);
    return timeSetString;
};

/*This function takes the timestamp and the timezone (offset from UTC in seconds), 
creates a UTC date object and returns a string without any conversion based on the location of the client. */
//help from Karolin
const timeConvertedToLocal = (timestamp, timezone) => {
    let time = timestamp * 1000;
    let tz = timezone * 1000;
    let date = new Date(time + tz);
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1; 
    let day = date.getUTCDate();
    let hour = date.getUTCHours();
    let minute = date.getUTCMinutes();
    let milliseconds = date.getUTCMilliseconds();
    //UTC date object 
    const dateWithoutConversion = new Date(Date.UTC(year, month, day, hour, minute, milliseconds));
    //Make it to string 
    let dateString = dateWithoutConversion.toUTCString().toString();
    //using substring to extract the hour and minutes
    let subHour = dateString.substring(dateString.indexOf(":") - 2, dateString.indexOf(":"));
    let subMinutes = dateString.substring(dateString.indexOf(":") + 1, dateString.indexOf(":") +3);
    //Put the hour and minutes back together in a fullTime String, no conversion to the clients timezone will be done.
    let fullTime =(`${subHour}:${subMinutes}`);
    return fullTime;
}

//capitalize first letter in weather description
const descriptionUppercase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1); 
}

//functions to print a short day of our 5 day weather forcast 
const printDay = (day) => {
    const forcastDays = new Date(day);
    const forcastDaysString = forcastDays.toLocaleDateString('en-SE', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    return forcastDaysString; 
};

//Function to limit the amount of weather descriptionss and to link them to an icon 
const iconDependingOnWeather = (item) => {
const iconMainDescription = item
    if (iconMainDescription === 'Clouds') {
        return './cloud.png'
    } else if (iconMainDescription === 'Clear'){
        return './sun.png'
    } else if (iconMainDescription === 'Rain') {
        return './rainy.png'
    } else if (iconMainDescription === 'Thunderstorm') {
        return './thunder.png'
    } else if (iconMainDescription === 'Drizzle') {
        return './drizzle.png'
    } else if (iconMainDescription === 'Snow') {
        return './snow.png'
    } else return './drizzle.png'
}

//Change background color depending on temperature
const weatherTodayBackgroundColor = (temp) => {
    const containerColor = document.querySelector('.background-color')
    if (temp < 0, temp <= 6) {  
        containerColor.style.backgroundColor = '#5555ff';
    } else if (temp > 6, temp <= 20) {
        containerColor.style.backgroundColor = '#ffa500';
    } else containerColor.style.backgroundColor = '#FF0000'
}