/*API KEY 852f52634242cb87b1f198b7ea5e2706
 */

/*For example, to get the current weather in Stockholm, you can use the url below.
 Remember to replace "YOUR_API_KEY" with the API key you copied from your dashboard.*/

const container = document.getElementById('weatherContainer');


fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=852f52634242cb87b1f198b7ea5e2706')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        // container.innerHTML = `<h1>There are ${json.number} number of people in space right now.</h1>`
        console.log(json);
        // const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'));
        // console.log("After filtering" + filteredForecast);

        //console.log("City name: ", json.name);
        //console.log("Current temp: ", json["main"].temp);
        // console.log(temperature);
        setCityName(json.name);
        setTodayTemperature(json["main"].temp);
        // console.log(json["sys"].sunrise);
        //console.log(json["sys"].sunset);
        //console.log(json["weather"][0].main);
        setSunValues(json["sys"].sunrise, json["sys"].sunset);
        setConditions(json["weather"][0].main);
        //Iterera över people-arrayen.
        //json.people.forEach((person) => {
        //"Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."
        //container.innerHTML += `<p>${person.name} is on the ${person.craft}</p>`
        //})
    })
    .catch((error) => {
        console.log(error);
    });


const setCityName = (name) => {
    document.getElementById("myLocationName").innerHTML = name;
}

const setTodayTemperature = (temp) => {
    let tempRounded = Math.round(temp * 10) / 10;
    let temperatureString = (`${tempRounded} °C`)
    document.getElementById("currentTemperature").innerHTML = temperatureString;
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
    document.getElementById("sunRise").innerHTML = sunriseLocaleTimeString;
    document.getElementById("sunSet").innerHTML = sunsetLocaleTimeString;
}

const setConditions = (weatherConditions) => {
    document.getElementById("conditions").innerHTML = weatherConditions;
}