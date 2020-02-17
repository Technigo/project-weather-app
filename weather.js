const weatherInfo = document.getElementById('weather')
const forecasted = document.getElementById('five-day-forecast')

fetch('https://api.openweathermap.org/data/2.5/weather?q=Stockholm,sweden&units=metric&APPID=00620bb638ed0fa5525452696e39c3ed')
  .then((response) =>{
    return response.json()
  })
  .then((json) => {
    console.log(json)
    weatherInfo.innerHTML = `<h1>Weather in ${json.name}<h/1>`;
    let temperature = Math.round(json.main.temp * 10) /10;
    let feelsLike = Math.round(json.main.feels_like *10) /10;
    weatherInfo.innerHTML += `<p>${temperature}&#730; feels like ${feelsLike}&#730;</p>`;
    json.weather.forEach((sky) => {
      weatherInfo.innerHTML += `<p>${sky.description}</p>`;
    })
    const rise = new Date(json.sys.sunrise * 1000);
    const sunRise = rise.toLocaleTimeString('en-SE', {timeStyle: 'short'});
    const set = new Date(json.sys.sunset * 1000);
    const sunSet = set.toLocaleTimeString('en-SE', {timeStyle: 'short'});
    weatherInfo.innerHTML += `<p>Sunrise: ${sunRise}  Sunset: ${sunSet}</p>`
  })

fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=00620bb638ed0fa5525452696e39c3ed')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00'))
    console.log(filteredForecast)
    filteredForecast.forEach((forecast) => {
      let temperature = Math.round(forecast.main.temp * 10) / 10;
      let feelsLike = Math.round(forecast.main.feels_like * 10) / 10;
      let upcom = new Date(forecast.dt_txt);
      const fiveDays = upcom.toLocaleDateString('en-SE', {weekday: 'long'});
      console.log(fiveDays) 
      console.log(temperature, feelsLike)
      forecasted.innerHTML += `<p>${fiveDays} ${temperature} but beware ${feelsLike}</p>`;
    })
  })




  .catch((err) => {
    console.log('cauhgt error', err)
  })