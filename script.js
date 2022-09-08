const city = document.getElementById('city')
const temperature = document.getElementById('temperature')
const description = document.getElementById('description')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const forecast = document.getElementById('forecast')
const tempFeels = document.getElementById('tempFeels')
const mainForecast = document.querySelector('mainForecast')

let citySearched = 'Stockholm,Sweden' //default city would be Stockholm

//This is for the main weather forecast for today
const todayWeather = (citySearched) => {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=metric&APPID=abebf12bf91dc9d039d1075966f84a6d`)
    .then((response) => {
        return response.json()
    })
    .then((json) =>{
        let decimal = json.main.temp
        let number = Math.round(decimal * 10) / 10; 
        let fixed = number.toFixed(1)
        /*toFixed set the temperature always have 1 decimal*/
        city.innerHTML= (`${json.name}`);
        temperature.innerHTML= (`${fixed}°C`);
        
        tempFeels.innerHTML = (`Feels like ${json.main.feels_like.toFixed(1)}°C`)
        
        description.innerHTML= (`${json.weather[0].description}`) 
        /*made it work by targeting the weather index zero, and the description within that index zero GREAT JOB!!!*/
        
        /*to get info about sunset/sunrise in milliseconds */
        const sunriseConvert = new Date((json.sys.sunrise) * 1000);
        const sunriseTime = sunriseConvert.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        sunrise.innerHTML = (`Sunrise: ${sunriseTime}`)

        const sunsetConvert = new Date((json.sys.sunset) * 1000);
        const sunsetTime = sunsetConvert.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        sunset.innerHTML = (`Sunset: ${sunsetTime}`)
    })
    /*if there's no city with the name user chooses, it will alert 'location not found'*/
    .catch(error => {
        console.log(error);
        document.getElementById('cityNamePicked').value = '';
        location.reload()
        return alert('Location not found');
    })
};
todayWeather(citySearched); /*call the function*/ 

//This is for the 4-days forecast, todays forecast is in the main-forecast
const getDay = (weekday) => {
    const dates = new Date(weekday * 1000); //Timestamp to milliseconds
    return dates.toLocaleDateString('en', {weekday: 'long'}); //Setting how to show day
    }

const forecastWeather = citySearched => {   
    fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${citySearched}&units=metric&APPID=abebf12bf91dc9d039d1075966f84a6d`)
        .then((response) =>{
            return response.json()
        })
        .then ((json) => {
            const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
            forecast.innerHTML = `
            <div id = "dayOne">
            <div class="days">${getDay(filteredForecast[1].dt)}</div>
            <div class="dayDescription">${filteredForecast[1].weather[0].description}</div>
            <div class="temp">Temp: ${filteredForecast[1].main.temp.toFixed(1)}°</div>
            </div>

            <div id = "dayTwo">
            <div class="days">${getDay(filteredForecast[2].dt)}</div>
            <div class="dayDescription">${filteredForecast[2].weather[0].description}</div>
            <div class="temp">Temp: ${filteredForecast[2].main.temp.toFixed(1)}°</div>
            </div>

            <div id = "dayThree">
            <div class="days">${getDay(filteredForecast[3].dt)}</div>
            <div class="dayDescription">${filteredForecast[3].weather[0].description}</div>
            <div class="temp">Temp: ${filteredForecast[3].main.temp.toFixed(1)}°</div>
            </div>

            <div id = "dayFour">
            <div class="days">${getDay(filteredForecast[4].dt)}</div>
            <div class="dayDescription">${filteredForecast[4].weather[0].description}</div>
            <div class="temp">Temp: ${filteredForecast[4].main.temp.toFixed(1)}°</div>
            </div>
            `
        })
        .catch(error => {
        console.log(error);
        });
    };
forecastWeather(citySearched);

//button for city
const citySelected = () => {
	const cityPicked = document.getElementById('cityNamePicked').value;
	if (cityPicked) {
		citySearched = document.getElementById('cityNamePicked').value;
		forecastWeather(citySearched);
		todayWeather(citySearched);
	}
};

    /*change background depending on the time*/
    const currentTime = new Date().getHours();
    if(document.body){
        if(6 <= currentTime && currentTime < 17){
            document.body.background = "./Images/try.jpg";
            document.getElementById("temperature").style.color = "white";
            document.getElementById("temperature").style.textShadow = "0 0 30px #fcf9f9"
            document.getElementById("forecast").style.textShadow = "0 0 30px #fcf9f9"
        }else {
            document.body.style.backgroundImage = "url('./Images/try2.jpg')";
            document.getElementById("temperature").style.color = "white";
            document.getElementById("temperature").style.textShadow = "0 0 30px #fcf9f9"
            document.getElementById("forecast").style.textShadow = "0 0 30px #fcf9f9"
        }
    }