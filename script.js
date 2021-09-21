const cityName = document.getElementById('city')
const temperature = document.getElementById('temperature')
const typeOfWeather = document.getElementById('typeOfWeather')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')


const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=147b874875d53e0e9f84cbacd0567b99'
    fetch(API_LINK)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        cityName.innerHTML = json.name
        temperature.innerHTML = json.main.temp.toFixed(1)
        typeOfWeather.innerHTML = json.weather[0].description
        const sunriseConvert = new Date((json.sys.sunrise) * 1000);
        const sunriseTime = sunriseConvert.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
      
          sunrise.innerHTML = `Sunrise: ${sunriseTime}`;

          const sunsetConvert = new Date((json.sys.sunset) * 1000);
          const sunsetTime = sunsetConvert.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
      
            sunset.innerHTML = `Sunset: ${sunsetTime}`;

          console.log(json)
    })

    
    

