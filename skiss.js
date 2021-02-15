// SPACE PEOPLE THING

const container = document.getElementById('astros')
fetch('http://api.open-notify.org/astros.json')
.then(response => response.json())
.then(json => {
    console.log(json)
    container.innerHTML = `<h1>There are ${json.number} people in space right now</h1>`
    json.people.forEach(person => {
        container.innerHTML += `<p>${person.name} is on the ${person.craft}</p>)`
    })
    })


// CODE SANDBOX THING

let image = document.getElementById("image");
let name = document.getElementById("name");
let element = document.getElementById("element");
let weight = document.getElementById("weight");
let height = document.getElementById("height");
let types = document.getElementById("types");



const fetchPokemons = () => {
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=120")
    .then((response) => response.json())
    .then((json) => {
      //console.log(json.results)
      json.results.forEach((pokemon) => {
        console.log(pokemon.name);
      });
    });
};

const fetchExeggcuteData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon/102/")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      image.src = json.sprites.front_default;
      name.innerHTML = json.name;
      weight.innerHTML = json.weight;
      height.innerHTML = json.height;
      types.innerHTML = json.types[0].type.name;
      if (json.types.length > 1) {
        for (let i=1; i < json.types.length; i++) {
          types.innerHTML += ", " + json.types[i].type.name
        }
      }
    })
}

fetchExeggcuteData();

// WEATHER APP ...............

// Current weather data
const currentWeatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID='

// Forecast 
const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID='

// Icons example: http://openweathermap.org/img/wn/10d@2x.png
const iconUrl = 'http://openweathermap.org/img/wn/'
const iconSize = '@4x.png'

const apiKey = '3addfde144e16d817dcc3a5e9a46ea59'

// Convert unix to date
const unixToDate = (unix) => {
    //const sunset = unix * 1000
    const dateObj = new Date(unix * 1000)
    return dateObj.toLocaleString()
}

// Convert unix to time
const unixToTime = (unix) => {
    const dateObj = new Date(unix * 1000)
    const timeString = dateObj.getHours() + ':' + dateObj.getMinutes()
    return timeString
}

fetch(currentWeatherApiUrl + apiKey)
.then(response => response.json())
.then(json => {
    console.log(json)
    console.log(Math.round(json.main.temp))
    console.log(json.weather[0].icon)
    console.log(unixToTime(json.sys.sunrise))
    console.log(unixToTime(json.sys.sunset))
    console.log(json.weather[0].description)
})

fetch(forecastApiUrl + apiKey)
.then(response => response.json())
.then(json => {
    console.log(json)
})


//http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=YOUR_API_KEY


/*
{
  coord: {
    lon: 18.0649,
    lat: 59.3326
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01n"
    }
  ],
    base: "stations",
    main: {
      temp: -6.43,
      feels_like: -9.63,
      temp_min: -8,
      temp_max: -5,
      pressure: 1026,
      humidity: 93
  },
  visibility: 10000,
  wind: {
    speed: 0.51,
    deg: 0
  },
  clouds: {
    all: 0
  },
  dt: 1613415192,
  sys: {
    type: 1,
    id: 1788,
    country: "SE",
    sunrise: 1613370215,
    sunset: 1613403625
  },
    timezone: 3600,
    id: 2673730,
    name: "Stockholm",
    cod: 200
}



{
cod: "200",
message: 0,
cnt: 40,
list: [
{
dt: 1613422800,
main: {
temp: -6.98,
feels_like: -11.73,
temp_min: -7.57,
temp_max: -6.98,
pressure: 1026,
sea_level: 1026,
grnd_level: 1021,
humidity: 94,
temp_kf: 0.59
},
weather: [
{
id: 802,
main: "Clouds",
description: "scattered clouds",
icon: "03n"
}
],
clouds: {
all: 43
},
wind: {
speed: 2.67,
deg: 239
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-15 21:00:00"
},
{
dt: 1613433600,
main: {
temp: -7.65,
feels_like: -12.18,
temp_min: -7.99,
temp_max: -7.65,
pressure: 1024,
sea_level: 1024,
grnd_level: 1020,
humidity: 94,
temp_kf: 0.34
},
weather: [
{
id: 803,
main: "Clouds",
description: "broken clouds",
icon: "04n"
}
],
clouds: {
all: 71
},
wind: {
speed: 2.28,
deg: 238
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-16 00:00:00"
},
{
dt: 1613444400,
main: {
temp: -7.55,
feels_like: -12.31,
temp_min: -7.63,
temp_max: -7.55,
pressure: 1022,
sea_level: 1022,
grnd_level: 1018,
humidity: 95,
temp_kf: 0.08
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 94
},
wind: {
speed: 2.64,
deg: 247
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-16 03:00:00"
},
{
dt: 1613455200,
main: {
temp: -7.33,
feels_like: -11.51,
temp_min: -7.34,
temp_max: -7.33,
pressure: 1021,
sea_level: 1021,
grnd_level: 1017,
humidity: 95,
temp_kf: 0.01
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 99
},
wind: {
speed: 1.83,
deg: 248
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-16 06:00:00"
},
{
dt: 1613466000,
main: {
temp: -3.99,
feels_like: -7.73,
temp_min: -3.99,
temp_max: -3.99,
pressure: 1020,
sea_level: 1020,
grnd_level: 1016,
humidity: 95,
temp_kf: 0
},
weather: [
{
id: 803,
main: "Clouds",
description: "broken clouds",
icon: "04d"
}
],
clouds: {
all: 78
},
wind: {
speed: 1.67,
deg: 261
},
visibility: 10000,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-16 09:00:00"
},
{
dt: 1613476800,
main: {
temp: -1.6,
feels_like: -4.68,
temp_min: -1.6,
temp_max: -1.6,
pressure: 1019,
sea_level: 1019,
grnd_level: 1015,
humidity: 95,
temp_kf: 0
},
weather: [
{
id: 803,
main: "Clouds",
description: "broken clouds",
icon: "04d"
}
],
clouds: {
all: 76
},
wind: {
speed: 1.12,
deg: 296
},
visibility: 10000,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-16 12:00:00"
},
{
dt: 1613487600,
main: {
temp: -3.81,
feels_like: -7,
temp_min: -3.81,
temp_max: -3.81,
pressure: 1018,
sea_level: 1018,
grnd_level: 1015,
humidity: 97,
temp_kf: 0
},
weather: [
{
id: 803,
main: "Clouds",
description: "broken clouds",
icon: "04d"
}
],
clouds: {
all: 77
},
wind: {
speed: 0.95,
deg: 351
},
visibility: 10000,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-16 15:00:00"
},
{
dt: 1613498400,
main: {
temp: -5.82,
feels_like: -9.72,
temp_min: -5.82,
temp_max: -5.82,
pressure: 1018,
sea_level: 1018,
grnd_level: 1015,
humidity: 97,
temp_kf: 0
},
weather: [
{
id: 803,
main: "Clouds",
description: "broken clouds",
icon: "04n"
}
],
clouds: {
all: 70
},
wind: {
speed: 1.66,
deg: 57
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-16 18:00:00"
},
{
dt: 1613509200,
main: {
temp: -6.08,
feels_like: -10.25,
temp_min: -6.08,
temp_max: -6.08,
pressure: 1018,
sea_level: 1018,
grnd_level: 1015,
humidity: 98,
temp_kf: 0
},
weather: [
{
id: 803,
main: "Clouds",
description: "broken clouds",
icon: "04n"
}
],
clouds: {
all: 63
},
wind: {
speed: 2.04,
deg: 64
},
visibility: 6770,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-16 21:00:00"
},
{
dt: 1613520000,
main: {
temp: -5.32,
feels_like: -9.38,
temp_min: -5.32,
temp_max: -5.32,
pressure: 1019,
sea_level: 1019,
grnd_level: 1015,
humidity: 98,
temp_kf: 0
},
weather: [
{
id: 803,
main: "Clouds",
description: "broken clouds",
icon: "04n"
}
],
clouds: {
all: 71
},
wind: {
speed: 1.98,
deg: 66
},
visibility: 4658,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-17 00:00:00"
},
{
dt: 1613530800,
main: {
temp: -3.59,
feels_like: -9.48,
temp_min: -3.59,
temp_max: -3.59,
pressure: 1019,
sea_level: 1019,
grnd_level: 1015,
humidity: 97,
temp_kf: 0
},
weather: [
{
id: 600,
main: "Snow",
description: "light snow",
icon: "13n"
}
],
clouds: {
all: 86
},
wind: {
speed: 4.84,
deg: 98
},
visibility: 2360,
pop: 0.24,
snow: {
3h: 0.36
},
sys: {
pod: "n"
},
dt_txt: "2021-02-17 03:00:00"
},
{
dt: 1613541600,
main: {
temp: -5.81,
feels_like: -11.26,
temp_min: -5.81,
temp_max: -5.81,
pressure: 1019,
sea_level: 1019,
grnd_level: 1015,
humidity: 96,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 85
},
wind: {
speed: 3.87,
deg: 94
},
visibility: 10000,
pop: 0.07,
sys: {
pod: "n"
},
dt_txt: "2021-02-17 06:00:00"
},
{
dt: 1613552400,
main: {
temp: -4.1,
feels_like: -9.72,
temp_min: -4.1,
temp_max: -4.1,
pressure: 1021,
sea_level: 1021,
grnd_level: 1017,
humidity: 92,
temp_kf: 0
},
weather: [
{
id: 802,
main: "Clouds",
description: "scattered clouds",
icon: "03d"
}
],
clouds: {
all: 25
},
wind: {
speed: 4.27,
deg: 103
},
visibility: 10000,
pop: 0.02,
sys: {
pod: "d"
},
dt_txt: "2021-02-17 09:00:00"
},
{
dt: 1613563200,
main: {
temp: -3.54,
feels_like: -8.89,
temp_min: -3.54,
temp_max: -3.54,
pressure: 1022,
sea_level: 1022,
grnd_level: 1018,
humidity: 91,
temp_kf: 0
},
weather: [
{
id: 801,
main: "Clouds",
description: "few clouds",
icon: "02d"
}
],
clouds: {
all: 13
},
wind: {
speed: 3.94,
deg: 109
},
visibility: 10000,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-17 12:00:00"
},
{
dt: 1613574000,
main: {
temp: -5.91,
feels_like: -10.43,
temp_min: -5.91,
temp_max: -5.91,
pressure: 1023,
sea_level: 1023,
grnd_level: 1019,
humidity: 93,
temp_kf: 0
},
weather: [
{
id: 800,
main: "Clear",
description: "clear sky",
icon: "01d"
}
],
clouds: {
all: 2
},
wind: {
speed: 2.47,
deg: 98
},
visibility: 10000,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-17 15:00:00"
},
{
dt: 1613584800,
main: {
temp: -8.48,
feels_like: -12.94,
temp_min: -8.48,
temp_max: -8.48,
pressure: 1024,
sea_level: 1024,
grnd_level: 1020,
humidity: 94,
temp_kf: 0
},
weather: [
{
id: 800,
main: "Clear",
description: "clear sky",
icon: "01n"
}
],
clouds: {
all: 10
},
wind: {
speed: 2.09,
deg: 95
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-17 18:00:00"
},
{
dt: 1613595600,
main: {
temp: -8.52,
feels_like: -12.91,
temp_min: -8.52,
temp_max: -8.52,
pressure: 1025,
sea_level: 1025,
grnd_level: 1021,
humidity: 94,
temp_kf: 0
},
weather: [
{
id: 803,
main: "Clouds",
description: "broken clouds",
icon: "04n"
}
],
clouds: {
all: 58
},
wind: {
speed: 1.98,
deg: 106
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-17 21:00:00"
},
{
dt: 1613606400,
main: {
temp: -8.19,
feels_like: -12.64,
temp_min: -8.19,
temp_max: -8.19,
pressure: 1025,
sea_level: 1025,
grnd_level: 1021,
humidity: 94,
temp_kf: 0
},
weather: [
{
id: 803,
main: "Clouds",
description: "broken clouds",
icon: "04n"
}
],
clouds: {
all: 65
},
wind: {
speed: 2.1,
deg: 121
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-18 00:00:00"
},
{
dt: 1613617200,
main: {
temp: -8.06,
feels_like: -12.67,
temp_min: -8.06,
temp_max: -8.06,
pressure: 1025,
sea_level: 1025,
grnd_level: 1021,
humidity: 95,
temp_kf: 0
},
weather: [
{
id: 803,
main: "Clouds",
description: "broken clouds",
icon: "04n"
}
],
clouds: {
all: 81
},
wind: {
speed: 2.36,
deg: 131
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-18 03:00:00"
},
{
dt: 1613628000,
main: {
temp: -6.72,
feels_like: -11.41,
temp_min: -6.72,
temp_max: -6.72,
pressure: 1025,
sea_level: 1025,
grnd_level: 1021,
humidity: 95,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 91
},
wind: {
speed: 2.64,
deg: 142
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-18 06:00:00"
},
{
dt: 1613638800,
main: {
temp: -3.22,
feels_like: -8.76,
temp_min: -3.22,
temp_max: -3.22,
pressure: 1025,
sea_level: 1025,
grnd_level: 1021,
humidity: 94,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04d"
}
],
clouds: {
all: 96
},
wind: {
speed: 4.34,
deg: 175
},
visibility: 10000,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-18 09:00:00"
},
{
dt: 1613649600,
main: {
temp: -2.34,
feels_like: -8.25,
temp_min: -2.34,
temp_max: -2.34,
pressure: 1024,
sea_level: 1024,
grnd_level: 1020,
humidity: 93,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04d"
}
],
clouds: {
all: 98
},
wind: {
speed: 4.98,
deg: 181
},
visibility: 10000,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-18 12:00:00"
},
{
dt: 1613660400,
main: {
temp: -2.9,
feels_like: -8.33,
temp_min: -2.9,
temp_max: -2.9,
pressure: 1022,
sea_level: 1022,
grnd_level: 1018,
humidity: 95,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04d"
}
],
clouds: {
all: 94
},
wind: {
speed: 4.25,
deg: 177
},
visibility: 10000,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-18 15:00:00"
},
{
dt: 1613671200,
main: {
temp: -2.87,
feels_like: -8.81,
temp_min: -2.87,
temp_max: -2.87,
pressure: 1021,
sea_level: 1021,
grnd_level: 1017,
humidity: 96,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 93
},
wind: {
speed: 5.01,
deg: 187
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-18 18:00:00"
},
{
dt: 1613682000,
main: {
temp: -2.88,
feels_like: -8.33,
temp_min: -2.88,
temp_max: -2.88,
pressure: 1020,
sea_level: 1020,
grnd_level: 1016,
humidity: 96,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 100
},
wind: {
speed: 4.3,
deg: 190
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-18 21:00:00"
},
{
dt: 1613692800,
main: {
temp: -2.41,
feels_like: -7.58,
temp_min: -2.41,
temp_max: -2.41,
pressure: 1019,
sea_level: 1019,
grnd_level: 1015,
humidity: 96,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 100
},
wind: {
speed: 3.98,
deg: 190
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-19 00:00:00"
},
{
dt: 1613703600,
main: {
temp: -1.47,
feels_like: -6.59,
temp_min: -1.47,
temp_max: -1.47,
pressure: 1017,
sea_level: 1017,
grnd_level: 1014,
humidity: 96,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 100
},
wind: {
speed: 4.08,
deg: 185
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-19 03:00:00"
},
{
dt: 1613714400,
main: {
temp: -1.56,
feels_like: -6.45,
temp_min: -1.56,
temp_max: -1.56,
pressure: 1017,
sea_level: 1017,
grnd_level: 1013,
humidity: 96,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 100
},
wind: {
speed: 3.74,
deg: 185
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-19 06:00:00"
},
{
dt: 1613725200,
main: {
temp: 0.09,
feels_like: -4.9,
temp_min: 0.09,
temp_max: 0.09,
pressure: 1016,
sea_level: 1016,
grnd_level: 1013,
humidity: 94,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04d"
}
],
clouds: {
all: 100
},
wind: {
speed: 4.14,
deg: 186
},
visibility: 10000,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-19 09:00:00"
},
{
dt: 1613736000,
main: {
temp: 0.7,
feels_like: -4.21,
temp_min: 0.7,
temp_max: 0.7,
pressure: 1016,
sea_level: 1016,
grnd_level: 1013,
humidity: 92,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04d"
}
],
clouds: {
all: 100
},
wind: {
speed: 4.09,
deg: 187
},
visibility: 10000,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-19 12:00:00"
},
{
dt: 1613746800,
main: {
temp: -0.14,
feels_like: -4.44,
temp_min: -0.14,
temp_max: -0.14,
pressure: 1015,
sea_level: 1015,
grnd_level: 1011,
humidity: 97,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04d"
}
],
clouds: {
all: 100
},
wind: {
speed: 3.19,
deg: 190
},
visibility: 10000,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-19 15:00:00"
},
{
dt: 1613757600,
main: {
temp: -0.64,
feels_like: -4.53,
temp_min: -0.64,
temp_max: -0.64,
pressure: 1016,
sea_level: 1016,
grnd_level: 1012,
humidity: 98,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 100
},
wind: {
speed: 2.54,
deg: 192
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-19 18:00:00"
},
{
dt: 1613768400,
main: {
temp: -0.68,
feels_like: -4.4,
temp_min: -0.68,
temp_max: -0.68,
pressure: 1016,
sea_level: 1016,
grnd_level: 1013,
humidity: 99,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 100
},
wind: {
speed: 2.31,
deg: 191
},
visibility: 10000,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-19 21:00:00"
},
{
dt: 1613779200,
main: {
temp: -0.39,
feels_like: -3.33,
temp_min: -0.39,
temp_max: -0.39,
pressure: 1017,
sea_level: 1017,
grnd_level: 1013,
humidity: 99,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 100
},
wind: {
speed: 1.26,
deg: 250
},
visibility: 2277,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-20 00:00:00"
},
{
dt: 1613790000,
main: {
temp: -0.29,
feels_like: -3.34,
temp_min: -0.29,
temp_max: -0.29,
pressure: 1017,
sea_level: 1017,
grnd_level: 1013,
humidity: 99,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 98
},
wind: {
speed: 1.43,
deg: 178
},
visibility: 1512,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-20 03:00:00"
},
{
dt: 1613800800,
main: {
temp: -0.07,
feels_like: -2.83,
temp_min: -0.07,
temp_max: -0.07,
pressure: 1017,
sea_level: 1017,
grnd_level: 1014,
humidity: 99,
temp_kf: 0
},
weather: [
{
id: 500,
main: "Rain",
description: "light rain",
icon: "10n"
}
],
clouds: {
all: 99
},
wind: {
speed: 1.06,
deg: 227
},
visibility: 433,
pop: 0.33,
rain: {
3h: 0.22
},
sys: {
pod: "n"
},
dt_txt: "2021-02-20 06:00:00"
},
{
dt: 1613811600,
main: {
temp: 0.81,
feels_like: -2.08,
temp_min: 0.81,
temp_max: 0.81,
pressure: 1018,
sea_level: 1018,
grnd_level: 1015,
humidity: 97,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04d"
}
],
clouds: {
all: 96
},
wind: {
speed: 1.37,
deg: 245
},
visibility: 10000,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-20 09:00:00"
},
{
dt: 1613822400,
main: {
temp: 2.03,
feels_like: -0.74,
temp_min: 2.03,
temp_max: 2.03,
pressure: 1019,
sea_level: 1019,
grnd_level: 1015,
humidity: 96,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04d"
}
],
clouds: {
all: 95
},
wind: {
speed: 1.44,
deg: 249
},
visibility: 6430,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-20 12:00:00"
},
{
dt: 1613833200,
main: {
temp: 1.27,
feels_like: -1.91,
temp_min: 1.27,
temp_max: 1.27,
pressure: 1019,
sea_level: 1019,
grnd_level: 1015,
humidity: 98,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04d"
}
],
clouds: {
all: 90
},
wind: {
speed: 1.92,
deg: 207
},
visibility: 380,
pop: 0,
sys: {
pod: "d"
},
dt_txt: "2021-02-20 15:00:00"
},
{
dt: 1613844000,
main: {
temp: 1.2,
feels_like: -2.07,
temp_min: 1.2,
temp_max: 1.2,
pressure: 1020,
sea_level: 1020,
grnd_level: 1016,
humidity: 98,
temp_kf: 0
},
weather: [
{
id: 804,
main: "Clouds",
description: "overcast clouds",
icon: "04n"
}
],
clouds: {
all: 95
},
wind: {
speed: 2.04,
deg: 218
},
visibility: 204,
pop: 0,
sys: {
pod: "n"
},
dt_txt: "2021-02-20 18:00:00"
}
],
city: {
id: 2673730,
name: "Stockholm",
coord: {
lat: 59.3326,
lon: 18.0649
},
country: "SE",
population: 1000000,
timezone: 3600,
sunrise: 1613370215,
sunset: 1613403625
}
}





*/