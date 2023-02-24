const topSection = document.getElementById('topSection')
const main = document.getElementById('main')
const degrees = document.getElementById('degrees')
const city = document.getElementById('city')
const condition = document.getElementById('condition')
const sunriseSunset = document.getElementById('sunriseSunset')
const button = document.getElementById('button')
const mainImage = document.getElementById('mainImage')
const forecast = document.getElementById('forecast')
const weekDay = document.getElementById('forecast-weekday')
const weatherIcon = document.getElementById('forecast-icon')
const minTemp = document.getElementById('forecast-min-temp')
const maxTemp = document.getElementById('forecast-max-temp')


fetch('https://api.openweathermap.org/data/2.5/weather?q=Reykjavik&appid=fa2755c779ce094fc80f2fa365eea704&units=metric')
.then((response) => {
    return response.json()
})
.then((json) => {
    //started to add first details to our topsection
    degrees.innerHTML = `${json.main.temp.toFixed(1)}<sup>°C</sup>`;
    city.innerHTML = json.name;
    condition.innerHTML = json.weather[0].description;
 
    //Below the current UNIX time of sunrise/sunset times will be converted to HH:MM
   const sunriseData = new Date(json.sys.sunrise * 1000)
   console.log(sunriseData)
   const sunsetData = new Date(json.sys.sunset * 1000)
   console.log(sunsetData)
   //Here I used the option argument to customize the result of the toLocaleTimeString method
   const sunriseTime = sunriseData.toLocaleString('sv-SE', {
       hour: '2-digit',
       minute: '2-digit'
   })
   console.log(sunriseTime)
   const sunsetTime = sunsetData.toLocaleString('sv-SE', {
       hour: '2-digit',
       minute: '2-digit'
   })
   console.log(sunsetTime)
   //Added the converted time for sunrise/sunset to section sunriseSunset
   sunriseSunset.innerHTML = `<h3>sunrise</h3>`;
   sunriseSunset.innerHTML += `<h3>${sunriseTime}</h3>`;
   sunriseSunset.innerHTML += `<h3>sunset</h3>`;
   sunriseSunset.innerHTML += `<h3>${sunsetTime}</h3>`;
   console.log(json.sys)
   console.log(currentTimeCorrectFormat)
   //Show different background depending on what time the sunrise/sunset is
   if (sunriseTime <= currentTimeCorrectFormat && currentTimeCorrectFormat < sunsetTime) {
       topSection.style.backgroundImage = "url(Designs/Design-1/assets/day-small.jpg)"
   } else {
       topSection.style.backgroundImage = "url(Designs/Design-1/assets/night-small.jpg)"
   }

     //Variable for Todays weather main, to use when changing the picture in topSection
   let mainWeatherToday = json.weather[0].main
   console.log(mainWeatherToday)
   if (mainWeatherToday === "Snow") {
       weatherImg = 'icons8-snow-64.png'
   } else if (mainWeatherToday === "Rain") {
       weatherImg = 'icons8-rain-64.png'
   } else if (mainWeatherToday === "Thunderstorm") {    
       weatherImg = 'icons8-thunder-64.png'
   } else if (mainWeatherToday === "Drizzle") {
       weatherImg = 'icons8-wet-64.png'
   } else if (mainWeatherToday === "Mist" || mainWeatherToday === "Fog" || mainWeatherToday === "Ash") {
       weatherImg = 'icons8-mist-64.png'
   } else if (mainWeatherToday === "Clouds") {
       weatherImg = 'icons8-cloud-64.png'
   } else if (mainWeatherToday === "Clear") {
       weatherImg = 'icons8-solar-64.png'
   }
   mainImage.innerHTML += `<image src=${weatherImg} alt='icon of the weather Today'/>`

   })


   //Make the current time be in same format as sunrise/sunset time to be able to compare
   const currentTime = new Date();
   const currentTimeCorrectFormat = currentTime.toLocaleTimeString('sv-SE', {
       hour: '2-digit',
       minute: '2-digit'
   })    
   


fetch('https://api.openweathermap.org/data/2.5/forecast?lat=64.1355&lon=-21.8954&appid=fa2755c779ce094fc80f2fa365eea704&units=metric')
.then((response) => {
    return response.json()
})
.then((fiveDay) => {
    const getDates = fiveDay.list.map(day => ({...day, date: new Date(day.dt_txt)}))
    console.log('dates', getDates);

    const forecasts = []

    const today = new Date();
    const currentDate = new Date();

    for(let i = 0; i < 5; i++){
        currentDate.setDate(today.getDate()+i);
        let currentWeatherItems = getDates.filter(day => datesAreOnSameDay(day.date, currentDate))
    console.log('current', currentWeatherItems);
    forecasts.push({
    dayDate: currentWeatherItems[0].dt,
    weatherIcon: currentWeatherItems[0].weather[0].main,
    max: getMaxTemp(currentWeatherItems),
    min: getMinTemp(currentWeatherItems),
    })
    }

    console.log('new loop', forecasts)

    forecasts.forEach((item) => {
        const date = new Date(item.dayDate * 1000);
        let dayName =  date.toLocaleDateString("en-US", {weekday: "short"});
        
            // Looping through the array and deciding on the icon depending on weather forecast
            let mainWeather = item.weatherIcon
            if (mainWeather === "Snow") {
                weatherImg = 'icons8-snow-64.png'
            } else if (mainWeather === "Rain") {
                weatherImg = 'icons8-rain-64.png'
            } else if (mainWeather === "Thunderstorm") {
                weatherImg = 'icons8-thunder-64.png'
            } else if (mainWeather === "Drizzle") {
                weatherImg = 'icons8-wet-64.png'
            } else if (mainWeather === "Mist" || mainWeather === "Fog" || mainWeather === "Ash") {
                weatherImg = 'icons8-mist-64.png'
            } else if (mainWeather === "Clouds") {
                weatherImg = 'icons8-cloud-64.png'
            } else if (mainWeather === "Clear") {
                weatherImg = 'icons8-solar-64.png'
            }

            weekDay.innerHTML += `
            <p>${dayName}</p>`
            weatherIcon.innerHTML += `
            <img src=${weatherImg} alt="icon of the weather"/>`
            maxTemp.innerHTML += `
            <p>${item.max} °C / </p>`
            minTemp.innerHTML += `
            <p>&nbsp;${item.min} °C</p>`
    })
})
.catch(error => console.log(error))
/*
    //two filters, to be able to get a low and high temperature
    const filteredForecastNoon = fiveDay.list.filter(item => item.dt_txt.includes('12:00:00'));
    const filteredForecastMidnight = fiveDay.list.filter(item => item.dt_txt.includes('00:00:00'));
    //console.log('noon', filteredForecastNoon);

//Getting the variables from our filtered list
let minTemp = filteredForecastNoon.forEach((item) => {item.main.temp_min.toFixed(1)}) //Minimum temperature
let maxTemp = filteredForecastNoon.forEach((item) => {item.main.temp_max.toFixed(1)}) //Maximum temperature
// console.log(filteredForecastMidnight);
console.log(minTemp);
console.log(maxTemp);

//Getting the day name (noon)
filteredForecastNoon.forEach((item) => {
    const date = new Date(item.dt * 1000);
let dayName =  date.toLocaleDateString("en-US", {weekday: "short"});

    // Looping through the array and deciding on the icon depending on weather forecast
    let mainWeather = item.weather[0].main
    if (mainWeather === "Snow") {
        weatherImg = 'icons8-snow-64.png'
    } else if (mainWeather === "Rain") {
        weatherImg = 'icons8-rain-64.png'
    } else if (mainWeather === "Thunderstorm") {
        weatherImg = 'icons8-thunder-64.png'
    } else if (mainWeather === "Drizzle") {
        weatherImg = 'icons8-wet-64.png'
    } else if (mainWeather === "Mist" || mainWeather === "Fog" || mainWeather === "Ash") {
        weatherImg = 'icons8-mist-64.png'
    } else if (mainWeather === "Clouds") {
        weatherImg = 'icons8-cloud-64.png'
    } else if (mainWeather === "Clear") {
        weatherImg = 'icons8-solar-64.png'
    }

weekDay.innerHTML += `
<p>${dayName}</p>`
weatherIcon.innerHTML += `
<img src=${weatherImg} alt="icon of the weather"/>`
maxTemp.innerHTML += `
<p>${maxTemp} °C / </p>`
minTemp.innerHTML += `
<p>&nbsp;${minTemp} °C</p>`
})

//filteredForecastMidnight.forEach((item) => {
//minTemp.innerHTML += `
//<p>&nbsp;${minTemp} °C</p>
//`
})
*/

const getMaxTemp = (data) => {
    const temps = data.map(item => item['main']['temp'])
    return Math.round(Math.max(...temps))
}

const getMinTemp = (data) => {
    const temps = data.map(item => item['main']['temp'])
    return Math.round(Math.min(...temps))
}

const datesAreOnSameDay = (first, second) =>
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();




