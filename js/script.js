const displayWeatherInfo = document.getElementById('displayWeatherInfo')

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5877e9b20cbe99b1b6637d0e4bb81238'
fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            cityName  = data.name
            temp      = data.main.temp.toFixed(1)
            type      = data.weather[0].description
            sunrise   = data.sys.sunrise
            sunset    = data.sys.sunset

            function msToTime(sunrise) {
                    let seconds = parseInt((sunrise/1000)%60)
                    let minutes = parseInt((sunrise/(1000*60))%60)
                    let hours = parseInt((sunrise/(1000*60*60))%24)
            
                hours = (hours < 10) ? "0" + hours : hours;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
                seconds = (seconds < 10) ? "0" + seconds : seconds;
            
                return hours + ":" + minutes
            }

            displayWeatherInfo.innerHTML = 
            `<div class = "weatherInfo">
            <p class="degree">${temp}<sup>o</sup>C</p>
             <p class="cityName">${cityName}</p>
             <p class="tempType">${type.charAt(0).toUpperCase()}${type.slice(1)}</p>
             <div class = "sunRisesunSet">
            <p>SUNRISE ${msToTime(sunrise)}</P>
            <p>SUNSET ${msToTime(sunset)}</P>
            </div>

            </div>`
        })



        //weather forecast
const weatherForecast = document.getElementById('weatherForecast')

const urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=5877e9b20cbe99b1b6637d0e4bb81238'
fetch(urlForecast)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            forecastType     = data.list[1].weather[0].main
            forecastTempMax  = data.list[0].main.temp_max.toFixed(0)
            forecastTempMin  = data.list[0].main.temp_min.toFixed(0)
            

            weatherForecast.innerHTML = 
            `<div class = "weatherForecastDays">

            <div class="weatherForecastRow">
            <p>MON </p>
            <p>${forecastType}</p>
            <p>${forecastTempMax}<sup>0</sup>/${forecastTempMin}<sup>0</sup></p>
            </div>
            <div class="weatherForecastRow">
            <p>TUE </p>
            <p>${forecastType}</p>
            <p>${forecastTempMax}<sup>0</sup>/${forecastTempMin}<sup>0</sup></p>
            </div>
            <div class="weatherForecastRow">
            <p>WED </p>
            <p>${forecastType}</p>
            <p>${forecastTempMax}<sup>0</sup>/${forecastTempMin}<sup>0</sup></p>
            </div>
            <div class="weatherForecastRow">
            <p>THU </p>
            <p>${forecastType}</p>
            <p>${forecastTempMax}<sup>0</sup>/${forecastTempMin}<sup>0</sup></p>
            </div>
            <div class="weatherForecastRow">
            <p>FRI </p>
            <p>${forecastType}</p>
            <p>${forecastTempMax}<sup>0</sup>/${forecastTempMin}<sup>0</sup></p>
            </div>
            <div class="weatherForecastRow">
            <p>SAT </p>
            <p>${forecastType}</p>
            <p>${forecastTempMax}<sup>0</sup>/${forecastTempMin}<sup>0</sup></p>
            </div>
            <div class="weatherForecastRow">
            <p>SUN </p>
            <p>${forecastType}</p>
            <p>${forecastTempMax}<sup>0</sup>/${forecastTempMin}<sup>0</sup></p>
            </div>
            
            </div>`
        })

