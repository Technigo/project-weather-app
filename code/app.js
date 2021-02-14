

// Global variable
let weather

// convert datetime from API to hours
const hrsMinConverter = (param) => {
    const date = new Date(param * 1000)
    const hours = date.getHours()
    const min = date.getMinutes()
    hoursMin = `${hours}:${min}`
    return hoursMin
}

const dayMonthConverter = (param) => {
    const date = new Date(param * 1000)
    const day = date.getDate()
    const month = date.getMonth()
    dayMonth = `${day}/${month+1}`
    return dayMonth
}


// fetching 5 days weather data from API
const weatherData = () => {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=1b672b9c637e28dafe516793b1e9bf96")
  .then((response) => {
    return response.json().then((json) => {
      console.log(json);
      weather = json
                  
      city.innerHTML= weather.name
      dayCurrent.innerHTML += dayMonthConverter(weather.dt)
      timeCurrent.innerHTML += hrsMinConverter(weather.dt)
      sky.innerHTML += weather.weather[0].main
      temperature.innerHTML += weather.main.temp
      feelsTemp.innerHTML += weather.main.feels_like
      sunrise.innerHTML += hrsMinConverter(weather.sys.sunrise)
      sunset.innerHTML += hrsMinConverter(weather.sys.sunset)
      


    });
  });
};

weatherData();
