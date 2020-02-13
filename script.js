let stockholmWeather = {
  city: 'Stockholm',
  country: 'Sweden'
}

console.log(stockholmWeather)

let stockholmWeatherAsJSON = JSON.stringify(stockholmWeather)
console.log(stockholmWeatherAsJSON)

fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=b09042e161870e44988114035ff61156')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    console.log(json)
  })
  .catch((error) => {
    console.log('Caught error', error)
  })






/*
const stockholmWeather = {
  "coord": {
    "lon": 18.06,
    "lat": 59.33
  },
  "weather": [
    {
      "id": 801,
      "main": "Clouds",
      "description": "few clouds",
      "icon": "02d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 3.1,
    "feels_like": -3.76,
    "temp_min": 1,
    "temp_max": 4.44,
    "pressure": 998,
    "humidity": 59
  },
  "visibility": 10000,
  "wind": {
    "speed": 6.2,
    "deg": 260
  },
  "clouds": {
    "all": 24
  },
  "dt": 1581597887,
  "sys": {
    "type": 1,
    "id": 1788,
    "country": "SE",
    "sunrise": 1581575444,
    "sunset": 1581608006
  },
  "timezone": 3600,
  "id": 2673730,
  "name": "Stockholm",
  "cod": 200
}
*/
