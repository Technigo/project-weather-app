const city = document.getElementById('city')
const temp = document.getElementById('temp')
const weatherType = document.getElementById('weather-type')
const mainWeatherSection = document.getElementById('main-weather')
const sunSection = document.getElementById('sun')
const forecastSection = document.getElementById('forecast')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')

const BASE_URL= 'https://api.openweathermap.org/data/2.5/'
const API_KEY = 'bc487ba1fa4b42fcfb85443237a7774e'

const URL_WEATHER = 'weather'
const URL_FORECAST = 'forecast'
const cityQuery = 'Tokyo,Japan'

//------Fetching today's weather-----
const fetchWeather = () => {
fetch(`${BASE_URL}${URL_WEATHER}?q=${cityQuery}&units=metric&APPID=${API_KEY}`)
.then((response)=> {
    return response.json()
})
.then ((json) => {

    console.log (json)
    getBasicWeatherInfo(json)
    calculateSunrise(json)
    calculateSunset(json)
 })
}



const getBasicWeatherInfo = (json) => {
    const cityName = ` ${json.name}`
    city.innerHTML = cityName 
    const mainTemperature = `${Math.round(json.main.temp)}&deg;C`
    temp.innerHTML = mainTemperature
    json.weather.forEach((element) => {
        weatherType.innerHTML = `${element.main}`
    console.log(element.main)
    }) 
}

const calculateSunrise = (json) => {
    const unixTimestamp = json.sys.sunrise //seconds
    const timezone = json.timezone 
    const offset = new Date().getTimezoneOffset() * 60 //Gets the difference between time on local computer and UCT
    const sunriseInSeconds = unixTimestamp + timezone + offset //Represents the local time of sunrise in seconds since the Unix epoch.
    const sunriseInMilliseconds = sunriseInSeconds * 1000 //seconds
    const sunriseLocalDate = new Date(sunriseInMilliseconds) //gives date
    const localtimeSunrise = `${sunriseLocalDate.getHours().toString()}:${sunriseLocalDate.getMinutes().toString()}`; //gives only time
    insertSunrise (localtimeSunrise)
}

const calculateSunset = (json) => {
    const unixTimestamp = json.sys.sunset //seconds
    const timezone = json.timezone 
    const offset = new Date().getTimezoneOffset() * 60 //Gets the difference between time on local computer and UCT
    const sunsetInSeconds = unixTimestamp + timezone + offset //Represents the local time of sunrise in seconds since the Unix epoch.
    const sunsetInMilliseconds = sunsetInSeconds * 1000 //seconds
    const sunsetLocalDate = new Date(sunsetInMilliseconds) //gives date
    const localtimeSunset = `${sunsetLocalDate.getHours().toString()}:${sunsetLocalDate.getMinutes().toString()}`; //gives only time
    insertSunset (localtimeSunset)
}

const insertSunrise = (localtimeSunrise) => {
    sunrise.innerHTML += `${localtimeSunrise}`
}
const insertSunset = (localtimeSunset) => {
    sunset.innerHTML += `${localtimeSunset}`
}




//----Fetching for 5 days forecast
const fetchForecast = () => {
fetch(`${BASE_URL}${URL_FORECAST}?q=${cityQuery}&units=metric&APPID=${API_KEY}`)
.then((response)=> {
    return response.json()
})
.then((json) => {
    console.log (json)
    console.log(json.city.name)

    json.list.forEach((element)=> {
     //console.log(element.main.temp)
    }) 


     // Filter the list for elements with a timestamp of 12:00:00
     const weatherAt12 = json.list.filter((el) => el.dt_txt.includes("12:00:00"));
    //elements12 är en array med 5 objekt. Innehåller all väderinfo kl 12, 5 olika dagar
     console.log(weatherAt12)

     const dates_text = weatherAt12.map((el) => el.dt_txt)
     // dates_text är en array med 5 strings: ex; '2023-09-12 12:00:00'
     console.log(dates_text)

     const DayNumber = dates_text.map((el)=>{
        return new Date(el).getDay()
     })
     // dayNumber är en string: [2, 3, 4, 5, 6], representerar dagarna i nummerform
     console.log(DayNumber)

     const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

     let day1 = weekday[DayNumber[0]];
     let day2 = weekday[DayNumber[1]];
     let day3 = weekday[DayNumber[2]];
     let day4 = weekday[DayNumber[3]];
     let day5 = weekday[DayNumber[4]];
    
     //Här skrivs day som ex Weekday[2] = Tuesday utifrån arrayn 'DayNumber'


     // Extract temperature values for the filtered elements
     const temperaturesAt12 = weatherAt12.map((el) => Math.round(el.main.temp))
    
     const feelsLike = weatherAt12.map((el) => Math.round(el.main.feels_like))
 
     console.log(`tempat12 ${temperaturesAt12}`);
     console.log(feelsLike)

     forecastSection.innerHTML += `
     <div class='forecast-column'>
     <p>Day</p>
     <p>${day1}:</p>
     <p>${day2}:</p>
     <p>${day3}:</p>
     <p>${day4}:</p>
     <p>${day5}:</p>
     </div>
   
     <div class='forecast-column'>
     <p>Temp</p>
     <p>${temperaturesAt12[0]}°C,</p>
     <p>${temperaturesAt12[1]}°C,</p>
     <p>${temperaturesAt12[2]}°C,</p>
     <p>${temperaturesAt12[3]}°C,</p>
     <p>${temperaturesAt12[4]}°C,</p>
      </div> 

    <div class='forecast-column'>
    <p>Feels like</p>
    <p>${feelsLike[0]}°C</p>
    <p>${feelsLike[1]}°C</p>
    <p>${feelsLike[2]}°C</p>
    <p>${feelsLike[3]}°C</p>
    <p>${feelsLike[4]}°C</p>
    </div> `
    })
 }


//----fetching json------
fetchForecast();
fetchWeather()
