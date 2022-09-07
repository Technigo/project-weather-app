

const container = document.getElementById('todaySummary')
const mainWeather = document.getElementById('mainWeather') 
const weeklyWeather = document.getElementById('weeklyForcastWrapper')
const dailyForcast = document.getElementById('dailyForcastRow')
const dday = document.getElementById('dday')
const temp = document.getElementById('temp')
const ApiWeather = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=64d2a624607147029ae4574d21f5c6d9'
// this is the API variable for the 5 days forecast
const ApiForcast = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=4c7a468589eea9cb94d5053a081d05ba'



/// An object catching the weekday and turning it into a string//

// const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const date = new Date();
// let weekDay = days[date.getDay()];
fetch(ApiWeather)
    .then((response) => {
        return response.json()
    })
    .then((data) => {


  

        mainWeather.innerHTML = `<h1>Todays temperature in ${data.name} is ${data.main.temp} and it's ${data.weather[0].description} today.</h1>`
        //console.log(data)    
      })
    .catch((err) =>{ //ERROR function. We pass in a function as a parameter in the function, just like the then function.
      console.log(err)
    })


    fetch(ApiForcast)
    .then((response) => {
        return response.json()
    })
    .then((dataforcast) => {
     

          const filteredForecast = dataforcast.list.filter(item => item.dt_txt.includes('12:00'))
          //console.log(filteredForecast)
          filteredForecast.forEach((day) => {
          const options1 = { weekday: 'long' }
          const options2 = { weekday: 'short' }
          //     // forecast is injected in HTML, we also rounded the value to show no decimal
          //     // with one decimal: ${Math.round(day.main.temp * 10) / 10}
          //     // adds the weekdays in two ways, short and long format, example mon or monday
          
          
          dailyForcast.innerHTML +=`
          <p class="forecast-day" id="forecastDay">
          <span class="short-day">${new Intl.DateTimeFormat('en-GB', options1).format(day.dt * 1000).toLowerCase()}</span>
          <span class="long-day">${new Intl.DateTimeFormat('en-GB', options2).format(day.dt * 1000).toLowerCase()}</span>
          <span>${Math.round(day.main.temp)}°</span></p>`
        })
      })







    //https://api.openweathermap.org/data/2.5/weather?lat={LAT}&lon={LON}&appid={API KEY}

    //https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=
    //Petras API :98b6cfababcb8aa6d64ecb9698b0bc9c
    //Charlottes API: 64d2a624607147029ae4574d21f5c6d9
    //<span>${day.weather[0].description}</span>
