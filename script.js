// const displayWeatherInfo = document.getElementById('displayWeatherInfo')

// const url = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5877e9b20cbe99b1b6637d0e4bb81238'

// fetch(url)
// .then((response)=>response.json())
// .then((data)=>{
//     console.log(data)
//     cityName  = data.name
//     temp      = data.main.temp.toFixed(1)
//     type      = data.weather[0].description

//     //display todays weather
//     displayWeatherInfo.innerHTML = 
//     `<div class = "weatherInfo">
//     <p class="degree">${temp}°c</p>
//      <p class="cityName">${cityName}</p>
//      <p class="tempType">${type.charAt(0).toUpperCase()}${type.slice(1)}</p>
     
    
//     </div>`

// })


// SUNRISE SUNSET

const displayWeatherInfo = document.getElementById("displayWeatherInfo");

const url =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5877e9b20cbe99b1b6637d0e4bb81238";

const fetchWeatherData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const cityName = data.name;
      const temp = data.main.temp.toFixed(1);
      const type = data.weather[0].description;
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;

      //display todays weather, sun etc. SOME ADDED DIV'S AND P'S!!!
      let weatherInfo = `<div class = "weatherInfo">
         <p class="degree">${temp}°c</p>
         <p class="cityName">${cityName}</p>
         <p class="tempType">${type.charAt(0).toUpperCase()}${type.slice(1)}</p>
            <div class='sun-container'> 
                <p class="sunRise">sunrise</p>
                <p class="sunSet"> ${convertUnixTimeStamp(sunset)}</p>
                <p class="sunRise">sunset </p>
                <p class="sunSet">${convertUnixTimeStamp(sunset)}</p>
            </div>
       </div>`;

      return (displayWeatherInfo.innerHTML = weatherInfo);
    })

    .catch((error) => {
      console.error("Error:", error);
    });
};

// Converts seconds to milleseconds to use in get Methods
const convertUnixTimeStamp = (timestamp) => {
  let unix_timestamp = timestamp;
  const date = new Date(unix_timestamp * 1000);
  const hours = "0" + date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();

  // Formats how the time presents
  const formattedTime =
    hours.substr(-2) + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  return formattedTime;
};

fetchWeatherData(url);


// 5 DAYS!!


      //weather forecast for 5 days  
      const cityNameWeatherForecastDisplay = ()=>{
        //city = cityNameWeather.value 

// Object with all emoji
const emojiObject = {
    Clouds: "./Designs/Design-1/assets/Group16.png",

    Wind: "./Designs/Design-1/assets/Group16.png",

    Clear: "./Designs/Design-1/assets/Group36.png",

    Rain: "./Designs/Design-1/assets/Group16.png",

    Snow: "./Designs/Design-1/assets/Group16.png",
  };

const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm&units=metric&APPID=5877e9b20cbe99b1b6637d0e4bb81238`

fetch(urlForecast)
.then((response) => response.json())
.then((data) => {
let filteredFiveDays = data.list.filter((item) =>
  item.dt_txt.includes("09:00")
  );
  
 filteredFiveDays.forEach((item) => {
  displayWeatherInfo.innerHTML += `
  <div class="weatherForecastDays">
    <div class="weatherForecastRow">
         <p>${new Date(item.dt_txt).toLocaleDateString("en-US", {weekday: "short",})} </p>
         <p><img src = "${emojiObject[item.weather[0].main]}"></p>
         <p>${item.main.temp_max.toFixed(0)}°C</p>
    </div>
  </div>`;
});

})
.catch((error) => console.error(error))
}

cityNameWeatherForecastDisplay()