const displayWeatherInfo     = document.getElementById('displayWeatherInfo')
const displayWeatherForecast = document.getElementById('displayWeatherForecast')
const mainWrapper            = document.querySelector('.mainWrapper')
const cityNameWeather        = document.getElementById('cityNameWeather')
const geoLocation            = document.getElementById('geolocation')

const cityNameWeatherDisplay = (city) => {

    const url  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5877e9b20cbe99b1b6637d0e4bb81238`
    fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            //console.log(data)
            let cityName  = data.name
            let temp      = data.main.temp.toFixed(1)
            let type      = data.weather[0].description
            let typeMain  = data.weather[0].main
            let sunrise   = data.sys.sunrise
            let sunset    = data.sys.sunset
            let timeZone  = data.timezone
            let feelsLike = data.main.feels_like.toFixed(0)
            let humidity  = data.main.humidity
            let Icon      = data.weather[0].icon

            //display different background, breakpoint is 15
                temp <= 15 ?
                  document.querySelector('.mainWrapper').style.background = 'linear-gradient( #827bcfa2,#2D2E5E)'
                :
                  document.querySelector('.mainWrapper').style.background = 'linear-gradient( #c22121,#d3d330)'
            
            // different animation effect on background
            let classNam
           if (typeMain === "Clouds"){
                classNam = 'clouds'
            }else if(typeMain === "Clear"){
                classNam = 'clear'
            }else if(typeMain === "Haze"){
                classNam = 'haze'
            }else if(typeMain === "Rain"){
                classNam = 'rain'
            }else if(typeMain === "Snow"){
              classNam = 'snow'
          }
               
            //display todays weather
              displayWeatherInfo.innerHTML = 
                                `<div class = "weatherInfo">
                                      <p class="image" id='${classNam}'><img src = "https://openweathermap.org/img/wn/${Icon}@2x.png"></p>
                                      <p class="degree">${temp}°c</p>
                                      <p class="feelsLike">Feels like ${feelsLike}°c/Humidity ${humidity}%</p>
                                      <p class="cityName">${cityName}</p>
                                      <p class="tempType">${type.charAt(0).toUpperCase()}${type.slice(1)}</p>
                                  
                                    <div class = "sunRisesunSet">
                                        <p>SUNRISE ${convertUnixTimeStamp(sunrise, timeZone)}</p>
                                        <p>SUNSET ${convertUnixTimeStamp(sunset, timeZone)}</p>
                                    </div>
                                  </div>`
        })
        .catch((error) => console.error(error))
   }

   // Converts seconds to milleseconds and display readable format
    const convertUnixTimeStamp = (timestamp,timezone) => {
          const date           = new Date((timestamp +               //sunrise/sunset time in seconds from API
                                timezone +                           //timezone is in second from API
                                new Date().getTimezoneOffset() * 60) //getTimezoneOffset() returns the time in minutes difference between local time and UTC(Universal Time Coordinated)
                                                                     // minutes * 60 = seconds
                                * 1000);                             // seconds * 1000 = milliseconds
          const hours          = "0" + date.getHours();              // display hours as 007, 014, 023
          const minutes        = "0" + date.getMinutes();            // display minutes as 007, 014, 023
          // Formats how the time presents
          const formattedTime  = hours.substr(-2) + ":" + minutes.substr(-2); // display time as 07:30, 14:40
          return formattedTime;
        };
    
    //weather forecast for 5 days  
    const cityNameWeatherForecastDisplay = (city)=>{
           
            const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=5877e9b20cbe99b1b6637d0e4bb81238`
            fetch(urlForecast)
              .then((response) => response.json())
              .then((data) => {
                let filteredFiveDays = data.list.filter((item) =>
                  item.dt_txt.includes("12:00")
                  );
                  displayWeatherForecast.innerHTML = '';
                 filteredFiveDays.forEach((item) => {
                  displayWeatherForecast.innerHTML += `
                  <div class="weatherForecastDays">
                    <div class="weatherForecastRow">
                         <p>${new Date(item.dt_txt.replace(/-/g, "/")).toLocaleDateString("en-US", {weekday: "short",})} </p>
                         <p class="forecastImage"><img src = "https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"></p> 
                         <p>${item.main.temp_max.toFixed(0)}°C</p>
                    </div>
                  </div>`;
                });

              })
              .catch((error) => console.error(error))
   }


 //geolocation 
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      displayWeatherInfo.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
      let lattitude = position.coords.latitude.toFixed(0)
      let longitude = position.coords.longitude.toFixed(0)

      return geoLocationWeatherInformation(lattitude,longitude)
  }
  getLocation() //display the current location alert()


  const geoLocationWeatherInformation = (latt,long)=> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&appid=5877e9b20cbe99b1b6637d0e4bb81238`
    fetch(url)
    .then((response) => response.json())
    .then((data) =>{
      let cityName = data.name
      cityNameWeatherDisplay(cityName)
      cityNameWeatherForecastDisplay(cityName)
    })
    .catch((error) => console.error(error))
  }
  
   //all eventListener   
    cityNameWeather.addEventListener('change',(cityName)=>{
                                                cityName = cityNameWeather.value
                                                cityNameWeatherDisplay(cityName)
                                              })
    cityNameWeather.addEventListener('change',(cityName)=>{
                                                cityName = cityNameWeather.value
                                                cityNameWeatherForecastDisplay(cityName)
                                              })
    geoLocation.addEventListener('click',getLocation)