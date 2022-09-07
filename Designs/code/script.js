const weatherTable = document.getElementById('weatherTable');
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const sunriseTime = document.getElementById('sunriseTime');
const sunsetTime = document.getElementById('sunsetTime');
const fiveDayForecast = document.getElementById('fiveDayForecast')
//const weatherContainer = document.getElementById('weatherContainer')
const otherCities = document.getElementById('otherCities');

//Weather in Stockhom, today.
const weatherInfo = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7899d890f36cbd5ef29eba2a205b5409')
        .then(response => {
            return response.json() //This always looks like this.

        })
        .then((json) => {
            console.log(json.name);
            console.log(json.main.temp);
            console.log(json.weather[0].description);
            console.log(json);

            const cityValue = json.name;
            console.log(cityValue);
            cityName.innerHTML += ` <td id="cityName2">${json.name}</td>`;
            weatherIcon.innerHTML += ` <img id="main-icon" src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png"  alt="${json.weather[0].description} icon" />`;
            temp.innerHTML += ` <td id="temp">${json.main.temp}</td>`;
            description.innerHTML += ` <td id="description">${json.weather[0].description}</td>`;
        })
};

weatherInfo();

const sunInfo = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=7899d890f36cbd5ef29eba2a205b5409')
        .then(response => {
            return response.json() //This always looks like this.

        })
        .then((json) => {
            let unixTimeSunrise = json.sys.sunrise;
            let sunriseValue = new Date(unixTimeSunrise * 1000);
            const sunriseConvertedTime = sunriseValue.toLocaleTimeString();
            sunriseTime.innerHTML += `<td id="sunriseTime">${sunriseConvertedTime}</td>`;
            //This saves the sunrise data into a variable called sunriseValue and make it a Date.
            //console.log(sunriseValue.toLocaleTimeString());//This invokes the method toLocaleTimeString which converts the UCT time to local time and as astring.

            //This invokes the method toLocalTimeString which converts the unix UCT time to local time and as a string. 
            //It also puts the value inside the HTML table in a new table cell. 
            /*    sunriseTime.innerHTML += 
               ` <td id="sunriseTime">${sunriseValue.toLocaleTimeString()}</td>`; 
            */

            let unixTimeSunset = json.sys.sunset; //This saves the sunset sata into a variable called sunsetTime
            let sunsetValue = new Date(unixTimeSunset * 1000);
            const sunsetConvertedTime = sunsetValue.toLocaleTimeString();
            sunsetTime.innerHTML += `<td id="sunsetTime">${sunsetConvertedTime}</td>`;
        })
}

sunInfo();
// Weather in Stockholm for the next five days.
const fiveForescast = () => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=d8e3d440b59f81f07a8c91c14c07c06e')
        .then(response => {
            return response.json();
        })
        .then((dataForTheNextFiveDay) => {
            console.log(dataForTheNextFiveDay);
            const filteredForecast = dataForTheNextFiveDay.list.filter(json => json.dt_txt.includes('12:00'))
            filteredForecast.forEach(json => {
                let temp_min = (json.main.temp_min).toFixed(1);
                console.log(temp_min)
                let temp_max = (json.main.temp_max).toFixed(1);
                console.log(temp_max)
                let fivedays = (new Date(json.dt * 1000)).toLocaleDateString("en-US", { weekday: "long" })
                console.log(fivedays)
                /*let icon = `<img id="forecast-icon" src=https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png></img>`;
                console.log(icon)*/

                fiveDayForecast.innerHTML += `
                <p> 
                <span id="fiveday">${fivedays}</span>
                 <span id="tempMin">${temp_min}</span>
                 <span id="tempMax">${temp_max}</span>
                </p>
                `;

            });
        });

};

fiveForescast();


const weatherCurrentCopenhagen = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Copenhagen,Denmark&units=metric&APPID=d8e3d440b59f81f07a8c91c14c07c06e')
        .then(response => {
            return response.json();
        })
        .then((json) => {
            console.log(json)
            console.log(`this is ${json.name}`)
            copenhagenName.innerHTML += `
            <td id="denmarkCityName">${json.name}</td>
            `
            copenhagenTemp.innerHTML += `
            <td id="denmarkTemp">${json.main.temp.toFixed(0.5)}ºC</td>
            `
        })
};

weatherCurrentCopenhagen();


const weatherCurrentBuenosAires = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires,Argentina&units=metric&APPID=d8e3d440b59f81f07a8c91c14c07c06e')
        .then(response => {
            return response.json();
        })
        .then((json) => {
            console.log(json)
            console.log(`this is ${json.name}`)
            buenosAiresName.innerHTML += `
            <td id="argentinaCityName">${json.name}</td>
            `
            buenosAiresTemp.innerHTML += `
            <td id="argentinaTemp">${json.main.temp.toFixed(0.5)}ºC</td>
            `
        })

};

weatherCurrentBuenosAires();