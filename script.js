const displayWeatherInfo = document.getElementById('displayWeatherInfo')

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=5877e9b20cbe99b1b6637d0e4bb81238'

fetch(url)
.then((response)=>response.json())
.then((data)=>{
    console.log(data)
    cityName  = data.name
    temp      = data.main.temp.toFixed(1)
    type      = data.weather[0].description

    //display todays weather
    displayWeatherInfo.innerHTML = 
    `<div class = "weatherInfo">
    <p class="degree">${temp}°c</p>
     <p class="cityName">${cityName}</p>
     <p class="tempType">${type.charAt(0).toUpperCase()}${type.slice(1)}</p>
     
    
    </div>`

})




      //weather forecast for 5 days  
   const cityNameWeatherForecastDisplay = ()=>{
          city = cityNameWeather.value

// Object with all emoji
  const emojiObject = {
      Clouds: "./assets/cloud.png",

      Wind: "./assets/wind.png",

      Clear: "./assets/sun.png",

      Rain: "./assets/rain.png",

      Snow: "./assets/snow.png",
    };

const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=5877e9b20cbe99b1b6637d0e4bb81238`

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