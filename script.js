const city = document.getElementById('city')
const temp = document.getElementById('temp')
const weatherType = document.getElementById('weather-type')
const mainWeatherSection = document.getElementById('main-weather')
const sunSection = document.getElementById('sun')
const forecastSection = document.getElementById('forecast')



const BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID='
const BASE_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID='
const API_KEY = 'bc487ba1fa4b42fcfb85443237a7774e'

const URL_WEATHER = `${BASE_URL_WEATHER}${API_KEY}`
const URL_FORECAST = `${BASE_URL_FORECAST}${API_KEY}`


//------Fetching today's weather-----
const fetchWeather = () => {
fetch(URL_WEATHER)
.then((response)=> {
    return response.json()
})
.then ((json) => {

    //-----Basic weather info------
    console.log (json)
    city.innerHTML = ` ${json.name}`
    temp.innerHTML = `<p>Temperature:${json.main.temp}</p>`
    json.weather.forEach((element) => {
        weatherType.innerHTML = `<h2> Weather: ${element.main} </h2>`
    console.log(element.main)
    })
    //-----------------------------


    //-----Getting sunrise and sunrise times------
    // Convert sunrise and sunset timestamps to hours
    const sunriseTime = new Date(json.sys.sunrise * 1000); //*1000 to convert it in to milliseconds
    const sunsetTime = new Date(json.sys.sunset * 1000);

    sunSection.innerHTML += `<p>Sunrise: ${sunriseTime.getHours()}:${String(sunriseTime.getMinutes()).padStart(2, '0')}</p>`;
    console.log(`Sunrise: ${sunriseTime.getHours()}:${String(sunriseTime.getMinutes()).padStart(2, '0')}`);



    sunSection.innerHTML += `<p>Sunset: ${sunsetTime.getHours()}:${String(sunsetTime.getMinutes()).padStart(2, '0')}</p>`;
    console.log(`Sunset: ${sunsetTime.getHours()}:${String(sunsetTime.getMinutes()).padStart(2, '0')}`);
    
    })
}
fetchWeather()


//----Fetching for 5 days forecast
const fetchForecast = () => {
fetch(URL_FORECAST)
.then((response)=> {
    return response.json()
})
.then((json) => {
    console.log (json)
    console.log(json.city.name)

    json.list.forEach((element)=> {
     console.log(element.main.temp)
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
fetchForecast();
