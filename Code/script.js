 // All the DOM selectors stored as variables
 const header = document.querySelector(".today-summary")
 const aboutWeather = document.querySelector(".about-weather")
 const weatherForecast = document.querySelector(".weather-forecast")
 const firstCityWeather = document.querySelector(".first-city")
 const secondCityWeather = document.querySelector(".second-city")

 // Global scope
 const api = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=8d66acab5dd718723a370e1b64f22f8c"

 // Function to show description of weather, temp and time of sunrise/sunset in the header.
 const topOfPage = () => {
 fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=8d66acab5dd718723a370e1b64f22f8c")
  .then((response) => {
     return response.json();
   })
  .then((data) => {
    console.log(data);
    header.innerHTML += `
    <p>${data.weather[0].main} | ${(Math.round(data.main.temp))}°</p>
    <p>sunrise ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})} </p>
    <p>sunset ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})} </p>
    `
  })
}
topOfPage();

// Function to show the weather forecast in Stockholm for the next 5 days. Shows day and temp.
const forecastSthlm = () => {
  fetch(api)
  .then((response) => {
    return response.json();
  })
  .then((dataNextFiveDays) => {
    console.log(dataNextFiveDays);
    
  const filteredForecast = dataNextFiveDays.list.filter(json => json.dt_txt.includes('12:00'))
  filteredForecast.forEach(json => {
    let temp = (Math.round(json.main.temp));
    console.log(temp)

    let fivedays = (new Date(json.dt * 1000)).toLocaleDateString("en-US", { weekday: "short" })
    console.log(fivedays)
    
    weatherForecast.innerHTML += `
    <li>
    <span id="fiveday">${fivedays}</span>
    <span id="temp">${temp}º</span>
    </li>
    `
    });
  });
};
forecastSthlm();

//Function to show different backgrounds, colors and pictures depening on what the weather is.
const filterWeather = () => {
  fetch(api)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    if (json.list[0].weather[0].main == 'Clouds' || json.list[0].weather[0].main == 'Mist') {
      document.body.style.backgroundColor = "#F4F7F8";
      document.body.style.color = "#F47775";
      aboutWeather.innerHTML += `<img class="weather-img" src="../design/icons/cloud.svg" alt="cloud icon">`
      aboutWeather.innerHTML += `<h2>Light a fire and get cosy. ${json.city.name} is looking grey today.</h2>`

    } else if (json.list[0].weather[0].main == 'Rain' || json.list[0].weather[0].main == 'Thunderstorm') {
      document.body.style.backgroundColor = "#A3DEF7";
      document.body.style.color = "#164A68";
      aboutWeather.innerHTML += `<img class="weather-img" src="../design/icons/umbrella.svg" alt="umbrella icon">`
      aboutWeather.innerHTML += `<h2>Don't forget your umbrella. It's wet in ${json.city.name} today.</h2>`

    } else if (json.list[0].weather[0].main == 'Snow') {
      document.body.style.backgroundColor = "#A3DEF7";
      document.body.style.color = "#164A68";
      aboutWeather.innerHTML += `<img class="weather-img" src="../design/icons/hat." alt="hat icon">`
      aboutWeather.innerHTML += `<h2>Put your hat on. It's snowing in ${json.city.name} today.</h2>`

    } else {
      document.body.style.backgroundColor = "#F7E9B9";
      document.body.style.color = "#2A5510";
      aboutWeather.innerHTML += `<img class="weather-img" src="../design/icons/sunglasses.svg" alt="sun-glasses icon">`
      aboutWeather.innerHTML += `<h2>Get your sunnies on. ${json.city.name} is looking rather great today.</h2>`
    }
  })
}
filterWeather();

//Function to show other cities
// Paris
const weatherFirstCity = () => {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=Paris,France&units=metric&APPID=8d66acab5dd718723a370e1b64f22f8c")
  .then((response)=> {
    return response.json();
  })
  .then ((data)=> {
  console.log(data)
  firstCityWeather.innerHTML += `
  <img class="city-icon" src="../design/icons/eiffel-tower.png" alt="eiffel-tower icon"><br>
  <p>${(Math.round(data.main.temp))}º | ${data.name}</p>`
  })
}
weatherFirstCity();

// Barcelona
const weatherSecondCity = () => {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=Barcelona,Spain&units=metric&APPID=8d66acab5dd718723a370e1b64f22f8c")
  .then((response)=> {
    return response.json();
  })
  .then ((data)=> {
  console.log(data)
  secondCityWeather.innerHTML += `
  <img class="city-icon" src="../design/icons/sagrada-familia.png" alt="sagrada-familia icon"><br>
  <p>${(Math.round(data.main.temp))}º | ${data.name}</p>
  `
  })
}
weatherSecondCity();
