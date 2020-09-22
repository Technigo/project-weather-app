
const todaysWeatherId = document.getElementById("todaysWeatherId");
const monday = document.getElementById("monday");
const tuesday = document.getElementById("tuesday");
const wednesday = document.getElementById("wednesday");
const thursday = document.getElementById("thursday");
const friday = document.getElementById("friday");

const fetchWeather = 'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=f2f9f8b681a8d2ef3cd9a12ebdc8c363';
fetch(fetchWeather)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        console.log(json);
        todaysWeatherTemp.innerText = json.main.temp;
        todaysWeatherCity.innerText = json.name;
        todaysWeatherType.innerText = json.weather[0].description;
        todaysWeatherSunrise.innerText = json.sys.sunrise;
        todaysWeatherSunset.innerText = json.sys.sunset;

        // STEP 4
        // jsonArray.forEach(temperature)  => {
        //     console.log(temperature)
        //     const temperatureNumber = 
        // });
            
    
        });
// };

