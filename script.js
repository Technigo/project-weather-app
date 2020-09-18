/*API KEY 852f52634242cb87b1f198b7ea5e2706
 */



let city = 'Stockholm,Sweden';
const container = document.getElementById('weatherContainer');

//Example: api.openweathermap.org/data/2.5/weather?lat=35&lon=139
//Get todays weather
//This function will run at start and get the weather for current position. 
const getCurrentWeather = (lat, lon) => {
    //Fetch weather for today
    const latitude = lat;
    const longitude = lon;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=852f52634242cb87b1f198b7ea5e2706`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            // container.innerHTML = `<h1>There are ${json.number} number of people in space right now.</h1>`
            console.log(json);

            setCityName(json.name);
            let timeZone = (json.timezone);
            console.log("¤¤¤¤¤ Got TimeZone :" + timeZone);

            setTodayTemperature(json["main"].temp);
            setFeelsLikeTemp(json["main"]["feels_like"]);
            setDayandTime(json.dt, json.timezone);
            setSunValues(json["sys"].sunrise, json["sys"].sunset, json.timezone);
            setConditions(json["weather"][0].description);
            setTemperatureColor(json["main"].temp, json.dt);
            setHumidity(json["main"].humidity);
            setWindSpeed(json["wind"]["speed"]);
            setMainWeatherIcon(json["weather"][0]["icon"]);

        })
        .catch((error) => {
            console.log(error);
        });
}

const getFiveDayForecast = (lat, lon) => {
    //Get 5day forecast
    console.log("In five day forecast, coordinates are:" + lat, lon);
    const latitude = lat;
    const longitude = lon;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=852f52634242cb87b1f198b7ea5e2706`)
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
}

//Black level,explore other endpoint of API
const getUVIndex = (lat, lon) => {
    //Get uv-index
    console.log("######## In get uv-index, coordinates are:" + lat, lon);
    const latitude = lat;
    const longitude = lon;

    fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&APPID=852f52634242cb87b1f198b7ea5e2706`)
        .then((response) => {
            return response.json()
        })
        .then((json) => {

            console.log("UV index object", json);
            let uvIndexValue = json.value;
            console.log("### The UV-index value is:" + uvIndexValue);
            setUVIndex(json.value);
            // const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
            //console.log("The forecast after filtering: " + filteredForecast + typeof filteredForecast);
            //filteredForecast.forEach(populateGrid);
        })
        .catch((error) => {
            console.log(error);
        });
}

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

const convertTimeToLocal = (timestamp, timezone) => {
    let time = timestamp * 1000;
    let tz = timezone * 1000;

    let date = new Date(time + tz);

    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    let hour = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let milliseconds = date.getUTCMilliseconds()

    const dateWithoutConversion = new Date(Date.UTC(year, month, day, hour, minutes, milliseconds));

    let dateString = dateWithoutConversion.toUTCString().toString();
    let subHour = dateString.substring(dateString.indexOf(":") - 2, dateString.indexOf(":"));
    let subMinutes = dateString.substring(dateString.indexOf(":") + 1, dateString.indexOf(":") + 3);
    console.log(subHour);
    console.log(subMinutes);
    let fullTime = (`${subHour}:${subMinutes}`);
    console.log(fullTime);
    return fullTime;
}

const setSunValues = (sunRise, sunSet, timeZone) => {

    let sunRiseTimeString = convertTimeToLocal(sunRise, timeZone);
    let sunSetTimeString = convertTimeToLocal(sunSet, timeZone);


    /*let timeZoneSec = timeZone * 60;
    let sunRiseDate = new Date((sunRise) * 1000);
    let sunSetDate = new Date((sunSet) * 1000);

    //Millisecond offset utc
    //let getTimezoneOffsetSunSet = (sunSetDate.getTimezoneOffset() * 60) * 1000;
    //let getTimezoneOffsetSunRise = (sunRiseDate.getTimezoneOffset() * 60) * 1000;

    //console.log(getTimezoneOffsetSunSet + " __________millisecond OFFSET_____");

    let sunriseLocaleTimeString = sunRiseDate.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit'

    });

    let sunsetLocaleTimeString = sunSetDate.toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit'
    });

*/

    //console.log("SUNRISE AND SUNSET" + sunriseLocaleTimeString, sunsetLocaleTimeString);
    document.getElementById("weatherCellSunRise").innerHTML = (`<p>SUN &uarr;</p> <p>${sunRiseTimeString}`);
    document.getElementById("weatherCellSunSet").innerHTML = (`<p>SUN &darr;</p> <p>${sunSetTimeString}`);
}

const setConditions = (weatherConditions) => {
    document.getElementById("conditions").innerHTML = weatherConditions;
}
//This is for changing the background in the app depending of the temperature
const setTemperatureColor = (temp, timestamp) => {

    console.log("!!!!in setTemperatureColor");
    console.log("!!!!!temp is:" + temp);

    let todayDate = new Date(timestamp * 1000);
    let timeForWeatherUpdate = todayDate.getHours();

    let divToChange = document.getElementById('mainWeather');


    // let divToChange = document.getElementById('body');
    console.log(timeForWeatherUpdate + "TIME TO CONSIDER W COLOR");
    //Clear previous set color-class on the div
    divToChange.classList.remove('cool', 'medium', 'warm', 'cool-night', 'medium-night', 'warm-night');
    //Display day colors
    if (timeForWeatherUpdate > 7 && timeForWeatherUpdate < 21) {
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

const setMainWeatherIcon = (iconID) => {
    let iconURL = (`http://openweathermap.org/img/wn/${iconID}@2x.png`);
    document.getElementById('weatherIcon').src = iconURL;
}

const setDayandTime = (timestamp, timezone) => {
    //convert timestamp to milliseconds
    let todayDate = new Date((timestamp + timezone) * 1000);

    //let timeZoneAdd = 
    let timeForWeatherUpdate = todayDate.toTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit'
    });

    let dayName = getDayOfWeek(timestamp);
    console.log(dayName, timeForWeatherUpdate);
    document.getElementById('today').innerHTML = dayName;
}

const setHumidity = (humidity) => {
    document.getElementById('weatherCellHumidity').innerHTML = (`<p>HUMIDITY</p> <p>${humidity}%</p>`);
}

const setWindSpeed = (windSpeed) => {
    console.log("In set windspeed, got value:" + windSpeed);
    document.getElementById('weatherCellWindSpeed').innerHTML = (`<p>WIND</p> <p>${windSpeed} m/s</p>`);
}

const setUVIndex = (uvIndex) => {
    console.log("in set uv-index");
    let uvIndexRounded = Math.floor(uvIndex);
    console.log(uvIndexRounded + "Rounded");
    document.getElementById('weatherCellUvIndex').innerHTML = (`<p>UV-INDEX</p> <p>${uvIndexRounded}</p>`);
}

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


/* PGM FLOW **/
const getUserLocation = (inLat, inLon) => {

    //Fallback parameters. Stockholm.
    const fallBackLat = 59.3194903;
    const fallBackLon = 18.075060000000007;

    var getLocationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function gotLocation(pos) {
        //What to do on gotLocation
        var coordinates = pos.coords;
        console.log('Your current position is:');
        console.log(`Latitude : ${coordinates.latitude}`);
        console.log(`Longitude: ${coordinates.longitude}`);
        console.log(`More or less ${coordinates.accuracy} meters.`);

        //Call the get-weather functions using co-ordinates as input values. 
        getCurrentWeather(coordinates.latitude, coordinates.longitude);
        getFiveDayForecast(coordinates.latitude, coordinates.longitude);
        getUVIndex(coordinates.latitude, coordinates.longitude);

    }

    function error(err) {
        /* Stockholm, fallback value. 
        lat  59.3194903.
        Lon: 18.075060000000007.*/
        console.log(`Couldn't get the user position, using default position instead.(${err.code}): ${err.message}`);

        getCurrentWeather(fallBackLat, fallBackLon);
        getFiveDayForecast(fallBackLat, fallBackLon);
        getUVIndex(fallBackLat, fallBackLon);
    }

    //onLoad Get the users current position.
    //Check here if the input is empty, if yes, get weather by userPosition coordinates. 
    //Else, get weather by passed coordinates.
    console.log("Input parameters for getLocation are: " + inLat, inLon);

    if ((!inLat) && (!inLon)) {
        navigator.geolocation.getCurrentPosition(gotLocation, error, getLocationOptions);
    }
    //If inLat and inLon are not defined/empty/null, use current location for user.

    //If inLat and inLon has values, use them to get the weather
    else {
        console.log("There are values in inlat and inlon, using them to get weather");
        getCurrentWeather(inLat, inLon);
        getFiveDayForecast(inLat, inLon);
    }

    //If the input has values, use them and call getCurrentWeather, getFiveDayForeCast
}


const getPresetCityLongitude = (cityAbbreviation) => {
    let lon =
        cityAbbreviation === "SY" ? 151.209900 :
        cityAbbreviation === "SEA" ? -122.335167 :
        cityAbbreviation === "STH" ? 18.075060000000007 :
        0;
    console.log(lon);
    return lon;
}

const getPresetCityLatitude = (cityAbbreviation) => {
    let lat =
        cityAbbreviation === "SY" ? -33.865143 :
        cityAbbreviation === "SEA" ? 47.608013 :
        cityAbbreviation === "STH" ? 59.3194903 :
        0;
    console.log(lat);
    return lat;
}

/*

const getRandomDegree = (from, to, fixed) => {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

console.log(
    getRandomDegree(-180, 180, 3)
);
*/

const selectCity = () => {

    let selectedCity = document.getElementById('citySelect').value;
    console.log("Selected city is:" + selectedCity);

    selectedCity === "" || selectedCity === "myLoc" ? getUserLocation() :
        selectedCity === "SY" ? getUserLocation(getPresetCityLatitude("SY"), getPresetCityLongitude("SY")) :
        selectedCity === "SEA" ? getUserLocation(getPresetCityLatitude("SEA"), getPresetCityLongitude("SEA")) :
        selectedCity === "STH" ? getUserLocation(getPresetCityLatitude("STH"), getPresetCityLongitude("STH")) :
        //selectedCity === "RANDOM" ? getUserLocation(getRandomDegree(-180, 180, 3), getRandomDegree(-180, 180, 3)) :
        console.log("Doesn't work");
}

selectCity();