// All the DOM selectors stored as short variables
const infoWrapper = document.getElementById('infoWrapper');
const forecastWrapper = document.getElementById('forecastWrapper')
const icon = document.getElementById('data-result-icon')
const rainDay = document.getElementById('rainDay')
const clearDay = document.getElementById('clearDay')
const snowDay = document.getElementById('snowDay')
const thunderDay = document.getElementById('thunderDay')
const cloudsDay = document.getElementById('cloudsDay')
const drizzelDay = document.getElementById('drizzelDay')
const forecastROw = document.getElementById('forecastRow')
const bodyStyle = document.getElementById('bodyStyle')


// Here starts the fetch API for Stockholm weather
fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8802f8b4b2d622931613aace44be57ae')
    .then((response) => {
        return response.json() 
    })
    .then((json) => {
        console.log(json)

        const sunriseTime = new Date(json.city.sunrise * 1000)
        const sunsetTime = new Date(json.city.sunset * 1000)
        const date = new Date ()
        
        //This function can be used to add a "0" on the left
        function addZero(i) {
            if (i < 10) {i = "0" + i}
            return i;
          };
        
        //This is for getting info from json and display it into the top section
        infoWrapper.innerHTML += `
        <img class="menu" src="./icons8-menu-48.png"/>
        <div class="info-row">
            <div class="info-temp" id="infoTemp">
                <h1>${json.list[0].main.temp.toFixed(0)}</h1>
            </div>
            <div class="info-sky" id="infoSky">
                <p>${json.list[0].weather[0].description}</p>
                <img class="weather-icon" id="weatherIcon" src="http://openweathermap.org/img/wn/${json.list[0].weather[0].icon}.png" alt="weather-icon">
            </div>
            <div class="info-city" id="infoCity">
                ${json.city.name}
                ${addZero(date.getHours())}:${addZero(date.getMinutes())}
            </div> 
            <div class="info-sun-position" id="infoSunPosition">
                <p class="text">Sunrise at ${addZero(sunriseTime.getHours())}:${addZero(sunriseTime.getMinutes())}</p>
                <p class="text">Sunset at ${sunsetTime.getHours()}:${sunsetTime.getMinutes()}</p>
            </div>
        </div>
        `

        // This will filter the json response using includes(timestamp)
        let filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00')); 
        filteredForecast.forEach(item => { //This will loop through every filtered item and create a forecast
            forecastWrapper.innerHTML += `
            <div class="forecast-row">
                <div class="for-day-temp"> ${new Date(item.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                })}</div>
                <img class="weather-icon" id="weatherIcon" src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="weather-icon">
                <div class="for-day-temp"> ${item.main.temp.toFixed(0)}˚C</div>
                <div class="desktop-info"> Feels like ${item.main.feels_like.toFixed(0)}˚C</div>
                <div class="desktop-info"> Humidity ${item.main.humidity.toFixed(0)}%</div>
                <div class="desktop-info"> Wind speed ${item.wind.speed} m/s</div>
            </div>
            `;
            
            //This will change the background depending on weather main from json

            //You can change this⬇ to test if it works (comment out if not using)
            //item.weather[0].main = "Snow"
            //You can change this⬆ to test if it works

            if (item.weather[0].main === 'Clear') {
                const urlLink = 'https://media3.giphy.com/media/dwEu28cBkJdhuU6dnQ/giphy.gif?cid=ecf05e47w3ubx02xyy0v2y3z2emt2cmzvcpacwt0viiekqzz&rid=giphy.gif&ct=s'
                const linearStyle = 'linear-gradient(20deg, rgb(221, 226, 156) 30%, rgb(111, 202, 255))'
                infoWrapper.style.background= 'url('+urlLink+') center left  / contain no-repeat, '+linearStyle+' no-repeat';

            } else if (item.weather[0].main === 'Clouds') {
                const linearStyle = 'linear-gradient(10deg, rgb(112, 167, 199) 55%, rgb(5, 63, 75))';
                const urlLink = 'https://media1.giphy.com/media/2AMBtjL26O65qciYjR/giphy.gif?cid=ecf05e47xu2r6yjgzxh2cplkzsgc04y20ppgi3m3m4hokmws&rid=giphy.gif&ct=s'
                infoWrapper.style.background= 'url('+urlLink+') center center / contain no-repeat, '+linearStyle+' no-repeat';

            } else if (item.weather[0].main === 'Rain') {
                const linearStyle = 'linear-gradient(30deg, rgb(43, 115, 129) 30%, rgb(13, 36, 41))';
                const urlLink = 'https://media4.giphy.com/media/PlWSZLy1o5jLkxTjFA/giphy.gif?cid=ecf05e47q52h03wnz0mqyusj4jg74693x8z09ivbztes1wg0&rid=giphy.gif&ct=s'
                infoWrapper.style.background= 'url('+urlLink+') center center / contain , '+linearStyle+' no-repeat';

            } else if (item.weather[0].main === 'Snow') {
                const linearStyle = 'linear-gradient(10deg, rgb(226, 226, 226) 50%,rgb(70, 70, 70))';
                const urlLink = 'https://media3.giphy.com/media/ciYfVwZxBD0wPrO6nb/giphy.gif?cid=ecf05e47bdmeq3f5w8oxm7pz21kbeanhc2eos4qyx91tcg9v&rid=giphy.gif&ct=s'
                infoWrapper.style.background= 'url('+urlLink+') center center / contain , '+linearStyle+' no-repeat';

            } else if (item.weather[0].main === 'Thunderstorm') {
                const linearStyle = 'linear-gradient(20deg, rgb(90, 90, 90) 50%,rgb(14, 14, 14))';
                const urlLink = 'https://media2.giphy.com/media/VJq6ahBLV6O3lR8SB5/giphy.gif?cid=ecf05e47gn5dlm2vj5iizlq9ef4xxqkkcbwoizxqpnwxqmec&rid=giphy.gif&ct=s'
                infoWrapper.style.background= 'url('+urlLink+') center center / contain no-repeat, '+linearStyle+' no-repeat';

            } else {
                infoWrapper.style.background = 'linear-gradient(40deg, rgb(255, 255, 255) 55%,rgb(255, 255, 255))'
            };
        })
    })
// if there is an error, this will catch it
.catch((err) => {
    console.log('caught error', err)
});
