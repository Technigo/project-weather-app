/*API KEY 852f52634242cb87b1f198b7ea5e2706
 */

/*For example, to get the current weather in Stockholm, you can use the url below.
 Remember to replace "YOUR_API_KEY" with the API key you copied from your dashboard.
 
 5 day forecast: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
 */

let city = 'Stockholm,Sweden';

const container = document.getElementById('weatherContainer');

//Fetches the weather for today
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=852f52634242cb87b1f198b7ea5e2706`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        // container.innerHTML = `<h1>There are ${json.number} number of people in space right now.</h1>`
        console.log(json);

        setCityName(json.name);
        setTodayTemperature(json["main"].temp);
        setFeelsLikeTemp(json["main"]["feels_like"]);
        setDayandTime(json.dt);
        setSunValues(json["sys"].sunrise, json["sys"].sunset);
        setConditions(json["weather"][0].description);
        setTemperatureColor(json["main"].temp, json.dt);
        setHumidity(json["main"].humidity);
        setWindSpeed(json["wind"]["speed"]);
        setMainWeatherIcon(json["weather"][0]["icon"]);

    })
    .catch((error) => {
        console.log(error);
    });


const setCityName = (name) => {
    document.getElementById("myLocationName").innerHTML = name;
}

const setTodayTemperature = (temp) => {
    let tempRounded = Math.round(temp * 10) / 10;
    let temperatureString = (`${tempRounded} °`)
    document.getElementById("currentTemperature").innerHTML = temperatureString;
}

const setFeelsLikeTemp = (feelTemp) => {
    let tempRounded = Math.round(feelTemp * 10) / 10;
    let temperatureString = (`${tempRounded} °`)
    document.getElementById("weatherCellFeelsLikeTemp").innerHTML = (`<p>FEELS LIKE</p> <p>${temperatureString}</p>`);
}

const setSunValues = (sunRise, sunSet) => {

    let sunRiseDate = new Date(sunRise * 1000);
    let sunSetDate = new Date(sunSet * 1000);
    // Hours part from the timestamp
    let sunriseLocaleTimeString = sunRiseDate.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit'
    });

    let sunsetLocaleTimeString = sunSetDate.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById("weatherCellSunRise").innerHTML = (`<p>SUN &uarr;</p> <p>${sunriseLocaleTimeString}`);
    document.getElementById("weatherCellSunSet").innerHTML = (`<p>SUN &darr;</p> <p>${sunsetLocaleTimeString}`);
}

const setConditions = (weatherConditions) => {
    document.getElementById("conditions").innerHTML = weatherConditions;
}

//This is for changing the background in the app depending of the temperature
const setTemperatureColor = (temp, timestamp) => {

    let todayDate = new Date(timestamp * 1000);
    let timeForWeatherUpdate = todayDate.getHours();
    let divToChange = document.getElementById('mainWeather');
    // let divToChange = document.getElementById('body');
    console.log(timeForWeatherUpdate + "TIME TO CONSIDER W COLOR");

    //Display day colors
    if (timeForWeatherUpdate > 7 && timeForWeatherUpdate < 21) {
        console.log("daytime");
        temp < 10 ? divToChange.classList.toggle('cool') : 0;
        temp >= 10 && temp <= 20 ? divToChange.classList.toggle('medium') : 0;
        temp > 20 ? divToChange.classList.toggle('warm') : 0;
    } else {
        console.log("nighttime");
        temp < 10 ? divToChange.classList.toggle('cool-night') : 0;
        temp >= 10 && temp <= 20 ? divToChange.classList.toggle('medium-night') : 0;
        temp > 20 ? divToChange.classList.toggle('warm-night') : 0;
    }
}

const setMainWeatherIcon = (iconID) => {
    let iconURL = (`http://openweathermap.org/img/wn/${iconID}@2x.png`);
    document.getElementById('weatherIcon').src = iconURL;
}

const setDayandTime = (timestamp) => {
    let todayDate = new Date(timestamp * 1000);
    let timeForWeatherUpdate = todayDate.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit'
    });

    let dayName = getDayOfWeek(timestamp);
    console.log(dayName, timeForWeatherUpdate);
    document.getElementById('today').innerHTML = dayName;
}

const setHumidity = (humidity) => {
    document.getElementById('weatherCellHumidity').innerHTML = (`<p>HUMIDITY</p> <p>${humidity}</p>`);
}

const setWindSpeed = (windSpeed) => {
    console.log("In set windspeed, got value:" + windSpeed);
    document.getElementById('weatherCellWindSpeed').innerHTML = (`<p>WIND</p> <p>${windSpeed} m/s</p>`);
}

/*New version where the foreach-function is outside the fetch function*/
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=852f52634242cb87b1f198b7ea5e2706`)
    .then((response) => {
        return response.json()
    })
    .then((json) => {

        console.log("The five day forecast before filtering", json);
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
        console.log("The forecast after filtering: " + filteredForecast + typeof filteredForecast);
        filteredForecast.forEach(populateGrid);
    })
    .catch((error) => {
        console.log(error);
    });

const populateGrid = (element, index, array) => {
    console.log("In populate grid");
    console.log(element);
    console.log("Current index:" + index);
    //Create selectors to reach the ids of the grid
    let idIndexForHTML = index + 1;

    let currentWeatherDayCell = 'weatherDay' + idIndexForHTML;
    let currentIconDayCell = 'iconDay' + idIndexForHTML;
    let currentTempDayCell = 'tempDay' + idIndexForHTML;
    //let currentFeelsLikeDayCell = 'feelsLikeDay' + idIndexForHTML;


    // console.log(currentWeatherDayCell, currentIconDayCell, currentTempDayCell, currentFeelsLikeDayCell);
    let dayOfWeek = getDayOfWeek(element["dt"]);
    console.log("DayofWeek:" + dayOfWeek);
    //console.log("Timestamp: " + element["dt"]);
    //let weatherDescription = element["weather"][0]["main"]
    //console.log("Weather Desc: " + weatherDescription);
    // console.log("Weather: " + element["weather"][0]["main"]);
    let dayTemp = convertTemp(element["main"]["temp"]);
    console.log("Got daytemp: " + dayTemp);
    //   console.log("Temp: " + element["main"]["temp"]);
    let feelsLikeTemp = convertTemp(element["main"]["feels_like"]);
    console.log("Got feelsliketemp: " + feelsLikeTemp);

    let iconURL = getWeatherIcon(element["weather"][0]["icon"]);
    // console.log("TempFeel: " + element["main"]["feels_like"]);

    /*Set the value of current element in corresponding cell in the grid*/
    document.getElementById(currentWeatherDayCell).innerHTML = dayOfWeek;
    document.getElementById(currentIconDayCell).firstChild.src = iconURL;
    document.getElementById(currentTempDayCell).innerHTML = dayTemp;
    // document.getElementById(currentFeelsLikeDayCell).innerHTML = feelsLikeTemp;
}


//These functions will be used in the loop to populate the grid, they don't set any values themselves,
//only returning values. 
const getDayOfWeek = (timestamp) => {
    console.log("In get day of week, got timestamp:" + timestamp);
    let dayText = "";
    let inDate = new Date(timestamp * 1000);
    let dayOfWeek = inDate.getDay();
    console.log(inDate.getDate());
    console.log("Found day of week:" + dayOfWeek);
    dayOfWeek === 0 ? dayText = 'Sunday' : 0;
    dayOfWeek === 1 ? dayText = 'Monday' : 0;
    dayOfWeek === 2 ? dayText = 'Tuesday' : 0;
    dayOfWeek === 3 ? dayText = 'Wednesday' : 0;
    dayOfWeek === 4 ? dayText = 'Thursday' : 0;
    dayOfWeek === 5 ? dayText = 'Friday' : 0;
    dayOfWeek === 6 ? dayText = 'Saturday' : 0;
    console.log("Will return: " + dayText);
    return dayText;
}

const convertTemp = (temp) => {
    let tempRounded = Math.round(temp * 10) / 10;
    let temperatureString = (`${tempRounded} °C`)
    return temperatureString;
}

const getWeatherIcon = (iconID) => {
    let iconURL = (`http://openweathermap.org/img/wn/${iconID}@2x.png`);
    return iconURL;
}

const selectCity = () => {
    let selectedCity = document.getElementById('citySelect').value;
    console.log("Selected city: " + selectedCity);

}