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