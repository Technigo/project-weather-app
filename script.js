const containerToday = document.getElementById("weatherToday");  
const containerForecast = document.getElementById("weatherForecast");
let citySearched = 'Kil';

//Fetch weatherToday API
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
    const timeInCity = calculatingTime(weatherToday.dt)
    const sunrise = calculatingTime(weatherToday.sys.sunrise); 
    const sunset = calculatingTime(weatherToday.sys.sunset);
    const iconToday = iconDependingOnWeather(weatherToday.weather[0].main)
    const description = weatherToday.weather[0].description
    weatherTodayBackgroundColor(weatherToday.main.temp);
    
     //separate and build up the HTML tree
     let weatherTodayHTML = '';
     weatherTodayHTML += `<div class="weather-information">`;
     weatherTodayHTML += `<div class="temp"> ${temperature} \xB0c </div>`
     weatherTodayHTML += `<img src='${iconToday}'/>`;  
     weatherTodayHTML += `</div>`
     weatherTodayHTML += `<div class="location-information">`;
     weatherTodayHTML += `<div class="location"> ${weatherToday.name} </div>` 
     weatherTodayHTML += `<div class="description"> ${description} </div>` 
     weatherTodayHTML += `<div class="local-time"> ${timeInCity} </div>` 
     weatherTodayHTML += `</div>`
     weatherTodayHTML += `<div class="sun-information">`
     weatherTodayHTML += `<div class="sunrise"> Sunrise ${sunrise}</div>`
     weatherTodayHTML += `<div class="sunset"> Sunset ${sunset}</div>`
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
    let weatherForcast = '';
    weatherForcast += `<div class="weather-forcast">`;
    weatherForcast += `<div class="day">${weekday}</div>`;
    weatherForcast += `<img src='${iconForcast}'/>`;
    weatherForcast += `<p>${dailyTemp} \xB0c/ ${humidity} %</p>`;
    weatherForcast += `</div>`; 
    return weatherForcast; 
};

//Function for temp rounded to one decimal 
const calculatedTemperature = (number) => {
    const roundedTemp = Math.round(number*10)/10; 
    return roundedTemp;
};

//function to convert time to readble format
const calculatingTime = (time) => {
    const timeSet = new Date(time * 1000);
    const timeSetString = timeSet.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return timeSetString;
};

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

//Function to limit amount of description to be able to link them to an icon 
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
    } else 
        return './drizzle.png'
}

//Change background color depending on temperature
const weatherTodayBackgroundColor = (temp) => {
    const containerColor = document.querySelector('.background-color')
    if (temp < 0, temp <= 6) {  
        containerColor.style.backgroundColor = '#5555ff';
    } else if (temp > 6, temp <= 20) {
        containerColor.style.backgroundColor = '#ffa500';
    } else 
        containerColor.style.backgroundColor = '#FF0000'
}

//function invoked when search button is clicked
const citySelected = () => {
    containerToday.innerHTML = ''; 
    containerForecast.innerHTML = ''; 
    citySearched = document.getElementById("cityNamePicked").value;
    fetchWeatherForcast(citySearched);
    fetchWeatherToday(citySearched);
    document.getElementById("cityNamePicked").value = ''; 
}



