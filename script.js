//Get todays weather
const getCurrentWeather = (lat, lon) => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=852f52634242cb87b1f198b7ea5e2706`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            populateMainWeather(json);
        })
        .catch((error) => {
            console.log(error);
        });
}

const populateMainWeather = (json) => {
    setCityName(json.name);
    setTodayTemperature(json["main"].temp);
    setFeelsLikeTemp(json["main"]["feels_like"]);
    setDayandTime(json.dt, json.timezone);
    setSunValues(json["sys"].sunrise, json["sys"].sunset, json.timezone);
    setConditions(json["weather"][0].description);
    setTemperatureColor(json["main"].temp, json.dt, json.timezone);
    setHumidity(json["main"].humidity);
    setWindSpeed(json["wind"]["speed"]);
    setMainWeatherIcon(json["weather"][0]["id"], json.dt, json.timezone);
}

//Get the five day forecast
const getFiveDayForecast = (lat, lon) => {


    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=852f52634242cb87b1f198b7ea5e2706`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            //Only pick objects for 12:00
            const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
            //Add all five days to the grid in the html
            filteredForecast.forEach(populateForecastGrid);
        })
        .catch((error) => {
            console.log(error);
        });
}

const populateForecastGrid = (element, index) => {
    //Create selectors to get the correct the ids of the grid
    let idIndexForHTML = index + 1;
    let currentWeatherDayCell = 'weatherDay' + idIndexForHTML;
    let currentIconDayCell = 'iconDay' + idIndexForHTML;
    let currentTempDayCell = 'tempDay' + idIndexForHTML;

    let dayOfWeek = getDayOfWeek(element["dt"]);
    let dayTemp = getRoundedTemperatureString(element["main"]["temp"]);
    let iconURL = getWeatherIcon(element["weather"][0]["id"], 0, 0, "populateGrid");

    /*Set the value of current element in corresponding cell in the grid*/
    document.getElementById(currentWeatherDayCell).innerHTML = dayOfWeek;
    document.getElementById(currentIconDayCell).firstChild.src = `./icons/weather/${iconURL}`;
    document.getElementById(currentTempDayCell).innerHTML = dayTemp;
}

//Black level,explore other endpoint of API, UV-index API
const getUVIndex = (lat, lon) => {

    fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&APPID=852f52634242cb87b1f198b7ea5e2706`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            let uvIndexValue = json.value;
            setUVIndex(uvIndexValue);
        })
        .catch((error) => {
            console.log(error);
        });
}

/*Set-functions*/
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

const setSunValues = (sunRise, sunSet, timeZone) => {
    let sunRiseTimeString = getTimeConvertedToLocal(sunRise, timeZone);
    let sunSetTimeString = getTimeConvertedToLocal(sunSet, timeZone);
    document.getElementById("weatherCellSunRise").innerHTML = (`<p>SUN &uarr;</p> <p>${sunRiseTimeString}`);
    document.getElementById("weatherCellSunSet").innerHTML = (`<p>SUN &darr;</p> <p>${sunSetTimeString}`);
}

const setConditions = (weatherConditions) => {
    let weatherConditionString = `${weatherConditions.charAt(0).toUpperCase()}${weatherConditions.substring(1)}`;
    document.getElementById("conditions").innerHTML = weatherConditionString;
}

//This is for changing the background in the app depending of the temperature
const setTemperatureColor = (temp, timestamp, timezone) => {
    let timeForUpdate = getTimeConvertedToLocal(timestamp, timezone);
    let hour = timeForUpdate.substring(0, 2);
    let divToChange = document.getElementById('mainWeather');

    //Clear any previous set color-class on the div
    divToChange.classList.remove('cool', 'medium', 'warm', 'cool-night', 'medium-night', 'warm-night');
    //Display day colors
    if (hour >= 6 && hour < 19) {
        console.log("daytime");
        console.log("divToChange: " + divToChange);
        if (temp < 10) {
            divToChange.classList.toggle('cool');
        } else if (temp >= 10 && temp <= 20) {
            divToChange.classList.toggle('medium');
        } else {
            divToChange.classList.toggle('warm');
        }
    } else {
        console.log("nighttime");
        if (temp < 10) {
            divToChange.classList.toggle('cool-night');
        } else if (temp >= 10 && temp <= 20) {
            divToChange.classList.toggle('medium-night');
        } else {
            divToChange.classList.toggle('warm-night');
        }
    }
}

//call the helper function to get the correct icon, then set it.
const setMainWeatherIcon = (weatherID, time, timezone) => {
    let weatherSrc = getWeatherIcon(weatherID, time, timezone, "mainWeather");
    document.getElementById('weatherIcon').src = (`./icons/weather/mainWeather/${weatherSrc}`);
}

//Call the helper functions to retreive time and day, then set it
const setDayandTime = (timestamp, timezone) => {
    let todayString = getTimeConvertedToLocal(timestamp, timezone);
    let dayName = getDayOfWeek(timestamp);
    document.getElementById('today').innerHTML = (`${dayName}, ${todayString}`);
}

const setHumidity = (humidity) => {
    document.getElementById('weatherCellHumidity').innerHTML = (`<p>HUMIDITY</p> <p>${humidity}%</p>`);
}

const setWindSpeed = (windSpeed) => {
    document.getElementById('weatherCellWindSpeed').innerHTML = (` <p> WIND </p> <p>${windSpeed} m/s </p>`);
}

const setUVIndex = (uvIndex) => {
    let uvIndexRounded = Math.floor(uvIndex);
    document.getElementById('weatherCellUvIndex').innerHTML = (`<p>UV-INDEX</p> <p>${uvIndexRounded}</p>`);
}

//Get-functions
const getDayOfWeek = (timestamp) => {

    let dayText = "";
    let inDate = new Date(timestamp * 1000);
    let dayOfWeek = inDate.getDay();
    dayOfWeek === 0 ? dayText = 'Sunday' : 0;
    dayOfWeek === 1 ? dayText = 'Monday' : 0;
    dayOfWeek === 2 ? dayText = 'Tuesday' : 0;
    dayOfWeek === 3 ? dayText = 'Wednesday' : 0;
    dayOfWeek === 4 ? dayText = 'Thursday' : 0;
    dayOfWeek === 5 ? dayText = 'Friday' : 0;
    dayOfWeek === 6 ? dayText = 'Saturday' : 0;
    return dayText;
}

const getDayOrNight = (timestamp, timezone) => {
    let isday = false;
    let timeForUpdate = getTimeConvertedToLocal(timestamp, timezone);
    let hour = parseInt(timeForUpdate.substring(0, 2));
    if (hour >= 6 && hour < 19) {
        isday = true;
    }
    return isday;
}

const getRoundedTemperatureString = (temp) => {
    let tempRounded = Math.round(temp * 10) / 10;
    let temperatureString = (`${tempRounded} °C`)
    return temperatureString;
}

const getTimeConvertedToLocal = (timestamp, timezone) => {
    //Struggled showing the time in local time, without any GMT conversion. Made it work with this, creating a UTC date with timezone offset
    // and then create substrings of hour and minutes from it. 
    let time = timestamp * 1000;
    let tz = timezone * 1000;
    let date = new Date(time + tz);
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    let hour = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let milliseconds = date.getUTCMilliseconds();
    const dateWithoutConversion = new Date(Date.UTC(year, month, day, hour, minutes, milliseconds));
    let dateString = dateWithoutConversion.toUTCString().toString();
    let subHour = dateString.substring(dateString.indexOf(":") - 2, dateString.indexOf(":"));
    let subMinutes = dateString.substring(dateString.indexOf(":") + 1, dateString.indexOf(":") + 3);
    let fullTime = (`${subHour}:${subMinutes}`);
    //Returns a string with the time. 
    return fullTime;
}

const getWeatherIcon = (weatherID, time = 0, timezone = 0, caller) => {
    let isday = false;

    //For mainweather, in the top of the app. Take time of day into consideration when picking icon.  
    if (caller === "mainWeather") {
        isday = getDayOrNight(time, timezone);
    }

    //Determine which weather icon to return, depending of weather-id in json-object. 
    let weatherSrc = "";
    if (weatherID >= 200 && weatherID < 300) {
        //Thunder
        weatherSrc = 'thunder.png';
    } else if (weatherID >= 300 && weatherID < 500) {
        //Drizzle
        weatherSrc = 'drizzle.png';
    } else if (weatherID >= 500 && weatherID < 600) {
        //Rain
        weatherSrc = 'rain.png';
    } else if (weatherID >= 600 && weatherID < 700) {
        //Snow
        weatherSrc = 'snow.png';
    } else if (weatherID >= 700 && weatherID < 800) {
        //Foggy
        weatherSrc = 'foggy.png';
    } else if (weatherID === 800) {
        if (!isday && caller === "mainWeather") {
            weatherSrc = 'clear-night.png'
        } else weatherSrc = 'sunny.png';
    } else if (weatherID === 801) {
        if (!isday && caller === "mainWeather") {
            weatherSrc = 'cloudy-night.png'
        } else weatherSrc = 'suncloud.png';
    } else if (weatherID > 801) {
        weatherSrc = 'cloudy.png';
    }
    return weatherSrc;
}

const getUserLocation = (inLat, inLon) => {
    //Fallback location parameters. Stockholm.
    const fallBackLat = 59.333;
    const fallBackLon = 18.065;

    var getLocationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function gotLocation(pos) {
        var coordinates = pos.coords;
        //Call the get-weather functions using co-ordinates as input values. 
        getCurrentWeather(coordinates.latitude, coordinates.longitude);
        getFiveDayForecast(coordinates.latitude, coordinates.longitude);
        getUVIndex(coordinates.latitude, coordinates.longitude);
    }

    function error(err) {
        //This is invoked if something goes wrong when getting the users coordinates. Stockholm are set as fallback.
        console.log(err);
        getCurrentWeather(fallBackLat, fallBackLon);
        getFiveDayForecast(fallBackLat, fallBackLon);
        getUVIndex(fallBackLat, fallBackLon);
    }


    //Check here if the input latitude and longitude is empty. if yes - get the weather by userPosition coordinates. 
    //Else, get weather by the passed coordinates.
    if ((!inLat) && (!inLon)) {
        navigator.geolocation.getCurrentPosition(gotLocation, error, getLocationOptions);
    }

    //If inLat and inLon has values, the user has selected a city in the select box. Use them to get the weather
    else {
        console.log("There are values in inlat and inlon, using them to get weather");
        getCurrentWeather(inLat, inLon);
        getFiveDayForecast(inLat, inLon);
    }
    scrollToTop();
}

const getPresetCityLongitude = (cityAbbreviation) => {
    let lon =
        cityAbbreviation === "SY" ? 151.209900 :
        cityAbbreviation === "SEA" ? -122.335167 :
        cityAbbreviation === "STH" ? 18.065 :
        cityAbbreviation === "SHA" ? 121.469170 :
        cityAbbreviation === "SP" ? -46.636 :
        cityAbbreviation === "SAP" ? 141.350006 :
        cityAbbreviation === "SEO" ? 126.978 :
        0;
    console.log(lon);
    return lon;
}

const getPresetCityLatitude = (cityAbbreviation) => {
    let lat =
        cityAbbreviation === "SY" ? -33.865143 :
        cityAbbreviation === "SEA" ? 47.608013 :
        cityAbbreviation === "STH" ? 59.333 :
        cityAbbreviation === "SHA" ? 31.224361 :
        cityAbbreviation === "SP" ? -23.547 :
        cityAbbreviation === "SAP" ? 43.066666 :
        cityAbbreviation === "SEO" ? 37.568 :
        0;
    console.log(lat);
    return lat;
}

//Lets the user select which city to get the weather for. If nothing is selected or "myLoc" is selected, the getUserLocation is called without parameters and will try to retrieve
//the users position through Geo Location API. 
const selectCity = () => {
    let selectedCity = document.getElementById('citySelect').value;
    if (selectedCity !== "" || selectedCity !== "myLoc") {
        getUserLocation(getPresetCityLatitude(selectedCity), getPresetCityLongitude(selectedCity));
    } else getUserLocation();
}

//When a new city is selected by the user, scroll to the top of the page. 
const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

selectCity();